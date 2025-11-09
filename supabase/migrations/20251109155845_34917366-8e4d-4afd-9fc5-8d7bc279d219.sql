-- Create profiles table for user information
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  email TEXT,
  phone TEXT,
  user_type TEXT CHECK (user_type IN ('musician', 'client', 'admin')),
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create musicians table for musician-specific information
CREATE TABLE public.musicians (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  stage_name TEXT NOT NULL,
  bio TEXT,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  musical_styles TEXT[] NOT NULL,
  services TEXT[] NOT NULL,
  price_min INTEGER NOT NULL,
  price_max INTEGER NOT NULL,
  rating DECIMAL(2,1) DEFAULT 0,
  total_reviews INTEGER DEFAULT 0,
  verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create bookings table
CREATE TABLE public.bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  musician_id UUID REFERENCES public.musicians(id) ON DELETE CASCADE,
  client_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  event_date TIMESTAMP WITH TIME ZONE NOT NULL,
  event_type TEXT NOT NULL,
  event_location TEXT NOT NULL,
  duration_hours INTEGER NOT NULL,
  total_amount INTEGER NOT NULL,
  status TEXT CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')) DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create payments table
CREATE TABLE public.payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID REFERENCES public.bookings(id) ON DELETE CASCADE,
  amount INTEGER NOT NULL,
  status TEXT CHECK (status IN ('pending', 'processing', 'completed', 'failed', 'refunded')) DEFAULT 'pending',
  payment_method TEXT,
  stripe_payment_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create reviews table
CREATE TABLE public.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID REFERENCES public.bookings(id) ON DELETE CASCADE,
  musician_id UUID REFERENCES public.musicians(id) ON DELETE CASCADE,
  client_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5) NOT NULL,
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.musicians ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view all profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Musicians policies
CREATE POLICY "Anyone can view musicians" ON public.musicians FOR SELECT USING (true);
CREATE POLICY "Musicians can update own profile" ON public.musicians FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Musicians can insert own profile" ON public.musicians FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Bookings policies
CREATE POLICY "Users can view their own bookings" ON public.bookings FOR SELECT 
  USING (auth.uid() = client_id OR auth.uid() IN (SELECT user_id FROM musicians WHERE id = musician_id));
CREATE POLICY "Clients can create bookings" ON public.bookings FOR INSERT 
  WITH CHECK (auth.uid() = client_id);
CREATE POLICY "Users can update their own bookings" ON public.bookings FOR UPDATE 
  USING (auth.uid() = client_id OR auth.uid() IN (SELECT user_id FROM musicians WHERE id = musician_id));

-- Payments policies
CREATE POLICY "Users can view their own payments" ON public.payments FOR SELECT 
  USING (auth.uid() IN (SELECT client_id FROM bookings WHERE id = booking_id) 
    OR auth.uid() IN (SELECT m.user_id FROM musicians m JOIN bookings b ON m.id = b.musician_id WHERE b.id = booking_id));

-- Reviews policies
CREATE POLICY "Anyone can view reviews" ON public.reviews FOR SELECT USING (true);
CREATE POLICY "Clients can create reviews for their bookings" ON public.reviews FOR INSERT 
  WITH CHECK (auth.uid() = client_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_musicians_updated_at BEFORE UPDATE ON public.musicians
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON public.bookings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_payments_updated_at BEFORE UPDATE ON public.payments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create function to update musician rating
CREATE OR REPLACE FUNCTION update_musician_rating()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.musicians
  SET 
    rating = (SELECT AVG(rating)::DECIMAL(2,1) FROM public.reviews WHERE musician_id = NEW.musician_id),
    total_reviews = (SELECT COUNT(*) FROM public.reviews WHERE musician_id = NEW.musician_id)
  WHERE id = NEW.musician_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to update rating after review
CREATE TRIGGER update_rating_after_review AFTER INSERT ON public.reviews
  FOR EACH ROW EXECUTE FUNCTION update_musician_rating();
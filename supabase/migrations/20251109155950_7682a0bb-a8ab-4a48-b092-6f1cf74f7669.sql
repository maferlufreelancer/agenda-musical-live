-- Fix security warnings by setting search_path on functions

-- Drop and recreate update_updated_at_column with proper search_path
DROP FUNCTION IF EXISTS update_updated_at_column() CASCADE;

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- Recreate triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_musicians_updated_at BEFORE UPDATE ON public.musicians
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON public.bookings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_payments_updated_at BEFORE UPDATE ON public.payments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Drop and recreate update_musician_rating with proper search_path
DROP FUNCTION IF EXISTS update_musician_rating() CASCADE;

CREATE OR REPLACE FUNCTION update_musician_rating()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.musicians
  SET 
    rating = (SELECT AVG(rating)::DECIMAL(2,1) FROM public.reviews WHERE musician_id = NEW.musician_id),
    total_reviews = (SELECT COUNT(*) FROM public.reviews WHERE musician_id = NEW.musician_id)
  WHERE id = NEW.musician_id;
  RETURN NEW;
END;
$$;

-- Recreate trigger to update rating after review
CREATE TRIGGER update_rating_after_review AFTER INSERT ON public.reviews
  FOR EACH ROW EXECUTE FUNCTION update_musician_rating();
-- Create table for musician applications to client events
CREATE TABLE public.musician_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  musician_id UUID NOT NULL REFERENCES public.musicians(id),
  client_id UUID NOT NULL REFERENCES public.profiles(id),
  booking_id UUID REFERENCES public.bookings(id),
  status TEXT NOT NULL DEFAULT 'pending',
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.musician_applications ENABLE ROW LEVEL SECURITY;

-- Musicians can view their own applications
CREATE POLICY "Musicians can view their applications"
ON public.musician_applications
FOR SELECT
USING (
  auth.uid() IN (
    SELECT user_id FROM musicians WHERE id = musician_applications.musician_id
  )
);

-- Clients can view applications to their events
CREATE POLICY "Clients can view applications to their events"
ON public.musician_applications
FOR SELECT
USING (auth.uid() = client_id);

-- Musicians can create applications
CREATE POLICY "Musicians can create applications"
ON public.musician_applications
FOR INSERT
WITH CHECK (
  auth.uid() IN (
    SELECT user_id FROM musicians WHERE id = musician_applications.musician_id
  )
);

-- Clients can update application status
CREATE POLICY "Clients can update application status"
ON public.musician_applications
FOR UPDATE
USING (auth.uid() = client_id);

-- Create trigger for updated_at
CREATE TRIGGER update_musician_applications_updated_at
BEFORE UPDATE ON public.musician_applications
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
create table if not exists profiles (
  id uuid references auth.users not null primary key,
  created_at timestamp default now(),
  updated_at timestamp default now(),
  display_name TEXT NULL
);

create table if not exists decks (
  id uuid default uuid_generate_v4() primary key,
  created_by uuid references auth.users not null,
  created_at timestamp default now(),
  updated_at timestamp default now(),
  title TEXT NOT NULL
);

create table if not exists cards (
  id uuid default uuid_generate_v4() primary key,
  deck_id uuid references public.decks NOT NULL,
  created_at timestamp default now(),
  updated_at timestamp default now(),
  front TEXT NOT NULL,
  back TEXT NOT NULL,
  rating REAL NOT NULL
);

ALTER TABLE public.decks
  ENABLE ROW LEVEL SECURITY;

CREATE POLICY
  "Only authenticated users can add decks"
  ON public.decks
  FOR INSERT 
  TO authenticated 
  WITH CHECK (true);

CREATE POLICY
  "Can only view own card decks."
  ON public.decks
  FOR SELECT USING (
    auth.uid() = created_by
  );

CREATE POLICY
  "Can only update own card decks."
  ON public.decks
  FOR UPDATE USING (
    auth.uid() = created_by
  ) WITH CHECK (
    auth.uid() = created_by
  );

CREATE POLICY
  "Can only delete own card decks."
  ON public.decks
  FOR DELETE USING (
    auth.uid() = created_by
  );

ALTER TABLE public.profiles
  ENABLE ROW LEVEL SECURITY;

CREATE POLICY
  "Can only view own profile data."
  ON public.profiles
  FOR SELECT
  USING ( auth.uid() = id );

CREATE POLICY
  "Can only update own profile data."
  ON public.profiles
  FOR UPDATE
  USING ( auth.uid() = id );

DROP FUNCTION if not exists exists public.create_profile_for_new_user();
CREATE FUNCTION
  public.create_profile_for_new_user()
  RETURNS TRIGGER AS
  $$
  BEGIN
    INSERT INTO public.profiles (id, display_name)
    VALUES (
      NEW.id,
      NEW.raw_user_meta_data ->> 'name'
    );
    RETURN NEW;
  END;
  $$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER
  create_profile_on_signup
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE PROCEDURE
    public.create_profile_for_new_user();
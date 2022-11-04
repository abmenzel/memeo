create table profiles (
  id uuid references auth.users not null primary key,
  display_name TEXT NULL
);

create table decks (
  id uuid default uuid_generate_v4() primary key,
  created_by uuid references auth.users not null,
  title TEXT NOT NULL
);

create table cards (
  id uuid default uuid_generate_v4() primary key,
  deck_id uuid references public.decks not null,
  front TEXT NULL,
  back TEXT NULL,
  rating INTEGER NOT NULL
);

ALTER TABLE public.decks
  ENABLE ROW LEVEL SECURITY;

CREATE POLICY
  "Can only view own card decks."
  ON public.decks
  FOR SELECT
  USING ( auth.uid() = created_by );

CREATE POLICY
  "Can only update own card decks."
  ON public.decks
  FOR UPDATE
  USING ( auth.uid() = created_by );

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
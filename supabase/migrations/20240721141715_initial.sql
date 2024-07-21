create table user_settings (
  "userId" uuid primary key,
  "tableRows" int default 5 not null,
  "lightmode" boolean default false not null,
  "reducedMotion" boolean default false not null,
  "pushNotifications" boolean default false not null
);

create table profiles (
  "userId" uuid primary key,
  "firstName" text not null,
  "lastName" text not null
);

CREATE 
OR REPLACE FUNCTION public.create_profile() RETURNS TRIGGER AS $$ 

BEGIN
  INSERT INTO public.profiles ("userId", "firstName", "lastName") 
VALUES 
  (
    NEW.id,
    NEW.raw_user_meta_data ->> 'firstName', 
    NEW.raw_user_meta_data ->> 'lastName'
  );
  INSERT INTO public.user_settings ("userId")
VALUES 
  (
    NEW.id
  );
RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

drop trigger if exists create_profile_trigger on auth.users;
CREATE TRIGGER create_profile_trigger 
AFTER 
  INSERT ON auth.users FOR EACH ROW WHEN (
    NEW.raw_user_meta_data IS NOT NULL
  ) EXECUTE FUNCTION public.create_profile();

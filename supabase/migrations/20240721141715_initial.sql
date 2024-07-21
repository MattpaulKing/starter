create table posts (
  id uuid default gen_random_uuid() primary key,
  "createdAt" timestamptz default CURRENT_TIMESTAMP not null,
  label text not null,
  content text not null
);

create table user_settings (
  "userId" uuid primary key,
  "tableRows" int default 5 not null,
  "lightmode" boolean default false not null,
  "reducedMotion" boolean default false not null,
  "pushNotifications" boolean default false not null
);

create table profiles (
  "id" uuid primary key,
  "firstName" text not null,
  "lastName" text not null,
  constraint id_fk foreign key ("id") references auth.users ("id")
    on update cascade on delete restrict
);

create type todos_enum as ENUM ('done', 'todo', 'in progress');

create table public.todos (
  id uuid default gen_random_uuid() primary key,
  "createdAt" timestamptz default CURRENT_TIMESTAMP not null,
  "createdById" uuid,
  "label" text not null,
  "description" text not null,
  "status" todos_enum default 'todo' not null,
  "deadline" timestamptz,
  constraint "created_by_id_fk" foreign key ("createdById") references public.profiles ("id")
    on update cascade on delete cascade
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

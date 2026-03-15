create table if not exists public.appointments (
  id bigint generated always as identity primary key,
  name text not null,
  phone text not null,
  email text not null,
  date date not null,
  time time not null,
  reason text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

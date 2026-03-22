-- Add email and verified columns to shops table
alter table shops add column if not exists email text;
alter table shops add column if not exists verified bool default false;

-- Mark known-good shops as verified
update shops set verified = true where slug in (
  'barber-league-salt-lake-city',
  'fade-one-barbershop-salt-lake-city'
);

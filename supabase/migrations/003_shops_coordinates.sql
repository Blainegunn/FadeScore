-- Add latitude/longitude to shops for per-shop distance calculations
alter table shops add column latitude double precision;
alter table shops add column longitude double precision;

/*
  # Create visitors tracking table

  1. New Tables
    - `visitors`
      - `id` (uuid, primary key)
      - `ip_address` (text)
      - `country` (text)
      - `city` (text)
      - `region` (text)
      - `timezone` (text)
      - `isp` (text)
      - `browser` (text)
      - `browser_version` (text)
      - `os` (text)
      - `os_version` (text)
      - `device_type` (text)
      - `device_model` (text)
      - `device_vendor` (text)
      - `screen_resolution` (text)
      - `color_depth` (integer)
      - `pixel_depth` (integer)
      - `user_agent` (text)
      - `language` (text)
      - `referrer` (text)
      - `page_url` (text)
      - `session_id` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `visitors` table
    - Add policy for authenticated users to read visitor data
*/

CREATE TABLE IF NOT EXISTS visitors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ip_address text,
  country text,
  city text,
  region text,
  timezone text,
  isp text,
  browser text,
  browser_version text,
  os text,
  os_version text,
  device_type text DEFAULT 'desktop',
  device_model text,
  device_vendor text,
  screen_resolution text,
  color_depth integer,
  pixel_depth integer,
  user_agent text,
  language text,
  referrer text,
  page_url text,
  session_id text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE visitors ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous inserts on visitors"
  ON visitors
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to read visitors"
  ON visitors
  FOR SELECT
  TO authenticated
  USING (true);
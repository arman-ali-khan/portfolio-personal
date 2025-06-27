/*
  # Create portfolio data management table

  1. New Tables
    - `portfolio_data`
      - `id` (uuid, primary key)
      - `section` (text, unique)
      - `data` (jsonb)
      - `updated_at` (timestamp)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `portfolio_data` table
    - Add policy for public read access
    - Add policy for authenticated users to manage data
*/

CREATE TABLE IF NOT EXISTS portfolio_data (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  section text UNIQUE NOT NULL,
  data jsonb NOT NULL,
  updated_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE portfolio_data ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to portfolio_data"
  ON portfolio_data
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow authenticated users to manage portfolio_data"
  ON portfolio_data
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_portfolio_data_updated_at
    BEFORE UPDATE ON portfolio_data
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
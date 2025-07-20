/*
  # Create leads table and setup

  1. New Tables
    - `leads`
      - `id` (uuid, primary key)
      - `full_name` (text, required) - Full name of lead
      - `email` (text, optional) - Email address
      - `phone` (text, optional) - Contact number
      - `company` (text, optional) - Organization
      - `designation` (text, optional) - Job title
      - `inquiry_type` (text, optional) - Inquiry type
      - `status` (enum) - Lead progress stage
      - `note` (text, optional) - Extra notes
      - `source` (enum) - Where the lead came from
      - `row_content` (json, optional) - Raw data
      - `assigned_to` (uuid, FK to users.id) - Assigned agent
      - `created_by` (uuid, FK to users.id) - Who submitted the lead
      - `created_at` (timestamp) - Auto-filled

  2. Security
    - Enable RLS on `leads` table
    - Add policies for users to manage their own leads
    - Add policies for viewing assigned leads

  3. Enums
    - Create status enum
    - Create source enum
*/

-- Create status enum
CREATE TYPE lead_status AS ENUM (
  'new',
  'contacted', 
  'interested',
  'hot',
  'warm',
  'cold',
  'won',
  'lost'
);

-- Create source enum
CREATE TYPE lead_source AS ENUM (
  'chat',
  'visiting_card',
  'manual'
);

-- Create leads table
CREATE TABLE IF NOT EXISTS leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text,
  phone text,
  company text,
  designation text,
  inquiry_type text,
  status lead_status DEFAULT 'new',
  note text,
  source lead_source DEFAULT 'manual',
  row_content json,
  assigned_to uuid REFERENCES users(id),
  created_by uuid REFERENCES users(id) NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can read their own leads"
  ON leads
  FOR SELECT
  TO authenticated
  USING (created_by = auth.uid());

CREATE POLICY "Users can read leads assigned to them"
  ON leads
  FOR SELECT
  TO authenticated
  USING (assigned_to = auth.uid());

CREATE POLICY "Users can insert their own leads"
  ON leads
  FOR INSERT
  TO authenticated
  WITH CHECK (created_by = auth.uid());

CREATE POLICY "Users can update their own leads"
  ON leads
  FOR UPDATE
  TO authenticated
  USING (created_by = auth.uid())
  WITH CHECK (created_by = auth.uid());

CREATE POLICY "Users can delete their own leads"
  ON leads
  FOR DELETE
  TO authenticated
  USING (created_by = auth.uid());

-- Create trigger for updated_at
CREATE TRIGGER update_leads_updated_at
  BEFORE UPDATE ON leads
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_leads_created_by ON leads(created_by);
CREATE INDEX IF NOT EXISTS idx_leads_assigned_to ON leads(assigned_to);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_source ON leads(source);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at);
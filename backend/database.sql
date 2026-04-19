-- DataBridge Solutions - PostgreSQL Database Schema
-- Run this file to create all required tables

-- Enable UUID extension (optional, for UUID-based IDs)
-- CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- Admin Users Table
-- ============================================
CREATE TABLE IF NOT EXISTS admin_users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- Jobs Table
-- ============================================
CREATE TABLE IF NOT EXISTS jobs (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    department VARCHAR(100) NOT NULL,
    location VARCHAR(100) NOT NULL,
    type VARCHAR(50) DEFAULT 'Full-time',
    description TEXT NOT NULL,
    requirements TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- Job Applications Table
-- ============================================
CREATE TABLE IF NOT EXISTS job_applications (
    id SERIAL PRIMARY KEY,
    job_id INTEGER REFERENCES jobs(id) ON DELETE SET NULL,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    resume_url TEXT NOT NULL,
    cover_letter TEXT,
    status VARCHAR(20) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- Contact Queries Table
-- ============================================
CREATE TABLE IF NOT EXISTS contact_queries (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    subject VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'new',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- Indexes for better query performance
-- ============================================
CREATE INDEX IF NOT EXISTS idx_jobs_created_at ON jobs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_applications_job_id ON job_applications(job_id);
CREATE INDEX IF NOT EXISTS idx_applications_status ON job_applications(status);
CREATE INDEX IF NOT EXISTS idx_contact_status ON contact_queries(status);

-- ============================================
-- Insert default admin user
-- Password: admin123 (CHANGE THIS IN PRODUCTION!)
-- ============================================
-- Note: The hash below is for 'admin123' using bcrypt
-- You should generate a new hash for production
INSERT INTO admin_users (username, email, password_hash)
VALUES (
  'admin',
  'admin@databridge.com',
  '$2a$10$Tw0oKOH4uyUXVXO/924bNOTHQozlOGfQL6K8j/XfwGjgxjrKI693O'
)
ON CONFLICT (username) DO NOTHING;

-- ============================================
-- Sample Jobs Data (Optional - for testing)
-- ============================================
INSERT INTO jobs (title, department, location, type, description, requirements) VALUES
('Senior Data Engineer', 'Engineering', 'New York, NY', 'Full-time', 'We are looking for a Senior Data Engineer to design and implement scalable data pipelines. You will work with modern data stack including Apache Spark, Kafka, and cloud platforms.', 'Bachelor degree in CS or related field. 5+ years experience with data engineering. Strong SQL and Python skills.'),
('Cloud Solutions Architect', 'Engineering', 'San Francisco, CA', 'Full-time', 'Join our team to design and implement cloud-native solutions for enterprise clients. You will lead architectural decisions and mentor junior engineers.', 'AWS/Azure/GCP certifications. 7+ years experience. Strong communication skills.'),
('Business Intelligence Analyst', 'Analytics', 'Remote', 'Full-time', 'Drive data-driven decision making by creating insightful dashboards and reports. Work closely with stakeholders to understand business needs.', 'Proficiency in Tableau/Power BI. SQL expertise. 3+ years BI experience.'),
('Machine Learning Engineer', 'Data Science', 'Boston, MA', 'Full-time', 'Develop and deploy ML models to production. Work on cutting-edge AI projects including NLP and computer vision.', 'MS/PhD in ML or related field. Experience with PyTorch/TensorFlow. MLOps experience preferred.')
ON CONFLICT DO NOTHING;

-- ============================================
-- Verify tables created successfully
-- ============================================
-- SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';

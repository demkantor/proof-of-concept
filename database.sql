-- Create Database
CREATE DATABASE proof_of_concept;

-- CREATE TABLE
CREATE TABLE "tasks" (
    "id" SERIAL PRIMARY KEY,
    "task" VARCHAR(200) NOT NULL,
    "completed" BOOLEAN DEFAULT 'false',
    "date" TIMESTAMP DEFAULT now()
);
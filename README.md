# 🤖 AI Career Mentor

## 🚀 Live Demo
https://ai-career-mentor-4.onrender.com

AI Career Mentor is an AI-powered web application that helps students and job seekers make better career decisions.

It provides personalized career recommendations, skill-gap analysis, learning roadmaps, interview preparation, job recommendations, resume analysis, career chat, and a career dashboard.

---

## 🚀 Features

### 💬 AI Career Chat
Ask career-related questions and receive personalized AI guidance.

### 💼 Career Recommendation
Recommends suitable career roles based on:
- Skills
- Interests
- Education

### 🧠 Skill Gap Analyzer
Identifies missing skills required for the user's target job role.

### 🗺️ AI Learning Roadmap
Generates a step-by-step learning roadmap for the selected career.

### 🎯 Interview Preparation
Generates interview questions and preparation guidance for different job roles.

### 🔎 Job Recommendation
Provides job recommendations based on:
- Skills
- Target role
- Preferred location

### 📊 Career Dashboard
Displays:
- Skill Score
- Job Readiness
- Target Role
- AI Career Analysis

### 📄 Resume Analyzer
Allows users to upload a resume and receive AI-powered feedback.

### 🔐 User Authentication
Supports:
- User Registration
- User Login

### 👤 Career Profile
Users can save their:
- Name
- Education
- Skills
- Interests
- Target Role
- Preferred Location

### 📜 Chat History
Users can view and delete previous AI career conversations.

---

## 🛠️ Technology Stack

### Frontend
- HTML5
- CSS3
- JavaScript

### Backend
- Java
- Spring Boot
- REST API

### Database
- MongoDB

### AI
- Groq API

### Build Tool
- Maven

### Version Control
- Git
- GitHub

---

## 🏗️ System Architecture

```text
             ┌──────────────────────┐
             │       User           │
             └──────────┬───────────┘
                        │
                        ▼
             ┌──────────────────────┐
             │ Frontend             │
             │ HTML / CSS / JS      │
             └──────────┬───────────┘
                        │ REST API
                        ▼
             ┌──────────────────────┐
             │ Spring Boot Backend  │
             │ Java REST APIs       │
             └───────┬───────┬──────┘
                     │       │
             ┌───────▼───┐ ┌─▼────────────┐
             │ MongoDB   │ │ Groq AI API  │
             │ Database  │ │ AI Responses  │
             └───────────┘ └──────────────┘

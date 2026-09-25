# 🤖 AI Career Mentor

AI Career Mentor is an AI-powered career guidance platform designed to help students and fresh graduates make better career decisions.

The platform provides personalized career recommendations, skill-gap analysis, career roadmaps, interview preparation, job recommendations, and resume analysis through an interactive web application.

---

## 🌐 Live Demo

🚀 **Live Application:**  
https://ai-career-mentor-4.onrender.com

📂 **GitHub Repository:**  
https://github.com/sarudharshini-2006/ai-career-mentor

---

## 📌 Project Overview

Choosing the right career path can be difficult for students and fresh graduates because they may not know which skills to develop, which roles match their interests, or how to prepare for interviews.

AI Career Mentor provides an AI-based platform that helps users explore suitable career paths and prepare for their career journey.

The application combines a Spring Boot backend, MongoDB database, AI API integration, and a web-based frontend.

---

## ✨ Features

### 🔐 User Authentication

- User registration
- User login
- Email-based user identification
- User information stored in MongoDB

### 🤖 AI Career Assistance

- AI-powered career guidance
- Personalized career recommendations
- Career-related question answering
- AI-based suggestions based on user requirements

### 📊 Skill Gap Analysis

- Identifies skills required for career roles
- Helps users understand missing skills
- Provides guidance on skills to improve

### 🗺️ Career Roadmap

- Provides structured career learning paths
- Helps users understand what to learn next
- Guides users towards their target career

### 🎤 Interview Preparation

- Interview preparation assistance
- Career-related interview guidance
- AI-powered support for interview preparation

### 💼 Job Recommendations

- Provides job-related recommendations
- Helps users explore suitable career opportunities

### 📄 Resume Analysis

- Resume-related career guidance
- Helps identify areas that can be improved
- Provides AI-based career suggestions

---

## 🛠️ Tech Stack

### Frontend

- HTML
- CSS
- JavaScript

### Backend

- Java
- Spring Boot
- Spring Web
- Spring Data MongoDB

### Database

- MongoDB Atlas

### AI Integration

- Groq API

### Build Tool

- Maven

### Deployment

- Docker
- Render

---

## 🏗️ Application Architecture

```text
                    ┌─────────────────────┐
                    │       User          │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   Web Frontend      │
                    │ HTML/CSS/JavaScript │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   Spring Boot       │
                    │      Backend        │
                    └───────┬─────┬───────┘
                            │     │
                 ┌──────────┘     └──────────┐
                 ▼                           ▼
       ┌─────────────────┐          ┌─────────────────┐
       │  MongoDB Atlas  │          │    Groq API     │
       │     Database    │          │   AI Services   │
       └─────────────────┘          └─────────────────┘
                            │
                            ▼
                    ┌─────────────────────┐
                    │ Docker + Render     │
                    │    Deployment       │
                    └─────────────────────┘

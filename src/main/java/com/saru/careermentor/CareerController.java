package com.saru.careermentor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CareerController {

    @Autowired
    private GeminiService geminiService;


    // =========================
    // AI Career Chat
    // =========================
    @GetMapping("/career")
    public String getCareerAdvice(
            @RequestParam String question) {

        return geminiService.getAnswer(question);
    }


    // =========================
    // Interview Questions
    // =========================
    @GetMapping("/interview")
    public String generateInterviewQuestions(
            @RequestParam String role) {

        String prompt =
                "Generate 10 important interview questions for a " +
                role +
                ". Include technical and HR questions. " +
                "Give clear answers for each question.";

        return geminiService.getAnswer(prompt);
    }


    // =========================
    // Career Roadmap
    // =========================
    @GetMapping("/roadmap")
    public String generateRoadmap(
            @RequestParam String career) {

        String prompt =
                "Create a complete career roadmap for becoming a " +
                career +
                ". Include beginner to advanced learning steps, " +
                "important skills, technologies, projects and job preparation tips.";

        return geminiService.getAnswer(prompt);
    }


    // =========================
    // AI Career Recommendation
    // =========================
    @GetMapping("/recommendation")
    public String getCareerRecommendation(

            @RequestParam String skills,

            @RequestParam String interests,

            @RequestParam String education) {

        String prompt =
                "You are an expert AI Career Mentor. " +
                "Analyze the following student profile and give personalized career recommendations.\n\n" +

                "Skills: " + skills + "\n" +
                "Interests: " + interests + "\n" +
                "Education: " + education + "\n\n" +

                "Give the response in Markdown format with these sections:\n\n" +

                "## 1. Best Career Roles\n" +
                "Suggest top suitable career roles.\n\n" +

                "## 2. Why These Roles Match\n" +
                "Explain why the roles match the student's profile.\n\n" +

                "## 3. Skills to Improve\n" +
                "List important skills the student should learn.\n\n" +

                "## 4. Learning Roadmap\n" +
                "Give a step-by-step learning roadmap.\n\n" +

                "## 5. Suitable Job Opportunities\n" +
                "Suggest suitable entry-level job roles.\n\n" +

                "## 6. Final Recommendation\n" +
                "Give the best career recommendation.";

        return geminiService.getAnswer(prompt);
    }

}
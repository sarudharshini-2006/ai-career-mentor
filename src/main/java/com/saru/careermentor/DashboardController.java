package com.saru.careermentor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DashboardController {

    @Autowired
    private GeminiService geminiService;

    @GetMapping("/dashboard")
    public String getDashboard(
            @RequestParam String skills,
            @RequestParam String targetRole) {

        String prompt = """
                You are an AI Career Mentor.

                Analyze this student's career profile.

                Current Skills:
                %s

                Target Role:
                %s

                Generate a concise career dashboard analysis.

                Return exactly these sections:

                ## Skill Score
                Give an estimated skill score from 0 to 100 and explain briefly.

                ## Job Readiness
                Give an estimated job readiness percentage and explain briefly.

                ## Current Skills
                List the student's existing skills.

                ## Skills To Learn
                List the most important missing skills.

                ## Recommended Projects
                Suggest 3 projects suitable for the target role.

                ## Learning Priorities
                Give the top 5 things the student should learn next.

                ## Career Advice
                Give practical advice for getting the target job.

                Keep the response simple and suitable for a college student.
                Do not invent actual job openings.
                """.formatted(skills, targetRole);

        return geminiService.getAnswer(prompt);
    }
}
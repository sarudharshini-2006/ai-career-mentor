package com.saru.careermentor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CareerRecommendationController {

    @Autowired
    private GeminiService geminiService;

    @GetMapping("/career-recommendation")
    public String getRecommendation(
            @RequestParam String skills,
            @RequestParam String interests,
            @RequestParam String education) {

        String prompt = """
                You are an expert AI Career Mentor.

                Based on the following student information:

                Skills: %s
                Interests: %s
                Education: %s

                Give a personalized career recommendation.

                Include:

                ## Top 3 Recommended Career Roles

                For each role explain why it matches.

                ## Required Skills

                Mention skills the student should learn.

                ## Learning Roadmap

                Give a simple step-by-step roadmap.

                ## Career Advice

                Give practical advice for getting a job.

                Keep the answer clear, structured and suitable for a college student.
                """.formatted(skills, interests, education);

        return geminiService.getAnswer(prompt);
    }
}
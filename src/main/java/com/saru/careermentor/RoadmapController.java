package com.saru.careermentor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class RoadmapController {

    @Autowired
    private GeminiService geminiService;

    @GetMapping("/ai-roadmap")
    public String roadmap(@RequestParam String career) {

        String prompt = """
You are an AI Career Mentor.

Generate a detailed learning roadmap.

Career:
""" + career + """

Return:

1. Beginner Skills

2. Intermediate Skills

3. Advanced Skills

4. Projects

5. Certifications

6. Interview Preparation

7. Job Search Tips
""";

        return geminiService.getAnswer(prompt);
    }
}
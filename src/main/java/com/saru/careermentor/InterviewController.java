package com.saru.careermentor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class InterviewController {

    @Autowired
    private GeminiService geminiService;

    @GetMapping("/ai-interview")
    public String interview(@RequestParam String role) {

        String prompt = """
You are an interview expert.

Generate interview preparation for the role:

""" + role + """

Return in this format:

1. HR Interview Questions (5)

2. Technical Questions (5)

3. Coding Questions (3)

4. Model Answers

5. Interview Tips
""";

        return geminiService.getAnswer(prompt);
    }
}
package com.saru.careermentor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class LearningController {

    @Autowired
    private GeminiService geminiService;

    @GetMapping("/learning")
    public String learning(@RequestParam String topic) {

        String prompt = """
You are an AI Learning Mentor.

Create a learning guide for the following topic:

""" + topic + """

Return the answer in this format:

📚 Topic Overview

🛣 Step-by-Step Learning Path

💡 Important Concepts

💻 Practice Exercises

🛠 Recommended Projects

🎯 Interview Topics

⏳ Estimated Learning Time

Keep the explanation simple and suitable for a college student.
""";

        return geminiService.getAnswer(prompt);
    }
}
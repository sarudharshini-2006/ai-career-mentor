package com.saru.careermentor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SkillGapController {

    @Autowired
    private GeminiService geminiService;

    @GetMapping("/skill-gap")
    public String analyzeSkillGap(
            @RequestParam String skills,
            @RequestParam String targetRole) {

        String prompt = """
                You are an expert AI Career Mentor.

                Analyze the student's current skills
                and compare them with the requirements
                of the target job role.

                Current Skills:
                %s

                Target Role:
                %s

                Give the response in Markdown format.

                ## 1. Current Skill Analysis
                Explain the student's current skills.

                ## 2. Missing Skills
                List the important missing skills.

                ## 3. Skill Priority
                Divide missing skills into:
                - High Priority
                - Medium Priority
                - Low Priority

                ## 4. Technologies to Learn
                Mention important technologies and tools.

                ## 5. Recommended Projects
                Suggest 3 practical projects.

                ## 6. Learning Roadmap
                Give a step-by-step roadmap.

                ## 7. Job Readiness
                Give an estimated job-readiness percentage
                and explain the reason.

                ## 8. Final Advice
                Give practical advice for getting the target job.

                Keep the explanation simple and suitable
                for a college student.
                """.formatted(skills, targetRole);

        return geminiService.getAnswer(prompt);
    }
}
package com.saru.careermentor;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class JobRecommendationController {

    @Autowired
    private GeminiService geminiService;


    // =====================================================
    // AI JOB RECOMMENDATION
    // =====================================================

    @GetMapping("/job-recommendation")
    public String getJobRecommendations(

            @RequestParam String skills,

            @RequestParam String targetRole,

            @RequestParam String location) {


        // =================================================
        // AI PROMPT
        // =================================================

        String prompt = """
                You are an expert AI Career Mentor and Job Recommendation Assistant.

                Analyze the following student profile:

                Current Skills:
                %s

                Target Job Role:
                %s

                Preferred Location:
                %s


                Provide suitable job recommendations for a college student
                or fresher.

                Return the answer in this format:


                ## 🎯 Best Job Roles

                Suggest 5 suitable entry-level job roles.


                ## 💼 Why These Jobs Match

                Explain why each role matches the student's skills and target role.


                ## 🛠️ Skills Required

                List the important technical and soft skills required.


                ## 📚 Skills To Learn

                Mention the missing skills the student should learn.


                ## 🚀 Job Preparation Plan

                Give a simple step-by-step plan for getting these jobs.


                ## 📝 Resume Tips

                Give 3 useful resume tips for this target role.


                ## 🎤 Interview Preparation

                Mention important topics the student should prepare.


                ## ⭐ Final Recommendation

                Recommend the single best job role for the student.

                Important:
                - Keep the answer suitable for a fresher.
                - Do not invent specific company openings.
                - Do not claim that a particular job is currently available.
                - Keep the response clear and practical.
                """.formatted(
                        skills,
                        targetRole,
                        location
                );


        // =================================================
        // GET AI RESPONSE
        // =================================================

        String aiAnswer =
                geminiService.getAnswer(prompt);


        // =================================================
        // ENCODE SEARCH PARAMETERS
        // =================================================

        String searchQuery =
                URLEncoder.encode(
                        targetRole + " " + skills,
                        StandardCharsets.UTF_8
                );

        String encodedLocation =
                URLEncoder.encode(
                        location,
                        StandardCharsets.UTF_8
                );


        // =================================================
        // JOB SEARCH LINKS
        // =================================================

        String linkedinUrl =
                "https://www.linkedin.com/jobs/search/?keywords="
                + searchQuery
                + "&location="
                + encodedLocation;


        String indeedUrl =
                "https://www.indeed.com/jobs?q="
                + searchQuery
                + "&l="
                + encodedLocation;


        String naukriUrl =
                "https://www.naukri.com/"
                + targetRole
                    .toLowerCase()
                    .replace(" ", "-")
                + "-jobs";


        String internshalaUrl =
                "https://internshala.com/internships/"
                + targetRole
                    .toLowerCase()
                    .replace(" ", "-")
                + "-internship";


        // =================================================
        // FINAL RESPONSE
        // =================================================

        return aiAnswer

                + "\n\n---\n\n"

                + "## 🔎 Search Jobs\n\n"

                + "### 💼 LinkedIn Jobs\n"
                + "[Search LinkedIn Jobs]("
                + linkedinUrl
                + ")\n\n"

                + "### 🔍 Indeed Jobs\n"
                + "[Search Indeed Jobs]("
                + indeedUrl
                + ")\n\n"

                + "### 🏢 Naukri Jobs\n"
                + "[Search Naukri Jobs]("
                + naukriUrl
                + ")\n\n"

                + "### 🎓 Internshala\n"
                + "[Search Internships]("
                + internshalaUrl
                + ")\n\n"

                + "> 💡 Tip: Always verify the job details on the official job portal before applying.";
    }
}
package com.saru.careermentor;

import java.io.InputStream;

import org.apache.pdfbox.Loader;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class ResumeService {

    @Autowired
    private GeminiService geminiService;


    public String analyzeResume(
            MultipartFile file) throws Exception {

        String resumeText;


        // Extract text from PDF
        try (InputStream inputStream =
                     file.getInputStream()) {

            byte[] pdfBytes =
                    inputStream.readAllBytes();

            try (PDDocument document =
                         Loader.loadPDF(pdfBytes)) {

                PDFTextStripper stripper =
                        new PDFTextStripper();

                resumeText =
                        stripper.getText(document);
            }
        }


        if (resumeText == null ||
                resumeText.trim().isEmpty()) {

            return "❌ Could not extract text from this PDF.";
        }


        // AI Prompt
        String prompt = """

                You are an expert AI Resume Analyzer.

                Analyze the following student's resume.

                RESUME:

                %s


                Give the analysis in Markdown format.

                ## 1. Resume Score
                Give a score out of 100.

                ## 2. Resume Strengths
                Mention the strongest parts.

                ## 3. Missing Skills
                Identify important missing technical skills.

                ## 4. Skills to Learn
                Suggest skills that will improve employability.

                ## 5. Suitable Job Roles
                Suggest the top 5 suitable entry-level roles.

                ## 6. Project Suggestions
                Suggest projects that would strengthen the resume.

                ## 7. Resume Improvements
                Give practical improvements.

                ## 8. Final Career Advice
                Give concise career advice.

                Keep the answer suitable for a college student.
                """.formatted(resumeText);


        return geminiService.getAnswer(prompt);
    }
}
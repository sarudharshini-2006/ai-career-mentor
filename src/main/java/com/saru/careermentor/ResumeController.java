package com.saru.careermentor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
public class ResumeController {

    @Autowired
    private ResumeService resumeService;

    @PostMapping("/analyze-resume")
    public String analyzeResume(
            @RequestParam("file") MultipartFile file) {

        if (file == null || file.isEmpty()) {
            return "❌ Please upload a resume.";
        }

        if (!file.getOriginalFilename()
                .toLowerCase()
                .endsWith(".pdf")) {

            return "❌ Please upload a PDF file.";
        }

        try {
            return resumeService.analyzeResume(file);

        } catch (Exception e) {

            e.printStackTrace();

            return "❌ Resume analysis failed: "
                    + e.getMessage();
        }
    }
}
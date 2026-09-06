package com.saru.careermentor;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class GeminiService {

    @Value("${groq.api.key}")
    private String apiKey;

    @Autowired
    private ChatRepository chatRepository;

    private final RestTemplate restTemplate = new RestTemplate();


    public String getAnswer(String question) {

        String url = "https://api.groq.com/openai/v1/chat/completions";

        try {

            // =========================
            // HEADERS
            // =========================
            HttpHeaders headers = new HttpHeaders();

            headers.setContentType(MediaType.APPLICATION_JSON);

            headers.setBearerAuth(apiKey);


            // =========================
            // USER MESSAGE
            // =========================
            Map<String, String> message = new HashMap<>();

            message.put("role", "user");

            message.put("content", question);


            // =========================
            // REQUEST BODY
            // =========================
            Map<String, Object> requestBody = new HashMap<>();

            requestBody.put(
                    "model",
                    "openai/gpt-oss-20b"
            );

            requestBody.put(
                    "messages",
                    List.of(message)
            );

            requestBody.put(
                    "temperature",
                    0.7
            );

            requestBody.put(
                    "max_tokens",
                    1500
            );


            // =========================
            // CREATE HTTP REQUEST
            // =========================
            HttpEntity<Map<String, Object>> entity =
                    new HttpEntity<>(
                            requestBody,
                            headers
                    );


            // =========================
            // CALL GROQ API
            // =========================
            ResponseEntity<Map> response =
                    restTemplate.postForEntity(
                            url,
                            entity,
                            Map.class
                    );


            Map responseBody = response.getBody();


            // =========================
            // CHECK EMPTY RESPONSE
            // =========================
            if (responseBody == null) {

                return "❌ AI Error: Empty response received.";

            }


            // =========================
            // GET CHOICES
            // =========================
            List<Map<String, Object>> choices =
                    (List<Map<String, Object>>)
                            responseBody.get("choices");


            if (choices == null || choices.isEmpty()) {

                return "❌ AI Error: No answer generated.";

            }


            // =========================
            // GET FIRST RESPONSE
            // =========================
            Map<String, Object> firstChoice =
                    choices.get(0);


            Map<String, Object> responseMessage =
                    (Map<String, Object>)
                            firstChoice.get("message");


            String answer =
                    responseMessage
                            .get("content")
                            .toString();


            // =========================
            // SAVE CHAT TO MONGODB
            // =========================
            try {

                Chat chat =
                        new Chat(question, answer);

                chatRepository.save(chat);

                System.out.println(
                        "CHAT SAVED TO MONGODB"
                );

            } catch (Exception e) {

                System.out.println(
                        "MongoDB Error: "
                                + e.getMessage()
                );

            }


            // =========================
            // RETURN AI ANSWER
            // =========================
            return answer;


        } catch (Exception e) {

            System.out.println(
                    "GROQ API ERROR: "
                            + e.getMessage()
            );

            e.printStackTrace();

            return "❌ AI Error: "
                    + e.getMessage();

        }

    }

}
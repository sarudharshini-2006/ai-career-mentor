package com.saru.careermentor;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ChatController {

    @Autowired
    private ChatRepository chatRepository;


    // Get all chat history
    @GetMapping("/chat-history")
    public List<Chat> getChatHistory() {
        return chatRepository.findAll();
    }


    // Delete one chat using ID
    @DeleteMapping("/chat-history/{id}")
    public String deleteChat(@PathVariable String id) {
        chatRepository.deleteById(id);
        return "Chat deleted successfully";
    }


    // Delete all chat history
    @DeleteMapping("/chat-history")
    public String deleteAllChats() {

        chatRepository.deleteAll();

        return "All chat history deleted successfully";
    }

}
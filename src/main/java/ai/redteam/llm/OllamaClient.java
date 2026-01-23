package ai.redteam.llm;

import com.fasterxml.jackson.databind.ObjectMapper;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpClient.*;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;
import java.util.*;

public class OllamaClient implements LlmClient{
    private static final String OLLAMA_URL = "http://localhost:11434/api/chat";
    private static final String MODEL = "llama3.1:8b";

    private static final ObjectMapper mapper = new ObjectMapper();
    private final HttpClient client = HttpClient.newHttpClient();

    @Override
    public String generate(String systemPrompt, String userPrompt) throws Exception {
        Map<String, Object> payload = new HashMap<>();
        payload.put("model", MODEL);
        payload.put("stream", false);

        List<Map<String, String>> messages = new ArrayList<>();
        messages.add(Map.of("role", "system", "content", systemPrompt));
        messages.add(Map.of("role", "user", "content", userPrompt));

        payload.put("messages", messages);

        String jsonBody = mapper.writeValueAsString(payload);

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(OLLAMA_URL))
                .timeout(Duration.ofSeconds(120))
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(jsonBody))
                .build();

        HttpResponse<String> response =
                client.send(request, HttpResponse.BodyHandlers.ofString());

        if (response.statusCode() != 200) {
            throw new RuntimeException(
                    "Ollama error " + response.statusCode() + " : " + response.body()
            );
        }

        // Parse response properly
        Map<?, ?> root = mapper.readValue(response.body(), Map.class);
        Map<?, ?> message = (Map<?, ?>) root.get("message");

        return message.get("content").toString();
    }

    private String escape(String str){
        return str.replace("\\","\\\\").replace("\"","\\\"");
    }
}

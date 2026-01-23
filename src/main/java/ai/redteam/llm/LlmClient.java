package ai.redteam.llm;

public interface LlmClient {
    String generate(String systemPrompt, String userPrompt) throws Exception;
}

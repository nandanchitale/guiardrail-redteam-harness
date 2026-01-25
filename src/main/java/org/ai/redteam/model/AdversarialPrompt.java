package org.ai.redteam.model;

public class AdversarialPrompt {
    public String id;
    public String prompt;
    public String expected; // refusal | safe
    public String category;
}

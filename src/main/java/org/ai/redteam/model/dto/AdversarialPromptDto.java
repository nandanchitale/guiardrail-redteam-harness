package org.ai.redteam.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdversarialPromptDto {
    private String prompt;
    private String id;
    public String expected;
    private String category;
}
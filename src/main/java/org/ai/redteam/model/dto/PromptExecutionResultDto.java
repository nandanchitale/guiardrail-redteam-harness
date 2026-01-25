package org.ai.redteam.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.ai.redteam.eval.FailureType;

@Data
@AllArgsConstructor
public class PromptExecutionResultDto {
    private String testId;
    private String category;
    private FailureType result;
    private boolean refusalDetected;
}

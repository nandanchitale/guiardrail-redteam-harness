package org.ai.redteam.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.ai.redteam.eval.FailureType;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class IncidentDto {
    private String testId;
    private String category;
    private FailureType failureType;
    private boolean refusalDetected;
    private String rawOutput;
}

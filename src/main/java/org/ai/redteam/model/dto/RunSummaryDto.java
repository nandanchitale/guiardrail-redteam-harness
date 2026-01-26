package org.ai.redteam.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.ai.redteam.eval.FailureType;

import java.time.Instant;
import java.util.EnumMap;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RunSummaryDto {
    private Instant runAt;
    private int totalPrompts;
    private int expectedRefusals;
    private int expectedSafe;

    // count per FailureType (PASS, HARD_REFUSAL, etc.)
    private EnumMap<FailureType, Integer> counts;

    private double refusalSuccessRate;
    private double jailBreakRate;
    private double falsePositiveRate;

    // Only Failures (no Pass entries)
    private List<IncidentDto> incidents;
}

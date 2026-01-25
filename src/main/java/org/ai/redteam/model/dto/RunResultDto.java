package org.ai.redteam.model.dto;

import org.ai.redteam.eval.FailureType;

import java.time.Instant;
import java.util.EnumMap;
import java.util.List;

public class RunResultDto {
    private Instant runAt;
    private int totalTests;

    // count per FailureType (PASS, HARD_REFUSAL, etc.)
    private EnumMap<FailureType, Integer> counts;

    // Only Failures (no Pass entries)
    private List<IncidentDto> incidents;
}

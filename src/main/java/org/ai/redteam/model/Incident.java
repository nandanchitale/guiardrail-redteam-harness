package org.ai.redteam.model;

public class Incident {
    public String testId;
    public String expected;
    public String rawOutput;
    public boolean refusalDetected;

    public Incident(String testId, String expected, String rawOutput, boolean refusalDetected){
        this.testId = testId;
        this.expected = expected;
        this.rawOutput = rawOutput;
        this.refusalDetected = refusalDetected;
    }
}

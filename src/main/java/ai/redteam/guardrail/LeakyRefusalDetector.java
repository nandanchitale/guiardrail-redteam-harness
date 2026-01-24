package ai.redteam.guardrail;

public class LeakyRefusalDetector {
    public static boolean isLeadkyRefusal(String text) {
        return RefusalDetector.isRefusal(text)
                && LeakDetector.isLeaking(text);
    }
}

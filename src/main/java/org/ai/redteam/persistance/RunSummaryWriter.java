package org.ai.redteam.persistance;

import org.ai.redteam.common.Json;
import org.ai.redteam.model.dto.RunSummaryDto;

import java.nio.file.Files;
import java.nio.file.Path;

public class RunSummaryWriter {
    private static final String RUNS_DIR = "runs";

    public static void write(RunSummaryDto summary) {
        try {
            Files.createDirectories(Path.of(RUNS_DIR));

            String fileName = summary.getRunAt().toString().replace(":","-")+".json";
            Path filePath = Path.of(RUNS_DIR, fileName);

            Json.MAPPER.writerWithDefaultPrettyPrinter()
                    .writeValue(filePath.toFile(), summary);

            System.out.println("Run summary written to " + filePath);
        }
        catch (Exception e){
            throw new RuntimeException("Failed to persist run summary", e);
        }

    }
}

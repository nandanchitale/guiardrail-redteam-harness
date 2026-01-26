package org.ai.redteam.api.store;

import org.ai.redteam.common.Json;
import org.ai.redteam.model.dto.RunSummaryDto;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Stream;

public class RunStore {
    private static final Path RUNS_DIR = Path.of("runs");

    public static List<RunSummaryDto> loadAll(){
        if(!Files.exists(RUNS_DIR)) return List.of();

        try(Stream<Path> files = Files.list(RUNS_DIR)){
            return files
                    .filter(filename-> filename.toString().endsWith("json"))
                    .map(RunStore::read)
                    .sorted(Comparator.comparing(RunSummaryDto::getRunAt).reversed())
                    .toList();
        }
        catch (Exception e){
            throw new RuntimeException("Failed to load run summaries", e);
        }
    }

    public static RunSummaryDto read(Path path){
        try{
            return Json.MAPPER.readValue(
                    path.toFile(), RunSummaryDto.class
            );
        }
        catch (Exception e){
            throw new RuntimeException("Failed to read run file " + path, e);
        }
    }
}

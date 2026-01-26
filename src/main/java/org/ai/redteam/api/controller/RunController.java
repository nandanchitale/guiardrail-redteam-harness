package org.ai.redteam.api.controller;

import io.swagger.v3.oas.annotations.Operation;
import org.ai.redteam.api.store.RunStore;
import org.ai.redteam.model.dto.RunSummaryDto;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/runs")
public class RunController {
    @GetMapping
    @Operation(summary = "List all red-team runs (latest first)")
    public List<RunSummaryDto> listRuns(){
        return RunStore.loadAll();
    }
    
    @GetMapping("/{index}")
    public RunSummaryDto getRun(@PathVariable int index){
        List<RunSummaryDto> runs = RunStore.loadAll();
        if(index < 0 || index >= runs.size())
            throw new IllegalArgumentException("Invalid run index");
        return runs.get(index);
    }
}

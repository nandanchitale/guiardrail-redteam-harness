package org.ai.redteam.api.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;

public class OpenApiConfig {
    @Bean
    public OpenAPI redTeamOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Red-team guardrail harness API")
                        .description("API for inspecting LLM safety evaluation runs")
                        .version("1.0")
                );
    }
}

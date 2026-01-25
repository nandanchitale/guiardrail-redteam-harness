package org.ai.redteam.common;

import com.fasterxml.jackson.databind.ObjectMapper;

public class Json {
    public static final ObjectMapper MAPPER =  new ObjectMapper().findAndRegisterModules();

    private Json(){}
}

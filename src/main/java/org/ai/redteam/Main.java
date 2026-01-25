package org.ai.redteam;

import org.ai.redteam.runner.RedTeamRunner;

public class Main {

    public static void main(String[] args){

        RedTeamRunner runner = new RedTeamRunner();
        runner.execute();
    }
}
package com.sustech.groupup;

import org.springframework.batch.core.Job;
import org.springframework.batch.core.JobParametersBuilder;
import org.springframework.batch.core.launch.JobLauncher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BatchApplication implements CommandLineRunner {

    @Autowired
    private JobLauncher jobLauncher;

    @Autowired
    private Job job;

    public static void main(String[] args) {
        SpringApplication.run(BatchApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        jobLauncher.run(job, new JobParametersBuilder()
                .addLong("time", System.currentTimeMillis())
                .toJobParameters());
    }
}

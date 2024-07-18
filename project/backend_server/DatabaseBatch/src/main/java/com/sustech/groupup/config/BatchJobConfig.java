package com.sustech.groupup.config;

import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.configuration.annotation.EnableBatchProcessing;
import org.springframework.batch.core.configuration.annotation.JobBuilderFactory;
import org.springframework.batch.core.configuration.annotation.StepBuilderFactory;
import org.springframework.batch.core.launch.support.RunIdIncrementer;
import org.springframework.batch.item.ItemProcessor;
import org.springframework.batch.item.ItemReader;
import org.springframework.batch.item.ItemWriter;
import org.springframework.batch.item.database.JdbcCursorItemReader;
import org.springframework.batch.item.database.builder.JdbcCursorItemReaderBuilder;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;

import javax.sql.DataSource;

import com.sustech.groupup.dto.User;

@Configuration
@EnableBatchProcessing
public class BatchJobConfig {

    @Bean
    public Job importUserJob(JobBuilderFactory jobBuilderFactory, Step step1) {
        return jobBuilderFactory.get("importUserJob")
                .incrementer(new RunIdIncrementer())
                .flow(step1)
                .end()
                .build();
    }

    @Bean
    public Step step1(StepBuilderFactory stepBuilderFactory, ItemReader<User> reader,
                      ItemProcessor<User, User> processor, ItemWriter<User> writer) {
        return stepBuilderFactory.get("step1")
                .<User, User>chunk(10)
                .reader(reader)
                .processor(processor)
                .writer(writer)
                .build();
    }

    @Bean
    public JdbcCursorItemReader<User> reader(@Qualifier("postgresDataSource") DataSource dataSource) {
        return new JdbcCursorItemReaderBuilder<User>()
                .dataSource(dataSource)
                .name("userItemReader")
                .sql("SELECT id, name, email FROM users")
                .rowMapper(new BeanPropertyRowMapper<>(User.class))
                .build();
    }

    @Bean
    public ItemProcessor<User, User> processor() {
        return user -> user; // 可以在这里进行数据转换
    }

    @Bean
    public ItemWriter<User> writer(@Qualifier("redshiftJdbcTemplate") JdbcTemplate jdbcTemplate) {
        return items -> {
            for (User user : items) {
                jdbcTemplate.update("INSERT INTO users (id, name, email) VALUES (?, ?, ?)",
                        user.getId(), user.getName(), user.getEmail());
            }
        };
    }
}

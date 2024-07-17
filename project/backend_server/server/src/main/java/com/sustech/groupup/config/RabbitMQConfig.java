package com.sustech.groupup.config;

import org.springframework.amqp.core.Queue;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQConfig {

    @Bean
    public Queue vectorQueue() {
        return new Queue("vector_queue", false);
    }
}

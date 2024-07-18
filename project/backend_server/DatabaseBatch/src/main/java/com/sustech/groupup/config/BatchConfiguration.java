package com.sustech.groupup.config;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.JdbcTemplate;

import javax.sql.DataSource;

@Configuration
public class BatchConfiguration {

    @Bean(name = "postgresDataSource")
    public DataSource postgresDataSource() {
        return DataSourceBuilder.create()
                .url("jdbc:postgresql://localhost:5432/your_database")
                .username("your_username")
                .password("your_password")
                .build();
    }

    @Bean(name = "redshiftDataSource")
    public DataSource redshiftDataSource() {
        return DataSourceBuilder.create()
                .url("jdbc:redshift://your-redshift-cluster:5439/your_redshift_db")
                .username("your_redshift_username")
                .password("your_redshift_password")
                .build();
    }

    @Bean(name = "postgresJdbcTemplate")
    public JdbcTemplate postgresJdbcTemplate(@Qualifier("postgresDataSource") DataSource dataSource) {
        return new JdbcTemplate(dataSource);
    }

    @Bean(name = "redshiftJdbcTemplate")
    public JdbcTemplate redshiftJdbcTemplate(@Qualifier("redshiftDataSource") DataSource dataSource) {
        return new JdbcTemplate(dataSource);
    }
}

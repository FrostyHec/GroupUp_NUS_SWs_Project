package com.sustech.groupup.config;

import com.amazonaws.auth.AWSCredentialsProvider;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicSessionCredentials;
import com.amazonaws.auth.profile.ProfileCredentialsProvider;
import com.amazonaws.services.redshift.AmazonRedshift;
import com.amazonaws.services.redshift.AmazonRedshiftClientBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AwsConfig {

    @Bean
    public AWSCredentialsProvider awsCredentialsProvider() {
        String awsAccessKeyId = "YOUR_AWS_ACCESS_KEY_ID";
        String awsSecretKey = "YOUR_AWS_SECRET_KEY";
        String awsSessionToken = "YOUR_AWS_SESSION_TOKEN";

        BasicSessionCredentials sessionCredentials = new BasicSessionCredentials(
                awsAccessKeyId, awsSecretKey, awsSessionToken);

        return new AWSStaticCredentialsProvider(sessionCredentials);
    }

    @Bean
    public AmazonRedshift amazonRedshift(AWSCredentialsProvider awsCredentialsProvider) {
        return AmazonRedshiftClientBuilder.standard()
                .withCredentials(awsCredentialsProvider)
                .withRegion("YOUR_AWS_REGION")
                .build();
    }
}

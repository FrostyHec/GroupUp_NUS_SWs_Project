# Use an official Java runtime as a parent image
#FROM openjdk:21-slim
# 使用 Ubuntu 作为基础镜像
FROM ubuntu:20.04

# 安装 openjdk-21
RUN apt-get update && \
    apt-get install -y openjdk-21-jdk && \
    apt-get clean;

# 设置 JAVA_HOME 环境变量
ENV JAVA_HOME /usr/lib/jvm/java-21-openjdk-amd64
ENV PATH $JAVA_HOME/bin:$PATH

# 验证 Java 安装
RUN java -version

# Set the working directory in the container
WORKDIR /app

# Copy the executable JAR into the container
COPY ../serve/target/server-0.0.1-SNAPSHOT.jar /app/app.jar

EXPOSE 7073
# TODO ?????????

# Run the JAR file
ENTRYPOINT ["java", "-jar", "app.jar"]

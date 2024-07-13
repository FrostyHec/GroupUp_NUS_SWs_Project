# Use an official Java runtime as a parent image
FROM openjdk:21

# Set the working directory in the container
WORKDIR /app

# Copy the executable JAR into the container
COPY target/server-0.0.1-SNAPSHOT.jar /app/app.jar

EXPOSE 7076

# Run the JAR file
ENTRYPOINT ["java", "-jar", "app.jar"]

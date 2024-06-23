# Use an official Eclipse Temurin JDK runtime as a parent image
FROM eclipse-temurin:22-jdk-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the JAR file from the target/test-classes directory to the container
COPY target/test-classes/studentMS-0.0.1-SNAPSHOT.jar app.jar

# Run the JAR file
ENTRYPOINT ["java","-jar","/app/app.jar"]

# Expose port 8080
EXPOSE 8080

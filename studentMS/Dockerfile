# Use the official Java 11 image as the base image
FROM openjdk:11

# Set the working directory in the container
WORKDIR /app

# Copy the Maven settings file (if any)
COPY settings.xml /root/.m2/

# Copy the project's pom.xml file
COPY pom.xml /app/

# Download the project's dependencies
RUN mvn dependency:go-offline

# Copy the project's source code
COPY src /app/src

# Build the project's JAR file
RUN mvn package

# Expose the port on which your Spring Boot application will run
EXPOSE 8080

# Run the Spring Boot application
CMD ["java", "-jar", "/app/target/studentMS-0.0.1-SNAPSHOT.jar"]
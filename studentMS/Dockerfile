# Start with a base image that includes OpenJDK 17
FROM openjdk:17-jdk-slim AS build

# Install Maven manually
ENV MAVEN_VERSION 3.9.7
ENV MAVEN_HOME /usr/share/maven

RUN apt-get update && \
    apt-get install -y maven && \
    apt-get clean;

# Set the working directory in the container
WORKDIR /app

# Copy the pom.xml file to the container
COPY ./pom.xml .

# Download dependencies and plugins (warm-up Maven's cache)
RUN mvn dependency:go-offline

# Copy the entire project to the container
COPY . .

# Build the application
RUN mvn clean package

# Final stage for creating a smaller image
FROM openjdk:17-jre-slim

# Set the working directory in the container
WORKDIR /app

# Copy the built artifact from the build stage
COPY --from=build /app/target/studentMS-0.0.1-SNAPSHOT.jar ./app.jar

# Command to run the application
CMD ["java", "-jar", "app.jar"]

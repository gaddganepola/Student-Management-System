# Use Maven with OpenJDK 22
FROM maven:3.9.7-openjdk-22 AS build

# Set the working directory in the container
WORKDIR /app

# Copy the pom.xml and the entire source code to the container
COPY ./pom.xml .
COPY . .

# Download dependencies and plugins (warm-up Maven's cache)
RUN mvn dependency:go-offline

# Build the application
RUN mvn clean package

# Second stage for creating a smaller image
FROM openjdk:22-jre-slim

# Set the working directory in the container
WORKDIR /app

# Copy the built artifact from the build stage
COPY --from=build /app/target/studentMS-0.0.1-SNAPSHOT.jar ./app.jar

# Command to run the application
CMD ["java", "-jar", "app.jar"]

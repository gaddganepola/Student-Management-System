# Use an official Maven image with Java 17
FROM maven:3.9.7-openjdk-17 AS build

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

# Second stage for creating a smaller image
FROM openjdk:17-jdk-alpine3.14

# Set the working directory in the container
WORKDIR /app

# Copy the built artifact from the build stage
COPY --from=build /app/target/studentMS-0.0.1-SNAPSHOT.jar ./app.jar

# Command to run the application
CMD ["java", "-jar", "app.jar"]

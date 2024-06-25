# Use an official Maven image with Java 22
FROM maven:3.8.6-jdk-22 AS build

# Set the working directory in the container
WORKDIR /app

# Copy the pom.xml and src directory to the container
COPY pom.xml .
COPY src ./src

# Build the application
RUN mvn clean install

# Second stage for creating the minimal runtime image
FROM openjdk:17-jdk-alpine3.14
WORKDIR /app
COPY --from=build /app/target/studentMS-0.0.1-SNAPSHOT.jar /app/studentMS.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "studentMS.jar"]

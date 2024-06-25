# Start with a base image that includes OpenJDK 17
FROM openjdk:17-jdk-alpine3.14 AS build

# Install Maven manually
ENV MAVEN_VERSION 3.8.4
ENV MAVEN_HOME /usr/share/maven

RUN wget -q "https://archive.apache.org/dist/maven/maven-3/${MAVEN_VERSION}/binaries/apache-maven-${MAVEN_VERSION}-bin.tar.gz" -O /tmp/apache-maven.tar.gz \
    && mkdir -p $MAVEN_HOME \
    && tar -xzf /tmp/apache-maven.tar.gz -C $MAVEN_HOME --strip-components=1 \
    && ln -s $MAVEN_HOME/bin/mvn /usr/bin/mvn \
    && rm -f /tmp/apache-maven.tar.gz

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
FROM openjdk:17-jdk-alpine3.14

# Set the working directory in the container
WORKDIR /app

# Copy the built artifact from the build stage
COPY --from=build /app/target/studentMS-0.0.1-SNAPSHOT.jar ./app.jar

# Command to run the application
CMD ["java", "-jar", "app.jar"]

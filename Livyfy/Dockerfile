# -------- BUILD STAGE --------
FROM maven:3.9-eclipse-temurin-17 AS build

WORKDIR /app

# Copy everything
COPY . .

# Build jar inside Docker
RUN mvn clean package -DskipTests

# -------- RUN STAGE --------
FROM eclipse-temurin:17-jdk-alpine

WORKDIR /app

# Copy jar from build stage
COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java","-jar","/app/app.jar"]
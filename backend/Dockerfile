FROM openjdk:11 AS builder

COPY gradlew .
COPY gradle gradle
COPY build.gradle .
COPY settings.gradle .
COPY src src

RUN ./gradlew init
RUN chmod +x ./gradlew
RUN chmod +x ./gradle

RUN ./gradlew clean
RUN ./gradlew build

FROM openjdk:11
ARG JAR_FILE=build/libs/.jar
COPY --from=builder build/libs/*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java","-jar","/app.jar"]
FROM openjdk:11-jdk

RUN chmod +x ./gradlew
RUN ./gradlew bootJar

ARG JAR_FILE=build/libs/*.jar
COPY ${JAR_FILE} app.jar

ENV TZ=Asia/Seoul
RUN apt-get install -y tzdata

EXPOSE 8080
ENTRYPOINT ["java","-jar","app.jar"]
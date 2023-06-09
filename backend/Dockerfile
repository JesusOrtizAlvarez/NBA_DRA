FROM openjdk:17 as build
WORKDIR /workspace/app

COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .
COPY src src
COPY resultado.txt /app/resultado.txt

RUN sh mvnw install -DskipTests

EXPOSE 8081

CMD ["java", "-jar", "target/demo-0.0.1-SNAPSHOT.jar"]
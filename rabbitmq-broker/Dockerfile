FROM amazoncorretto:21-alpine3.17-jdk
WORKDIR /rabbitmq-broker
# Install Maven
RUN apk --no-cache add maven
COPY . .
RUN mvn clean install
EXPOSE 5672
EXPOSE 3307
EXPOSE 3306
CMD mvn spring-boot:run
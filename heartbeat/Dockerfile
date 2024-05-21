# Dockerfile for Heartbeat
ARG STACK_VERSION
FROM docker.elastic.co/beats/heartbeat:${STACK_VERSION}
USER root
COPY heartbeat.yml /usr/share/heartbeat/heartbeat.yml
CMD ["sh", "-c", "chmod 600 /usr/share/heartbeat/heartbeat.yml && heartbeat -e -c /usr/share/heartbeat/heartbeat.yml"]


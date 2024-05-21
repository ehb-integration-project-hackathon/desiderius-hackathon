# Dockerfile for Metricbeat
ARG STACK_VERSION
FROM docker.elastic.co/beats/metricbeat:${STACK_VERSION}
USER root
COPY metricbeat.yml /usr/share/metricbeat/metricbeat.yml
CMD ["sh", "-c", "chmod 600 /usr/share/metricbeat/metricbeat.yml && metricbeat -e -c /usr/share/metricbeat/metricbeat.yml"]

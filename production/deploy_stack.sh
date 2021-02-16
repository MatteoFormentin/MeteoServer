#!/bin/bash
# First create .env file in the same folder
# By default docker stack does not support .env -> preprocess with docker-compose
docker stack deploy --with-registry-auth -c <(docker-compose config)  MeteoServer
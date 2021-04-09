#!/bin/bash
# First create .env file in the same folder
# By default docker stack does not support .env -> preprocess with docker-compose
source .env
docker stack deploy --with-registry-auth -c <(docker-compose config)  MeteoServer
docker service scale MeteoServer_app=3
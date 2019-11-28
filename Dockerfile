FROM keymetrics/pm2:latest-alpine

# Bundle APP files
COPY src src/
COPY package.json .
COPY pm2.json .

# Install app dependencies
ENV NPM_CONFIG_LOGLEVEL warn
RUN npm install --production


EXPOSE 3000

CMD [ "pm2-runtime", "start", "pm2.json" ]

#COPY -> choose what to import in the container and where to. The working directory of building machine 
# is the dockerfile one while the image side one is the linux user of the image itself (depends on the base image)
#RUN -> command to run when building image
#CMD -> command to run when starting builded image (to make node.js app start)


#Dockerfile -> provide the command to build a single container, including which files to include and 
#how to run the application

#Docker-compose.yaml -> Explain ho the infgrastructure of containers is build, including how to configure them
#by passing parameters (ENV) to eadh container to make it work.

#ENV can be omitted in dockerfile if no default value are needed. They can be injected by node-compose
#or passed either by .env file when launching with  "docker run --env-file=env_file_name image_name"
FROM node:15
COPY ./src /MeteoServer
WORKDIR /MeteoServer
RUN npm install
EXPOSE 3000
CMD ["node", "app.js"]
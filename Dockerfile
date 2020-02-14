# base alpine image with node v12.14.1
FROM node:12.14.1-alpine

# ENV NODE_ENV production
WORKDIR /src
COPY . /src

# ENV NODE_ENV production
COPY package.json /src/package.json

# RUN npm install 
RUN npm install && cd client && npm install
RUN npm run build:prod

EXPOSE 3334

# Run the Web Server
ENTRYPOINT ["npm", "start"]
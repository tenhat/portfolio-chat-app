FROM node:16.19.0

WORKDIR /app

EXPOSE 3000

COPY package.json package-lock.json ./

RUN npm install --silent

# node_modulesの所有権を変更
RUN mkdir -p node_modules/.cache && chmod -R 777 node_modules/.cache

COPY . ./

CMD [ "npm", "start" ]
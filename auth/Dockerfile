FROM node:alpine

WORKDIR /app
COPY package.json .
# only=pod means do not push those npm i --save-dev packages
RUN npm install --only=prod
COPY . .

CMD ["npm", "start"]
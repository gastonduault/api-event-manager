FROM node:20-alpine

WORKDIR /code
COPY package.json /code/package.json
COPY package-lock.json /code/package-lock.json

RUN npm install

COPY . /code

RUN npm run setup_prisma
CMD ["npm", "run", "start"]

EXPOSE 3000
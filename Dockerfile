FROM node:20-alpine

RUN mkdir code
WORKDIR /code

COPY . .

RUN npm install

CMD ["sh", "-c", "npm run setup_prisma && exec npm start"]

EXPOSE 3000
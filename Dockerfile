FROM node:20-alpine

RUN mkdir code
WORKDIR /code

COPY . .

RUN npm install
RUN apk add --no-cache python3 make g++


CMD ["sh", "-c", "npm run setup_prisma && exec npm run start"]

EXPOSE 3000
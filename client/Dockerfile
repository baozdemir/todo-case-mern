FROM node:10.13.0

ENV NODE_ENV development

ENV PORT 7100

WORKDIR /usr/src/app/actual

COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]

RUN npm install

COPY . .

EXPOSE 7100

CMD npm run start
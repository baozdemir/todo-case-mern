FROM node:10.13.0

ENV NODE_ENV production

ENV PORT 7101

WORKDIR /usr/src/app/actual

COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]

RUN npm install

COPY . .

EXPOSE 7101

RUN npm install -g pm2

CMD ["pm2", "start", "process.yml", "--no-daemon", "--env", "production"]
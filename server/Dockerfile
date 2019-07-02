FROM node

ENV NODE_ENV development

ENV PORT 7101

WORKDIR /usr/src/app

COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]

RUN npm install 

COPY . .

EXPOSE 7101

CMD ["npm", "run", "dev"]
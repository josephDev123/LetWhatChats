FROM node:23-alpine3.20
WORKDIR /src
COPY package*.json .
RUN npm i
COPY . .
RUN  npm run build
EXPOSE 4173
CMD ["npm", "run", "preview", "--", "--host"]

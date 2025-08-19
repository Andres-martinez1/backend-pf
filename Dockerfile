FROM node:22.17.0-alpine3.21 
WORKDIR /app/
COPY package.json .
RUN npm install
COPY . .
RUN npm run build
ENTRYPOINT ["sh", "-c", "npx typeorm migration:run -d dist/data-source.js && exec \"$@\""]
CMD ["npm", "run", "start:prod"]
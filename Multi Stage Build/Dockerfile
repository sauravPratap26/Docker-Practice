FROM node:24.16-alpine as base

#Stage 1
FROM base as builder
WORKDIR /app/build/

COPY package*json .
COPY tsconfig.json .

RUN npm install

COPY src/ src/

RUN npm run build

#Stage 2
FROM base as runner
WORKDIR /app/

COPY --from=builder /app/build/dist dist/
COPY --from=builder /app/build/package*json .

RUN npm install --omit=dev

CMD [ "npm","start" ]
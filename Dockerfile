FROM node:16 as builder
ENV NODE_ENV=development
WORKDIR /home/app
COPY . .
RUN yarn install && yarn build

FROM nginx:latest
COPY --from=builder /home/app/dist /usr/share/nginx/html
EXPOSE 80
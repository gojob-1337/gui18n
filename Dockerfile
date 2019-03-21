FROM node AS build

ENV NODE_ENV="production"
ENV REDIRECT_URL="REDIRECT_URL"
ENV CLIENT_ID="CLIENT_ID"

WORKDIR /app

COPY package.json /app/package.json
COPY yarn.lock /app/yarn.lock

RUN yarn

ADD . /app

RUN yarn parcel build src/index.html

FROM nginx:stable

COPY --from=build /app/dist/ /var/www
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

CMD echo "Replacing REDIRECT_URL with ${REDIRECT_URL} and CLIENT_ID with ${CLIENT_ID}" && sed -i "s|REDIRECT_URL|${REDIRECT_URL}|g" var/www/*.js &&  sed -i "s|CLIENT_ID|${CLIENT_ID}|g" var/www/*.js && nginx -g 'daemon off;'

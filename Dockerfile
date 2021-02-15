FROM node:14

# Create app diractory
ENV NODEWORKINGDIR /usr/local/app
RUN mkdir -p "$NODEWORKINGDIR"

WORKDIR /usr/local/app/

COPY package.json yarn.lock /usr/local/app/

RUN yarn

COPY . /usr/local/app/
RUN yarn build

EXPOSE 3000
CMD ["npm", "start", "server"]

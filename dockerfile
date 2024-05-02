from node:20-alpine

workdir /app

COPY package*.json ./

RUN npm install

COPY . .

ENV API_URL  https://newsapi.org/v2/top-headlines?country=us
ENV API_KEY  &apiKey=2babd3a1b3624291b69ed99e80d1d819

ENV GUARDIAN_API https://newsdata.io/api/1/news?
ENV GUARDIAN_API_KEY apikey=pub_4308727ef6e1fea2cc1da250d6e6547c328d1

ENV NYTIMES_API https://api.nytimes.com/svc/topstories/v2/home.json?
ENV NYTIMES_API_KEY api-key=yZlid7r7Ye0lGRQaS00VEJ02Eis426z0

EXPOSE 3000

CMD [ "npm", "run","start"]
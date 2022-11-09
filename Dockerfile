# Ver: https://www.koyeb.com/tutorials/deploy-a-web-scraper-using-puppeteer-node-and-docker

# Crear imagen
#  docker build -t "scraper:lastest" .

# Crear contenedor
# docker run -dti --name "scraper" -p 3030:3030 "scraper:lastest"

# Ver logs
#  docker logs -f "scraper"

# Conectar a contenedor
# docker exec -it cl8ukecnc0002mqbme0oy9ike /bin/bash

# https://stackoverflow.com/questions/71452265/how-to-run-puppeteer-on-a-docker-container-on-a-macos-apple-silicon-m1-arm64-hos


FROM node:16

RUN apt-get update \
 && apt-get install -y chromium \
    fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst fonts-freefont-ttf libxss1 \
    --no-install-recommends	

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true
ENV PUPPETEER_EXECUTABLE_PATH /usr/bin/chromium

WORKDIR /app

COPY . /app

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]
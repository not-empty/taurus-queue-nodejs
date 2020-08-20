FROM ubuntu:bionic

COPY . /usr/src
COPY ./docker/prod/node-ubuntu-linux-image/por.traineddata /usr/share/tesseract-ocr/4.00/tessdata/por.traineddata

RUN apt-get update && \
    apt-get install wget \
        imagemagick \
        curl \
        tesseract-ocr \
        ghostscript -y

COPY ./docker/prod/node-ubuntu-linux-image/policy.xml /etc/ImageMagick-6/policy.xml

RUN apt-get install curl -y && \
    curl -sL https://deb.nodesource.com/setup_8.x | bash

RUN apt-get install nodejs -y

WORKDIR /usr/src

RUN npm install

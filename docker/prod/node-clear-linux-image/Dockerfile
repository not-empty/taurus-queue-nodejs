FROM leosarli/node-clear-linux

COPY . /usr/src
COPY ./docker/prod/node-clear-linux-image/por.traineddata /usr/share/tessdata/por.traineddata

RUN swupd bundle-add tesseract \
        ImageMagick \
        ghostscript

WORKDIR /usr/src

RUN npm install

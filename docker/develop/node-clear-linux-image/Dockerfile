FROM leosarli/node-clear-linux

COPY ./por.traineddata /usr/share/tessdata/por.traineddata

RUN swupd bundle-add tesseract \
        ImageMagick \
        ghostscript

WORKDIR /usr/src

RUN npm install

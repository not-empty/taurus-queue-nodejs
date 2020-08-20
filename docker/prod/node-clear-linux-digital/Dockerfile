FROM leosarli/node-clear-linux

COPY . /usr/src
COPY ./docker/prod/node-clear-linux-digital/unrtf-0.21.10.tar.xz /usr/share/unrtf-0.21.10.tar.xz

RUN swupd bundle-add c-basic

RUN cd /usr/share && \
        tar -xf unrtf-0.21.10.tar.xz && \
        cd unrtf-0.21.10 && \
        ./configure && \
        make && \
        make install && \
        cd .. && \
        rm -rf unrtf-0.21.10

RUN swupd bundle-remove c-basic

WORKDIR /usr/src

RUN npm install

# Taurus Queue

[![Latest Version](https://img.shields.io/github/v/release/kiwfy/taurus-queue.svg?style=flat-square)](https://github.com/kiwfy/taurus-queue/releases)
[![Build Status](https://img.shields.io/github/workflow/status/kiwfy/taurus-queue/CI?label=ci%20build&style=flat-square)](https://github.com/kiwfy/taurus-queue/actions?query=workflow%3ACI)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

Simple Node.js App to manage queues on redis based on Bull

### Installation

Requires [NodeJs](https://nodejs.org/en/download/).

Run [npm](https://www.npmjs.com/get-npm) to install all dependencies.

```sh
npm install
```

### Run Queue

Requires [Redis](https://redis.io/).

Use local or start with [Docker](https://docs.docker.com/get-docker/) using compose tool.

```sh
docker-compose up
```

Create queue listener

```sh
node queue.js test
```

Create queue listener in debugger mode

```sh
node queue.js test 1
```

Create cluster with 2 queues listeners

```sh
node cluster-queue.js test 2
```


Create cluster with 2 queues listeners in debugger mode

```sh
node cluster-queue.js test 2 1
```

### Sample Producer

it's a good idea to look in the sample folder to understand how sending jobs to queue works.

```sh
node example/producer.php
```

Or using multi producer to put 60 registry in the queue, for example:

```sh
node example/multi-producer.php 60
```

### Development

Want to contribute? Great!

The project using a simple code.
Make a change in your file and be careful with your updates!
**Any new code will only be accepted with all viladations.**

To ensure that the entire project is fine:

Run all validations

```sh
$ npm run check
```

**Kiwfy - Open your code, open your mind!**

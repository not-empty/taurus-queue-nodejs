# Taurus Queue

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

## Overview

Taurus Queue offers a comprehensive queue ecosystem, simplifying the creation, execution, management, and monitoring of scalable and highly available queues. Leveraging the robust foundation of the [Bull Project](https://github.com/OptimalBits/bull), Taurus Queue eliminates the intricacies of queue coding, allowing you to concentrate solely on your specific actions and rules, thus optimizing your time. It features a dedicated interface for efficient queue management and monitoring.

Groups and queues list
![Taurus Manager Queue list](https://github.com/not-empty/taurus-manager-vue/blob/master/screenshot1.png)

Queue details
![Taurus Manager Queue list](https://github.com/not-empty/taurus-manager-vue/blob/master/screenshot2.png)

Monitor Screen (Monitoring only unhealth queues with autorefresh)
![Taurus Manager Queue list](https://github.com/not-empty/taurus-manager-vue/blob/master/screenshot3.png)

## How the Queue Ecosystem Operates

### Setup and Job Publishing
1. Starting in this repository to create and run your first queue.
2. Publish jobs to your queues using our publishers, compatible with multiple programming languages:
   - [PHP Taurus Queue Publisher](https://github.com/not-empty/taurus-publisher-php-lib)
   - [Go Bull Publisher](https://github.com/not-empty/taurus-publisher-golang)
   - Use [Taurus Manager](https://github.com/not-empty/taurus-manager-vue) interface to create new job to an existent file
   - Node.js (native support with examples included in this project)
   - Python (Currently in development)

### Queue Management with Taurus Manager
3. Utilize [Taurus Manager](https://github.com/not-empty/taurus-manager-vue) for:
   - Pausing/unpausing, adding/removing jobs.
   - Deleting, retrying, debuggin, viewing error logs and much more.
   - Managing user permissions.
   - Overseeing your queues.

### Real-Time Monitoring
4. Implement [Taurus Monitoring](https://github.com/not-empty/taurus-monitoring) for real-time graphical insights of your entire ecosystem, integrating with [Grafana](https://grafana.com) and [Prometheus](https://prometheus.io):
   - Queue Length
   - Job Duration
   - Queue States
   - Failures by Queue
   - Total Jobs Completed (All-Time/Periodic)
   - Sum of Completed Jobs (All-Time/Periodic)


### Installation

[Release 1.0.0](https://github.com/not-empty/taurus-queue-nodejs/releases/tag/1.0.0) Requires [NodeJs](https://nodejs.org) 20.x

When running Docker your queue will automatically be running and you just need to include your business rules.
:)

```sh
docker-compose up
```
### Setting Your Own Queue

You can use our `default-business.js` located in `business` folder and include your rules / actions inside the try block

```js
...
try {
...
      // your actions and rules here
...
} catch (error) {
...
```

Or you can create your own business (maybe multiple ones in same project, and even push from one queue to another one).
For do that:

1 - Copy our `default-business.js` located in `business`, giving your name, in this sample we'll use `myown-business.js`;

2 - Change the name of the class on the top and the bottom of the file
From this:
```js
...
const BaseBusiness = require('./base-business');

/**
 * Example bussines job processor
 */
class MyOwnBusiness extends BaseBusiness { // changed from DefaultBusiness
...

module.exports = MyOwnBusiness; // changed from DefaultBusiness
```

3 - Include your rules / actions inside the try block
```js
...
try {
...
      // your actions and rules here
...
} catch (error) {
...
```

4 - Last but not least declare your business in the `constructor.js` file inside the `config` folder
```js
const DefaultBusiness = require('../business/default-business');
const MyOwnBusiness = require('../business/myown-business'); // Added

module.exports = {
  'default': DefaultBusiness,
  'myown': MyOwnBusiness, // Added
};
```
### Running Your Queue Worker

Requires [Redis](https://redis.io/). 

You can start with [Docker](https://docs.docker.com/get-docker/) using compose tool.

If you want to run the `default` queue just run the docker

```sh
docker-compose up
```

You can now run your queue worker. (if you want to, just change the ./ops/docker/dev/run.sh to your new business, changing the "default" word for your queue name, in this case "myown") like this:

```bash
#!/bin/sh

npm i
npm run dev myown 1
```

You can enter in container e run a queue worker by yourself passing your queue name and the debug mode (1 or 0)

```sh
docker exec -it taurus-queue bash
```

Running a queue worker in debug mode (in nodemon to update service when code changes)
```sh
npm run dev default 1
```

Running a queue worker in debug mode
```sh
npm start default 1
```

With the debug mode on, your queue will generate outputs from the `log.debug` command, make your development and debug easer.
The `log.show` command always have output, so use carefully

You can also run a cluster with multiples queue workers, in this case we running 5 workers.
* if you choose to do that, take care of your resources like Memory and CPU, it can be very, very heavy depends on the number of works and the operations of your business.

Running 5 queue workers in debug mode (in nodemon to update service when code changes)
```sh
npm dev-cluster default 5 1
```

Running 5 queue workers in debug mode
```sh
npm start-cluster default 5
```

### Pushing Jobs Itens On Your Queue

Now that you have your workers running, it's time to push itens to your queue.
You can do that by running the `producer.js` or the `multi-producer.js` files in the example `folder`.
As the name sujests, the `producer.js` send one job to the queue and the `multi-producer.js` send multiples.

In `producer.js` you can pass as parameter the name of the queue, if you not inform the `default` queue will be used.

You can also pass a JSON with your data. IF you not inform the JSON a default test data will be used.

If you want to run `producer.js` in the docker:

```sh
docker exec taurus-queue node sample/producer.js default '{"data":"mydata"}'
```

If you inside the container or want to run locally:
```sh
node sample/producer.js default '{"data":"mydata"}'
```

In `multi-producer.js` you pass as parameter the name of the queue and the number of jobs.

If you not inform the name, the `default`queue will be used.

If you not inform the number of jobs it will use 2.

You can also pass a JSON with your data. IF you not inform the JSON a default test data will be used.

If you want to put 60 jobs on the default queue using docker:

```sh
docker exec taurus-queue node sample/multi-producer.js default 60 '{"data":"mydata"}'
```

If you inside the container or want to run locally:
```sh
node sample/multi-producer.js default 60 '{"data":"mydata"}'
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

**Not Empty Foundation - Free codes, full minds**

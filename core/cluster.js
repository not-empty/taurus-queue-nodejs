const cluster = require('cluster');
const ParamsCluster = require('./params-cluster');

class Cluster {
  constructor() {
    const params = new ParamsCluster();
    
    this.cluster = cluster;
    this.workersNumber = params.workersNumber;
  }

  get workerId() {
    const { worker } = this.cluster;

    return worker ? worker.id : 1;
  }

  shouldStart() {
    return cluster.isMaster && this.workersNumber > 1;
  }

  start() {
    for (let i = 0; i < this.workersNumber; i++) {
      cluster.fork();
    }
  }
}

module.exports = Cluster;
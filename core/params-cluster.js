class ParamsCluster {
  constructor() {
    const args = process.argv.slice(2);
    this.queueName = String(args[0]) || '';
    this.workersNumber = Number(args[1]) || 1;
    this.debugMode = Number(args[2]) || 0;

    if (this.debugMode !== 1) {
      this.debugMode = 0;
    }
  }
}
module.exports = ParamsCluster;

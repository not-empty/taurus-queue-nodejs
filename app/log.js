class Log {
  constructor(dateTime, colors, debugMode) {
    this.date = dateTime;
    this.colors = colors;
    this.debugMode = debugMode;
  }

  show(color, message) {
    console.log(
        this.colors[color],
        `${this.date.getDate()} - ${message}`,
    );
    return true;
  }

  debug(content) {
    if (this.debugMode !== 0) {
      console.log(
          content,
      );
      return true;
    }
    return false;
  }
}
module.exports = Log;

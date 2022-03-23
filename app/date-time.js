class DateTime {
  alwaysTwoDigits(number) {
    let result = number;
    if (result < 10) {
      result = `0${result}`;
    }
    return String(result);
  }

  getFullYear(date = null) {
    let currentDate = new Date();
    if (date !== null) {
      currentDate = new Date(date);
    }
    return currentDate.getFullYear();
  }

  getMonth(date = null) {
    let currentDate = new Date();
    if (date !== null) {
      currentDate = new Date(date);
    }
    const month = currentDate.getMonth(date) + 1;
    return this.alwaysTwoDigits(month);
  }

  getDay(date = null) {
    let currentDate = new Date();
    if (date !== null) {
      currentDate = new Date(date);
    }
    const day = currentDate.getDate(date);
    return this.alwaysTwoDigits(day);
  }

  getHours(date = null) {
    let currentDate = new Date();
    if (date !== null) {
      currentDate = new Date(date);
    }
    const hours = currentDate.getHours(date);
    return this.alwaysTwoDigits(hours);
  }

  getMinutes(date = null) {
    let currentDate = new Date();
    if (date !== null) {
      currentDate = new Date(date);
    }
    const mins = currentDate.getMinutes(date);
    return this.alwaysTwoDigits(mins);
  }

  getSeconds(date = null) {
    let currentDate = new Date();
    if (date !== null) {
      currentDate = new Date(date);
    }
    const secs = currentDate.getSeconds(date);
    return this.alwaysTwoDigits(secs);
  }

  getDateTimezone(date = null, timeZone = 'Universal') {
    if (date === null) {
      date = new Date().toLocaleString('en-US', {timeZone});
    }
    const year = this.getFullYear(date);
    const month = this.getMonth(date);
    const day = this.getDay(date);
    const hours = this.getHours(date);
    const mins = this.getMinutes(date);
    const secs = this.getSeconds(date);
    return `${year}-${month}-${day} ${hours}:${mins}:${secs}`;
  }

  getDateClear(date = null) {
    const year = this.getFullYear(date);
    const month = this.getMonth(date);
    const day = this.getDay(date);
    const hours = this.getHours(date);
    const mins = this.getMinutes(date);
    const secs = this.getSeconds(date);
    return `${year}-${month}-${day} ${hours}:${mins}:${secs}`;
  }

  getDate(date = null) {
    return `[${this.getDateClear(date)}]`;
  }
}
module.exports = DateTime;

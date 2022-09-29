function secondsToMinutes(seconds) {
    return {
      minute: Math.floor(seconds / 60),
      second: seconds % 60 
    };
  }

export default secondsToMinutes;

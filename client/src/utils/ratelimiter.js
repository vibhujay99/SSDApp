const RateLimiter = (handler, limit, interval) => {
    let count = 0;
    let lastReset = Date.now();
  
    return async function (...args) {
      const now = Date.now();
      if (now - lastReset > interval) {
        count = 0;
        lastReset = now;
      }
  
      if (count >= limit) {
        throw new Error('Rate limit exceeded');
      }
  
      count++;
      return handler(...args);
    };
  }

export default RateLimiter
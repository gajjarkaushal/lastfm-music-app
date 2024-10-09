// lib/rateLimiter.js
let requestsQueue = [];
let isRequesting = false;

export const rateLimit = (maxRequests, interval) => {
    return new Promise((resolve, reject) => {
        const request = () => {
            if (requestsQueue.length < maxRequests) {
                requestsQueue.push(resolve);
                setTimeout(() => {
                    requestsQueue.shift();
                    resolve();
                }, interval);
            } else {
                setTimeout(request, 50); // Check again in 50ms
            }
        };
        request();
    });
};

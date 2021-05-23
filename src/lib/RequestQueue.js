/**
 * Get an unique ID
 */
const getUniqueId = function(){
    const random = Math.round(Math.random() * 1000); // three random numbers
    const timestamp = Date.now();
    return Number(timestamp + '' + random);
}

/**
 * Your mission:
 * Create and return a request queue with the following methods.
 * Carefully read the description of each method.
 */
 class RequestQueue {
    constructor() {
        // TODO - optional, any setup you want
        this.queue = []; // Only store request ID
        this.requestMap = {}; // ID and request mapping
    }

    /**
     * Adds an asynchronous request to the end of the queue.
     * @param {() => Promise<any>} request - The asynchronous request.
     * @param {?Function} onExecuted - An optional callback that should be executed with the resolved
     * result of the request.
     * @returns {number} - An ID for the enqueued request.
     */
    enqueue(request, onExecuted) {
        const id = getUniqueId();
        this.queue.push(id);
        this.requestMap[id] = function(){
            return new Promise((resolve, reject) => {
                request().then(res => {
                    if(typeof onExecuted === 'function'){
                        onExecuted(res);
                    }
                    resolve();
                }).catch(err => {
                    reject(err);
                })
            })
        };
        return id;
    }

    /**
     * Cancels the request with the given ID.
     * @param {number} id - The ID of the request.
     */
    cancel(id) {
        this.queue = this.queue.filter(v => v !== id);
        delete this.requestMap[id];
    }

    /**
     * Executes the next asynchronous request in the queue, resolving when the request is complete.
     * Does nothing if there are no requests left in the queue.
     * @returns {Promise<void>}
     */
    async processNext() {
        const id = this.queue.shift();
        if(id){
            const fn = this.requestMap[id];
            delete this.requestMap[id];
            return fn();
        }else{
            return Promise.resolve();
        }
    }

    /**
     * Returns the current size of the queue.
     */
    getSize() {
        return this.queue.length;
    }
}

module.exports = RequestQueue;
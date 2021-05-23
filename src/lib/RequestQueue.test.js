const RequestQueue = require('./RequestQueue.js');

const requestQueue = new RequestQueue();

const id1 = requestQueue.enqueue(function(){
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('task1 executed');
        }, 1000);
    })
}, function(res){
    console.log(res);
});
console.log('task1 ID is:', id1);

const id2 = requestQueue.enqueue(function(){
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('task2 executed');
        }, 2000);
    })
}, function(res){
    console.log(res);
});
console.log('task2 ID is:', id2);

const id3 =requestQueue.enqueue(function(){
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('task3 executed');
        }, 3000);
    })
}, function(res){
    console.log(res);
});
console.log('task3 ID is:', id3);

function printSize(){
    const size = requestQueue.getSize();
    console.log('queue size is:', size);
}

printSize();

requestQueue.cancel(id2);

printSize();

async function executeInOrder() {
    await requestQueue.processNext();
    printSize();
    await requestQueue.processNext();
    printSize();
    await requestQueue.processNext();
    printSize();
}

executeInOrder();
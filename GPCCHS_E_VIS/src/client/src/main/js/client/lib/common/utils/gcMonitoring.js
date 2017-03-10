const gcWatch = require('gc-watch');

export default function() {
  let size;
  let time;

  const getHeapSize = () => Math.floor(process.memoryUsage().heapUsed / (1024 * 1024));
  const getTime = () => (new Date()).getTime();

  gcWatch.on('beforeGC', () => {
    // detect memory usage, push stats etc.
    size = getHeapSize();
    console.time('GC Duration');
  });

  gcWatch.on('afterGC', () => {
    // calculate memory freed by GC, etc.
    console.log('-------------------------------------------------');
    console.log(`GC passed, memory free ${size - getHeapSize()} mb (Total: ${getHeapSize()} mb)`);
    console.timeEnd('GC Duration');
    console.log(`Since last GC tick : ${getTime() - (time || getTime())} ms`);
    console.log('-------------------------------------------------');
    time = getTime();
  });
}

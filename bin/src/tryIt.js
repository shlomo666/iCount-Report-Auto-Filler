async function tryIt(fn) {
  let counter = 0;
  let err;
  while (++counter < 6) {
    try {
      await fn();
      return;
    } catch (_err) {
      err = _err;
    }
  }
  throw err;
}
exports.tryIt = tryIt;

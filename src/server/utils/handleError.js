function handleError(e) {
  console.log('\n\n<<<<<<<<<<');
  console.error(e);
  console.log('>>>>>>>>>>\n\n');
  return { error: e.toString() };
}

module.exports = handleError;

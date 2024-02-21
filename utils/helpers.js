function delay(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
async function run() {
    await delay(15000); // Wait for 2 seconds
  }
  
module.exports = {
  delay,
  run
};

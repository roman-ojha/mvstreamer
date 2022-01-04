// test:

console.log("hello");

const ctx = new AudioContext();
let audio;
function playBack() {
  const playSound = ctx.createBufferSource();
  playSound.buffer = audio;
  playSound.connect(ctx.destination);
  playSound.start(ctx.currentTime);
}
const getSongs = () => {
  // in this demo we are only getting one chunk of data because we had only requested one time from the 'bytes 0-'
  try {
    fetch("http://localhost:8080/test", {
      method: "GET",
      headers: {
        "Content-Type": "audio/mpeg",
        range: "bytes 0-",
        // here we are getting data from the starting byte upto the byte which server send us
      },
    })
      .then((data) => data.arrayBuffer())
      .then((arrayBuffer) => {
        console.log(arrayBuffer);
        return ctx.decodeAudioData(arrayBuffer);
      })
      .then((decodedAudio) => {
        audio = decodedAudio;
        playBack();
      });
  } catch (err) {
    console.log(err);
  }
};

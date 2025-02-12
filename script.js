const audioEl = document.getElementById('bg');
let audioStarted = false;

window.addEventListener('wheel', () => {
  if (!audioStarted) {
    audioStarted = true;
    audioEl.play();
  }
});

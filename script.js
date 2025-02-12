document.addEventListener("DOMContentLoaded", function() {
    const overlay = document.getElementById('overlay');
    const overlaytext = document.getElementById('overlaytext');
    const audioEl = document.getElementById('bg');
    audioEl.volume = 0.8;

    overlay.addEventListener('click', function() {
        
        overlaytext.style.animation = 'none';
        overlaytext.style.opacity = '0';

        setTimeout(() => {
            audioEl.play();
            overlay.style.opacity = '0';
            volumefade(audioEl, 0.7, 0.3, 10000);
        },500);

        overlay.addEventListener('transitionend', function() {
            overlay.style.display = 'none';
      }, {once: true});
    });
});
  

function volumefade(audioEl, volstart, volend, duration){
    const begin = performance.now()
    function updatevol(currtime){
        const elapsed = currtime - begin;
        const progress = Math.min(elapsed/duration, 1);
        audioEl.volume = volstart - (volstart - volend) * progress;
        if (progress <1){
            requestAnimationFrame(updatevol);
        }
    }
    requestAnimationFrame(updatevol);
}
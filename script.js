document.addEventListener("DOMContentLoaded", function() {
    const overlay = document.getElementById('whiteoverlay');
    const overlaytext = document.getElementById('overlaytext');
    const audioEl = document.getElementById('bg');
    audioEl.volume = 0.4;

    overlay.addEventListener('click', function() {
        overlaytext.style.animation = 'none';
        overlaytext.style.opacity = '0';

        setTimeout(() => {
            overlay.style.opacity = '0';
            volumefade(audioEl, 0.6, 0.1, 8000);
        }, 500);

        overlay.addEventListener('transitionend', function() {
            overlay.style.display = 'none';
            const cutscene = document.getElementById('cutscene');
            cutscene.style.display = 'block';
            cutscene.play();
        }, {once: true});
    });

    const cutscene = document.getElementById('cutscene');
    cutscene.addEventListener('ended', function() {
        transitionToMainContent();
        audioEl.play();
        volumefade(audioEl, 0.4, 0.1, 8000);
    });
    
    function transitionToMainContent() {
        const blackoverlay = document.getElementById('blackoverlay');
        blackoverlay.style.display = 'block';
        void blackoverlay.offsetWidth;
        blackoverlay.style.opacity = '1';
  
        blackoverlay.addEventListener('transitionend', function() {
            cutscene.pause();
            cutscene.style.display = 'none';
            blackoverlay.style.display = 'none';
            const mainContent = document.getElementById("maincontent");
            mainContent.style.display = 'block';
        }, {once: true});
  
        setTimeout(() => {
            cutscene.pause();
            cutscene.style.display = 'none';
            blackoverlay.style.display = 'none';
            const mainContent = document.getElementById("maincontent");
            mainContent.style.display = 'block';
        }, 1500);
    }
    
    const dialogues = [
        "Ken told me a lot about you...",
        "Hm... especially about your beautiful soul.",
        "He must really love you, doesn't he!",
        "It... seems like he wants to ask you something...",
    ];

    let currentdialogue = 0;
    const dialogueBox = document.getElementById("dialogueBox");
    const dialogueText = document.getElementById("dialogueText");

    dialogueBox.addEventListener("click", function(){
        currentdialogue = (currentdialogue + 1) % dialogues.length;
        dialogueText.textContent = dialogues[currentdialogue];
    });
});
  
function volumefade(audioEl, volstart, volend, duration) {
    const begin = performance.now();
    function updatevol(currtime) {
        const elapsed = currtime - begin;
        const progress = Math.min(elapsed / duration, 1);
        audioEl.volume = volstart - (volstart - volend) * progress;
        if (progress < 1) {
            requestAnimationFrame(updatevol);
        }
    }
    requestAnimationFrame(updatevol);
}

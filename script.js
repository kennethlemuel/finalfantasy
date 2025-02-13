document.addEventListener("DOMContentLoaded", function() {
    
    //overlay and volume code
    const whiteoverlay = document.getElementById('whiteoverlay');
    const overlaytext = document.getElementById('overlaytext');
    const audioEl = document.getElementById('bg');
    audioEl.volume = 0.8;

    whiteoverlay.addEventListener('click', function() {
        
        overlaytext.style.animation = 'none';
        overlaytext.style.opacity = '0';

        setTimeout(() => {
            audioEl.play();
            overlay.style.opacity = '0';
            volumefade(audioEl, 0.7, 0.3, 10000);
        },500);

        whiteoverlay.addEventListener('transitionend', function() {
            whiteoverlay.style.display = 'none';
            const dialogueBox = document.getElementById("dialogueBox");
            dialogueBox.style.display = 'block';
      }, {once: true});
    });


    //dialogue code
    const dialogues = [
        "Hey there Elysia, I'm Aerith!",
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
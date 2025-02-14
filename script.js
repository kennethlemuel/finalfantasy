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
        cutscene.style.opacity = '0';
        
        cutscene.addEventListener('transitionend', function() {
            cutscene.style.display = 'none';
            audioEl.play()
            volumefade(audioEl, 0, 0.4, 6000);
            const mainContent = document.getElementById("maincontent");
            mainContent.style.display = 'block';
        }, {once: true});
    });

    const dialogues = [
        ,
        "Hey There Elysia, I'm Aerith!",
        "Ken told me a lot about you...",
        "Hm... especially about your beautiful soul.",
        "He must really love you, doesn't he!",
        "It... seems like he wants to ask you something...",
        "heyy elysia! firstly, i'm so sorry if this came out not as you expected...",
        "i hope that you'll still love it! i'll continuously work on it too!",
        "anyways...",
        "it's a bit late for me to ask now, but.!.!",
        "will you be my valentines?"
    ];

    let currentdialogue = 0;
    const dialogueBox = document.getElementById("dialogueBox");
    const dialogueText = document.getElementById("dialogueText");
    const finalChoice = document.getElementById("finalChoice");

    dialogueBox.addEventListener("click", function(){
        if (currentdialogue < dialogues.length - 1) {
            currentdialogue++;
            dialogueText.textContent = dialogues[currentdialogue];
        } else {
            dialogueBox.style.display = "none";
            finalChoice.style.display = "flex";
        }
    });

    const noButton = document.getElementById("noButton");
    noButton.addEventListener("mouseover", function() {
        let randomX = Math.floor(Math.random() * 300) - 100; 
        let randomY = Math.floor(Math.random() * 300) - 100;
        this.style.transform = `translate(${randomX}px, ${randomY}px)`;
    });

    const yesButton = document.getElementById("yesButton");
    yesButton.addEventListener("click", function() {
        window.location.href = "titlepage.html";
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

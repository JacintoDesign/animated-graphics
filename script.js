function runAnimationIN() {
    const goldBar = document.querySelector('.gold-bar');
    const blackBar = document.querySelector('.black-bar');
    const logo = document.querySelector('.img-container');
    const bottomBox = document.querySelector('.bottom-box');
    const topBox = document.querySelector('.top-box');

    goldBar.style.clipPath = "polygon(15px 0, 100% 0, 100% 100%, 0% 100%)";
    blackBar.style.clipPath = "polygon(15px 0, 100% 0, 100% 100%, 0% 100%)";
    logo.style.clipPath = "none";

    logo.style.animation = "revealLeft .5s linear forwards";
    goldBar.style.animation = "slideIn .5s ease-in-out forwards .1s";
    blackBar.style.animation = "slideIn .5s ease-in-out forwards .2s";
    bottomBox.style.animation = "slideDownBottom .6s ease-in-out forwards .2s";
    topBox.style.animation = "slideUpTop .5s ease-in forwards .2s";
}

function runAnimationOUT() {
    const goldBar = document.querySelector('.gold-bar');
    const blackBar = document.querySelector('.black-bar');
    const logo = document.querySelector('.img-container');
    const bottomBox = document.querySelector('.bottom-box');
    const topBox = document.querySelector('.top-box');

    goldBar.style.clipPath = "polygon(15px 0, 100% 0, 100% 100%, 0% 100%)";
    blackBar.style.clipPath = "polygon(15px 0, 100% 0, 100% 100%, 0% 100%)";
    logo.style.clipPath = "none";

    logo.style.animation = "hideLeft .5s linear forwards";
    blackBar.style.animation = "slideOut .4s ease-in-out forwards .2s";
    goldBar.style.animation = "slideOut .4s ease-in-out forwards .3s";
    bottomBox.style.animation = "slideUpBottom .3s ease-in forwards";
    topBox.style.animation = "slideDownTop .3s ease-in forwards";
}

window.onload = function() {
    adjustBarWidth();
    observeTextLayer();
}

function adjustBarWidth() {
    const textLayer = document.querySelector(".main-text");
    const bottomBoxText = document.querySelector(".bottom-box .bottom-box-text");
    const goldBar = document.querySelector(".gold-bar");
    const blackBar = document.querySelector(".black-bar");
    const bottomBar = document.querySelector(".bottom-box");

    const textLayerWidth = textLayer.offsetWidth;
    const bottomBoxTextWidth = bottomBoxText.offsetWidth;

    const textLayerStyle = window.getComputedStyle(textLayer);
    const marginLeft = parseFloat(textLayerStyle.getPropertyValue('margin-left'));

    // Use the maximum width of the two texts
    const barWidth = Math.max(textLayerWidth, bottomBoxTextWidth) + marginLeft;

    blackBar.style.width = barWidth + "px";
    bottomBar.style.width = `${barWidth + 9}px`;
    goldBar.style.width = (barWidth + 15) + "px";
}


function observeTextLayer() {
    const textLayer = document.querySelector(".main-text");
    const bottomBoxText = document.querySelector(".bottom-box .bottom-box-text");

    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === "characterData" || mutation.type === "childList") {
                adjustBarWidth();
            }
        });
    });

    const config = { childList: true, characterData: true, subtree: true };
    observer.observe(textLayer, config);
    observer.observe(bottomBoxText, config);
}

// Keyboard Shortcut to Toggle Animations
let isGrapicVisible = true;

window.addEventListener('keydown', function(event) {
        // Check if the pressed key is the spacebar (key code 32)
        if (event.keyCode === 32) {
            if (isGrapicVisible) {
                runAnimationOUT();
                isGrapicVisible = false;
            } else {
                location.reload();
                isGrapicVisible = true;
            }
        }

        event.preventDefault();
});
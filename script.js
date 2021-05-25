const ovelha = document.querySelector('.ovelha');
const background = document.querySelector('.background');
let isJumping = false;
let position = 0;

function handleKeyUp(event) {
    if(event.keyCode === 32) {
        if (!isJumping) {
            jump();
        }
    }
}

function jump() {
    isJumping = true;
     
    let upInterval = setInterval(() => {
        if (position >= 150) {
            clearInterval(upInterval);

            //Descendo
            let downInterval = setInterval(() => {
                if(position <= 0) {
                    clearInterval(downInterval);
                    isJumping = false;
                } else {
                    position -= 20;
                    ovelha.style.bottom = position + 'px';
                }
            }, 20);
        } else {
            //subindo
            position += 20;
            ovelha.style.bottom = position + 'px';
        }
    }, 20);
}

function createCerca() {
    const cerca = document.createElement('div');
    let cercaPosition = 1000;
    let randomTime = Math.random() * 6000;

    cerca.classList.add('cerca');
    cerca.style.left = 1000 + 'px';
    background.appendChild(cerca);

    let leftInterval = setInterval(() => {
        if (cercaPosition < -60) {
            clearInterval(leftInterval);
            background.removeChild(cerca);
        } else if (cercaPosition > 0 && cercaPosition < 60 && position < 60) {
            //Game Over
            clearInterval(leftInterval);
            document.body.innerHTML = '<h1 class="game-over">Fim de jogo</h1>';
        } else {
            cercaPosition -= 10;
            cerca.style.left = cercaPosition + 'px';
        }
    }, 20);

    setTimeout(createCerca, randomTime);
}

createCerca();
document.addEventListener('keyup', handleKeyUp);
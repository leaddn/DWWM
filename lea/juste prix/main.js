/* Random Picture */

window.onload = choosePic;

var myPix = new Array("img/img1.jpeg", "img/img2.jpeg", "img/img3.jpeg", "img/img4.jpeg", "img/img5.jpeg");

function choosePic() {
     var randomNum = Math.floor(Math.random() * myPix.length);
     document.getElementById("imageid").src = myPix[randomNum];

}

/* Price */

let randomNumber = Math.floor(Math.random() * 100) + 1;

let guesses = document.querySelector('.guesses');
let lastResult = document.querySelector('.lastResult');
let lowOrHi = document.querySelector('.lowOrHi');

let guessSubmit = document.querySelector('.guessSubmit');
let guessField = document.querySelector('.guessField');

let guessCount = 1;
let resetButton;
guessField.focus();

/* the game main function */
function checkGuess(){
    let userGuess = Number(guessField.value);
    if (guessCount === 1) {
      guesses.textContent = 'Propositions précédentes : ';
    }
    guesses.textContent += userGuess + ' ';
  
    if (userGuess === randomNumber) {
      var audioWon = document.getElementById("GameWon");
      audioWon.play();
      lastResult.textContent = 'Bravo, vous avez trouvé le nombre !';
      lastResult.style.backgroundColor = 'green';
      lowOrHi.textContent = '';
      
      setGameOver();
    } else if (guessCount === 10) {
       lastResult.textContent = '!!! PERDU !!!';
       setGameOver();
    } else {
       lastResult.textContent = 'Faux !';
       lastResult.style.backgroundColor = 'red';
       if (userGuess < randomNumber) {
        lowOrHi.textContent = 'Le nombre saisi est trop petit !';
       } else if (userGuess > randomNumber) {
        lowOrHi.textContent = 'Le nombre saisi est trop grand !';
       }
    }
  
    guessCount++;
    guessField.value = '';
    guessField.focus();
  }

  guessSubmit.addEventListener('click', checkGuess);

  /* initialize end game */
  function setGameOver() {
    guessField.disabled = true;
    guessSubmit.disabled = true;
    resetButton = document.createElement('button');
    resetButton.textContent = 'Start new game';
    document.body.appendChild(resetButton);
    resetButton.addEventListener('click', resetGame);
  }

  /* initialize game restart */
  function resetGame() {
    guessCount = 1;
  
    let resetParas = document.querySelectorAll('.resultParas p');
    for (let i = 0 ; i < resetParas.length ; i++) {
      resetParas[i].textContent = '';
    }
  
    resetButton.parentNode.removeChild(resetButton);
  
    guessField.disabled = false;
    guessSubmit.disabled = false;
    guessField.value = '';
    guessField.focus();
  
    lastResult.style.backgroundColor = 'white';
  
    randomNumber = Math.floor(Math.random() * 100) + 1;
  }

 
    let score = JSON.parse(localStorage.getItem('score')) || {
      wins: 0,
      losses: 0,
      ties: 0
    };

    let isAutoPlaying=false;
    let intervalId;
    
     

 // const autoPlay=()=>{

  //}

  document.querySelector('.js-rock-button')
    .addEventListener('click',()=>{
      playGame('rock');

    });

    
    document.querySelector('.js-paper-button')
    .addEventListener('click',()=>{
      playGame('paper');

    });

    document.querySelector('.js-scissors-button')
    .addEventListener('click',()=>{
      playGame('scissors')
    })

    
    document.body.addEventListener('keydown',(event)=>{   //it shows which key we pressed in our keyboard
      //console.log(event.key);

      if(event.key==='r'){
        playGame('rock');
      }else if(event.key==='p'){
        playGame('paper');
      }else if(event.key==='s'){
        playGame('scissors');
      }
    });

    function autoPlay(){
      if(!isAutoPlaying){
         intervalId = setInterval(()=>{
        const playerMove=pickComputerMove();
         playGame(playerMove);
      },1000);
      isAutoPlaying = true;
      }else{
        clearInterval(intervalId); //stop the interval
       isAutoPlaying = false;
      }
      
    }

    function playGame(playerMove) {
      const computerMove = pickComputerMove();

      let result = '';

      if (playerMove === 'scissors') {
        if (computerMove === 'rock') {
          result = 'You lose';
        } else if (computerMove === 'paper') {
          result = 'You win';
        } else {
          result = 'Tie';
        }
      } else if (playerMove === 'paper') {
        if (computerMove === 'rock') {
          result = 'You win';
        } else if (computerMove === 'paper') {
          result = 'Tie';
        } else {
          result = 'You lose';
        }
      } else if (playerMove === 'rock') {
        if (computerMove === 'rock') {
          result = 'Tie';
        } else if (computerMove === 'paper') {
          result = 'You lose';
        } else {
          result = 'You win';
        }
      }

      if (result === 'You win') {
        score.wins++;
      } else if (result === 'You lose') {
        score.losses++;
      } else {
        score.ties++;
      }

      localStorage.setItem('score', JSON.stringify(score));

      document.querySelector('.js-result').innerHTML = result;

      document.querySelector('.js-moves').innerHTML = `
        You <img src="thumbnail/${playerMove}-emoji.png" class="move-icon">
        <img src="thumbnail/${computerMove}-emoji.png" class="move-icon"> Computer
      `;

      updateScoreElement();
    }

    function pickComputerMove() {
      const randomNumber = Math.random();
      let computerMove = '';

      if (randomNumber < 1 / 3) {
        computerMove = 'rock';
      } else if (randomNumber < 2 / 3) {
        computerMove = 'paper';
      } else {
        computerMove = 'scissors';
      }

      return computerMove;
    }

    function updateScoreElement() {
      document.querySelector('.js-score')
        .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
    }

    function resetScore() {
      score.wins = 0;
      score.losses = 0;
      score.ties = 0;
      localStorage.removeItem('score');
      updateScoreElement();
      document.querySelector('.js-result').textContent = '';
      document.querySelector('.js-moves').textContent = '';
    }

    updateScoreElement();


  
document.addEventListener("DOMContentLoaded", e => { 
  const APIURL = "https://powerful-retreat-26271.herokuapp.com/scores"
  const APIHIGHSCORE = "https://powerful-retreat-26271.herokuapp.com/scores/high_score"
  // const APIURL = "http://localhost:3001/scores"
  // const APIHIGHSCORE = "http://localhost:3001/scores/high_score"

  const scenes = [
    { scene: "assets/scenes/gift.jpg", 
      css: "styles/gift.css"
    },
    { scene: "assets/scenes/us.jpg", 
      css: "styles/us.css"
    },
    { scene: "assets/scenes/city.jpg", 
      css: "styles/city.css"
    },
    { scene: "assets/scenes/toy.jpg", 
      css: "styles/toy.css"
    },
    { scene: "assets/scenes/game.jpg", 
      css: "styles/game.css"
    },
    { scene: "assets/scenes/boxing.jpg", 
      css: "styles/boxing.css"
    },
    { scene: "assets/scenes/basketball.jpg", 
      css: "styles/basketball.css"
    },
    { scene: "assets/scenes/musk.jpg", 
      css: "styles/musk.css"
    },
    { scene: "assets/scenes/snack.jpg", 
      css: "styles/snack.css"
    },
    { scene: "assets/scenes/draft.jpg", 
      css: "styles/draft.css"
    }
  ];  

  let usedIndexes = [];

  let randomScene; 
  let sceneImgSrc;
  let sceneCssHref;

  let username;
  let userscore = 0;
  let highScore;

  const photoContainer = document.getElementById("photo-container");
  const topContainer = document.getElementById("top-container");
  const highScoreContainer = document.getElementById("high-score")
  const footer = document.getElementById("footer");
  const timerBar = document.getElementById("timer-buttons")
  let userScoreContainer = document.getElementById("my-score")
  // CSS HEAD STUFF
  const head = document.querySelector("head")
  const cssLink = head.querySelector("#circles")

  let sec;
  let timer;
  let correctCount = 0;

  let sceneHTML = `
    <div id="butt1L" class="invisible"></div>
    <div id="butt1R" class="invisible"></div>
    <div id="butt2L" class="invisible"></div>
    <div id="butt2R" class="invisible"></div>
    <div id="butt3L" class="invisible"></div>
    <div id="butt3R" class="invisible"></div>
    <div id="butt4L" class="invisible"></div>
    <div id="butt4R" class="invisible"></div>
    <div id="butt5L" class="invisible"></div>
    <div id="butt5R" class="invisible"></div>
    <div id="butt6L" class="invisible"></div>
    <div id="butt6R" class="invisible"></div>
  `

  //on page load functions here
  kenny();
  newTimerButtons();
  getHighScore();

 
  function newTimerButtons() {
    timerBar.innerHTML = `
      <img class="red oval" id="oval0" src="assets/redOval.png">
      <img class="red oval" id="oval2" src="assets/redOval.png">
      <img class="red oval" id="oval4" src="assets/redOval.png">
      <img class="yellow oval" id="oval6" src="assets/yellowOval.png">
      <img class="yellow oval" id="oval8" src="assets/yellowOval.png">
      <img class="yellow oval" id="oval10" src="assets/yellowOval.png">
      <img class="yellow oval" id="oval12" src="assets/yellowOval.png">
      <img class="yellow oval" id="oval14" src="assets/yellowOval.png">
      <img class="green oval" id="oval16" src="assets/yellowOval.png">
      <img class="green oval" id="oval18" src="assets/greenOval.png">
      <img class="green oval" id="oval20" src="assets/greenOval.png">
      <img class="green oval" id="oval22" src="assets/greenOval.png">
      <img class="green oval" id="oval24" src="assets/greenOval.png">
      <img class="green oval" id="oval26" src="assets/greenOval.png">
      <img class="green oval" id="oval28" src="assets/greenOval.png">
      <img class="green oval" id="oval30" src="assets/greenOval.png">
      <img class="green oval" id="oval32" src="assets/greenOval.png">
      <img class="green oval" id="oval34" src="assets/greenOval.png">
      <img class="green oval" id="oval36" src="assets/greenOval.png">
      <img class="green oval" id="oval38" src="assets/greenOval.png">
      <img class="clock" id="clock" src="assets/clock.png">
    `
  } //end of newTimerButtons()

  function newCorrectCircles() {
    footer.innerHTML = `
    <img class="grey-circle" id="circle1" src="assets/greyCircle.png">
    <img class="grey-circle" id="circle2" src="assets/greyCircle.png">
    <img class="grey-circle" id="circle3" src="assets/greyCircle.png">
    <img class="grey-circle" id="circle4" src="assets/greyCircle.png">
    <img class="grey-circle" id="circle5" src="assets/greyCircle.png">
    <img class="grey-circle" id="circle6" src="assets/greyCircle.png">
    `
  }

  function resetScore() {
    userscore = 0;
    userScoreContainer.innerText = userscore;
  }

  function updateScore() {
    userScoreContainer.innerText = userscore;
  }

 
  function kenny(){
    const formHTML =  `
   
    <form>
      <input id="namer" type="text" name="username" placeholder="Enter a username" autocomplete="off"> <br>
      <input type="submit" value="Giddy up!" id="giddyup" class="glass">
    </form>
    <div id="chrome"> <img src="assets/chrome.png"></div>
    `
    photoContainer.innerHTML = formHTML

    photoContainer.addEventListener("submit", event => {
      event.preventDefault()
      if (event.target.tagName === "FORM") {
        username = event.target.username.value
        
        photoContainer.innerHTML = `
          <div class="instructions" id="instructions">
          <h1>Welcome to <br>
          <br>
          SPOT THE DIFFERENCE ${username}!</h1>
          <p>In each round, you'll be shown two photos that are identical except for 6 differences. <br>
          The objective is to find and identify the differences between the pictures before the timer runs out. <br><br>
          Select potential differences by clicking on either picture in the location of difference. <br><br>
          Correct choices circle the difference in green and incorrect clicks deduct points.<br>
          Bonus points are awarded for the time remaining and the timer is refreshed for the next round. <br><br>
          The game ends after you finish 10 rounds. </p>
          <button id="start" class="glass">LET'S START GAME</button>
          </div>
          `

        const startButton = document.querySelector("#start")
        startButton.addEventListener("click", event => {
          resetScore();
          startGame();
        })
      }
    })
  } //end of loggins

  function setScene() {
    //assign random scene info to variables
    randomScene = getRandomScene();
    sceneImgSrc = randomScene.scene;
    sceneCssHref = randomScene.css;
    //set the HTML & CSS
    photoContainer.innerHTML = `<img src=${sceneImgSrc}> ${sceneHTML}`;
    cssLink.href = sceneCssHref; 
  }

  function startGame() {
    newCorrectCircles();
    setScene();
    startTimer();
  }

  //use this with play again button
  function restartGame() {
    correctCount = 0;
    usedIndexes = [];
    newTimerButtons();
    newCorrectCircles();
    setScene();
    resetScore();
    startTimer()
  }

  function nextRound() {
    correctCount = 0;
    newTimerButtons();
    newCorrectCircles();
    startGame();
  }

  //use this to log out user & reload log in 
  function exit() {
    //reset DOM to page load conditions, log out user and scores
  }

  //timer
  function startTimer() {
    sec = 60;
    timer = setInterval(() => {
      sec --;
      let timerDots = timerBar.querySelectorAll(".oval")
      timerDots.forEach(dot => {
        if (dot.id === `oval${sec}`) {
          dot.src = "assets/greyOval.png"
        }
      })
      
      if (sec < 0) { 
        clearInterval(timer);
        timesUp();
      } 
    }, 1000)
  }

  function timesUp() {
    clearInterval(timer);
    sec = 60;
    userscore -= 50;
    updateScore();
    timerBar.innerHTML = `<div>Time's up for this round!!!</div><button id="new-round2">Start new round</button>`
    const newRoundButton = document.getElementById("new-round2")
    newRoundButton.addEventListener("click", event => {
    nextRound();
  })
    const invisibleDivs = photoContainer.querySelectorAll(".invisible")
    const greyCircles = footer.querySelectorAll(".grey-circle")
    invisibleDivs.forEach(invisibleDiv => {
      invisibleDiv.className = "gameOverCircle";
      invisibleDiv.innerHTML = `<img class="circle" src="assets/redcircle.png">`;
    })
    greyCircles.forEach(greyCircle => {
      greyCircle.src = src="assets/greyCircleRedCheck.png"
    })
  }

  
  //photo click
  photoContainer.addEventListener("click", e=>{
    if (e.target.className === "invisible") {
      let targetId = e.target.id;
      let targetDiv = document.getElementById(targetId);
      let correspondingDiv;
      let correspendingId;
      if (targetId.includes("L") ){
        correspendingId = targetId.replace("L", "R")
        correspondingDiv = document.getElementById(correspendingId)
      } else {
        correspendingId = targetId.replace("R", "L")
        correspondingDiv = document.getElementById(correspendingId)
      }
      //update class & add image of circle
      targetDiv.className = "circle";
      correspondingDiv.className = "circle";
      targetDiv.innerHTML = `<img class="circle" src="assets/greencircle.png">`;
      correspondingDiv.innerHTML = `<img class="circle" src="assets/greencircle.png">`;
      userscore += 100;
      updateScore();
      //counter at bottom
      correctCount++;
      let currentCircle = document.getElementById(`circle${correctCount}`)
      currentCircle.src = "assets/greyCircleGreenCheck.png";
      currentCircle.className = "green-check"
      
      //win the round
      if (correctCount === 6) {
        clearInterval(timer);
        let bonus = sec * 10;
        userscore += bonus;
        updateScore()
    
        if (usedIndexes.length === scenes.length) {
          postScore();
          getHighScore();
          timerBar.innerHTML = `<h1>OMG YOU FINISH THE GAME! Take a screenshot of your final score and send to chat for ranks and prizes!</h1>`
        } else {
          timerBar.innerHTML = `<h1>Great job!</h1> <button id="new-round">Start new round</button>`
          const newRoundButton = document.getElementById("new-round")
          newRoundButton.addEventListener("click", event => {
          nextRound();
        }) //closes new round event listener
        } //closes else
      } //closes win the round 

    } else {
      if (sec < 60 && sec > 0 && correctCount < 6) {
        userscore -= 30;
        updateScore();
      }
    } //closes giant if statement that looks for the differences
  }) //closes photo click

  //helper functions
  function getRandomScene() {
    let i = Math.floor(Math.random()*scenes.length)
    if (usedIndexes.includes(i)) {
      console.log("index was already in usedIndexes, trying to search again")
      return getRandomScene();
    } else {
    usedIndexes.push(i); 
    return scenes[i]
    }
  }

  function renderHighScore(name, score) {
    highScoreContainer.innerHTML = `
    <span>${name}:</span>
    <span>${score}</span>`
  }


  //FETCH functions
  
  //post userscore
  function postScore() {
    let body = {
      username: username,
      userscore: userscore
    }
    return fetch(APIURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accepts": "application/json"
      },
      body: JSON.stringify(body)
    }).then(resp => resp.json())
  }

  //get high score
  function getHighScore() {
    fetch(APIHIGHSCORE)
    .then(resp => resp.json())
    .then(score => {
      let highScoreName = score.username;
      highScore = score.userscore;
      renderHighScore(highScoreName, highScore)
    })
  }



})
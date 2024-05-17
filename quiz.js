// Retrieving data from localStorage
const storedData = localStorage.getItem("quizData");
// Parsing stored data
const data = JSON.parse(storedData);

// Using the retrieved data
console.log(data);
let counter = 0;
let score = 0;
let selected;1
let interval;
function renderTrivia() {
  let randomArr = [];
  let allAns;
  ////
  function renderOptions() {
    const incorrectAns = data[counter].incorrect_answers;
    const correctAns = data[counter].correct_answer;
    allAns = [...incorrectAns, correctAns];

    while (randomArr.length < 4) {
      const randomNum = Math.floor(Math.random() * 4);

      if (!randomArr.includes(randomNum)) {
        randomArr.push(randomNum);
      }
    }
  }
  renderOptions();

  ///
  const html = `   
  
  
  <div class="card mb-5">
<div class="progress-bar flex mb-5">
  <i class="fa-solid fa-xmark icon"></i>
  <div class="progress"><div class="progress-color">  <span class="total-time">30</span></div></div>

  <span class="que-count ">${counter + 1}/${data.length}</span>
</div>

<div class="quiz-question mb-5">${data[counter].question}</div>
<div class="options-box">
  <div class="option">${allAns[randomArr[0]]}</div>
  <div class="option">${allAns[randomArr[1]]}</div>
  <div class="option">${allAns[randomArr[2]]}</div>
  <div class="option">${allAns[randomArr[3]]}</div>
</div>

<lottie-player
  src="https://lottie.host/d11b4805-bcca-41fb-9e91-308d498374ba/tteheIwynF.json"
  background="##FFFFFF"
  speed="1"
  class='confetti'
  style="
    width: 100vw;
    height: 100vh;
    position: absolute;
    font-family: 'Plus Jakarta Sans';
  "
  loop
  direction="1"
 
  mode="normal"
></lottie-player>

<lottie-player
src="https://lottie.host/63773aa4-a910-40f8-a9db-9ffd2be03f4c/saE9f7hddR.json"
background="##FFFFFF"
class='incorrect'
speed="1"
style="width: 30%; height: 50%; position:absolute;top:0;left:0;transform:translate(100%,50%);display:none"
loop
direction="1"
mode="normal"
></lottie-player>

</div>

<div class="toast mb-2">Please select an option</div>
<div class='btn dark submit-btn'>Check<div></div>

`;

  document.body.insertAdjacentHTML("beforeend", html);
  function renderProgressBar() {
    console.log(counter);
    // Select the progress bar element
    const progress = document.querySelector(".progress-color");
    let totalTime = 30;

    interval = setInterval(function () {
      // Calculate the percentage completed
      const percentage = ((totalTime - 1) / 30) * 100;

      // Set the width of the progress bar
      progress.style.width = `${percentage}%`;
      const totalTimeEl = document.querySelector(".total-time");
      totalTimeEl.textContent = `${totalTime - 1}`;
      // Decrement totalTime
      totalTime--;

      // If totalTime reaches 0, clear the interval
      if (totalTime === 0) {
        clearInterval(interval);

        showCorrectAns();
        setTimeout(restart, 5000);
      }
    }, 1000);
  }
  renderProgressBar();
  const options = document.querySelectorAll(".option");
  options.forEach((option) =>
    option.addEventListener("click", (e) => {
      options.forEach((option) => option.classList.remove("selected"));
      e.target.classList.add("selected");
      selected = document.querySelector(".selected").textContent;
    })
  );
  const submitBtn = document.querySelector(".submit-btn");
  function playIncorrect() {
    const incorrect = document.querySelector(".incorrect");
    incorrect.style.display = "block";
    incorrect.play();
    submitBtn.classList.add("pointer-events");
  }
  function showCorrectAns() {
    const options = [...document.querySelectorAll(".option")];

    const [ans] = options.filter((option) => {
      return option.textContent === data[counter].correct_answer;
    });
    ans.classList.add("correctAns");
    playIncorrect();
  }
  submitBtn.addEventListener("click", () => {
    if (!selected) {
      const toast = document.querySelector(".toast");
      toast.style.display = "block";
      setTimeout(() => {
        toast.style.display = "none";
      }, 1500);
    } else {
      if (selected === data[counter].correct_answer) {
        const confetti = document.querySelector(".confetti");
        confetti.style.display = "block";
        confetti.play();
        score++;
      } else {
        playIncorrect();
        document.querySelector(".selected").classList.add("incorrectAns");
        showCorrectAns();
      }
      selected = "";
      clearInterval(interval);
      setTimeout(restart, 5000);
    }
  });
}

function restart() {
  if (counter == data.length - 1) {
    clearInterval(interval);
    document.body.innerHTML = "";
    const html = ` <div class="score card"><span class=final-score mb-5>Your score is ${score}/${data.length}   

    <dotlottie-player src="https://lottie.host/9fc1662c-5bb8-430f-a193-a91cdc8b3aaf/VaG71ggJPp.json" background="transparent" class="final" speed="1" style="width: 300px; height: 300px;" loop autoplay></dotlottie-player>

    <div class="btn-container flex"> <button class="btn outline">Play again</button><button class="btn dark outline-solid">Home</button></div>




    
`;

    document.body.insertAdjacentHTML("beforeend", html);
    const final = document.querySelector(".final");
  } else {
    counter += 1;
    document.body.innerHTML = "";
    renderTrivia();
  }
}

renderTrivia();

// Selecting the category container
const categoryContainer = document.querySelector(".category-container");
const gameBtn = document.querySelector(".start-btn");
// Selecting all chips containers
const difficulty = document.querySelector(".difficulty");
const questions = document.querySelector(".questions");

// Function to toggle the 'active' class on chips
function toggleActive(container) {
  const chips = container.querySelectorAll(".chip");

  chips.forEach((chip) => {
    chip.addEventListener("click", (e) => {
      chips.forEach((item) => item.classList.remove("active"));
      chip.classList.add("active");
      const selectedValue = chip.getAttribute("data-value");
      console.log(selectedValue);
    });
  });
}

// Initializing toggling for the category container
toggleActive(categoryContainer);
toggleActive(difficulty);
toggleActive(questions);

// gameBtn.addEventListener("click", () => {
//   let query = "";
//   const numQuestion = questions.querySelector(".active").textContent;
//   const category = categoryContainer.querySelector(".active").getAttribute('data-value');
//   const difficultyEl = difficulty.querySelector(".active").textContent;
//   query = [numQuestion, category, difficultyEl];
//   console.log(query);
//   async function fetchTriviaData() {
//   try {
//     const response = await fetch(`https://opentdb.com/api.php?amount=${numQuestion}&category=${category}&difficulty=${difficultyEl}`);
//     if (!response.ok) {
//       throw new Error("Failed to fetch trivia data");
//     }
//     const data = await response.json();
//     console.log(data.results);
//   } catch (error) {
//     console.error("Error fetching trivia data:", error);
//   }
// }

// fetchTriviaData();
// });
let a;
gameBtn.addEventListener("click", (e) => {

  let query = "";
  const numQuestion = questions.querySelector(".active").textContent;
  const category = categoryContainer
    .querySelector(".active")
    .getAttribute("data-value");
  const difficultyEl = difficulty
    .querySelector(".active")
    .getAttribute("data-value");
  query = [numQuestion, category, difficultyEl];
  console.log(query);
  async function fetchTriviaData() {
    try {
      let response;
      if (category !== "any") {
        response = await fetch(
          `https://opentdb.com/api.php?amount=${numQuestion}&category=${category}&difficulty=${difficultyEl}&type=multiple`
        );
      } else {
        response = await fetch(
          `https://opentdb.com/api.php?amount=${numQuestion}&difficulty=${difficultyEl}&type=multiple`
        );
      }
      if (!response.ok) {
        throw new Error("Failed to fetch trivia data");
      }
      const data = await response.json();
      console.log(data.results);
      a = data.results;
      // localStorage.removeItem("quizData");

      localStorage.setItem("quizData", JSON.stringify(a));
    } catch (error) {
      console.error("Error fetching trivia data:", error);
    }
      window.location.href = "quiz.html";

  }

  fetchTriviaData();
});

console.log("this thing is on");

//    <!-- =================Image Info Display========================= -->
const imageCollection = [
  { name: "Summer Festival", description: "A lively outdoor festival scene with colorful tents, fluttering flags, and people enjoying a sunny day, captured in a vibrant watercolor style." },
  { name: "Skyward Celebration", description: "A cheerful festival by the sea, featuring hot air balloons floating above a bustling market with colorful tents and festive flags, rendered in a dreamy watercolor palette." },
  { name: "Kites in the Breeze", description: "A joyful moment of children flying colorful kites in an open field, surrounded by a festive crowd and distant tents, painted in a warm, watercolor glow." },
  { name: "Serenity Over the Valley", description: "A breathtaking watercolor landscape showcasing rolling green hills, snow-capped mountains, and a winding river under a soft, pastel sky with blooming trees in the foreground." },
  { name: "Soaring Dreams", description: "A whimsical watercolor scene of a child flying a vibrant kite amidst a festival, with other kites dancing in the sky and a lively crowd in the background." },
];
console.log("create image collection array of objects", imageCollection);

const cards = document.querySelectorAll(".card");
console.log("cards found:", cards.length);

const dots = document.querySelectorAll(".dot");
const imageName = document.querySelector(".image-name");
const imageDescription = document.querySelector(".image-description");
const leftArrow = document.querySelector(".nav-arrow.left");
const rightArrow = document.querySelector(".nav-arrow.right");

let currentIndex = 0;
let isAnimating = false;

function updateCarousel(newIndex) {
  if (isAnimating) return;
  isAnimating = true;

  currentIndex = (newIndex + cards.length) % cards.length;
  console.log("Current index:", currentIndex); //Make sure the classes are being updated

  //========== LOOP forEach ; arrow function
  cards.forEach((card, i) => {
    const offset = (i - currentIndex + cards.length) % cards.length;

    console.log(`Card ${i}: currentIndex = ${currentIndex}, offset = ${offset}`);

    card.classList.remove("center", "left-1", "left-2", "right-1", "right-2", "hidden");

    if (offset === 0) {
      card.classList.add("center");
      // console.log(`Card ${i} assigned class: center`);
    } else if (offset === 1) {
      card.classList.add("right-1");
      // console.log(`Card ${i} assigned class: right-1`);
    } else if (offset === 2) {
      card.classList.add("right-2");
      // console.log(`Card ${i} assigned class: right-2`);
    } else if (offset === cards.length - 1) {
      card.classList.add("left-1");
      // console.log(`Card ${i} assigned class: left-1`);
    } else if (offset === cards.length - 2) {
      card.classList.add("left-2");
      // console.log(`Card ${i} assigned class: left-2`);
    } else {
      card.classList.add("hidden");
      // console.log(`Card ${i} assigned class: hidden`);
    }
  });
  // ================End of forEach

  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === currentIndex);
  });

  imageName.style.opacity = "0";
  imageDescription.style.opacity = "0";

  setTimeout(() => {
    imageName.textContent = imageCollection[currentIndex].name;
    imageDescription.textContent = imageCollection[currentIndex].description;
    imageName.style.opacity = "1";
    imageDescription.style.opacity = "1";
  }, 300);

  setTimeout(() => {
    isAnimating = false;
  }, 800);
}
// =====left arrow=====
leftArrow.addEventListener("click", () => {
  console.log("Left arrow clicked");
  updateCarousel(currentIndex - 1);
});
// ====right arrow====
rightArrow.addEventListener("click", () => {
  console.log("Right arrow clicked");
  updateCarousel(currentIndex + 1);
});

dots.forEach((dot, i) => {
  dot.addEventListener("click", () => {
    updateCarousel(i);
  });
});

cards.forEach((card, i) => {
  card.addEventListener("click", () => {
    updateCarousel(i);
  });
});

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") {
    updateCarousel(currentIndex - 1);
  } else if (e.key === "ArrowRight") {
    updateCarousel(currentIndex + 1);
  }
});

let touchStartX = 0;
let touchEndX = 0;

document.addEventListener("touchstart", (e) => {
  touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener("touchend", (e) => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
});

function handleSwipe() {
  const swipeThreshold = 50;
  const diff = touchStartX - touchEndX;

  if (Math.abs(diff) > swipeThreshold) {
    if (diff > 0) {
      updateCarousel(currentIndex + 1);
    } else {
      updateCarousel(currentIndex - 1);
    }
  }
}

updateCarousel(0);

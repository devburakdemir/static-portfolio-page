const titleFill = document.getElementById("titleFill");

function animateTitleFill() {
  titleFill.style.transition = "none";
  titleFill.style.width = "0px";

  void titleFill.offsetWidth;

  const fullWidth = titleFill.scrollWidth + "px";
  titleFill.style.transition = "width 2.2s ease";
  titleFill.style.width = fullWidth;
}

animateTitleFill();
setInterval(animateTitleFill, 4500);

/* Section carousel mantığı */
const sections = Array.from(document.querySelectorAll(".panel-section"));
const navLinks = Array.from(document.querySelectorAll(".top-nav a"));

let currentIndex = 0;
let isAnimating = false;

function updatePanels() {
  sections.forEach((section, index) => {
    section.classList.remove(
      "is-center",
      "is-left",
      "is-right",
      "is-hidden-left",
      "is-hidden-right"
    );

    if (index === currentIndex) {
      section.classList.add("is-center");
    } else if (index === currentIndex - 1) {
      section.classList.add("is-left");
    } else if (index === currentIndex + 1) {
      section.classList.add("is-right");
    } else if (index < currentIndex) {
      section.classList.add("is-hidden-left");
    } else {
      section.classList.add("is-hidden-right");
    }
  });

  navLinks.forEach((link) => {
    link.classList.toggle(
      "is-current",
      link.dataset.section === sections[currentIndex].id
    );
  });
}

function goToSection(newIndex) {
  if (isAnimating || newIndex === currentIndex) return;
  if (newIndex < 0 || newIndex >= sections.length) return;

  isAnimating = true;
  currentIndex = newIndex;
  updatePanels();

  setTimeout(() => {
    isAnimating = false;
  }, 850);
}

function goNext() {
  if (currentIndex < sections.length - 1) {
    goToSection(currentIndex + 1);
  }
}

function goPrev() {
  if (currentIndex > 0) {
    goToSection(currentIndex - 1);
  }
}

/* İlk yerleşim */
updatePanels();

/* Mouse wheel ile geçiş */
window.addEventListener(
  "wheel",
  (event) => {
    if (window.innerWidth <= 900) return;

    const activeSection = sections[currentIndex];
    const isScrollable =
      activeSection.scrollHeight > activeSection.clientHeight;

    if (isScrollable) {
      const atTop = activeSection.scrollTop <= 0;
      const atBottom =
        activeSection.scrollTop + activeSection.clientHeight >=
        activeSection.scrollHeight - 2;

      if (event.deltaY > 0 && !atBottom) return;
      if (event.deltaY < 0 && !atTop) return;
    }

    event.preventDefault();

    if (event.deltaY > 0) {
      goNext();
    } else {
      goPrev();
    }
  },
  { passive: false }
);

/* Navbar tıklamalarında animasyonlu geçiş */
navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();

    const targetId = link.dataset.section;
    const targetIndex = sections.findIndex(
      (section) => section.id === targetId
    );

    goToSection(targetIndex);
  });
});
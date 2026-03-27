const titleFill = document.getElementById("titleFill");

function animateTitleFill() {
  titleFill.style.transition = "none";
  titleFill.style.width = "0px";

  // reflow tetikleyip tarayıcıya sıfır genişliği okutuyoruz
  void titleFill.offsetWidth;

  const fullWidth = titleFill.scrollWidth + "px";

  titleFill.style.transition = "width 2.2s ease";
  titleFill.style.width = fullWidth;
}

animateTitleFill();
setInterval(animateTitleFill, 4500);
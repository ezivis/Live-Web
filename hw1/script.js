document.getElementById("vid1").addEventListener("mouseover", mouseOver);
document.getElementById("vid2").addEventListener("mouseover", mouseOver2);

function mouseOver() {
  document.getElementById("vid1").innerHTML = "<video class='vid' controls><source src='yee.mp4' type='video/mp4'></video>";

}

function mouseOver2() {
    document.getElementById("vid2").innerHTML = "<img src='6.png' alt='face' align = left width='350' height='300' z-index= '-1'>";
  }
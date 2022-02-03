document.getElementById("vidget").addEventListener("mouseover", mouseOver);

function mouseOver() {
    document.getElementById("vidget").innerHTML = "<video class='vid' controls loop><source src='yee.mp4' type='video/mp4'></video>";
  }
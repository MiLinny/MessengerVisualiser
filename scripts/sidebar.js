// Sidebar functionality
var count = 0;

function openSidebar() {
  if (count %2 == 0) {
    document.getElementById('side-bar').style.display = "block";
    document.getElementById('side-bar-button').style.background = "white";
    document.getElementById('side-bar-button').style.color = "#6D7993";
    // document.getElementById('actual-sidebar').style.display = "block";
  }
  else {
    document.getElementById('side-bar').style.display = "none";
    document.getElementById('side-bar-button').style.background = "#6D7993";
    document.getElementById('side-bar-button').style.color = "white";
    // document.getElementById('actual-sidebar').style.display = "none";
  }
  count += 1;
  console.log(count);
}

function menuHoverOff(x) {
  if (count%2 == 0) {
    x.style.background = "#A1C3D1";
    x.style.color = "white";
  }
  else {
    x.style.background = "white";
    x.style.color = "#A1C3D1";
  }
}

function menuHoverOn(x) {
  x.style.background = "white";
  x.style.color = "#A1C3D1";
}

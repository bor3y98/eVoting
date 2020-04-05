
  window.onscroll = function() {myFunction()};

var navbar = document.getElementById("navbar");
var sticky = navbar.offsetTop;

function myFunction() {
if (window.pageYOffset > sticky) {
navbar.classList.add("sticky");
// document.getElementById("image").style.marginLeft="0px";
// document.getElementById("image").style.marginLeft="20px";

} else {
  // document.getElementById("image").style.marginLeft="89.5px";
  //document.getElementById("mybtt").style.marginLeft="580px";
navbar.classList.remove("sticky");


}
}

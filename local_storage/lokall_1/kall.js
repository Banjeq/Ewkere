let input = document.getElementById("ses");
var value = localStorage['jma'];

if (value != undefined){
	input.value = value
}
input.onblur = function() {
  if (input.value != "") { // не email
	localStorage.setItem('jma', input.value);
  }
};

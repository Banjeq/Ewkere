var сchech = document.getElementsByClassName('checkbox')
let input1 = document.getElementById("inpert");
let texttareva = document.getElementById("Lava");
let textboxer = document.getElementById("Kalleg"); 

var value1 = localStorage['jma1'];
var value2 = localStorage['jma2'];
var value3 = localStorage['jma3'];
var value4 = localStorage['jma4'];
console.log(сchech)
if (value1 != undefined){
	textboxer.value = value1
}
if (value2 != undefined){
	texttareva.value = value2
}
if (value3 != undefined){
	input1.value = value3
}
if (value4 != undefined){
	сchech.value = value4
}

textboxer.onblur = function() {
  if (textboxer.value != "") { // не email
	localStorage.setItem('jma1', textboxer.value);
  }
};

texttareva.onblur = function() {
  if (texttareva.value != "") { // не email
	localStorage.setItem('jma2', texttareva.value);
  }
};

input1.onblur = function() {
  if (input1.value != "") { // не email
	localStorage.setItem('jma3', input1.value);
  }
};

function importantFunc(){
	alert("вы ввели меньше 222348723967018485186439059104575627262464195387 символов")
	
}
var textarea = document.querySelector('.textarea-field textarea');

window.onload = saveHistory(textarea);

function saveHistory(elem) {
  var key = elem.tagName.toLowerCase();
  if (localStorage[key]) {
    showButton(key, elem);
    elem.value = JSON.parse(localStorage[key]).pop();
  }
  elem.addEventListener('input', setHistory(key, elem)); 
}

function setHistory(key, elem) {
  var arr = [];
  return function() {
    arr.push(elem.value);
    localStorage.setItem(key, JSON.stringify(arr));
    showButton(key, elem);
  };
}

function showButton(key, elem) {
  var buttonPrev = elem.parentElement.querySelector('#prev');
  var buttonNext = elem.parentElement.querySelector('#next');
  addActiveClass(buttonPrev, buttonNext);
  buttonPrev.onclick = prevValue(key, elem);
  buttonNext.onclick = nextValue(key, elem);
}

function nextValue(key, elem) {
  return function() {
	var arrValue = JSON.parse(localStorage[key]);
    var index = arrValue.indexOf(elem.value);
    if (index < arrValue.length - 1) elem.value = arrValue[++index];
  };
}

function prevValue(key, elem) {
  return function() {
  var arrValue = JSON.parse(localStorage[key]);
  arrValue.forEach( function(value, i) { 
    if (value === elem.value && i > 0) elem.value = arrValue[--i];
    });
  };
}

function addActiveClass() {
  for (let i = 0; i < arguments.length; i++) {
    if (!arguments[i].classList.contains('active')) arguments[i].classList.add('active');
  }
}
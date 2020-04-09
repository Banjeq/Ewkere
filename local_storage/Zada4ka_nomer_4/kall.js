let list = document.querySelector('#list');
let addBtn = document.querySelector('#addBtn');

addBtn.addEventListener('click', addNote);

function addNote() {
let inputValue = document.getElementById('text').value;
let text = document.createTextNode(inputValue);
let li = document.createElement('li');
let btn = document.createElement('button');
btn.innerHTML = 'X';
li.appendChild(text);
li.appendChild(btn);
btn.addEventListener('click', removeNote);
list.appendChild(li);
localStorage['list'] = list.innerHTML;
}

function removeNote() {
var task = this.parentElement;
console.log(task);
list.removeChild(task);
localStorage['list'] = list.innerHTML;
}

if (localStorage['list']) {
list.innerHTML = localStorage['list'];
let listBtns = list.querySelectorAll('button');
for (btn of listBtns) {
btn.addEventListener('click', removeNote);
}
}
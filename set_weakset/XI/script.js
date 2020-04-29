let set = new Set

let sess = document.querySelectorAll('p')
let ses = document.getElementById('buttong')

for (let elem of sess){
	elem.addEventListener('click', function(){set.add(this)
	})
}
var sssss = 0
function onclickButton(){
	ses.innerHTML = ""
	for (let elem of set){
		sssss = sssss+1
		if (sssss!=set.size){
			elem.innerHTML+='!'
		} 
	}
	
	set.clear
	console.log(set)
}
	

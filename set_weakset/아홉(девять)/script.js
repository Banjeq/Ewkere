


	console.clear();
	let td = document.getElementById('textField');
	b = document.getElementById('a');
	let set = new Set;
	
	function onclickButton(){
		set.add(td.value)
		b.innerHTML = ""
		for (let alls of set){
			if (set.size>1){
				b.innerHTML = b.innerHTML + ", "+alls 
			}
			else{
				b.innerHTML = b.innerHTML+ alls 
			}
		}
		if(set.size != 1){
			b.innerHTML =b.innerHTML.slice(1)
		}
		
	console.log(set)
	}
	
	

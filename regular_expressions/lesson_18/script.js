

function onclickButton(){
	console.clear();
	var textField = document.getElementById("textField").value
	
	console.log('\n string - ' + textField)
	console.log('\n\n18.2 - ' + /http:|https:/.test(textField))
	console.log('\n18.4 - ' + /.jpg|.jpeg/.test(textField))
	console.log('\n18.6 - ' + (!/\D/.test(textField) && textField.length<12 && textField.length>=1))
	console.log('\n18.8 - ' + /^\d{1,2}\.\d{1,2}\.\d{4}$/.test(textField))
	console.log('\n18.10 - ' + /.+@.+\..+/i.test(textField))
}
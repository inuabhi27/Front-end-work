function setup() 
{
    document.getElementById("theButton").addEventListener("click", makePost, true);
}

function makePost() {
    var httpRequest = new XMLHttpRequest();
    

	if (!httpRequest) {
		alert('Giving up :( Cannot create an XMLHTTP instance');
		return false;
	}
	
	httpRequest.open("POST", "/create_game");
	httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    var data;
    data = "two=" + document.getElementById("b").value;
    httpRequest.send(data);
    if(alert("Created a new game!!")){}
    else    window.location.reload();
}




window.addEventListener("load", setup, true);



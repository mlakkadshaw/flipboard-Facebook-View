
//Some Global variables

var globalContent;
var maxPostPerPage = 6;
var postPerPage = 0;
var pageNumber = 1;
var globalAccessToken;

var topLeft, topMiddle, topRight, bottomLeft, bottomMiddle, bottomRight;

topLeft = topMiddle =  topRight = bottomLeft = bottomMiddle = bottomRight = 0;

var postPosition = { "left": "box w-25 h-50",
					  "middle": "box w-50 h-50 box-b-l box-b-r",
					  "right": "box w-25 h-50",
					  "bottomLeft": "box w-25 h-50 title-top",
					  "bottomMiddle": "box w-50 h-50 title-top",
					  "bottomRight":"box w-25 h-50 title-top"
					  }


function init(url) {

	url = url+"&callback=parseFeeds"+"&random="+(new Date()).getTime();
	if(url != null)
	{
		var newScriptElement = document.createElement("script");
		newScriptElement.setAttribute("src",url);
		newScriptElement.setAttribute("id","jsonp");
		
		var oldScriptElement = document.getElementById("jsonp");
		var footer = document.getElementsByClassName("footer")[0];
		if(oldScriptElement == null)
		{
			footer.appendChild(newScriptElement);
		} else {
			footer.replaceChild(newScriptElement, oldScriptElement);
		}
		
	}

}


function parseFeeds(inputData) {
globalContent = inputData;

for(var i=0; i< inputData.data.length; i++) {
	
	var content = inputData.data[i];
	
	if(postPerPage === maxPostPerPage) {
		pageNumber++;
		addPage("Facebook Feeds",pageNumber);
	}
	postPerPage++;
	

	if(topLeft === 0)
	{
		topLeft = 1;
		addContent(content, postPosition.left);
	}
	else if(topMiddle === 0)
	{
		topMiddle = 1;
		addContent(content, postPosition.middle)
	}
	else if(topRight === 0)
	{
		topRight = 1;
		addContent(content, postPosition.right)
	}
	else if(bottomLeft === 0)
	{
		bottomLeft = 1;
		addContent(content, postPosition.bottomLeft)
	}
	else if(bottomMiddle === 0)
	{
		bottomMiddle = 1;
		addContent(content, postPosition.bottomMiddle)
	}
	else if(bottomRight === 0)
	{
		bottomRight = 1;
		addContent(content, postPosition.bottomRight)
	}
	
}



}


function addContent(content, position)
{
	
	var dataFrom = content.from.name;
	var dataMessage = content.message;
	var dataPicture = content.picture;
	
	var post = document.createElement("div");
	post.setAttribute("class",position);
	
	if(dataFrom != null)
	{
		var heading = document.createElement("h3");
		heading.innerHTML = dataFrom;
		post.appendChild(heading);
	}
	
	if(dataPicture != null)
	{
		var imageContainer = document.createElement("div");
		imageContainer.setAttribute("class", "img-cont");
		
		var image = document.createElement("img");
		image.setAttribute("src",dataPicture);
		
		imageContainer.appendChild(image);
		
		post.appendChild(imageContainer);
	}
	
	if(dataMessage != null)
	{
		var message = document.createElement("p");
		message.innerHTML = dataMessage;
		post.appendChild(message);
	}
	
	if(content === null)
	{
		var button = document.createElement("button");
		button.setAttribute("onClick",loadMore);
		button.innerHTML = "Load More";
		post.appendChild(button); 
	}
	
	
	var mainPage = document.getElementById(pageNumber);
	if(mainPage != null)
	{
	mainPage.appendChild(post);
	} 
}




//Adds a new page
function addPage(title, number) {
	//Make postPerPage to 0
	//Make all postboxes to 0
	
	postPerPage = 0;
	topLeft = topMiddle = topRight = bottomLeft = bottomMiddle = bottomRight = 0;
	
	var newPage = document.createElement("div");
	newPage.setAttribute("class","f-page");
	newPage.setAttribute("id",number);
	
	var pageTitle = document.createElement("div");
	pageTitle.setAttribute("class","f-title");
	pageTitle.innerHTML = "<h2>"+title+"</h2>";
	
	newPage.appendChild(pageTitle);
	
	
		
		var oldLastPage = document.getElementById("lastPage");
		var flip = document.getElementById("flip");
		if(oldLastPage == null)
		{
			flip.appendChild(newPage)
		} else {
			flip.replaceChild(newPage, oldLastPage);
		}
}




//Adds the last page
function createLastPage() {
alert("Called");
var fpage = document.createElement("div");
fpage.setAttribute("class","f-page");

fpage.setAttribute("id","lastPage");

var corpse = document.createElement("div");
corpse.setAttribute("id","codrops-ad-wrapper");

fpage.appendChild(corpse);

var flip = document.getElementById("flip");
flip.appendChild(fpage);
}


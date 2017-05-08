var SOURCES_LOC = [['Alchemist', '84 Massachusetts Ave, MIT Stratton Student Center Lawn, Cambridge, MA 02139', 'alchemist'],['MIT\'s Great Dome','77 Massachusetts Ave, Cambridge, MA 02139','dome'],['MIT\'s Great Dome','77 Massachusetts Ave, Cambridge, MA 02139','dome2'],['Kresge Auditorium','48 Massachusetts Ave, Cambridge, MA 02139','kresge'],['For Marjorie','500 Memorial Drive, Cambridge, MA 02139','redsculpture'],['McCormick Hall', '320 Memorial Drive, Cambridge, MA 02139','river'],['Simmons Hall', '229 Vassar St, Cambridge, MA 02139','simmons'],['Stata Center', '32 Vassar St, Cambridge, MA 02139','stata2'],['Aesop\'s Fables, II', '32 Vassar St, Cambridge, MA 02139','stata3']];

var MIN_NUM_PHOTOS = 2
var NUM_MAPS = 3

$(document).ready(function() {
	var random = Math.floor(Math.random()*NUM_MAPS) + 1;

	var map = document.createElement('img');
	map.setAttribute('id', 'mapimage');
	map.setAttribute('src', 'images/map'+random+'.png');
	map.setAttribute('width', '100%');
	map.setAttribute('class', 'map');
	document.getElementById('mapcontainer').appendChild(map);

	window.setTimeout(function() {
		// $(".bootstrap-tagsinput input").get(0).focus();
		//console.log($(".bootstrap-tagsinput input").get(0))
	}, 500);

	// document.getElementsByClassName('searchinput')[0].focus();
});

$(document).on('click', '.heart', function(evt)
{
	toastr.options = {
	  "closeButton": false,
	  "debug": false,
	  "newestOnTop": false,
	  "progressBar": false,
	  "positionClass": "toast-bottom-right",
	  "preventDuplicates": false,
	  "onclick": null,
	  "showDuration": "100",
	  "hideDuration": "100",
	  "timeOut": "2000",
	  "extendedTimeOut": "100",
	  "showEasing": "swing",
	  "hideEasing": "linear",
	  "showMethod": "fadeIn",
	  "hideMethod": "fadeOut"
	}

	var heart = evt.target;
	if (heart.className == 'heart unheart') {
		heart.setAttribute('src', './images/heart.png');
		heart.className = 'heart faved';

		toastr.success('Added ' + evt.target.getAttribute('title') + ' to Inspirations');

	} else {
		heart.setAttribute('src', './images/whiteheart.png');
		heart.className = 'heart unheart';

  		toastr.success('Removed ' + evt.target.getAttribute('title') + ' from Inspirations');
	}
});

$(document).on('click', '.searchpinimage', function(evt)
{
	toastr.options = {
	  "closeButton": false,
	  "debug": false,
	  "newestOnTop": false,
	  "progressBar": false,
	  "positionClass": "toast-bottom-right",
	  "preventDuplicates": false,
	  "onclick": null,
	  "showDuration": "100",
	  "hideDuration": "100",
	  "timeOut": "2000",
	  "extendedTimeOut": "100",
	  "showEasing": "swing",
	  "hideEasing": "linear",
	  "showMethod": "fadeIn",
	  "hideMethod": "fadeOut"
	}

	if (evt.target.style.opacity == 0.25) {
		evt.target.style.opacity = 1.0;

		toastr.success('Added ' + evt.target.getAttribute('title') + ' Pin to Search Map');

		// Show pin
		var mapX = evt.target.getAttribute('mapx');
		var mapY = evt.target.getAttribute('mapy');

		var button = document.createElement('div');
		button.setAttribute('id', 'pin-'+mapX+'-'+mapY);
		button.setAttribute('class', 'pin-div');
		button.setAttribute('location', evt.target.getAttribute('title'));
		button.style.left = mapX-16 + 'px';
		button.style.top = mapY-32 + 'px';

		var pin = document.createElement('input');
		pin.setAttribute('class', 'mappin');
		pin.setAttribute('type', 'image');
		pin.setAttribute('src', './pin.png');
		button.appendChild(pin);
		document.getElementById('mapcontainer').appendChild(button);

		var pinText = document.createElement('label');
		pinText.setAttribute('class', 'searchpintext');
		pinText.setAttribute('id', 'text-pin-' + mapX + '-' + mapY);
		pinText.innerHTML = evt.target.getAttribute('title');
		pinText.style.visibility=  "hidden";
		button.appendChild(pinText);
	} else {
		evt.target.style.opacity = 0.25;

		toastr.success('Removed ' + evt.target.getAttribute('title') + ' Pin from Search Map');

		// Hide pin
		var mapX = evt.target.getAttribute('mapx');
		var mapY = evt.target.getAttribute('mapy');

		var button = document.getElementById('pin-'+mapX+'-'+mapY);
		document.getElementById('mapcontainer').removeChild(button);
	}
});

$(document).on('click', '#searchgobutton', function(evt)
{
	refreshImages();
});

// $(document).on('click', '#searchphotoimg', function(evt)
// {
// 	window.location.href = "./directions.html";
// });

// $(document).on('click', '.pin-div', function(evt)
// {
// 	window.location.href = "./directions.html";
// });

$(document).on('mouseenter', '.pin-div', function(evt)
{
	var pinText = document.getElementById('text-' + evt.currentTarget.getAttribute('id'));
	pinText.style.visibility=  "visible";
});

$(document).on('mouseleave', '.pin-div', function(evt)
{
	var pinText = document.getElementById('text-' + evt.currentTarget.getAttribute('id'));
	pinText.style.visibility=  "hidden";
});

$(document).on('keydown', function(evt)
{
  if (evt.keyCode == 13/*enter*/) {
  	setTimeout(function(){
	  	refreshImages();
    }, 1);
  }
});

function refreshImages()
{
	var column1 = document.getElementById('search-col-1');
	column1.innerHTML = '';
	var column2 = document.getElementById('search-col-2');
	column2.innerHTML = '';

	var FILTERS = $(".searchinput").tagsinput('items');
	if (FILTERS.length == 0) {
		return;
	}

	var NUM_PHOTOS = MIN_NUM_PHOTOS + Math.floor(Math.random()*4);
	for (p=0; p<NUM_PHOTOS; p++) {
		var available = SOURCES_LOC.slice(0);

		var random = Math.floor(Math.random()*available.length);
		var src = './images/'+available[random][2]+'.jpg';

		var photoDiv = document.createElement('div');

		var photo = document.createElement('div');
		photo.setAttribute('id', 'photo-'+p);
		photo.setAttribute('class', 'photo');

		var img = document.createElement('img');
		img.setAttribute('id', 'searchphotoimg');
		img.setAttribute('class', 'directionsRedirect');
		img.setAttribute('src', src);
		img.setAttribute('width', '200px');
		img.setAttribute('height', '200px');
		photo.appendChild(img);

		var button = document.createElement('div');
		button.setAttribute('class', 'heart-div');

		var heart = document.createElement('input');
		heart.setAttribute('type', 'image');
		heart.setAttribute('src', './images/whiteheart.png');
		heart.setAttribute('class', 'heart unheart');
		heart.setAttribute('title', available[random][0]);
		button.appendChild(heart);
		photo.appendChild(button);

		var pic = document.createElement('div');
		pic.setAttribute('id', 'inspr-'+p);
		pic.setAttribute('class', 'pic');
		photo.appendChild(pic);

		var div = document.createElement('div');
		photo.appendChild(div);

		var titleHolder = document.createElement('div');
		var pin = document.createElement('input');
		pin.setAttribute('type', 'image');
		pin.setAttribute('src', './pin.png');
		pin.setAttribute('class', 'searchpinimage');
		pin.setAttribute('title', available[random][0]);
		pin.style.filter = 'contrast(100%)'
	  	var map = document.getElementById('mapimage');
		var mapWidth = map.clientWidth;
		var mapHeight = map.clientHeight;
		var randomX = Math.floor(Math.random()*mapWidth);
		var randomY = Math.floor(Math.random()*mapHeight);
		pin.setAttribute('mapX', randomX);
		pin.setAttribute('mapY', randomY);
		titleHolder.appendChild(pin);

		var title = document.createElement('h4');
		titleHolder.setAttribute('class','searchtitleholder')
		title.setAttribute('class','title directionsRedirect');
		title.innerHTML = available[random][0];
		titleHolder.appendChild(title)


		photoDiv.appendChild(photo);
		photoDiv.appendChild(titleHolder);

		if (p%2 == 0) {
			var column = document.getElementById('search-col-1');
			column.appendChild(photoDiv);
		} else {
			var column = document.getElementById('search-col-2');
			column.appendChild(photoDiv);
		}

		available.splice(random,1);
	}

	var pins = document.getElementsByClassName('searchpinimage');
	for (p=0; p<pins.length; p++) {
		var pin = pins[p];
		pin.style.opacity = 0.25;
	}
}

$(document).on('click', '.directionsRedirect', function(evt)
{
	var placeName = evt.target.parentElement.parentElement.childNodes[1].childNodes[0].title;
	window.location.href = "./directions.html?place="+placeName;
});
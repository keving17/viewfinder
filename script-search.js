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
});

$(document).on('click', '.heart', function(evt)
{
	if (evt.target.style.filter == 'grayscale(1)') {
		evt.target.style.filter = 'grayscale(0)';
	} else {
		evt.target.style.filter = 'grayscale(1.0)';
	}
});

$(document).on('click', '.searchpinimage', function(evt)
{
	if (evt.target.style.opacity == 0.25) {
		evt.target.style.opacity = 1.0;

		// Show pin
		var mapX = evt.target.getAttribute('mapx');
		var mapY = evt.target.getAttribute('mapy');

		var button = document.createElement('div');
		button.setAttribute('id', 'pin-'+mapX+'-'+mapY);
		button.setAttribute('class', 'pin-div');
		button.style.left = mapX-16 + 'px';
		button.style.top = mapY-32 + 'px';

		var pin = document.createElement('input');
		pin.setAttribute('class', 'mappin');
		pin.setAttribute('type', 'image');
		pin.setAttribute('src', './pin.png');
		button.appendChild(pin);
		document.getElementById('mapcontainer').appendChild(button);
	} else {
		evt.target.style.opacity = 0.25;

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

$(document).on('click', '#searchphotoimg', function(evt)
{
	window.location.href = "./directions.html";
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
		img.setAttribute('src', src);
		img.setAttribute('width', '200px');
		img.setAttribute('height', '200px');
		photo.appendChild(img);

		var button = document.createElement('div');
		button.setAttribute('class', 'heart-div');

		var heart = document.createElement('input');
		heart.setAttribute('type', 'image');
		heart.setAttribute('src', './images/heart.png');
		heart.setAttribute('class', 'heart');
		button.appendChild(heart);
		photo.appendChild(button);

		var pic = document.createElement('div');
		pic.setAttribute('id', 'inspr-'+p);
		pic.setAttribute('class', 'pic');
		photo.appendChild(pic);

		/*
		var filtersList = document.createElement('div');
		filtersList.setAttribute('class', 'filters');
		filtersList.setAttribute('display', 'block');
		filtersList.setAttribute('text-align', 'center');
		filtersList.setAttribute('vertical-align', 'center');
		filtersList.setAttribute('margin', 'auto');
		for (f=0; f<filters.length; f++) {
			var filter = document.createElement('div');
			filter.innerHTML = filters[f];
			filtersList.appendChild(filter);
		}
		pic.appendChild(filtersList);
		*/

		var div = document.createElement('div');
		photo.appendChild(div);

		var titleHolder = document.createElement('div');
		var title = document.createElement('h4');
		titleHolder.setAttribute('class','searchtitleholder')
		title.setAttribute('class','title');
		title.innerHTML = available[random][0];
		titleHolder.appendChild(title)

		available.splice(random,1);

		var pin = document.createElement('input');
		pin.setAttribute('type', 'image');
		pin.setAttribute('src', './pin.png');
		pin.setAttribute('class', 'searchpinimage');
		pin.style.filter = 'contrast(100%)'
	  var map = document.getElementById('mapimage');
		var mapWidth = map.clientWidth;
		var mapHeight = map.clientHeight;
		var randomX = Math.floor(Math.random()*mapWidth);
		var randomY = Math.floor(Math.random()*mapHeight);
		pin.setAttribute('mapX', randomX);
		pin.setAttribute('mapY', randomY);
		title.appendChild(pin);

		photoDiv.appendChild(photo);
		photoDiv.appendChild(titleHolder);

		if (p%2 == 0) {
			var column = document.getElementById('search-col-1');
			column.appendChild(photoDiv);
		} else {
			var column = document.getElementById('search-col-2');
			column.appendChild(photoDiv);
		}
	}

	var hearts = document.getElementsByClassName('heart');
	for (h=0; h<hearts.length; h++) {
		var heart = hearts[h];
		heart.style.filter = 'grayscale(1.0)';
	}

	var pins = document.getElementsByClassName('searchpinimage');
	for (p=0; p<pins.length; p++) {
		var pin = pins[p];
		pin.style.opacity = 0.25;
	}
}

var NUM_PHOTOS = 8
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
		evt.target.style.filter = 'grayscale(1.0)';

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

	for (p=0; p<NUM_PHOTOS; p++) {
		var available = FILTERS.slice();
		var filters = [];
		var num_filters = Math.floor(Math.random()*FILTERS.length)+1;
		for (r=0; r<num_filters && r<5; r++) {
			var random = Math.floor(Math.random()*available.length);
			var f = available[random];
			available.splice(random,1);
			filters.push(f);
		}

		var photo = document.createElement('div');
		photo.setAttribute('id', 'photo-'+p);
		photo.setAttribute('class', 'photo');

		var button = document.createElement('div');
		button.setAttribute('class', 'heart-div');

		var heart = document.createElement('input');
		heart.setAttribute('type', 'image');
		heart.setAttribute('src', './heart.png');
		heart.setAttribute('class', 'heart');

  	var map = document.getElementById('mapimage');
		var mapWidth = map.clientWidth;
		var mapHeight = map.clientHeight;
		var randomX = Math.floor(Math.random()*mapWidth);
		var randomY = Math.floor(Math.random()*mapHeight);
		heart.setAttribute('mapX', randomX);
		heart.setAttribute('mapY', randomY);
		button.appendChild(heart);
		photo.appendChild(button);

		var pic = document.createElement('div');
		pic.setAttribute('id', 'inspr-'+p);
		pic.setAttribute('class', 'pic');
		photo.appendChild(pic);

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

		if (p%2 == 1) {
			var column = document.getElementById('search-col-1');
			column.appendChild(photo);
		} else {
			var column = document.getElementById('search-col-2');
			column.appendChild(photo);
		}
	}

	var hearts = document.getElementsByClassName('heart');
	for (h=0; h<hearts.length; h++) {
		var heart = hearts[h];
		heart.style.filter = 'grayscale(1.0)';
	}
}

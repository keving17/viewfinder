var NUM_MAPS = 3

$(document).ready(function() {
	var URL = decodeURIComponent(window.location.href);
	var index = URL.indexOf('=');
	var placeName = URL.substr(index+1,URL.length);
  document.title = placeName;
	document.getElementById('placeName').innerHTML = placeName;

  var random = Math.floor(Math.random()*NUM_MAPS) + 1;

  var map = document.createElement('img');
  map.setAttribute('id', 'mapimage');
  map.setAttribute('src', 'images/map'+random+'.png');
  map.setAttribute('width', '100%');
  map.setAttribute('class', 'map');
  document.getElementById('mapcontainer').appendChild(map);

  window.setTimeout(function() {
    // Create pin
    var map = document.getElementById('mapimage');
    var mapWidth = map.clientWidth;
    var mapHeight = map.clientHeight;
    var randomX = 64 + Math.floor(Math.random()*(mapWidth - 128))-16;
    var randomY = 64 + Math.floor(Math.random()*(mapHeight - 128))-32;

    var button = document.createElement('div');
    button.setAttribute('id', 'realpin-'+randomX+'-'+randomY);
    button.setAttribute('class', 'pin-div');
    button.style.left = randomX + 'px';
    button.style.top = randomY + 'px';

    var pin = document.createElement('input');
    pin.setAttribute('id', 'realpinimg-'+randomX+'-'+randomY);
    pin.setAttribute('class', 'staticmap');
    pin.setAttribute('type', 'image');
    pin.setAttribute('src', './images/mappin.png');
    button.appendChild(pin);
    document.getElementById('mapcontainer').appendChild(button);
  }, 1);
});


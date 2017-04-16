var FILTERS = ['grass', 'water', 'building', 'sculpture'];
var NUM_PHOTOS = 8

$(document).ready(function() {
	for (p=0; p<NUM_PHOTOS; p++) {
		var available = FILTERS.slice();
		var filters = [];
		var num_filters = Math.floor(Math.random()*FILTERS.length)+1;
		for (r=0; r<num_filters; r++) {
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
		heart.setAttribute('src', 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Heart_coraz%C3%B3n.svg/169px-Heart_coraz%C3%B3n.svg.png');
		heart.setAttribute('class', 'heart');
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
			var column = document.getElementById('inspr-col-1');
			column.appendChild(photo);
		} else {
			var column = document.getElementById('inspr-col-2');
			column.appendChild(photo);
		}
	}

	var hearts = document.getElementsByClassName('heart');
	for (h=0; h<hearts.length; h++) {
		var heart = hearts[h];
		heart.style.filter = 'contrast(0%)';
	}
});

$(document).on('click', '#inspiration .heart', function(evt) 
{
	var photo = evt.target.parentElement.parentElement.cloneNode(true);
	var heart = photo.childNodes[0].childNodes[0];

	if (heart.style.filter == 'contrast(0%)') {
		var column;
		var column1 = document.getElementById('fav-col-1');
		var column2 = document.getElementById('fav-col-2');

		if (column1.childNodes.length == column2.childNodes.length) {
			column = column1;
		} else {
			column = column2;
		}

		photo.setAttribute('id', 'fav'+photo.id.substr(4,photo.id.length));

		column.appendChild(photo);
		heart.style.filter = 'contrast(100%)';
		evt.target.style.filter = 'contrast(100%)';
	} else {
		evt.target.style.filter = 'contrast(0%)';
		var fav = document.getElementById('fav'+photo.id.substr(4,photo.id.length));
		fav.parentElement.removeChild(fav);
	}
});

$(document).on('click', '#favorites .heart', function(evt) 
{
	var photo = evt.target.parentElement.parentElement;
	var heart = photo.childNodes[0].childNodes[0];
	var inspr = document.getElementById('photo'+photo.id.substr(4,photo.id.length));

	inspr.childNodes[0].childNodes[0].style.filter = 'contrast(0%)';
	photo.parentElement.removeChild(photo);
});
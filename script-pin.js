var FILTERS = ['grass', 'water', 'building', 'sculpture'];
var NUM_PHOTOS = 4

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
		var row = document.createElement('div');
		row.setAttribute('class','row');
		row.setAttribute('id','pinned');

		var leftDiv = document.createElement('div');
		leftDiv.setAttribute('class','col-md-3');
		leftDiv.setAttribute('id','pin-col-photos');
		
		var rightDiv = document.createElement('div');
		rightDiv.setAttribute('class','col-md-9');
		rightDiv.setAttribute('id','pin-col-photos');

		row.appendChild(leftDiv);
		row.appendChild(rightDiv);

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

			rightDiv.innerHTML = rightDiv.innerHTML + filters[f] +", "
		}
		pic.appendChild(filtersList);

		leftDiv.appendChild(photo);

		document.getElementById('content').appendChild(row);

	}

	var hearts = document.getElementsByClassName('heart');
	for (h=0; h<hearts.length; h++) {
		var heart = hearts[h];
		heart.style.filter = 'contrast(0%)';
	}

});

$(document).on('click', '#pinned .heart', function(evt)
{
	var photo = evt.target.parentElement.parentElement.cloneNode(true);
	var heart = photo.childNodes[0].childNodes[0];

	if (evt.target.style.filter == 'contrast(0%)') {
		evt.target.style.filter = 'contrast(100%)';
	} else {
		evt.target.style.filter = 'contrast(0%)';
	}
});
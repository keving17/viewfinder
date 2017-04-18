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
		var row = document.createElement('div');
		row.setAttribute('class','row pin');
		row.setAttribute('id','pinned');

		var leftDiv = document.createElement('div');
		leftDiv.setAttribute('class','col-md-3 pin-col-photos');
		
		var rightDiv = document.createElement('div');
		rightDiv.setAttribute('class','col-md-9 pin-col-photos description');

		row.appendChild(leftDiv);
		row.appendChild(rightDiv);

		var photo = document.createElement('div');
		photo.setAttribute('id', 'photo-'+p);
		photo.setAttribute('class', 'photo pin');

		var button = document.createElement('div');
		button.setAttribute('class', 'heart-div');
		var heart = document.createElement('input');
		heart.setAttribute('type', 'image');
		heart.setAttribute('src', './heart.png');
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

			//rightDiv.innerHTML = rightDiv.innerHTML + filters[f] +", "
			
		}
		pic.appendChild(filtersList);

		var titleHolder = document.createElement('div');
		var title = document.createElement('h4');
		title.setAttribute('class','title');
		title.innerHTML = "Stata Center";
		var address = document.createElement('div');
		address.innerHTML = "32 Vassar St, Cambridge, MA 02139";

		var description = document.createElement('div');
		description.innerHTML = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque non sapien vel odio tempus cursus. Donec vitae libero massa. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Maecenas elementum nisl id ullamcorper scelerisque. Nam quis arcu gravida, vestibulum ipsum ut, malesuada tellus. Morbi eu imperdiet elit. Morbi condimentum dignissim nunc scelerisque cursus. Mauris nec neque facilisis, consequat est quis, eleifend magna."

		var pin = document.createElement('input');
		pin.setAttribute('type', 'image');
		pin.setAttribute('src', './pin.png');
		pin.setAttribute('class', 'pinimage');
		pin.style.filter = 'contrast(0%)'
		title.appendChild(pin);


		rightDiv.appendChild(titleHolder);
		titleHolder.appendChild(title)
		rightDiv.appendChild(address);
		rightDiv.appendChild(description);

		leftDiv.appendChild(photo);

		document.getElementById('content').appendChild(row);

	}

	var hearts = document.getElementsByClassName('heart');
	for (h=0; h<hearts.length; h++) {
		var heart = hearts[h];
		heart.style.filter = 'grayscale(1.0)';
	}

});

$(document).on('click', '#pinned .heart', function(evt)
{
	var photo = evt.target.parentElement.parentElement.cloneNode(true);
	var heart = photo.childNodes[0].childNodes[0];

	if (evt.target.style.filter == 'grayscale(0)') {
		evt.target.style.filter = 'grayscale(1.0)';
	} else {
		evt.target.style.filter = 'grayscale(0)';
	}
});

$(document).on('click', '.pinimage', function(evt)
{
	var photo = evt.target.parentElement.parentElement.cloneNode(true);
	var heart = photo.childNodes[0].childNodes[0];

	if (evt.target.style.filter == 'contrast(100%)') {
		evt.target.style.filter = 'contrast(0%)';
	} else {
		evt.target.style.filter = 'contrast(100%)';
	}
});
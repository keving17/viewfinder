// var FILTERS = ['grass', 'water', 'building', 'sculpture'];
var SOURCES = ['alchemist', 'dome', 'dome2', 'kresge', 'redsculpture', 'river', 'simmons', 'stata', 'stata2', 'stata3'];
var NUM_PHOTOS = 8

$(document).ready(function() {
	var available = SOURCES.slice();
	for (p=0; p<NUM_PHOTOS; p++) {
		// var available = FILTERS.slice();
		// var filters = [];
		// var num_filters = Math.floor(Math.random()*FILTERS.length)+1;
		// for (r=0; r<num_filters; r++) {
		// 	var random = Math.floor(Math.random()*available.length);
		// 	var f = available[random];
		// 	available.splice(random,1);
		// 	filters.push(f);
		// }
		var random = Math.floor(Math.random()*available.length);
		var src = './images/'+available[random]+'.jpg';
		available.splice(random,1);

		var photo = document.createElement('div');
		photo.setAttribute('id', 'photo-'+p);
		photo.setAttribute('class', 'photo');

		var img = document.createElement('img');
		img.setAttribute('src', src);
		img.setAttribute('width', '200px');
		img.setAttribute('height', '200px');
		photo.appendChild(img);

		var heart = document.createElement('input');
		heart.setAttribute('type', 'image');
		heart.setAttribute('src', './images/heart.png');
		heart.setAttribute('class', 'heart');
		photo.appendChild(heart);

		// var pic = document.createElement('div');
		// pic.setAttribute('id', 'inspr-'+p);
		// pic.setAttribute('class', 'pic');
		// photo.appendChild(pic);

		// var filtersList = document.createElement('div');
		// filtersList.setAttribute('class', 'filters');
		// filtersList.setAttribute('display', 'block');
		// filtersList.setAttribute('text-align', 'center');
		// filtersList.setAttribute('vertical-align', 'center');
		// filtersList.setAttribute('margin', 'auto');
		// for (f=0; f<filters.length; f++) {
		// 	var filter = document.createElement('div');
		// 	filter.innerHTML = filters[f];
		// 	filtersList.appendChild(filter);
		// }
		// pic.appendChild(filtersList);

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
		heart.style.filter = 'grayscale(1.0)';
	}
});

$(document).on('click', '#inspiration .heart', function(evt) 
{
	var photo = evt.target.parentElement.cloneNode(true);
	var heart = evt.target;

	if (heart.style.filter == 'grayscale(1)') {
	// if (heart.src == './images/unheart.png') {
		heart.style.filter = 'grayscale(0)';
		photo.childNodes[1].style.filter = 'grayscale(0)';
		// heart.setAttribuet('src', './images/heart.png');
		// var column;
		 var column1 = document.getElementById('fav-col-1');
		 var column2 = document.getElementById('fav-col-2');
		var row = document.getElementById('favorites');

		 if (column1.childNodes.length == column2.childNodes.length) {
		 	column = column1;
		 } else {
		 	column = column2;
		 }

		photo.setAttribute('id', 'fav'+photo.id.substr(5,photo.id.length));

		 column.appendChild(photo);
		//row.appendChild(photo);
	} else {
		heart.style.filter = 'grayscale(1.0)';
		// heart.setAttribute('src', './images/unheart.png');
		var fav = document.getElementById('fav'+photo.id.substr(5,photo.id.length));
		fav.parentElement.removeChild(fav);
	}
});

$(document).on('click', '#favorites .heart', function(evt) 
{
	var photo = evt.target.parentElement;
	var heart = evt.target;
	var inspr = document.getElementById('photo-'+photo.id.substr(4,photo.id.length));
	console.log('photo'+photo.id.substr(4,photo.id.length));
	inspr.childNodes[1].style.filter = 'grayscale(1.0)';
	heart.style.filter = 'grayscale(1.0)';
	// inspr.childNodes[0].childNodes[0].src = './images/unheart.png';
	// heart.src = './images/unheart.png';

	// photo.parentElement.removeChild(photo);
	$('#'+photo.id).fadeOut(500,function(){
  			this.remove();
  	});
});
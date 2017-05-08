var SOURCES = ['alchemist', 'dome', 'dome2', 'kresge', 'redsculpture', 'river', 'simmons', 'stata', 'stata2', 'stata3'];
var NUM_PHOTOS = 8
var row_num = 1;

$(document).ready(function() {
	var available = SOURCES.slice();
	for (p=0; p<NUM_PHOTOS; p++) {
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
		heart.setAttribute('src', './images/whiteheart.png');
		heart.setAttribute('height', '20px');
		heart.setAttribute('class', 'heart unheart');
		photo.appendChild(heart);

		var row = document.getElementById('inspiration');
		row.appendChild(photo);
	}
});

$(document).on('click', '#inspiration .heart', function(evt) 
{
	var photo = evt.target.parentElement.cloneNode(true);
	var heart = evt.target;
	if (heart.className == 'heart unheart') {
		heart.setAttribute('src', './images/heart.png');
		heart.className = 'heart faved';
		
		var row = document.getElementById('favorites')
		photo = evt.target.parentElement.cloneNode(true);
		photo.setAttribute('id', 'fav'+photo.id.substr(5,photo.id.length));
		row.appendChild(photo);
		$('#'+photo.id).hide();
		$('#'+photo.id).fadeIn(500,function(){
			$('#'+photo.id).show();
		});

	} else {
		heart.setAttribute('src', './images/whiteheart.png');
		heart.className = 'heart unheart';

		var fav = document.getElementById('fav'+photo.id.substr(5,photo.id.length));
		$('#'+fav.id).fadeOut(500,function(){
  			this.remove();
  		});
	}
});

$(document).on('click', '#favorites .heart', function(evt) 
{
	var photo = evt.target.parentElement;
	var heart = evt.target;
	var inspr = document.getElementById('photo-'+photo.id.substr(4,photo.id.length));

	inspr.childNodes[1].src = './images/whiteheart.png';
	inspr.childNodes[1].className = 'heart unheart';
	heart.src = './images/whiteheart.png';
	heart.className = 'heart unheart';

	$('#'+photo.id).fadeOut(500,function(){
  		this.remove();
  	});
});
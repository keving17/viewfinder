//(Name of Location, address, image src)
var SOURCES_LOC = [['Alchemist', '84 Massachusetts Ave, MIT Stratton Student Center Lawn, Cambridge, MA 02139', 'alchemist'],['MIT\'s Great Dome','77 Massachusetts Ave, Cambridge, MA 02139','dome'],['MIT\'s Great Dome','77 Massachusetts Ave, Cambridge, MA 02139','dome2'],['Kresge Auditorium','48 Massachusetts Ave, Cambridge, MA 02139','kresge'],['For Marjorie','500 Memorial Drive, Cambridge, MA 02139','redsculpture'],['Boston Skyline from McCormick Hall', '320 Memorial Drive, Cambridge, MA 02139','river'],['Simmons Hall', '229 Vassar St, Cambridge, MA 02139','simmons'],['Stata Center', '32 Vassar St, Cambridge, MA 02139','stata'],['Stata Center', '32 Vassar St, Cambridge, MA 02139','stata2'],['Aesop\'s Fables, II', '32 Vassar St, Cambridge, MA 02139','stata3']];
var NUM_PHOTOS = 8;

$(document).ready(function() {
	var available = SOURCES_LOC.slice(0);
	for (p=0; p<NUM_PHOTOS; p++) {

		var row = document.createElement('div');
		row.setAttribute('class','row pin');
		row.setAttribute('id','pinned'+p);

		var leftDiv = document.createElement('div');
		leftDiv.setAttribute('class','col-md-3 pin-col-photos');
		
		var rightDiv = document.createElement('div');
		rightDiv.setAttribute('class','col-md-9 pin-col-photos description');

		row.appendChild(leftDiv);
		row.appendChild(rightDiv);

		var random = Math.floor(Math.random()*available.length);
		var src = './images/'+available[random][2]+'.jpg';
		

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

		var titleHolder = document.createElement('div');
		var title = document.createElement('h4');
		title.setAttribute('class','title');
		title.innerHTML = available[random][0];
		var address = document.createElement('div');
		address.innerHTML = available[random][1];

		var description = document.createElement('div');
		description.innerHTML = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque non sapien vel odio tempus cursus. Donec vitae libero massa. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Maecenas elementum nisl id ullamcorper scelerisque. Nam quis arcu gravida, vestibulum ipsum ut, malesuada tellus. Morbi eu imperdiet elit. Morbi condimentum dignissim nunc scelerisque cursus. Mauris nec neque facilisis, consequat est quis, eleifend magna."

		var pin = document.createElement('input');
		pin.setAttribute('type', 'image');
		pin.setAttribute('src', './pin.png');
		pin.setAttribute('class', 'pinimage');
		pin.style.filter = 'contrast(100%)';
		pin.setAttribute('id', 'pinnedpage');
		title.appendChild(pin);


		rightDiv.appendChild(titleHolder);
		titleHolder.appendChild(title)
		rightDiv.appendChild(address);
		rightDiv.appendChild(description);

		leftDiv.appendChild(photo);

		document.getElementById('content').appendChild(row);
		available.splice(random,1);
	}

	var hearts = document.getElementsByClassName('heart');
	for (h=0; h<hearts.length; h++) {
		var heart = hearts[h];
		heart.style.filter = 'grayscale(1.0)';
	}

});

$(document).on('click', '.heart', function(evt)
{
	var photo = evt.target.parentElement.parentElement.cloneNode(true);
	var heart = photo.childNodes[0].childNodes[0];
	console.log('here')

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
		var selection = evt.target.parentElement.parentElement.parentElement.parentElement;
		$('#'+selection.id).fadeOut(500,function(){
  			this.remove();
  		});
	} else {
		evt.target.style.filter = 'contrast(100%)';
	}
});
//(Name of Location, address, image src)
var SOURCES_LOC = [['Alchemist', '84 Massachusetts Ave, MIT Stratton Student Center Lawn, Cambridge, MA 02139', 'alchemist'],['MIT\'s Great Dome','77 Massachusetts Ave, Cambridge, MA 02139','dome'],['MIT\'s Great Dome','77 Massachusetts Ave, Cambridge, MA 02139','dome2'],['Kresge Auditorium','48 Massachusetts Ave, Cambridge, MA 02139','kresge'],['For Marjorie','500 Memorial Drive, Cambridge, MA 02139','redsculpture'],['Boston Skyline from McCormick Hall', '320 Memorial Drive, Cambridge, MA 02139','river'],['Simmons Hall', '229 Vassar St, Cambridge, MA 02139','simmons'],['Stata Center', '32 Vassar St, Cambridge, MA 02139','stata'],['Stata Center', '32 Vassar St, Cambridge, MA 02139','stata2'],['Aesop\'s Fables, II', '32 Vassar St, Cambridge, MA 02139','stata3']];
var NUM_PHOTOS = 8;

$(document).ready(function() {
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
	  "timeOut": "3000",
	  "extendedTimeOut": "100",
	  "showEasing": "swing",
	  "hideEasing": "linear",
	  "showMethod": "fadeIn",
	  "hideMethod": "fadeOut"
	}
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
		img.setAttribute('class','directionsRedirect');
		img.setAttribute('src', src);
		img.setAttribute('width', '200px');
		img.setAttribute('height', '200px');
		photo.appendChild(img);

		var heart = document.createElement('input');
		heart.setAttribute('type', 'image');
		heart.setAttribute('src', './images/whiteheart.png');
		heart.setAttribute('class', 'heart unheart');
		heart.setAttribute('title', available[random][0]);
		photo.appendChild(heart);

		var titleHolder = document.createElement('div');
		var title = document.createElement('h4');
		title.setAttribute('class','title directionsRedirect');
		title.innerHTML = available[random][0];
		var address = document.createElement('div');
		address.innerHTML = available[random][1];

		var description = document.createElement('div');
		description.innerHTML = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque non sapien vel odio tempus cursus. Donec vitae libero massa. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Maecenas elementum nisl id ullamcorper scelerisque. Nam quis arcu gravida, vestibulum ipsum ut, malesuada tellus. Morbi eu imperdiet elit. Morbi condimentum dignissim nunc scelerisque cursus. Mauris nec neque facilisis, consequat est quis, eleifend magna."

		var pin = document.createElement('input');
		pin.setAttribute('type', 'image');
		pin.setAttribute('src', './pin.png');
		pin.setAttribute('class', 'pinimage pin pinned');
		//pin.style.filter = 'contrast(100%)';
		pin.setAttribute('title', available[random][0]);
		pin.setAttribute('id', 'pinnedpage'+p);
		//$('pinnedpage'+p).css('margin-right', '10px');
		titleHolder.appendChild(pin);


		rightDiv.appendChild(titleHolder);
		titleHolder.appendChild(title)
		rightDiv.appendChild(address);
		rightDiv.appendChild(description);

		leftDiv.appendChild(photo);

		document.getElementById('contentID').appendChild(row);
		available.splice(random,1);
	}

});

function undoUnpin(name) {
	console.log(name.id)
	$('#'+name.id).data('delete',false);
}

$(document).on('click', '.heart', function(evt)
{
	var photo = evt.target.parentElement.parentElement.cloneNode(true);
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

$(document).on('click', '.pinimage', function(evt)
{
	console.log(evt.target.getAttribute('class'))

	console.log('unpinned',evt.target.getAttribute('class').indexOf('unpinned'))
	//$(evt.target).css('pointer-events','none');

	$(evt.target).data('delete',true);

	var photo = evt.target.parentElement.parentElement.cloneNode(true);
	var heart = photo.childNodes[0].childNodes[0];
	var selection = evt.target.parentElement.parentElement.parentElement;

	if (evt.target.getAttribute('class').indexOf('unpinned')>=0) {
		//evt.target.setAttribute('class', 'pinimage pin pinned');
		//console.log(evt.target.id)
		//toastr.success('Added ' + evt.target.getAttribute('title') + ' Pin');

	} else {
		evt.target.setAttribute('class', 'pinimage pin unpinned');
		toastr.success('<div>Removed '+evt.target.getAttribute('title')+ ' Pin.</div><div><a href="javascript:undoUnpin('+ evt.target.id+ ')">Click here to undo!</a></div>')
		$(selection).css('pointer-events','none');
		$('#'+selection.id).fadeOut(3000,function(){
  			if ($(evt.target).data('delete')) {
  				this.remove();
  			}
  			else{
  				console.log(selection.id)
				evt.target.setAttribute('class', 'pinimage pin pinned');
  				$('#'+selection.id).fadeIn(1)
  				$(selection).css('pointer-events','auto');

  			}
  		});
		$(selection).css('pointer-events','auto');
	}
});

$(document).on('click', '.directionsRedirect', function(evt)
{
	var placeName = evt.target.parentElement.parentElement.parentElement.childNodes[1].childNodes[0].childNodes[0].title;
	window.location.href = "./directions.html?place="+placeName;
});

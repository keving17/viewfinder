var FILTERS = ['grass', 'water', 'building', 'sculpture'];
var NUM_PHOTOS = 12;

//loads pictures
function loadPictures(){
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

        var column = document.getElementById('uploadphotos-col-' + (p%4 + 1));
        column.appendChild(photo);
    }
}

$(document).ready(function() {
    loadPictures();
});

$(document).on('click', '#newAlbum', function(evt) {
    loadNewAlbum();
});



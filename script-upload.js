var FILTERS = ['grass', 'water', 'building', 'sculpture'];
var PHOTO_FILES = ['alchemist','dome','dome2','kresge','redsculpture','river','simmons','stata','stata2','stata3'];
var NUM_PHOTOS = 8;

//loads pictures
function loadPictures(){
    for (p=0; p<NUM_PHOTOS; p++) {
        var photoFile = PHOTO_FILES[Math.floor(Math.random()*PHOTO_FILES.length)];//file containing the photo chosen

        //the entire div
        var photoInfo = document.createElement('div');
        
        //the photo div
        var photo = document.createElement('div');
        photo.setAttribute('id', 'photo-'+p);
        photo.setAttribute('class', 'photo');

        //the actual picture
        var pic = document.createElement('img');
        pic.setAttribute('id', 'uploadphoto-'+p);
        pic.setAttribute('class', 'pic');
        pic.setAttribute('src',"images/" + photoFile + ".jpg");
        pic.setAttribute('width', '200px');
        pic.setAttribute('height', '200px');
        photo.appendChild(pic);
        photoInfo.appendChild(photo);

        //name for each photo
        var name = document.createElement('div');
        name.innerHTML = photoFile;
        photoInfo.appendChild(name);

        //tags for each photo
        var tags = document.createElement('div');
        tags.innerHTML = "Tags<br>";
        

        //actual tag box
        var tagBox = document.createElement('input');
        tagBox.setAttribute('type', 'text');
        tagBox.setAttribute('data-role', 'tagsinput');
        tags.appendChild(tagBox);
        
        photoInfo.appendChild(tags);

        var column = document.getElementById('uploadphotos-col-' + (p%4 + 1));
        column.appendChild(photoInfo);
    }
}

$(document).ready(function() {
    loadPictures();
});

$(document).on('click', '#upload-button', function(evt) {
    window.location.href = "./portfolio.html";
    //somehow get a dialog to appear to show the user that upload was successful
    /*
    $(document).ready(function(){
        $(".container").prepend("<dialog>Successful album upload</dialog>");
    });
    */
});



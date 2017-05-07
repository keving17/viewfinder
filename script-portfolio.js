var ALBUM_NAMES = ["Pete's Wedding", "Joe's Birthday Party", "Emily's Dance", "Beach Day", "Safari 2016"];
var BACKGROUND_PHOTOS = ['simmons', 'kresge', 'dome', 'river', 'stata'];

var IMAGE_SOURCE = "./images/"
var EXTENSION = ".jpg";
var UPLOAD_ICON_SOURCE = IMAGE_SOURCE + "plus.png";

var NUM_ALBUMS = ALBUM_NAMES.length;
var NUM_COLS = 4;
var MAX_WIDTH = 12;


//loads the columns into the page
function loadColumns(){
    var albumsDiv = $("#albums");
    var columnWidth = MAX_WIDTH/NUM_COLS;
    for (i = 0; i < NUM_COLS; i++){
        var col = $("<div id='albums-col-" + i + "' class='col-md-" + columnWidth + "'></div>");
        albumsDiv.append(col);
    }
}

//loads albums and the new album buttons
function loadAlbums(){
    for (i = 0; i < NUM_ALBUMS; i++) {
        var name = ALBUM_NAMES[i];
        var backgroundSource = IMAGE_SOURCE + BACKGROUND_PHOTOS[i] + EXTENSION;

        var album = $("<button id=$='album-" + i + "' class='album'></button>");//creates and sets the button to the right class
        album.css("background","url(" + backgroundSource + ") no-repeat scroll 0 0 transparent");
        var albumName = $("<div class='album-text'></div>");//creates the album-text within the albums
        albumName.text(name);
        album.append(albumName);

        var column = $('#albums-col-' + i%NUM_COLS);
        column.append(album);
    }

    //for adding the new album button

    var addNewAlbumName = "Add new album";
    /*
    var newAlbum = document.createElement('a');
    newAlbum.setAttribute('id', 'newAlbum');
    newAlbum.setAttribute('href', './newalbum.html');
    */
    var newAlbum = $("<button class = 'new-album'></button>");
    var newAlbumName = $('<div class=album-text></div>');

    newAlbumName.append(addNewAlbumName);
    newAlbum.append(newAlbumName);

    //attempts at making an upload icon
    //var uploadIcon = $("<img src='" + UPLOAD_ICON_SOURCE + "'class='upload'>");
    //newAlbum.append(uploadIcon);

    var column = $("#albums-col-" + NUM_ALBUMS%NUM_COLS);
    column.append(newAlbum);
}

$(document).on('click', '.album', function(evt){
    window.location.href = "./album.html";
});

$(document).on('click', '.new-album', function(evt){
    window.location.href = "./newalbum.html";
})

$(document).ready(function() {
    loadColumns();
    loadAlbums();
});

$(document).on('click', '#newAlbum', function(evt) {
    loadNewAlbum();
});



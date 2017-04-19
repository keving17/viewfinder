var ALBUM_NAMES = ["Pete's Wedding", "Joe's Birthday Party", "Emily's Dance"];
var NUM_ALBUMS = ALBUM_NAMES.length;

//loads albums and the new album buttons
function loadAlbums(){
    for (i=0; i<NUM_ALBUMS; i++) {
        var name = ALBUM_NAMES[i];

        var album = document.createElement('button');
        album.setAttribute('id', 'album-'+i);
        album.setAttribute('class', 'album');

        var albumName = document.createElement('div');
        albumName.setAttribute('class', 'album-text');
        albumName.setAttribute('display', 'block');
        albumName.setAttribute('text-align', 'center');
        albumName.setAttribute('vertical-align', 'center');
        albumName.setAttribute('margin', 'auto');

        albumName.innerHTML = name;
        album.appendChild(albumName);

        if (i%2 == 0) {
            var column = document.getElementById('albums-col-1');
            column.appendChild(album);
        } else {
            var column = document.getElementById('albums-col-2');
            column.appendChild(album);
        }
    }

    //for adding the new album button
    var addNewAlbumName = "Add new album";
    var newAlbum = document.createElement('a');
    newAlbum.setAttribute('id', 'newAlbum');
    newAlbum.setAttribute('class', 'album');
    newAlbum.setAttribute('href', './newalbum.html');

    var newAlbumName = document.createElement('div');
    newAlbumName.setAttribute('class', 'album-text');
    newAlbumName.setAttribute('display', 'block');
    newAlbumName.setAttribute('text-align', 'center');
    newAlbumName.setAttribute('vertical-align', 'center');
    newAlbumName.setAttribute('margin', 'auto');

    newAlbumName.innerHTML = addNewAlbumName;
    newAlbum.appendChild(newAlbumName);

    if (NUM_ALBUMS%2 == 0){
        var column = document.getElementById('albums-col-1');
        column.appendChild(newAlbum);
    } else {
        var column = document.getElementById('albums-col-2');
        column.appendChild(newAlbum);
    }
}

//for loading a particular album
function loadAlbum(albumName){

}

//for loading the new album page
function loadNewAlbum(){
    
}

$(document).ready(function() {
    loadAlbums();
});

$(document).on('click', '#newAlbum', function(evt) {
    loadNewAlbum();
});



$(document).ready(function() {
	var URL = decodeURIComponent(window.location.href);
	var index = URL.indexOf('=');
	var placeName = URL.substr(index+1,URL.length);
	document.getElementById('placeName').innerHTML = placeName;
});
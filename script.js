var map;

var circle;

var latitude=0;
var longitude=0;
var accuracy=0;

var heading=0;

function set_pos(lat,lon,acc){
	latitude = lat;
	longitude = lon;
	accuracy = acc;
	map.setView([lat, lon]);
	if(map.hasLayer(circle)) map.removeLayer(circle);
	circle = L.circle([lat, lon], {
		color: '#00f',
		fillColor: '#00f',
		fillOpacity: 0.5,
		radius: acc
	}).addTo(map)

}

function add_pos(lat,lon){
	set_pos(latitude + lat, longitude + lon,accuracy);
}

window.ondeviceorientation = function(event) {
	Heading = event.webkitCompassHeading;
}

window.ondeviceorientation = function(event) {
	var alpha = event.alpha;
	var beta = event.beta;
	var gamma = event.gamma;
}

function geo_success(position){
	console.log(position);
	set_pos(position.coords.latitude,position.coords.longitude,position.coords.accuracy);
}

window.onload = function(){
	map = L.map('map').setView([36.3219088,139.0032936], 18);
	
	//OSMレイヤー追加
	L.tileLayer(
		'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
		{
			attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a>',
			maxZoom: 18
		}
	).addTo(map);
	var geo_options = {
		enableHighAccuracy: true, 
		maximumAge        : 30000, 
		timeout           : 27000
	};
	var wpid = navigator.geolocation.watchPosition(geo_success, function(){}, geo_options);

}

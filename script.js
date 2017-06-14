var map;

var circle;

function geo_success(position){
	console.log(position);
	map.setView([position.coords.latitude, position.coords.longitude]);
	if(map.hasLayer(circle)) map.removeLayer(circle);
	circle = L.circle([position.coords.latitude, position.coords.longitude], {
		color: '#00f',
		fillColor: '#00f',
		fillOpacity: 0.5,
		radius: position.coords.accuracy
	}).addTo(map)
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

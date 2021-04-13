let locations = [
	{
		'title':'Gwangju, Korea',
		'lat': 35.166668,
		'lon': 126.916664,
		'desc': 'I was born here'
	},
	{
		'title':'Tokyo, Japan',
		'lat': 35.658581,
		'lon': 139.745438,
		'desc': 'My brother was born here'
	},
	{
		'title':'Osaka, Japan',
		'lat': 34.6937,
		'lon': 135.5023,
		'desc': 'My family lived here for 7 years'
	},
	{
		'title':'Yongin, Korea',
		'lat': 37.2333,
		'lon': 127.2000,
		'desc': 'My family lived here for 4 years'
	},
	{
		'title':'San Jose, U.S.A',
		'lat': 37.335480,
		'lon': -121.893028,
		'desc': 'I spent my teenage years here'
	},
	{
		'title':'Los Angeles, U.S.A',
		'lat': 34.0522,
		'lon': -118.2437,
		'desc': 'I go to university here'
	},
	{
		'title':'Atlanta, U.S.A',
		'lat': 33.748783,
		'lon': -84.388168,
		'desc': 'My mom works here'
	},
	{
		'title':'Cairo, Egypt',
		'lat': 30.005493,
		'lon': 31.477898,
		'desc': 'My dad worked here'
	}
];
/*change icon color to violet*/
var violetIcon = new L.Icon({
	  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png',
	  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
	  iconSize: [25, 41],
	  iconAnchor: [12, 41],
	  popupAnchor: [1, -34],
	  shadowSize: [41, 41]
});
	var map = L.map('map').setView([0,0],2);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

//create feature group
let myMarkers = L.featureGroup();

locations.forEach(function(item,index){
	var marker = L.marker([item.lat,item.lon],{icon: violetIcon})
		.bindPopup(item.title+": "+item.desc)
		.openPopup()

		myMarkers.addLayer(marker)
		
		$('.sidebar').append(`<div class="sidebar-item" onclick="flyToIndex(${index})">${item.title}</div>`)
});

myMarkers.addTo(map)

//define layers
let layers = {
	"My Markers":myMarkers
}

//add layer control box
L.control.layers(null,layers).addTo(map)

map.fitBounds(myMarkers.getBounds())

function flyToIndex(index){
	map.flyTo([locations[index].lat,locations[index].lon],12)
	// open the popup
	myMarkers.getLayers()[index].openPopup()
}

function ShowAndHide() {
    var x = document.getElementById('SectionName');
    if (x.style.display == 'none') {
        x.style.display = 'block';
    } else {
        x.style.display = 'none';
    }
}

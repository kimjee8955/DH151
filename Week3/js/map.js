let locations = [
	{
		'title':'Gwangju, Korea',
		'lat': 35.166668,
		'lon': 126.916664,
		'desc': 'I was born here',
		'paragraph': 'This is the city I was born in. Most of my extended family also lives here so I used to visit this city a lot during the holidays.'
	},
	{
		'title':'Tokyo, Japan',
		'lat': 35.658581,
		'lon': 139.745438,
		'desc': 'My brother was born here',
		'paragraph': 'This city is where my brother was born. Fun fact, we are only a year apart in age.'
	},
	{
		'title':'Osaka, Japan',
		'lat': 34.6937,
		'lon': 135.5023,
		'desc': 'My family lived here for 7 years',
		'paragraph': 'I spent my childhood years here (around 7 years). The rest of my family still remmebers how to speak in Japanese but unfortunately, I forgot all of it. I have a lot of happy memories associated with this place and would love to go back one day!'
	},
	{
		'title':'Yongin, Korea',
		'lat': 37.2333,
		'lon': 127.2000,
		'desc': 'My family lived here for 4 years',
		'paragraph': 'I spent most of my elementary school years here. I have not gone back to Korea since I moved to the U.S. and I miss it a lot! Fun fact, I recently found out that my roommate used to live 5 minutes away from me when she was in elementary school also. What a small world!!'
	},
	{
		'title':'San Jose, U.S.A',
		'lat': 37.335480,
		'lon': -121.893028,
		'desc': 'I spent my teenage years here',
		'paragraph': 'San Jose is the first city I lived in when I moved to the U.S. It\'s kind of a boring city now that I think about it.'
	},
	{
		'title':'Los Angeles, U.S.A',
		'lat': 34.0522,
		'lon': -118.2437,
		'desc': 'I go to university here',
		'paragraph': 'I moved here to go to UCLA! I don\'t feel ready to graduate this year tbh...'
	},
	{
		'title':'Atlanta, U.S.A',
		'lat': 33.748783,
		'lon': -84.388168,
		'desc': 'My mom works here',
		'paragraph': 'My mom currently works here! Don\'nt know much about this city but it\'s definitely a lot quieter than LA.'
	},
	{
		'title':'Cairo, Egypt',
		'lat': 30.005493,
		'lon': 31.477898,
		'desc': 'My dad worked here',
		'paragraph': 'My dad had to live here for a while when I was in high school due to his job. I have never visited this city but my dad has told me many interesting stories about this place.'
	}
];
//change icon color to violet
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

		myMarkers.addLayer(marker)
		
		//fly to location and show/hide paragraph when clicked
		$('.sidebar').append(`<div class="sidebar-item" onclick="flyToIndex(${index});ShowAndHide(${index})">${item.title}</div>`)
		//add paragraph div in side-bar
		$('.sidebar').append(`<div id = "${index}" style="display: none">${item.paragraph}<\div>`)
});

myMarkers.addTo(map)

//define layers
let layers = {
	"My Markers":myMarkers
}

//add layer control box
L.control.layers(null,layers).addTo(map)

map.fitBounds(myMarkers.getBounds())

//add button on map for default view
L.easyButton('fa-globe', function(btn,map){
	map.fitBounds(myMarkers.getBounds());
}, 'default view').addTo(map);

//only fly to each location when the paragraphs aren't there
function flyToIndex(index){
	var x = document.getElementById(index);
	if (x.style.display == 'none'){
		map.flyTo([locations[index].lat,locations[index].lon],12)
		// open the popup
		myMarkers.getLayers()[index].openPopup()	
	}
}

//show and hide paragraph 
function ShowAndHide(index) {
    var x = document.getElementById(index);
    if (x.style.display == 'none') {
        x.style.display = 'block';
    } else {
        x.style.display = 'none';
    }
}

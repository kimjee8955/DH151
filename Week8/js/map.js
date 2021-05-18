// Global variables
let jsondata;
let map;
let lat = 0;
let lon = 0;
let zl = 3;
let markers = L.featureGroup();

// initialize
$( document ).ready(function() {
    createMap(lat,lon,zl);
	getJSON();
});

// create the map
function createMap(lat,lon,zl){
	map = L.map('map').setView([lat,lon], zl);

	L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',
	{
		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		maxZoom: 18,
		id: 'dark-v10',
		tileSize: 512,
		zoomOffset: -1,
		accessToken: 'pk.eyJ1Ijoia2ltamVlODk1NSIsImEiOiJja290OG4xbW0wMDFlMnBucm4wemoyaTF2In0.7laNN3kEgDICURgNtmr44w'
	}).addTo(map);
}

//function to get data using API
function getJSON(){
	$.getJSON('https://data.lacity.org/resource/2nrs-mtv8.json?$order=date_rptd%20desc',function(data){
		console.log(data)
		jsondata = data;
		mapJSON("B")
	})
}

function mapJSON(race) {
//filtering data
filtered_data = jsondata.filter(item => item.vict_descent === race)
console.log(filtered_data)

//circleOptions
let circleOptions = {
    radius: 5,
    weight: 1,
    color: 'white',
    fillColor: 'red',
    fillOpacity: 0.8
}

//map markers
filtered_data.forEach(function(item){
    if(item.lat != 0){
        let marker = L.circleMarker([item.lat,item.lon],circleOptions)
        .on('mouseover',function(){
            this.bindPopup(`Victim of ${item.crm_cd_desc} is a ${item.vict_age} year old of race ${race} of gender ${item.vict_sex}`).openPopup()
            //$('.footer').append(`Victim of ${item.crm_cd_desc} is a ${item.vict_age} year old of race ${race} of gender ${item.vict_sex}`)
           /* let footerContent = document.getElementsByClassName('footer');
				footerContent.innerHTML = (
					`Victim of ${item.crm_cd_desc} is a ${item.vict_age} year old of race ${race} of gender ${item.vict_sex}`
				)*/
        })
        .on('mouseout',function(){
            $('.footer').remove()
        }) // show data on hover

        // add the circleMarker to the featuregroup
        markers.addLayer(marker)
    
}
// add the featuregroup to the map
markers.addTo(map)

// fit the circleMarkers to the map view
map.fitBounds(markers.getBounds())
})
}



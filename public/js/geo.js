
	var html5Options = { enableHighAccuracy: true, timeout: 6000, maximumAge: 0 };
	geolocator.locate(onGeoSuccess, onGeoError, true, html5Options, 'map-canvas');

  function onGeoSuccess(location) {
    console.log(location);
    var country = location.address.country;
	  var city = location.address.city;
    var longitude = location.coords.longitude;
    var latitude = location.coords.latitude;
    document.getElementById('location').innerText = longitude + " : " + latitude + " " + location.accuracy;
}
function onGeoError(error) {
        console.log(error);
    }

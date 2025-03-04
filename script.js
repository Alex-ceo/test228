function initMap() {
    var map = new google.maps.Map(document.getElementById('map'),                                                   
  center: { lat: -34.397, lng: 150.644 },
        zoom: 8
    });
}
// Load the Google Maps API script
var script = document.createElement('script');
script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap`;
script.defer = true;
document.head.appendChild(script);

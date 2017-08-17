function initialize_gmaps() {
    
    var myLatlng = new google.maps.LatLng(40.705189,-74.009209);
    
    var mapOptions = {
        center: myLatlng,
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    
    var map_canvas_obj = document.getElementById("map");
    
    var map = new google.maps.Map(map_canvas_obj, mapOptions);
    
    var marker = new google.maps.Marker({
        position: myLatlng,
        draggable: true,
        animation: google.maps.Animation.DROP,
    });
    marker.addListener('click', toggleBounce);

    marker.setMap(map);

    var infowindow = new google.maps.InfoWindow({
        content: 'FullStack Academy',
        maxWidth: 55
      });
    
      marker.addListener('click', function() {
        infowindow.open(map, marker);
      });

      function toggleBounce() {
        if (marker.getAnimation() !== null) {
          marker.setAnimation(null);
        } else {
          marker.setAnimation(google.maps.Animation.BOUNCE);
        }
      }
}



$(document).ready(function() {
    initialize_gmaps();
});
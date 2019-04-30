
let lat;
let lng;
let options= {}
 async function geocode(){
        console.log(document.getElementById('address').innerText);
        let location = document.getElementById('address').innerText;
        options = await axios.get("https://maps.googleapis.com/maps/api/geocode/json", {
          params: {
            address: location,
            key: "AIzaSyCTAH_yPmSaWOZnxvuNU157kgFdo0D8kaI"
          }
        })
        .then(function(response){
        // console.log(response);
          latitude = response.data.results[0].geometry.location.lat;
          long = response.data.results[0].geometry.location.lng;
          let marker = new google.maps.Marker({
            position:{lat:latitude, lng:long},
            map:map
          });
          options =  {
            zoom: 12,
            center: {lat:latitude, lng:long}
          }
          initMap()
        })
  .catch(function(error){
    console.log(error);
  });
}
 geocode();

 function initMap(){
   if (Object.entries(options).length > 0) {
     let map = new google.maps.Map(document.getElementById('map'), options);
     new google.maps.Marker({
            position:{lat:options.center.lat, lng:options.center.lng},
            map:map
      });
   }

  }

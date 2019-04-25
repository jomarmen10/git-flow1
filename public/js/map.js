console.log("hello");

// let options ={}
let lat = 34.0522;
let lng = -118.2437;
function initMap() {
  //map options

  options = {
    zoom: 10,
    center: { lat, lng }
  };
  //new map
  let map = new google.maps.Map(document.getElementById("map"), options);
  /*
//add marker
let marker = new google.maps.Marker({
    position:{lat:34.046698, lng:-118.2426782},
    map:map
});
let infoWindow = new google.maps.InfoWindow({
    content: '<h1>General Assembly</h1>'
});
marker.addListener('click', function(){
    infoWindow.open(map, marker);
});
*/

  addMarker({
    coords: { lat: 34.046698, lng: -118.2426782 },
    content: "<h1>General Assembly</h1>"
  });
  addMarker({
    coords: { lat: 34.0430175, lng: -118.2694428 },
    content: "<h1>Staple Center</h1>"
  });

  displayHouses(addMarker);
  //FUNCTION  FOR SERVERAL MARKERS WITHOUT HARD CODE to be added in the loop
  function addMarker(props) {
    let marker = new google.maps.Marker({
      position: props.coords,
      map: map
    });

    if (props.content) {
      let infoWindow = new google.maps.InfoWindow({
        content: props.content
      });
      marker.addListener("click", function() {
        infoWindow.open(map, marker);
      });
    }
  }
}
//script

//script
//call geocode
//geocode();

// get location
let locationForm = document.getElementById("location-form");
// let locationInput = document.querySelector('#location-input')

// listin for submit location

locationForm.addEventListener("submit", function(e) {
  e.preventDefault();
  geocode();
  displayHouses();
});

let longitude;
let latitude;
function geocode() {
  let location = document.getElementById("location-input").value;
  // let location ='630 masselin avenue Los Angeles';
  axios
    .get("https://maps.googleapis.com/maps/api/geocode/json", {
      params: {
        address: location,
        key: "AIzaSyCTAH_yPmSaWOZnxvuNU157kgFdo0D8kaI"
      }
    })
    .then(function(response) {
      //  show object of address
      // console.log(response);

      //formated address
      let formattedAddress = response.data.results[0].formatted_address;
      let formattedAddressOutput = `
<ul class="list-group">
<li class= "list-group-item">${formattedAddress}</li>
</ul>
`;
      //address components

      let addressComponents = response.data.results[0].address_components;
      let addressComponentsOutput = '<ul class="list-group">';
      for (let i = 0; i < addressComponents.length; i++) {
        addressComponentsOutput += `
  <li class="list-group-item">${addressComponents[i].types[0]}:${
          addressComponents[i].long_name
        }</li>
  `;
      }

      //geo
      lat = response.data.results[0].geometry.location.lat;
      lng = response.data.results[0].geometry.location.lng;

      // options = {
      //   zoom: 10,
      //   center: {lat, lng}
      // }
      //////////!!!!!!!!!!!!!!!!!!!!!!!!!/////

      initMap();
      // console.log(lat);

      let geometryOutput = `
<ul class="list-group">
<li class= "list-group-item"><strong>latitude</strong>:${lat}</li>
<li class= "list-group-item"><strong>longitude</strong>:${lng}</li>

</ul>
`;

      //show the list of the geo function with all the info inside the object

      //output to appdocument.getElementById('formatted-address').innerHTML =
      //formattedAddressOutput;
      // document.getElementById('address-components').innerHTML =
      // addressComponentsOutput;
      // document.getElementById('geometry').innerHTML =
      // geometryOutput;
    })
    .catch(function(error) {
      console.log(error);
    });
}

//
function displayHouses(func) {
  let houses = document.querySelectorAll(".house");
  // console.log(houses[0].attributes["1"].value)
  for (let i = 0; i < houses.length; i++) {
    locations = houses[i].attributes["1"].value.toString();
    axios
      .get("https://maps.googleapis.com/maps/api/geocode/json", {
        params: {
          address: locations,
          key: "AIzaSyCTAH_yPmSaWOZnxvuNU157kgFdo0D8kaI"
        }
      })
      .then(function(response) {
        //  show object of address
        console.log(response);

        //geo
        latitude = response.data.results[0].geometry.location.lat;
        long = response.data.results[0].geometry.location.lng;

        console.log(latitude);
        console.log(long);
        func({
          coords: { lat: latitude, lng: long },
          content: `<h1>${
            houses[i].innerText
          }</h1> <img src='https://static.dezeen.com/uploads/2017/08/clifton-house-project-architecture_dezeen_hero-1-852x479.jpg' alt='Girl in a jacket'>`
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }
}

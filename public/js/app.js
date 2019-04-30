// const House = require('../../models/houses')
// const Realtor = require('../../models/realtors')
// let price = [
//   {
//     "100k":100000
//   },
//   {
//     "200k":200000
//   }
// ]
//
// const getPrice = ()=>{
// }
// console.log(price[0]['100k'])
//
// console.log(Realtor.name)
$(document).ready(function () {
  $("#location-input").on("keyup", function () {
    var value = $(this).val().toLowerCase();
    $("#list-of-houses li").filter(function () {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });
});



//materizalize for map selection options
$(document).ready(function(){
  $('.carousel').carousel();
});
$('.carousel.carousel-slider').carousel({
  fullWidth: false,
  indicators: true,
  numVisible: 1,
  dist:0,
  noWrap: false,
});
instance.next(6);
instance.set(6);
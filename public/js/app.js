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
M.AutoInit('');
$(document).ready(function(){
  $('.carousel').carousel(instance.next(1));
  $('.carousel').carousel(instance.set(1));
  $('.carousel').carousel(instance.destory(1));
});

$('.carousel.carousel-slider').carousel({
  fullWidth: false,
  indicators: true,
  numVisible: 5,
  dist:-100,
  noWrap: false,
});


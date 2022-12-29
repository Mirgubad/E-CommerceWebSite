$(document).ready(function () {
  $("#basket").click(function () {
    $(".mini-cart").toggle(300);
  });
});

$(document).ready(function () {
  $("#close-basket-btn").click(function () {
    $(".mini-cart").hide(300);
  });
});

//   var favourite=[];
//   $(document).ready(function(){
//     $(".add-basket-btn").click(function(){
//         var id=$(this).data("id")
//         var item=$(`.wish-item[id=${id}]`).html();
//         if(!favourite.includes(item)&&item!=null){
//             favourite.push(item);
//             localStorage.setItem("favourites", JSON.stringify(favourite));
//         }
//     })
//   })

var favourite = [];

$(document).ready(function () {
  $(".product-heart").click(function () {
    var id = $(this).data("id");
    var isExist = favourite.includes(id);

    if (isExist) {

      $(".notification-error").fadeIn(1000);
      setTimeout(() => {
        $(".notification-error").fadeOut(3000);
      }, 2000);
      return;
    } else {
      favourite.push(id);
      localStorage.setItem("favouritesId", JSON.stringify(favourite));     
      $(".notification-success").fadeIn(1000);
      setTimeout(() => {
        $(".notification-success").fadeOut(3000);
      }, 2000);
    }

    // var item =document.querySelector(`.product-item[data-id="${id}"]`).outerHTML;
    // if (!favourite.includes(item) && item != null) {
    //   favourite.push(item);
    //   localStorage.setItem("favourites", JSON.stringify(favourite));
    // }
  });
});

var wishList = document.getElementById("wish-inner");
var favouriteBtn = document.getElementById("favourites-btn");

// var savedList = JSON.parse(localStorage.getItem("favourites"));
// savedList.map((item) => {
//   wishList.insertAdjacentHTML("afterbegin", item);
// });

$(document).ready(function () {
  $(".add-basket-btn").click(function () {
    $(".notification-success").fadeIn(1000);
    setTimeout(() => {
      $(".notification-success").fadeOut(3000);
    }, 2000);
  });
});


$(document).ready(function(){
  $(".wish-delete").click(function(){
    var id=$(this).data("id")
  $(`.wish-item[id=${id}]`).hide()
  $(".notification-remove").fadeIn(1000);
  setTimeout(() => {
    $(".notification-remove").fadeOut(3000);
  }, 2000);
  })
})
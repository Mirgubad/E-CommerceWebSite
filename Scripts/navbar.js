$(document).ready(function () {
  $(".has-dropdown").click(function () {
    var id = $(this).data("id");
    $(`.navbar-dropdown[id=${id}]`).toggle(200);
  });


  
  $(".footer-title").click(function () {
    var id = $(this).data("id");
    $(`.collapsed-items[id=${id}]`).toggle(300);
    $(this).toggleClass('show');
    return false;
  });

 
});

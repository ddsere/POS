$(document).ready(() => {
  $("#home").show();

  $(".nav-link, .navbar-brand").click(function (e) {
    e.preventDefault();

    $(".nav-link").removeClass("active");
    $(this).addClass("active");

    $(".page").hide();

    const target = $(this).data("target");
    console.log(target);

    $(`#${target}`).fadeIn(1000);
  });
});

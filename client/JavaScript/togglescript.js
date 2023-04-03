$(function() {
    $(".toggle").on("click", function() {
      if ($(".menu").hasClass("active")) {
        $(".menu").removeClass("active");
        $(this).find("a").html("<i class=\"bi bi-list\"></i>");
      } else {
        $(".menu").addClass("active");
        $(this).find("a").html("<i class=\"bi bi-x\"></i>");
      }
    });
  });
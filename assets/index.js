$(function() {
  // Question timing
  function toggleQuestionDisplay() {
    var current_time = parseInt($("video")[0].currentTime);

    $("#questions .question").each(function(){
      if (questionShouldShow(this, current_time)) {
        fadeInQuestion(this);
      }
      else {
        fadeOutQuestion(this);
      }
    });
  }

  function questionShouldShow(question, current_time) {
    return (parseInt($(question).data('start')) <= current_time) && (parseInt($(question).data('end')) >= current_time)
  }

  function fadeOutQuestion(question) {
    $(question).css({ opacity: 0 });
  }

  function fadeInQuestion(question) {
    $(question).css({ opacity: 1 });
  }

  setInterval(toggleQuestionDisplay, 1000);


  // Toggle details
  $("#details_toggle").on("click", function(e){
    var $details = $("#details");
    var expanded = $details.hasClass("expanded");

    $details.toggleClass("expanded");

    if (expanded) {
      $(this).html("show candidate details");
    }
    else {
      $(this).html("hide candidate details");
    }
  });
});

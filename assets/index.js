$(function() {
  // Load local ads
  const storage = require('electron-storage');
  const adminFile = 'admin.json';

  function checkForAdminData(file) {
    storage.isPathExists(file, (exists) => {
      if (exists) {
        loadAds(file);
      }
    });
  }

  function loadAds(file) {
    let ads = {};

    storage.get(file, (err, data) => {
      if (err) {
        console.error(err)
      } else {
        showAds(data);
      }
    });
  }

  function saveAds(file, ads) {
    let jsonData = {
      "adminData": {
        "adUrls": {
          "bottom": ads.bottom,
          "side": ads.side
        }
      }
    }

    storage.set('admin.json', jsonData, (err) => {
      if (err) {
        console.error(err)
      }
    });
  }

  function showAds(data) {
    setAd('bottom', data.adminData.adUrls.bottom);
    setAd('side', data.adminData.adUrls.side);
  }

  function setAd(position, url) {
    $("#ad_" + position).prop("src", url);
  }

  checkForAdminData(adminFile);


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
  $("#details_toggle").on("click", function(e) {
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


  // Toggle admin modal
  $("#admin_show").on("click", function(e) {
    $("#admin_modal").removeClass("hidden");
  });
  $("#admin_hide").on("click", function(e) {
    $("#admin_modal").addClass("hidden");
  });
  $("#admin_update").on("click", function(e) {
    var ads = {
      bottom: $("input[name='ad_bottom']").val(),
      side: $("input[name='ad_side']").val()
    }

    saveAds(adminFile, ads);
    loadAds(adminFile);

    $("#admin_modal").addClass("hidden");
  });
});

var availableGif = {

  myDesserts: ["Cup Cakes", "Cookie", "Apple Pie", "Blueberry Pie", "Banana Split", "Donut"],
  userDessert: "",

  ready: function () {

    this.displayButtons();
    this.onClick();
    $("#gif-results").hide();
  },

  onClick: function () {
    $("#add-btn").on("click", function (event) {
      event.preventDefault();
      availableGif.userDessert();
    })
    $(document).on("click", ".myNewDesserts", function () {
      var gifSelected = $(this).attr("data-name");
      $("#gif-results").text("Enjoy the " + gifSelected + "!").show();
      availableGif.callApi(gifSelected);
    })
    $(document).on("click", ".newDesserts", function () {
      var state = $(this).attr("data-state");
      var gifClicked = this;
      availableGif.changeStateofGif(state, gifClicked);
    })
  },

  userDessert: function () {

    userDessert = $("#giphy-input").val().trim();
    console.log(userDessert);
    availableGif.myDesserts.push(userDessert);
    this.displayButtons();

  },
  displayButtons: function () {
    $("#generate-buttons").empty();
    for (var i = 0; i < this.myDesserts.length; i++) {
      var newRow = "newRow" + i;
      var lastAddedRow = $("<div class='col-md-6' id=" + newRow + ">");
      var a = $("<button class='btn '>");
      a.addClass("myNewDesserts").attr("data-name", this.myDesserts[i]).text(this.myDesserts[i]);
      $("#generate-buttons").prepend(lastAddedRow);
      $(lastAddedRow).prepend(a);
    }
  },

  renderGifs: function (data) {
    $("#generate-gifs").empty();
    for (var i = 0; i < data.length; i++) {
      var newCol = $("<div class='col-md-3 col-md-4 col-xs-6'><div class='panel panel-default' id='panelID" + i + "'><div class='panel-body'>");
      var a = $("<img class='image-responsive center-block '>");
      a.addClass("newDesserts");
      a.attr("data-still", data[i].images.downsized_still.url);
      a.attr({
        "src": data[i].images.downsized_still.url,
        "data-still": data[i].images.downsized_still.url,
        "data-animate": data[i].images.fixed_height_downsampled.url,
        "data-state": "still"
      });
      var rating = "Rating: " + data[i].rating;
      var actualRating = $("<div class='panel-footer'>" + rating + "</div>")

      $("#generate-gifs").append(newCol);
      $("#panelID" + i).append(a);
      $("#panelID" + i).append(actualRating)
    }
  },

  callApi: function (gifSelected) {
    $.ajax({
      type: "GET",
      url: "https://api.giphy.com/v1/gifs/search?q=" + gifSelected + "&api_key=IK1G0a2u1flShl5TViNlirE7DWOZdtus&limit=10"
    }).done(function (response) {
      console.log(response)
      var writeGifs = response.data;
      availableGif.renderGifs(writeGifs);
    })
  },

  changeStateofGif: function (state, gifClicked) {
    if (state === "still") {
      $(gifClicked).attr("src", $(gifClicked).attr("data-animate"));
      $(gifClicked).attr("data-state", "animate");
    } else {
      $(gifClicked).attr("src", $(gifClicked).attr("data-still"));
      $(gifClicked).attr("data-state", "still");
    }
  }
}

$(document).ready(function () {
  availableGif.ready();
})
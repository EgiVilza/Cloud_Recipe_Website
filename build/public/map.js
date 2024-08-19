//Materilize function for navbar
$(document).ready(function () {
    $('.sidenav').sidenav();
  });

  //global variables
  var ingredientsArr = []
  var measuresArr = []
  var imArr = []
  var codesArr = []

  var allInfoArr = []

  var country = ""
  var queryURL = ""

  //dropdown list
  $('.dropdown-trigger').dropdown();

  //event listener for dropdown items
  $("#dropdown-countries").on("click", function (event) {

    country = ($(event.target).data("country"));
    console.log(country)
    console.log(event)
    queryURL = "https://www.themealdb.com/api/json/v1/1/filter.php?a=" + country

    var container = $("#recipe-container");
    container.empty();

    getInfo();

    //reset array
    codesArr = []

  });

  function clickMapImage(event) {
    var xCoordinate = event.offsetX;
    var yCoordinate = event.offsetY;
    longitude = ((xCoordinate / document.getElementById('map').width) * 360) - 180
    latitude = 90 - ((yCoordinate / document.getElementById('map').height) * 180)
    console.log(latitude, longitude)
    //user input
    var coordString = latitude + "," + longitude
    //appID and key
    //Old Api Key ec16e811d654f74e28ffe0acccf5a092
    var key = "2a9918933890e4ce3accd65218fffc26"
    var queryURLMap = "http://api.positionstack.com/v1/forward?access_key=" + key + "&query=" + coordString
    //              http://api.positionstack.com/v1/reverse?access_key=ec16e811d654f74e28ffe0acccf5a092&query=40.7638435,-73.9729691
    $.ajax({
      url: queryURLMap,
      method: "GET"
    })

      .then(function (response) {
        console.log(response)

        if (response.data[0].continent === "North America") {
          console.log("NA")
          if (response.data[0].country_code === "USA") {
            console.log("American")
            country = "American"
          } else if (response.data[0].country_code === "CAN" || response.data[0].country_code === "GRL") {
            console.log("Canadian")
            country = "Canadian"
          } else if (response.data[0].country_code === "MEX") {
            console.log("Mexican")
            country = "Mexican"
          } else if (response.data[0].latitude < 25.8056) {
            console.log("Jamaican")
            country = "Jamaican"
          } else {
            console.log("Canadian")
            country = "Canadian"
          }
        } else if (response.data[0].continent === "South America") {
          console.log("SA")
          country = "Jamaican"
        } else if (response.data[0].continent === "Europe") {
          console.log("EU")
          if (response.data[0].country_code === "GBR") {
            console.log("British")
            country = "British"
          } else if (response.data[0].country_code === "NLD") {
            console.log("Dutch")
            country = "Dutch"
          } else if (response.data[0].country_code === "FRA" || response.data[0].country_code === "DEU") {
            console.log("French")
            country = "French"
          } else if (response.data[0].country_code === "GRC") {
            console.log("Greek")
            country = "Greek"
          } else if (response.data[0].country_code === "IRL") {
            console.log("Irish")
            country = "Irish"
          } else if (response.data[0].country_code === "ITA") {
            console.log("Italian")
            country = "Italian"
          } else if (response.data[0].country_code === "POL") {
            console.log("Polish")
            country = "Polish"
          } else if (response.data[0].country_code === "RUS") {
            console.log("Russian")
            country = "Russian"
          } else if (response.data[0].country_code === "ESP" || response.data[0].country_code === "PRT") {
            console.log("Spanish")
            country = "Spanish"
          } else {
            console.log("Polish")
            country = "Polish"
          }
        } else if (response.data[0].continent === "Asia") {
          console.log("AS")
          if (response.data[0].country_code === "CHN") {
            console.log("Chinese")
            country = "Chinese"
          } else if (response.data[0].country_code === "IND") {
            console.log("Indian")
            country = "Indian"
          } else if (response.data[0].country_code === "JPN") {
            console.log("Japanese")
            country = "Japanese"
          } else if (response.data[0].country_code === "VNM" || response.data[0].country_code === "KHM" || response.data[0].country_code === "LAO") {
            console.log("Vietnamese")
            country = "Vietnamese"
          } else if (response.data[0].country_code === "MYS" || response.data[0].latitude <= 4.945169) {
            console.log("Malaysian")
            country = "Malaysian"
          } else if (response.data[0].country_code === "THA" || response.data[0].latitude > 4.945169 && response.data[0].latitude < 17.363465) {
            console.log("Thai")
            country = "Thai"
          } else if (response.data[0].country_code === "TUR") {
            console.log("Turkish")
            country = "Turkish"
          } else {
            console.log("Chinese")
            country = "Chinese"
          }
        } else if (response.data[0].continent === "Africa") {
          console.log("AF")
          if (response.data[0].country_code === "EGY") {
            console.log("Egyptian")
            country = "Egyptian"
          } else if (response.data[0].country_code === "KEN" || response.data[0].latitude < 15.32362) {
            console.log("Kenyan")
            country = "Kenyan"
          } else if (response.data[0].country_code === "MAR" || response.data[0].latitude > 15.32362 && response.data[0].longitude <= 13.149444) {
            console.log("Moroccan")
            country = "Moroccan"
          } else if (response.data[0].country_code === "TUN" || response.data[0].latitude > 15.32362 && response.data[0].longitude > 13.149444) {
            console.log("Tunisian")
            country = "Tunisian"
          } else {
            console.log("Kenyan")
            country = "Kenyan"
          }
        } else if (response.data[0].continent === "Oceania") {
          console.log("OC")
          country = "British"
        } else {
          console.log("Unknown")
          country = "Unknown"
        }

        queryURL = "https://www.themealdb.com/api/json/v1/1/filter.php?a=" + country

        var container = $("#recipe-container");
        container.empty();

        getInfo();

        //reset array
        codesArr = []


      })
  }

  //Send a query URL to the Recipe Search API
  $(document).ready(function () {
    $('.collapsible').collapsible();
  });


  //Function to write recipe info to the container using allInfoArr array
  function writeRecipes() {

    //Save info to appropriate variables from allInfoArr
    var foodTitle = allInfoArr.meals[0].strMeal;
    var foodImage = allInfoArr.meals[0].strMealThumb;
    var keysArr = Object.keys(allInfoArr.meals[0]);
    var valuesArr = Object.values(allInfoArr.meals[0]);
    var linkUrl = allInfoArr.meals[0].strSource;

    //select container element
    var container = $("#recipe-container");
    //create and append new list item
    var newRecipe = $("<li>");
    container.append(newRecipe);

    //create and append header div
    var header = $("<div>");
    newRecipe.append(header);
    header.addClass("collapsible-header");
    header.text(foodTitle)

    //create and append body div
    var body = $("<div>");
    newRecipe.append(body);
    body.addClass("collapsible-body");

    //Create and append organizing grid containers
    var row = $("<div>");
    var left = $("<div>");
    var middle = $("<div>");
    var right = $("<div>");
    row.addClass("row");
    left.addClass("col s4");
    right.addClass("col s8");
    body.append(row);
    row.append(left);
    row.append(right);

    //Create and append image using recipe image
    var image = $("<img>");
    image.attr("src", foodImage);
    image.addClass("responsive-img");
    left.append(image);

    //Create and append "Ingredients" title
    var ingredientTitle = $("<h5>");
    ingredientTitle.text("Ingredients:");
    right.append(ingredientTitle);

    //Create and append a list container inside body
    var ingredientList = $("<ul>");
    right.append(ingredientList);

    //Get ingredients and measures from response, combine and save to imArr array
    for (j = 0; j < keysArr.length; j++) {
      var key = keysArr[j]
      if (key.includes("strIngredient") === true) {
        ingredientsArr.push(valuesArr[j]);
      }
      if (key.includes("strMeasure") === true) {
        measuresArr.push(valuesArr[j]);
      }
    }
    //clear arrays
    keysArr = [];
    valuesArr = [];

    //Loop through and combine new arrays
    for (j = 0; j < ingredientsArr.length; j++) {
      var ingredient = ingredientsArr[j]
      var measure = measuresArr[j]

      if (ingredient === "" || ingredient === null) {
        //clear arrays and break once ingredients stop
        ingredientsArr = []
        measuresArr = []
        break
      }

      imArr[j] = (ingredient + ": " + measure)

      if (j === 19) {
        ingredientsArr = []
        measuresArr = []
        break
      }
    }

    //loop through imArr array and add list items for each
    for (j = 0; j < imArr.length; j++) {

      var newItem = $("<li>");
      ingredientList.append(newItem);
      newItem.text(imArr[j])

    }




    //Create and append button to link to preperation instructions
    var prepTitle = $("<h5>");
    right.append(prepTitle);
    var prepLink = $("<a>");
    prepLink.text("Preparation");
    prepLink.addClass("waves-effect waves-light btn");
    prepLink.attr("href", linkUrl);
    prepTitle.append(prepLink);

    //Creates object in proper format for saving to local storage
    var storedRecipe = new Object();
    storedRecipe.foodTitle = foodTitle;
    storedRecipe.foodImage = foodImage;
    storedRecipe.ingredients = imArr;
    storedRecipe.prep = allInfoArr.meals[0].strSource;
    storedRecipeString = JSON.stringify(storedRecipe)

    //clear array
    imArr = [];

    //Create and append save button
    var saveTitle = $("<h5>");
    right.append(saveTitle);
    var saveBtn = $("<a>");
    saveBtn.text("Save");
    saveBtn.addClass("waves-effect waves-light btn saveBtn");
    saveBtn.attr("recipeString", storedRecipeString);
    saveTitle.append(saveBtn);


  }

  //Pull recipes from local storage and write to screen if something is saved
  //pull saved buttons from local storage if they exist 
  allInfoArr = JSON.parse(localStorage.getItem("mapRecipes"));

  //If something was pulled, write recipes to page
  if (allInfoArr !== null) {
    writeRecipes();
  }

  //function to make ajax requests for info following map click, then run writeRecipes function
  //First AJAX request using country to recieve recipe codes

  function getInfo() {
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
      var pass1 = response

      for (var i = 0; i < response.meals.length; i++) {
        //store chosen number of codes in codesArr array
        var recipeCode = pass1.meals[i].idMeal
        codesArr.push(recipeCode)

      }

      //loop through codesArr array, make an AJAX request for detailed recipe info using each returned recipe code
      for (var i = 0; i < response.meals.length; i++) {

        var queryURL2 = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + codesArr[i]

        $.ajax({
          url: queryURL2,
          method: "GET",
          async: true
        }).then(function (response) {
          allInfoArr = response;

          writeRecipes();
        });


      }



      //reset allInfoArr
      allInfoArr = []


    });
  }


  //Stores an object into an array saved to localStorage
  function addObjectToSavedArray(object) {
    //If storage is currently empty, it makes a new array pushes the object to that
    if (localStorage.getItem("savedRecipes") === null) {
      storedRecipeArray = []
      storedRecipeArray.push(object)
      storedRecipeArray = JSON.stringify(storedRecipeArray)
      localStorage.setItem("savedRecipes", storedRecipeArray)
    }
    //Otherwise it parses the current array in localStorage and pushes the object into it.
    else {
      storedRecipeArray = JSON.parse(localStorage.getItem("savedRecipes"))
      storedRecipeArray.push(object)
      storedRecipeArray = JSON.stringify(storedRecipeArray)
      localStorage.setItem("savedRecipes", storedRecipeArray)
    }
  }


  //Creates an event listener for the save buttons
  $(document).on("click", ".saveBtn", function () {
    //Stores the recipeString attribute assosciated with whichever save button was as an object into the array of stored recipes
    selectedRecipe = JSON.parse($(this).attr("recipeString"))
    addObjectToSavedArray(selectedRecipe)
  })

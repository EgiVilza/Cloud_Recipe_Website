//Materilize function for navbar
$(document).ready(function () {
    $('.sidenav').sidenav();
  });
  $(document).ready(function () {
    $('.collapsible').collapsible();
  });

  //initialize excluded list
  var excluded = []

  //Excluded list content displaing on the page
  var ul = $(".excludedListing")
  var li = document.createElement("li");

  //Button Event Listeners
  $(".searchButton").on("click", search)
  $(".addToButton").on("click", excludedFunction)
  $(".resetButton").on("click", resetList)

  //Add to excluded list
  function excludedFunction() {
    var p = document.createElement("p")
    var excludedValue = $(".excluded").val()
    if (excludedValue == "") {
      //If excluded value is empty, do nothing
    }
    else {
      //if the excluded value is not already in the excluded list, the value
      //will get added onto the list
      if (excluded.indexOf(excludedValue) == -1) {
        excluded.push(excludedValue)
      }
    }

    //clears previous list
    ul.empty()

    //adds new items to the excluded list that is displayed on the page
    p.append(document.createTextNode(excluded))
    ul.append(p)
  }

  //Reset excluded list
  function resetList() {
    ul.empty()
    excluded = []
  }


  function search() {
    //initialize variables
    var food = $(".food").val()
    var minCalories = $(".minCalories").val()
    var maxCalories = $(".maxCalories").val()
    var numberOfRecipes = $(".numberOfIngredients").val()
    var emptyHealthLabels = []
    var emptyDiet = []
    var foodImage = ""
    var foodTitle = ""
    var applicationID = "564187b6"

    //Health label options
    var healthLabelsArray = ["vegan", "vegetarian", "peanut-free",
      "tree-nut-free", "alcohol-free"]

    //diet label options
    var dietArray = ["balanced", "high-fiber", "high-protein",
      "low-carb", "low-fat", "low-sodium"]

    //Defaults to 1 number of recipes
    var num = 1
    if (numberOfRecipes != "") {
      num = numberOfRecipes
    }

    //Query to recipe search API, num is initilized for number of results
    var appKey = "5e2149f0e5f58f2dd1b1789af095a3ca"
    var queryURL = "https://api.edamam.com/search?q=" + food + "&app_id=" + applicationID + "&app_key="
      + appKey + "&to=" + num


    //Health labels
    //If any of the health label checkboxes are checked, add them to the queryURL
    for (var i = 0; i < healthLabelsArray.length; i++) {
      var healthLabel = "#" + [healthLabelsArray[i]]
      if ($(healthLabel).prop("checked") === true) {
        var label1 = healthLabelsArray[i]
        queryURL = queryURL + "&health=" + healthLabelsArray[i]
      }
    }

    //Diet Labels
    //If any of the diet label checkboxes are checked, add them to the queryURL
    for (var i = 0; i < dietArray.length; i++) {
      var dietLabel = "#" + [dietArray[i]]
      if ($(dietLabel).prop("checked") === true) {
        var label2 = dietArray[i]
        queryURL = queryURL + "&diet=" + dietArray[i]
      }
    }

    //Calories
    if (minCalories == "" && maxCalories == "") {
      //If calorie values are empty, do nothing
    }
    else if ((minCalories != "") && (maxCalories != "")) {
      //If both min and max calorie values are not empty, add them to the queryURL
      //with proper "-" format
      var cal = "&calories=" + minCalories + "-" + maxCalories
      queryURL = queryURL + cal
    }
    else {
      if (minCalories != "") {
        //If min calorie value is not empty, add to the query URL
        var cal = "&calories=" + minCalories
        queryURL = queryURL + cal
      }
      else {
        //If min calorie value is not empty, add to the query URL
        var cal = "&calories=" + maxCalories
        queryURL = queryURL + cal
      }
    }

    //Excluded
    if (excluded.length > 0) {
      //Takes the valus of the excluded array and add them to the queryURL
      for (var i = 0; i < excluded.length; i++) {
        queryURL = queryURL + "&excluded=" + excluded[i]
      }
    }

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {

      //Clears old search
      $(".collapsibleStyle").empty()

      //Limits the number of results for the collapse for loop
      var numberofRecipes = 1

      for (var i = 0; i < numberofRecipes; i++) {
        //Save recipe title, image, and ingredients array to variables
        var foodTitle = response.hits[i].recipe.label
        var foodImage = response.hits[i].recipe.image
        var ingredients = response.hits[i].recipe.ingredientLines
        var prep = response.hits[i].recipe.url

        //select container element
        //var container = $("#recipe-container");
        var container = $("#recipe-container")
        //create and append new list item
        var newRecipe = $("<li>");
        container.append(newRecipe);
        newRecipe.addClass("active")

        //create and append header div
        var header = $("<div>");
        newRecipe.append(header);
        header.addClass("collapsible-header");
        header.text(foodTitle)

        //create and append body div
        var body = $("<div>");
        newRecipe.append(body);
        body.addClass("collapsible-body");
        body.attr("style", "display: block;")

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

        //loop through ingredients array and add list items for each
        for (j = 0; j < ingredients.length; j++) {
          var newItem = $("<li>");
          ingredientList.append(newItem);
          newItem.text(ingredients[j])
        }

        //Create and append link to preperation instructions
        var prepTitle = $("<h5>");
        right.append(prepTitle);

        //Added the link to the Prep button
        var prepLink = $("<a>");
        prepLink.text("Preparation");
        prepLink.attr("href", prep);
        prepLink.addClass("waves-effect waves-light btn");
        prepTitle.append(prepLink);

        //Creates object in proper format for saving to local storage
        var storedRecipe = new Object();
        storedRecipe.foodTitle = foodTitle;
        storedRecipe.foodImage = foodImage;
        storedRecipe.ingredients = response.hits[i].recipe.ingredientLines;
        storedRecipe.prep = prep;
        storedRecipeString = JSON.stringify(storedRecipe)


        //Create and append save button
        var saveTitle = $("<h5>");
        right.append(saveTitle);
        var saveBtn = $("<a>");
        saveBtn.text("Save");
        saveBtn.addClass("waves-effect waves-light btn saveBtn");
        saveBtn.attr("recipeString", storedRecipeString);
        saveTitle.append(saveBtn);


      }

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


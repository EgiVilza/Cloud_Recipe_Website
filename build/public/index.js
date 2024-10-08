//Materilize function for navbar
$(document).ready(function () {
  $('.sidenav').sidenav();
});
//Materilize function for collapsible
$(document).ready(function () {
  $('.collapsible').collapsible();
});

$(".searchBtn").on("click", searchCriteria)

function searchCriteria() {
  //foodSearchQuery
  var ingredients = []
  var num = "1"
  var food = $(".validate").val()
  var applicationID = "6c4c5067"
  var appKey = "adaeec48bfca5b5c1f3d29c672df2025"
  var queryURL = "https://api.edamam.com/search?q=" + food + "&app_id=" + applicationID + "&app_key=" + appKey + "&to=" + num

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {

    var numberofRecipes = 1

    for (var i = 0; i < numberofRecipes; i++) {
      //Save recipe title, image, and ingredients array to variables
      var foodTitle = response.hits[i].recipe.label
      var foodImage = response.hits[i].recipe.image
      var ingredients = response.hits[i].recipe.ingredientLines
      var prep = response.hits[i].recipe.url

      //select container element
      var container = $("#recipe-container");
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
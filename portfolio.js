/* Animation Javascript
   Written by: Ariana Tsai

   Description: Manages the overlay and quicksand.*/

var target = "home";
var target2 = "default";
var target3 = "default";

/* Closes the overlay. Animates the overlay up, then down. Also appends the sections
   to their according locations.

   I originally used position to set where the overlay was located, but every time
   it was animated, the animations would start from the original margin at 0, causing 
   a jerkish animation. After I set the margin to above the page, the animation would
   start from the proper place and was smooth. */

function closeW (el) {
  var oldsect = document.getElementById(target); // gets the section currently on the page
  target = el.name;
  var newsect = document.getElementById(target); // gets the target section
  $("#container").toggle(0);
  $(".overlay").animate({"margin-top": "-800px"}, 1000).delay(800);
  $("#content").append(oldsect); // puts the current section back into the invisible text block
  $("#current").append(newsect); // puts the target section on the page
  $(".overlay").animate({"margin-top": "-20"}, 1300);
  $("#container").delay(3300).fadeIn(200);
}


/* Manages the quicksand in a similar fashion to the overlay.

   As mentioned in the index file, there's a more efficient way of doing this with AJAX.
   Also, the animations probably wouldn't break as badly with AJAX.

   I managed to fix the problem with the dynamic source we had back during the presentation.*/

function changeL(el) {
  target3 = el.name;
  if (target3 == "date")
    $("#" + target2).quicksand( $('#date li') );
  else if (target3 == "alpha")
    $("#" + target2).quicksand( $('#alpha li') );
  else if (target3 == "school")
    $("#" + target2).quicksand( $('#school li') );
  else
    $("#" + target2).quicksand( $('#intern li') );
  el.preventDefault();
  target2 = target3;
}
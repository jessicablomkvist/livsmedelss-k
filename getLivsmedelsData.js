$("#tabell").hide();
//Funktion som hämtar json-datan med jquery.param() för att kunna skicka med söksträngen
function getData() {
  return $.ajax({
    url:
      "https://webservice.informatik.umu.se/webservice_livsmedel/getlivsmedel.php?&callback=getLivsmedel&" +
      $.param(sok),
    dataType: "jsonp",
    data: {}
  });
}
//Parameter som hämtas med url : array sok
var sok = { namn: "" };
//Hämtar knapp och kopplar till funktion visa tabell vid klick
var button = document.getElementById("sok-button");
button.onclick = getX;

//Funktion som hämtar ut det som skrivits i sökfältet
function getX(x, y) {
  //Hämtar sökfältets element
  var x = document.getElementById("livsmedelsSokOrd");
  //Hämtar dess värde
  y = x.value;
  //Tar ut namn i objektet sok och tilldelar det y
  sok.namn = y;
  //Funktion som fyller tabellen med data

  function handleData(data) {
    //Omvandlar variabel ovan y till data
    y = data;
    //Skapar array utifrån json data
    var livsArray = data.livsmedel;
    //Vid 0 resultat dölj tabell
    if(livsArray.length==0){
      $("#tabell").hide();
    }
    //Loop för att lägga till data i tabellen
    for (var i = 0; i < livsArray.length; i++) {
      //Vid  resultat visa tabell
      $("#tabell").show();
      var livsmedel = livsArray[i];
      
      //Kontrollerar attt class done inte finns på button så att samma input inte kan köras uppreapade gånger och generera dubletter av tabellrader
      if (!$("button").hasClass("done")) {
        $("#tabell").append(
          "<tr><td>" +
            livsmedel.namn +
            "</td><td>" +
            livsmedel.energi +
            "</td><td>" +
            livsmedel.kolhydrater +
            "</td>" +
            "<td>" +
            livsmedel.protein +
            "</td>" +
            "<td>" +
            livsmedel.fett +
            "</td></tr>"
        );
      }
    }
    //Lägg till class done på button efter att tabellraderna skapats
    $(button).addClass("done");
  }
  //Om input i sökfältet raderas ta bort childelements till tbody,dölj #tabell och ta bort class done på button så att den går att trycka på igen
  
  //Om användaren inte använder delete utan markerar och skriver  över text i input
  $("#livsmedelsSokOrd").keydown(function() {
   
      $("tbody").empty();
      $(button).removeClass("done");
      $("#tabell").hide();
    
  });
  

  //Kallar på funktionerna
  getData().done(handleData);
}

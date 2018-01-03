$(document).ready(function(){ 

    var huvudKat = "";

    //Tar upp informationen från JSON-filen
    fetch("json/huvudkategorier.json")
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        huvudKat = data;
        //console.log(huvudKat);

        for(i = 0; i < huvudKat.length; i++) {

            var huvudKatId = (huvudKat[i].id);
            var huvudKatTea = (huvudKat[i].teacolor);
            var printHuvudKat = "";
            //console.log(huvudKatId);
            //console.log(huvudKatTea);
 
            var printHuvudKat = '<li class="dropdown"><a class="dropdown-toggle" data-toggle="dropdown" href="#">'+ huvudKat[i].teacolor +'<span class="caret"></span></a><ul class="dropdown-menu" id="hk'+ huvudKatId +'"></ul></li>';
            $('#huvudKat').append(printHuvudKat);

        };

    
    });

    
    //Nästa Fetch och Foor Loop
    fetch("json/underkategorier.json")
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        underKat = data;
        // console.log(underKat);

        for(i = 0; i < underKat.length; i++) {


            var underKatId = (underKat[i].id);
            var underKatPack = (underKat[i].packaging);
            var underKatHuvud = (underKat[i].huvudkategori);


            // console.log(underKatId);
            // console.log(underKatPack);
            // console.log(underKatHuvud);

            var underHuvudKat = '<li id="uk'+ underKatId +'"><a href="#">'+ underKatPack +'</a></li>';

            if (underKatHuvud == 1) {
                $('#hk1').append(underHuvudKat);
            
            } else if (underKatHuvud == 2) {
                $('#hk2').append(underHuvudKat);
            
            } else if (underKatHuvud == 3) {
                $('#hk3').append(underHuvudKat);

            } else {
                $('#hk4').append(underHuvudKat);
            }

        };

    
    });
    //stängt fetchen för NavBaren


    //Nu loopar vi ut produkterna//
    fetch("json/produkter.json")
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        produkter = data;

        for(i = 0; i < produkter.length; i++) {

            var produktId = (produkter[i].id);
            var produktName = (produkter[i].prodName);
            var produktDesc = (produkter[i].prodDesc);
            var produktImage = "images/" + (produkter[i].image);
            var produktPrice = (produkter[i].prodPrice);
            var produktHK = (produkter[i].huvudKat);
            var produktUK = (produkter[i].underKat);
            var produktCard = "";

            //var produktCard = '<div class="card"><img class="card-img-top" src="' + produktImage + '"><div class="card-body"><h4 class="card-title">' + produktName + '</h4><p class="card-text">' + produktDesc + '</p><a href="#" class="btn btn-primary">Köp nu</a></div></div>';
            var produktCard = '<div class="col-sm-4"><div class="card"><img class="card-img-top" src="' + produktImage + '"><div class="card-body"><h4 class="card-title">' + produktName + '</h4><p class="card-text">' + produktDesc + '</p><p>Pris: ' + produktPrice + '</p><a href="#" class="btn btn-primary">Köp nu</a></div></div></div>';
            console.log(produktCard);
            $('#allProducts').append(produktCard);

        };

    
    });




    /////////////////LITE KNAPPAR OCH SÅ//////////

//TEST
    $('#uk1').click(function(){
        console.log("klick uk1");
        //window.location = "http://amandaenglund.wieg17.se"
      });
//SLUT TEST

    $('#login').click(function() {
        alert("Logga in nu");  
    });

    $('#signup').click(function() {
        alert("Signa upp nu");  
    });



});
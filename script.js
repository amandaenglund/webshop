$(document).ready(function(){ 

    var user = "janne"
    var password = "123"
    var huvudKat = "";
    var produktCard = "";
    
            
    if (sessionStorage.ourUser == null) {
        // Är vi inte inloggade
       
        visaFirstVisit();
    } else {
        //om vi är inloggade
       
        visaSomInloggad();
    }
    
    
    //Fetchar JSON-filen huvudkategorier
    fetch("json/huvudkategorier.json")
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        huvudKat = data;

        printaHuvudKat();
    });

    
    //Fetchar JSON-filen underkategorier
    fetch("json/underkategorier.json")
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        underKat = data;
        
        printaUnderKat();
    });


    //Fetchar JSON-filen med alla produkter
    fetch("json/produkter.json")
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        produkter = data;

        printaAllaProdukter();
    });
    


    ///////LITE FUNTIONER////////

    //syns vid start utloggad
    function visaFirstVisit() {
        $("#login").show();     
        $("#logout").hide(); 
        $(".namn").hide(); 
        $("#username").show();
        $("#pass").show();


    };


    //syns på start när man är inloggad
    function visaSomInloggad() {
        $("#login").hide();     
        $("#logout").show(); 
        $("#username").hide();
        $("#pass").hide();
        
        //Sparar användarens namn i sessionStorage
        sessionStorage.setItem("userId", $("#username").val() );
        //Välkommen meddelande med rätt namn
        $(".namn").show(); 
        $(".namn").append(sessionStorage.getItem("userId"));                 
    };

    //Appendar ut Huvudkategorierna i NavBaren
    function printaHuvudKat() {
        for(i = 0; i < huvudKat.length; i++) {

            var huvudKatId = (huvudKat[i].id);
            var huvudKatTea = (huvudKat[i].teacolor);
            var printHuvudKat = "";

            var printHuvudKat = '<li class="dropdown"><a class="dropdown-toggle" data-toggle="dropdown" href="#" onclick= "visaHKProdukter(' + [i] + ')">'+ huvudKat[i].teacolor +'<span class="caret"></span></a><ul class="dropdown-menu" id="hk'+ huvudKatId +'"></ul></li>';
            $('#huvudKat').append(printHuvudKat);

        };
    };

    //Appendar ut Underkategorierna i NavBaren
    function printaUnderKat() {
        for(i = 0; i < underKat.length; i++) {

            var underKatId = (underKat[i].id);
            var underKatPack = (underKat[i].packaging);
            var underKatHuvud = (underKat[i].huvudkategori);

            var underHuvudKat = '<li id="uk'+ underKatId +'" onclick="visaUKProdukter('+ underKatId +')"><a href="#">'+ underKatPack +'</a></li>';

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
    };

    //Appendar ut alla produkter på första-sidan
    function printaAllaProdukter() {

        
        
        for(i = 0; i < produkter.length; i++) {


            var produktId = (produkter[i].id);
            var produktName = (produkter[i].prodName);
            var produktDesc = (produkter[i].prodDesc);
            var produktImage = "images/" + (produkter[i].image);
            var produktPrice = (produkter[i].prodPrice);
            var produktHK = (produkter[i].huvudKat);
            var produktUK = (produkter[i].underKat);
            var produktCard = "";
            
            

            var produktCard = '<div class="col-lg-3"><div class="card"><img class="card-img-top" src="' + produktImage + '"><div class="card-body"><h4 class="card-title">' + produktName + '</h4><p class="card-text">' + produktDesc + '</p><div class="card-footer "><p>Pris: ' + produktPrice + '</p><a href="#" class="btn btn-success">Köp nu</a></div></div></div></div>';
            $('.allProducts').append(produktCard);
            
            
            

        };
    };


    
    //Visar produkter på respektive sida

    visaHKProdukter = function(val){

        $(".allProducts").empty();

        var value = val + 1;
        

        console.log("nu ska jag klicka mig vidare till alla HuvudKategori-produkter", val);
        

        for(i = 0; i < produkter.length; i++) {

            var produktId = (produkter[i].id);
            var produktName = (produkter[i].prodName);
            var produktDesc = (produkter[i].prodDesc);
            var produktImage = "images/" + (produkter[i].image);
            var produktPrice = (produkter[i].prodPrice);
            var produktHK = (produkter[i].huvudKat);
            var produktUK = (produkter[i].underKat);
            var produktCard = "";

            var produktCard = '<div class="col-lg-3"><div class="card"><img class="card-img-top" src="' + produktImage + '"><div class="card-body"><h4 class="card-title">' + produktName + '</h4><p class="card-text">' + produktDesc + '</p><div class="card-footer "><p>Pris: ' + produktPrice + '</p><a href="#" class="btn btn-success">Köp nu</a></div></div></div></div>';

            
            // Skriv en IF sats som kollar att det bara skrivs ut rätt produkter
            if ( produktHK == value) {
                console.log(value);
                console.log(produktHK);
                console.log("Skriver ut vissa produkter");
            
            //$('.allProducts').html(" ");
            $('.allProducts').append(produktCard);
            }
            
        };
    };


    visaUKProdukter = function(val){

        $(".allProducts").empty();

        var value = val;
        

        console.log("nu ska jag klicka mig vidare till alla UnderKategori-produkter", val);

        for(i = 0; i < produkter.length; i++) {

            var produktId = (produkter[i].id);
            var produktName = (produkter[i].prodName);
            var produktDesc = (produkter[i].prodDesc);
            var produktImage = "images/" + (produkter[i].image);
            var produktPrice = (produkter[i].prodPrice);
            var produktHK = (produkter[i].huvudKat);
            var produktUK = (produkter[i].underKat);
            var produktCard = "";

            var produktCard = '<div class="col-lg-3"><div class="card"><img class="card-img-top" src="' + produktImage + '"><div class="card-body"><h4 class="card-title">' + produktName + '</h4><p class="card-text">' + produktDesc + '</p><div class="card-footer "><p>Pris: ' + produktPrice + '</p><a href="#" class="btn btn-success">Köp nu</a></div></div></div></div>';

            
            // Skriv en IF sats som kollar att det bara skrivs ut rätt produkter
            if ( produktUK == value) {
                console.log(value);
                console.log(produktUK);
                console.log("Skriver ut vissa produkter");
            
            //$('.allProducts').html(" ");
            $('.allProducts').append(produktCard);
            }
            
        };
    };



    /////////////////LITE KNAPPAR OCH SÅ//////////

    //Loggan
    $('#logga').click(function() {
        console.log("du är på start");
        location.reload();
    });

    //Login-knappen
    $("#login").click(function(){
    
        if ( $("#username").val() == user && $("#pass").val() == password ) {
            console.log("välkommen!");
            visaSomInloggad();

        } else {
            console.log("fel lösenord!");
            alert("Fel lösenord, var god försök igen!");
        }
    });

    //Logout-knappen
    $("#logout").click(function(){
        console.log("du är utloggad");
        sessionStorage.clear()
        location.reload();      
        visaFirstVisit();
    });


    //Skapa konto
    $('#signup').click(function() {
        console.log("Signa upp nu");
        //$(".container").html("");
    });


    //Kundvagn
    $('#shoppingCart').click(function() {
        console.log("Nu hamna vi i kundvagnen :)");
        //$(".container").html("");
    });

    


//stänger allt
});
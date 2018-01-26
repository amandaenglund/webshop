$(document).ready(function(){ 

    //lite variablar i toppen som sig bör
    var user = "janne"
    var password = "123"
    var huvudKat = "";
    var produktCard = "";
    var shoppingCart = [];
    var userAdmin = "admin"
    var passwordAdmin = "admin"



    
    //checkar om sessionstorage finns för shoppingcart, annars skapar vi den
    if (sessionStorage.shoppingCart == null){
        var json_str = JSON.stringify(shoppingCart);
        sessionStorage.shoppingCart = json_str; 
    }

    
            
    if (sessionStorage.userId == null) {
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

        visaAllaProdukter();
    });
    


    ///////LITE FUNTIONER////////

    //syns vid start utloggad
    function visaFirstVisit() {
        $("#login").show();     
        $("#logout").hide(); 
        $(".namn").hide(); 
        $(".username").show();
        $(".pass").show();


    };


    //syns på start när man är inloggad
    function visaSomInloggad() {
        $("#login").hide();     
        $("#logout").show(); 
        $(".username").hide();
        $(".pass").hide();
        
        //Sparar användarens namn i sessionStorage
        sessionStorage.setItem("userId", $(".username").val() );
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
    function visaAllaProdukter() {

        
        
        for(i = 0; i < produkter.length; i++) {


            var produktId = (produkter[i].id);
            var produktName = (produkter[i].prodName);
            var produktDesc = (produkter[i].prodDesc);
            var produktImage = "images/" + (produkter[i].image);
            var produktPrice = (produkter[i].prodPrice);
            var produktHK = (produkter[i].huvudKat);
            var produktUK = (produkter[i].underKat);
            var produktCard = "";
            
            

            var produktCard = '<div class="col-lg-3 col-md-4 col-sm-6"><div class="card" onclick="visaEnProdukt('+ produktId +')"><img class="card-img-top" src="' + produktImage + '"><div class="card-body"><h4 class="card-title">' + produktName + '</h4><div class="card-footer "><p>Pris: ' + produktPrice + '</p></div></div></div></div>';
            $('.allProducts').append(produktCard);
            
            
            

        };
    };


    
    //Visar produkter på respektive sida

    visaHKProdukter = function(val){

        $(".allProducts").empty();
        $(".jumbotron").hide(); 

        var value = val + 1;
                

        for(i = 0; i < produkter.length; i++) {

            var produktId = (produkter[i].id);
            var produktName = (produkter[i].prodName);
            var produktDesc = (produkter[i].prodDesc);
            var produktImage = "images/" + (produkter[i].image);
            var produktPrice = (produkter[i].prodPrice);
            var produktHK = (produkter[i].huvudKat);
            var produktUK = (produkter[i].underKat);
            var produktCard = "";

            var produktCard = '<div class="col-lg-3"><div class="card" onclick="visaEnProdukt('+ produktId +')"><img class="card-img-top" src="' + produktImage + '"><div class="card-body"><h4 class="card-title">' + produktName + '</h4><div class="card-footer "><p>Pris: ' + produktPrice + '</p></div></div></div></div>';

            
            // Skriv en IF sats som kollar att det bara skrivs ut rätt produkter
            if ( produktHK == value) {
            
            //$('.allProducts').html(" ");
            
            $('.allProducts').append(produktCard);
            }
            
        };
    };


    visaUKProdukter = function(val){

        $(".allProducts").empty();
        $(".jumbotron").hide(); 

        var value = val;
        

        for(i = 0; i < produkter.length; i++) {

            var produktId = (produkter[i].id);
            var produktName = (produkter[i].prodName);
            var produktDesc = (produkter[i].prodDesc);
            var produktImage = "images/" + (produkter[i].image);
            var produktPrice = (produkter[i].prodPrice);
            var produktHK = (produkter[i].huvudKat);
            var produktUK = (produkter[i].underKat);
            var produktCard = "";

            var produktCard = '<div class="col-lg-3"><div class="card" onclick="visaEnProdukt('+ produktId +')"><img class="card-img-top" src="' + produktImage + '"><div class="card-body"><h4 class="card-title">' + produktName + '</h4><div class="card-footer "><p>Pris: ' + produktPrice + '</p></div></div></div></div>';

            
            // Skriv en IF sats som kollar att det bara skrivs ut rätt produkter
            if ( produktUK == value) {
            
            //$('.allProducts').html(" ");
            $('.allProducts').append(produktCard);
            }
            
        };
    };


    visaEnProdukt = function(val){

        $(".allProducts").empty();
        $(".jumbotron").hide(); 

        var value = val;
        
        for(i = 0; i < produkter.length; i++) {

            var produktId = (produkter[i].id);
            var produktName = (produkter[i].prodName);
            var produktDesc = (produkter[i].prodDesc);
            var produktImage = "images/" + (produkter[i].image);
            var produktPrice = (produkter[i].prodPrice);
            var produktHK = (produkter[i].huvudKat);
            var produktUK = (produkter[i].underKat);
            var produktCard = "";

            var produktCard = '<div class="col-lg-3"><div class="card"><img class="card-img-top" src="' + produktImage + '"><div class="card-body"><h4 class="card-title">' + produktName + '</h4><p class="card-text">' + produktDesc + '</p><div class="card-footer "><p>Pris: ' + produktPrice + '</p><a href="#" class="btn btn-success" onclick="addToCart('+ produktId +')">Köp nu</a></div></div></div></div>';

            
            // Skriv en IF sats som kollar att det bara skrivs ut rätt produkter
            if ( produktId == value) {
            
            $('.allProducts').append(produktCard);
            }
            
        };
    };

    addToCart = function(val){

        var shoppingCart = JSON.parse(sessionStorage.shoppingCart);
        shoppingCart.push(produkter[val-1]);

        alert("tillagd i kundvagnen");

        var json_str = JSON.stringify(shoppingCart);
        sessionStorage.shoppingCart = json_str; 

        console.log(sessionStorage.shoppingCart);

    };


    delCartItem = function(i){
        var shoppingCart = JSON.parse(sessionStorage.shoppingCart);
        shoppingCart.splice(i, 1);

        var json_str = JSON.stringify(shoppingCart);
        sessionStorage.shoppingCart = json_str;

        kundvagn();

    }



    /////////////////LITE KNAPPAR OCH SÅ//////////

    //Loggan
    $('#logga').click(function() {
        console.log("du är på start");
        location.reload();
    });

    //Login-knappen
    $("#login").click(function(){
    
        if ( $(".username").val() == user && $(".pass").val() == password ) {
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
        alert("Signa upp nu");
        //$(".container").html("");
    });


    //Kundvagn
    kundvagn = function() {
        console.log("Nu hamna vi i kundvagnen :)");
        
        $(".container").html("<h3>Allt gött te du ska köpa:</h3>");

        var shoppingCart = JSON.parse(sessionStorage.shoppingCart);

        var cartProdName = "<ul>"
        var cartProdPrice = "<ul>"
        var cartRemove = "<ul>"

        for(var i = 0; i < shoppingCart.length; i++){
            cartProdName += "<li>" + shoppingCart[i].prodName + "</li>";
            cartProdPrice += "<li>" + shoppingCart[i].prodPrice + " kr</li>";
            cartRemove += "<li><a href='#' onClick='delCartItem(" + i + ")'>Radera</a></li>";
        }

        cartProdName += "<li>Frakt</li></ul>"
        cartProdPrice += "<li>55 kr</li></ul>"
        cartRemove += "</ul>"

        console.log(cartProdName);

        $('.container').append(cartProdName + cartProdPrice + cartRemove);


        var totalPrice = 55;
        for(var i = 0; i < shoppingCart.length; i++) {
            totalPrice += shoppingCart[i].prodPrice;
        }
        $(".container").append("<h3>Totalpris: " + totalPrice + " kr</h3>");

        var json_str = JSON.stringify(shoppingCart);
        sessionStorage.shoppingCart = json_str; 
        
        $(".container").append("<button onclick='finishOrder()'>Slutför köp</button>");


    };


    finishOrder = function() {

        if (sessionStorage.userId == null) {
            // Är vi inte inloggade
           
            alert("Du måste logga in först!")

        } else {
           
            $(".container").html("Tack för din order :)");

        }
    


    }

    


    //////ADMIN-SIDAN//////


        //Sparar användarens namn i sessionStorage
        sessionStorage.setItem("userIdAdmin", $(".usernameAdmin").val() );



        if (sessionStorage.userIdAdmin == null) {
            // Är vi inte inloggade
            console.log("vi är inte inloggade på admin")
            $('.admin').html("Var god logga in!");
            $(".adminMenu").hide(); 


        } else {
            //om vi är inloggade
        
            visaAdminSidan();
        }


        //Login-knappen
        $("#loginAdmin").click(function(){

    
            if ( $(".usernameAdmin").val() == userAdmin && $(".passAdmin").val() == passwordAdmin ) {
                console.log("välkommen till Admin-sidan!");
                sessionStorage.setItem("userIdAdmin", $(".usernameAdmin").val() );

    
            } else {
                console.log("fel lösenord!");
                alert("Fel lösenord, var god försök igen!");
            }

        });
    

        //Logout-knappen
        $("#logoutAdmin").click(function(){
            console.log("du är utloggad från admin");
            $('.admin').html("Du är nu utloggad!");
            sessionStorage.clear()
            location.reload();      
            
        });



        function visaAdminSidan() {
            $('.admin').append("Välkommen till admin-sidan!");
            $('.adminMenu').append('<ul><li>Start</li><li class="visaKunder">Kundlista</li><li>Orderlista</li><li>Epostlista</li></ul>');

            //visa menyn
            //appenda ut produkterna
        };

       
        //Printar ut en lista på våra kunder på sidan
        $('.visaKunder').click(function() {
            console.log("printar ut lista på kunder");

                //Fetchar JSON-filen kunder
                fetch("json/kunder.json")
                .then(function(response) {
                    return response.json();
                })
                .then(function(data) {
                    kundLista = data;

                    $('.adminList').append("Våra kunder: ");


                    for(i = 0; i < kundLista.length; i++) {

                        var kundId = (kundLista[i].id);
                        var kundEmail = (kundLista[i].email);
                        var printKundLista = "";
        
                        console.log(kundId);
            
                        var printKundLista = '<ul><li>' + kundId + '</li><li>' + kundEmail + '</li></ul>';
                        $('.adminList').append(printKundLista);
                    };
        


                });
            
        });



//stänger allt
});
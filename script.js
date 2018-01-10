$(document).ready(function(){ 

    var user = "test"
    var password = "123"
    var huvudKat = "";

    
            
    if (sessionStorage.ourUser != null) {
            
        // Är vi inte inloggade
        visaFirstVisit();
        

    } else {

        //om vi är inloggade
        visaSomInloggad();

    }

    //login-knappen
    $("#loggaInKnapp").click(function(event){

        //fixar så att form inte laddar om när man trycker på knappen
        event.preventDefault();
      
        if ( $("#username").val() == user && $("#pass").val() == password ) {
            // om rätt svar - visa välkommen-sida
            //visaWelcome();
            console.log("välkommen!");
            
            // $('#loginform').submit(function() {
            //     $('#loginModal').modal('hide');
            //     return false;
            // });

            visaSomInloggad();

            $('#loginModal').modal('hide');

        } else {
            // om fel svar - visa forgot-sida
            //visaForgot();
            console.log("fel lösenord!");
            alert("fel lösenord");
        }

    });
    

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


    //Nu loopar vi ut produkterna på förstasidan//
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
            var produktCard = '<div class="col-sm-3"><div class="card"><img class="card-img-top" src="' + produktImage + '"><div class="card-body"><h4 class="card-title">' + produktName + '</h4><p class="card-text">' + produktDesc + '</p><div class="card-footer "><p>Pris: ' + produktPrice + '</p><a href="#" class="btn btn-success">Köp nu</a></div></div></div></div>';
            //console.log(produktCard);
            $('#allProducts').append(produktCard);



        };

    
    });


    //logout-knappen
    $("#logout").click(function(){
        visaFirstVisit();        
    });

    //LITE FUNTIONER

    //syns vid start utloggad
    function visaFirstVisit() {
        $(".login").show();     
        $(".logout").hide(); 
        $(".namn").hide(); 
    };


    //syns vid start inloggad
    function visaSomInloggad() {
        $(".login").hide();     
        $(".logout").show(); 

        $(".namn").show(); 
        $(".namn").text($(".user").val());
        sessionStorage.ourUser = $(".user").val();                   

    };


    /////////////////LITE KNAPPAR OCH SÅ//////////

//TEST
    $('#uk1').click(function(){
        console.log("klick uk1");
        //window.location = "http://amandaenglund.wieg17.se"
      });
//SLUT TEST


    $('#signup').click(function() {
        alert("Signa upp nu");  
    });



});
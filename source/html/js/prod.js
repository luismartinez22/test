var token ='';
    function guid() {
      function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
        }
      return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
    }

    function getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for(var i=0; i<ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1);
            if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
        }
        return "";
    }

        var xl = document.getElementById("loginpassword")
        xl.addEventListener("keyup", function(event) {
        event.preventDefault();
        if (event.keyCode == 13) {
            logIn();
        }
    });


     $(document).ready(function(){
      var token = getCookie("tokenp_");
      if(token.length > 0){
        $.ajax({
            type:'POST',
            url: 'https://eytd7kn5ik.execute-api.us-west-2.amazonaws.com/prod/check',
            data: JSON.stringify({"token": token}),
            contentType: "application/json",
            success: function(data){
                    if(data.errorMessage == "Token has expired"){
                        alert("Your token has expired, please login again.");
                    }else if(data.errorMessage == "Bad parameter, token malformed."){
                        alert("Bad parameter, token malformed.");
                    }else if(data.errorMessage == "Bad parameter, flag is incorrect."){
                        alert("Bad parameter, flag is incorrect.");
                    }else{
                    document.getElementById("signin2").style.display = 'none';
                    document.getElementById("login2").style.display = 'none';
                    document.getElementById("nameofuser").text = "Welcome " + data.Item.username;
                    document.getElementById('nameofuser').style.display = 'block';
                    document.getElementById('logout2').style.display = 'block';
                }
            }
        }); 
    }else{
      document.getElementById("signin2").style.display = 'block';
      document.getElementById("login2").style.display = 'block';
    }
  });

    var API_URL = 'https://eytd7kn5ik.execute-api.us-west-2.amazonaws.com/prod/entries';

    $('#agregar').on('click', function(){
      $.ajax({
        type:'POST',
        url: API_URL,
        data: JSON.stringify({"id": $('#id').val(),"title": $('#title').val(),"price": $('#price').val()}),
        contentType: "application/json",

        success: function(data){
            location.reload();
        }
      });
      return false;
    });


    function showcart(){
      // location.href= 'prod.html?id=' + eid;
      // window.open('cart.html?tokenp_=' + token,'_blank');
    }     

    function send(){
      document.getElementById("recipient-email").value = "";
      document.getElementById("recipient-name").value = "";
      document.getElementById("message-text").value = "";
      // alert('Thanks for the message!!');
      $('#exampleModal').modal('hide');
    }
        
    $(document).ready(function(window, videojs){
        var player = window.player = videojs('example-video');
        var url = "https://s3.amazonaws.com/hls.demo.output/BM_training/index.m3u8";
          player.src({
            src: url,
            type: 'application/x-mpegURL'
          });
          return false;
    }(window, window.videojs));

    function logIn(){
        var pass = b64EncodeUnicode(document.getElementById("loginpassword").value);
        var username = document.getElementById("loginusername").value;
        if(pass == "" || username == ""){
          // alert("Please fill out Username and Password.");
          document.getElementById("errorL").innerHTML = "Please fill out Username and Password.";
        }else{        
          $.ajax({
                type:'POST',
                url: 'https://eytd7kn5ik.execute-api.us-west-2.amazonaws.com/prod/login',
                data: JSON.stringify({"username": username,"password": pass}),
                contentType: "application/json",

                success: function(data){
                  if(data.errorMessage == "Wrong password."){
                    // alert("Wrong password.");
                    document.getElementById("errorL").innerHTML = "Wrong password.";
                  }else if(data.errorMessage == "User does not exist."){
                    // alert("User does not exist.");
                    document.getElementById("errorL").innerHTML = "User does not exist.";
                  }else{
                  $('#logInModal').modal('hide');
                  $('.modal-backdrop').hide();
                    token = data;
                    document.cookie = "tokenp_=" + token;
                    location.reload();
                  }
                }
          });
        }
    }

    function logOut(){
      document.cookie = 'tokenp_' + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
      location.href= 'index.html';
    }  

    function b64EncodeUnicode(str) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
        return String.fromCharCode('0x' + p1);
        }));
    }   

    function register(){
        var pass = b64EncodeUnicode(document.getElementById("sign-password").value);
        var username = document.getElementById("sign-username").value;
        if(pass == "" || username == ""){
          // alert("Please fill out Username and Password.");
          document.getElementById("errorS").innerHTML = "Please fill out Username and Password.";
        }else{  
        $.ajax({
              type:'POST',
              url: 'https://eytd7kn5ik.execute-api.us-west-2.amazonaws.com/prod/signup',
              data: JSON.stringify({"username": username,"password": pass}),
              contentType: "application/json",

              success: function(data){
                if(data.errorMessage == "This user already exist."){
                  // alert("This user already exist.");
                  document.getElementById("errorS").innerHTML = "This user already exist.";
                }else{                  
                  // alert("Sign up successfully.");
                  document.getElementById("errorS").innerHTML = "Sign up successfully.";
                  $('#signInModal').modal('hide');
                  $('.modal-backdrop').hide();
                  location.reload();
                }
              }
        });
      }
    }


     $(document).ready(function(){
           var loc = document.location.href;
           var getString = loc.split('?')[1];
           var GET = getString.split('&');
           var get = {};

           for(var i = 0, l = GET.length; i < l; i++){
              var tmp = GET[i].split('p_=');
              get[tmp[0]] = unescape(decodeURI(tmp[1]));
           }
           var idp = get['id'];
           idp = idp.replace(/#/g, '');
          $.ajax({
            type:'POST',
            url: 'https://eytd7kn5ik.execute-api.us-west-2.amazonaws.com/prod/view',
            data: JSON.stringify({"id": idp}),
            contentType: "application/json",

            success: function(data){
                // $('#tbodyid').empty();
                var valew = JSON.parse(JSON.stringify(data));
                $('#tbodyid').append('<h2 class="name">' + valew["title"] + '</h2><div id="prA" style="display:none" class="alert alert-success"></div>' + '<hr>' + '<h3 class="price-container">'+ '$' + valew['price'] + '<small>' + ' *includes tax'+'</small>'+'</h3>'+'<hr>'+'<div class="description description-tabs">'+'<ul id="myTab" class="nav nav-pills">'+'<li class="active">'+'</li>'+'</ul>'+'<div id="myTabContent" class="tab-content">'+'<div class="tab-pane fade active in" id="more-information">'+'<br>'+'<strong>'+'Product description'+'</strong>'+'<p>' + valew['desc'] + '</div>'+'</div>'+'</div>'+'<hr>'+'<div class="row">'+'<div class="col-sm-12 col-md-6 col-lg-6">'+'<a href="#" onclick="addToCart('+valew['id']+')" class="btn btn-success btn-lg">'+'Add to cart'+'</a>'+'</div>'+'</div>');
                $('#imgp').append('<div class="item active">'+'<img width=400 height=280 src="'+valew['img']+'" alt="">'+'</div>');
            }
          });
        });  


            function guid() {
              function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                  .toString(16)
                  .substring(1);
              }
              return s4() + s4() + '-' + s4();
            }


            function addToCart(idp){
               var token = getCookie("tokenp_");
              if(token.length > 0){
                    $.ajax({
                        type:'POST',
                        url: 'https://eytd7kn5ik.execute-api.us-west-2.amazonaws.com/prod/addtocart',
                        data: JSON.stringify({"id": guid(),"cookie": token,"prod_id": idp, "flag" : true}),
                        contentType: "application/json",

                        success: function(data){
                            if(data.errorMessage == "Token has expired"){
                                alert("Your token has expired, please login again.");
                            }else if(data.errorMessage == "Bad parameter, token malformed."){
                                alert("Bad parameter, token malformed.");
                            }else if(data.errorMessage == "Bad parameter, flag is incorrect."){
                                alert("Bad parameter, flag is incorrect.");
                            }else if(data.errorMessage == "Your token has expired, please login again."){
                                alert("Your token has expired, please login again.");
                                logOut();
                            }else{
                                // alert("Product added.");
                                document.getElementById("prA").innerHTML = "Product added.";
                            }
                        }
                     });
                }else{
                    $.ajax({
                        type:'POST',
                        url: 'https://eytd7kn5ik.execute-api.us-west-2.amazonaws.com/prod/addtocart',
                        data: JSON.stringify({"id": guid(),"cookie": document.cookie,"prod_id": idp, "flag" : false}),
                        contentType: "application/json",
                        success: function(data){
                            // alert("Product added");
                            var x = document.getElementById('prA');
                            x.style.display = 'block';
                            x.innerHTML = "Product added.";
                        }
                  });
                }
              return false;
            }
      $('#videoModal').on('hidden.bs.modal', function (e) {
          var player = window.player = videojs('example-video');
          player.pause();
      });      



function hide() {
    var x = document.getElementById('prA');
    if (x.style.display === 'none') {
        x.style.display = 'block';
    } else {
        x.style.display = 'none';
    }
}
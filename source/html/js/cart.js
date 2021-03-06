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



    $('#next2').on('click', function(){
      $.ajax({
        type:'POST',
        url: 'https://eytd7kn5ik.execute-api.us-west-2.amazonaws.com/prod/pagination',
        data: JSON.stringify({"id": $('#next2').val()}),
        contentType: "application/json",

        success: function(data){
          var valew = JSON.parse(JSON.stringify(data));
          if (valew.ScannedCount == 9){
            document.frm.next2.value = valew.LastEvaluatedKey["id"];
          }else{
            div = document.getElementById('next2');
            div.style.display = 'none';
          }
            $('#tbodyid').empty();
          data.Items.forEach(function(articleItem){
            $('#tbodyid').append('<div class="col-lg-4 col-md-6 mb-4">' + '<div class="card h-100">' + '<a href="#">' + '<img class="card-img-top img-fluid" src="'+articleItem.img+'" alt="">'+ '</a>' + '<div class="card-block">' + '<h4 class="card-title">' + '<a href="#" onClick="showIt('+ articleItem.id +')">' + articleItem.title + '</a>' + '</h4>' + '<h5>$' + articleItem.price + '</h5>' + '<p id="article" class="card-text">' + articleItem.desc + ' </p>' + ' </div>' + '</div>' +'</div>');
          })
        }
      });
      return false;
    });    

  $('#prev2').on('click', function(){
      $.ajax({
        type:'POST',
        url: 'https://eytd7kn5ik.execute-api.us-west-2.amazonaws.com/prod/pagination',
        data: JSON.stringify({"id": $('#prev2').val()}),
        contentType: "application/json",

        success: function(data){
          var valew = JSON.parse(JSON.stringify(data));
          if (valew.ScannedCount == 9){
            document.frm.next2.value = valew.LastEvaluatedKey["id"];
            document.getElementById('next2').style.display = 'block';
          }else{
            div = document.getElementById('next2');
            div.style.display = 'none';
          }
            $('#tbodyid').empty();
          data.Items.forEach(function(articleItem){
            $('#tbodyid').append('<div class="col-lg-4 col-md-6 mb-4">' + '<div class="card h-100">' + '<a href="#">' + '<img class="card-img-top img-fluid" src="'+articleItem.img+'" alt="">'+ '</a>' + '<div class="card-block">' + '<h4 class="card-title">' + '<a href="#" onClick="showIt('+ articleItem.id +')">' + articleItem.title + '</a>' + '</h4>' + '<h5>$' + articleItem.price + '</h5>' + '<p id="article" class="card-text">' + articleItem.desc + ' </p>' + ' </div>' + '</div>' +'</div>');
          })
        }
      });
      return false;
    });     

    function send(){
      document.getElementById("recipient-email").value = "";
      document.getElementById("recipient-name").value = "";
      document.getElementById("message-text").value = "";
      alert('Thanks for the message!!');
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



    function guid() {
      function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
      }
      return s4() + s4() + '-' + s4();
    }



    var total=0;
 $(document).ready(function(){
              var token = getCookie("tokenp_");
              if(token.length > 0){
                $.ajax({
                    type:'POST',
                    url: 'https://eytd7kn5ik.execute-api.us-west-2.amazonaws.com/prod/viewcart',
                    data: JSON.stringify({"cookie": token,"flag" : true}),
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
                            data.Items.forEach(function(articleItem){
                            $.ajax({
                                type:'POST',
                                url: 'https://eytd7kn5ik.execute-api.us-west-2.amazonaws.com/prod/view',
                                data: JSON.stringify({"id": articleItem.prod_id}),
                                contentType: "application/json",
                                success: function(data){
                                    var valew2 = JSON.parse(JSON.stringify(data));
                                    $('#tbodyid').append('<tr class="success">'+'<td>'+'<img width=100 height=100 src="'+valew2["img"]+'">'+'</td>' +'<td>'+ valew2["title"] + '</td>' + '<td>' + valew2["price"] + '</td>' + '</tr>');
                                    $('#totalp').empty();
                                    $('#totalm').empty();
                                    total = total + parseInt(valew2["price"]);
                                    $('#totalp').append(total);
                                    $('#totalm').append("Total: "+total);
                                }
                             }); 
                            })
                        }
                    }
                }); 
            }else{
                $.ajax({
                    type:'POST',
                    url: 'https://eytd7kn5ik.execute-api.us-west-2.amazonaws.com/prod/viewcart',
                    data: JSON.stringify({"cookie": document.cookie,"flag" : false}),
                    contentType: "application/json",
                    success: function(data){
                        // alert(JSON.stringify(data));
                        // var valew = JSON.parse(JSON.stringify(data));
                        data.Items.forEach(function(articleItem){
                            $.ajax({
                                type:'POST',
                                url: 'https://eytd7kn5ik.execute-api.us-west-2.amazonaws.com/prod/view',
                                data: JSON.stringify({"id": articleItem.prod_id}),
                                contentType: "application/json",
                                success: function(data){
                                    var valew2 = JSON.parse(JSON.stringify(data));
                                    $('#tbodyid').append('<tr class="success">'+'<td>'+'<img width=100 height=100 src="'+valew2["img"]+'">'+'</td>' +'<td>'+ valew2["title"] + '</td>' + '<td>' + valew2["price"] + '</td>' + '<a href="#">'+' <td>' + 'Delete' + '</td>' + '</a>' + '</tr>');
                                    $('#totalp').empty();
                                    $('#totalm').empty();
                                    total = total + parseInt(valew2["price"]);
                                    $('#totalp').append(total);
                                    $('#totalm').append("Total: "+total);
                                }
                             }); 
                        })
                    }
                }); 
            }

        }); 

      $('#videoModal').on('hidden.bs.modal', function (e) {
          var player = window.player = videojs('example-video');
          player.pause();
      });

      function purchaseOrder(){
        // $('#orderModal').modal('hide');
        var idr= Math.floor((Math.random() * 10000000) + 1);
        var name = document.getElementById("name").value;
        var creditcard= document.getElementById("card").value;



        var date = new Date();

        // swal("Thank you for your purchase today!\n"+"Id: "+ idr + "\n"+ "Amount: "+ total+" USD" +"\n"+ "Card Number: " + creditcard + "\n" + "Name: " + name + "\n" + "Date: " + date);
        // swal("Thank you for your purchase today!", "Id: "+ idr + "\n"+ "Amount: "+ total+" USD" +"\n"+ "Card Number: " + creditcard + "\n" + "Name: " + name + "\n" + "Date: " + date.getDate()+ "/" + date.getMonth() + "/" + date.getFullYear(), "success");
        if(name == "" || creditcard == ""){
          // alert("Please fill out Name and Creditcard.");
          document.getElementById("errorO").innerHTML = "Please fill out Name and Creditcard.";
        }else{        
          swal({
            title: "Thank you for your purchase today!",
            text: "Id: "+ idr + "\n"+ "Amount: "+ total+" USD" +"\n"+ "Card Number: " + creditcard + "\n" + "Name: " + name + "\n" + "Date: " + date.getDate()+ "/" + date.getMonth() + "/" + date.getFullYear(),
            type: "success",
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "OK",
            closeOnConfirm: false
          },
          function(isConfirm){
            if (isConfirm) {
              location.href= 'index.html';
            }
          });
        }
      }
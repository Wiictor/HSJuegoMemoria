var provider = new firebase.auth.GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/plus.login');
// this.userPic = document.getElementById('user-pic');
// this.userName = document.getElementById('user-name');
// this.signInButton = document.getElementById('sign-in');
// this.signOutButton = document.getElementById('sign-out');
// this.signInSnackbar = document.getElementById('must-signin-snackbar');
// this.auth = firebase.auth();
$("sign-in").show();
$("#user-pic").hide();
$("#user-name").hide();
$("#sign-out").hide();
function onSignIn() {
          firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;

        var profilePicUrl = user.photoURL;
        var userName = user.displayName;
        alert(profilePicUrl);
        // Set the user's profile pic and name.
        $("#user-pic").html("<img src='"+profilePicUrl+"' style='border-radius:50%; width:100%'/>");
        $("#user-name").text(userName);

        // Show user's profile and sign-out button.
        $("#user-pic").css('display','block');
        $("#user-name").css('display','block');
        $("#sign-out").css('display','block');
        //
        // // Hide sign-in button.
        $("#sign-in").css('display','none');
        // ...
        }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
        });
        // Useful data for your client-side scripts:
        // var profile = googleUser.getBasicProfile();
        // console.log("ID: " + profile.getId()); // Don't send this directly to your server!
        // console.log('Full Name: ' + profile.getName());
        // console.log('Given Name: ' + profile.getGivenName());
        // console.log('Family Name: ' + profile.getFamilyName());
        // console.log("Image URL: " + profile.getImageUrl());
        // console.log("Email: " + profile.getEmail());

        // The ID token you need to pass to your backend:
        // var id_token = googleUser.getAuthResponse().id_token;
        // console.log("ID Token: " + id_token);
        // $("sign-in").hide();
        // $("#user-pic").show().html("<img src='"+profile.getImageUrl()+"'>");
        // $("#user-name").show().text(profile.getGivenName());
        // $("#sign-out").show();
      };

function signOut() {
          firebase.auth().signOut().then(function() {
            $("#user-pic").css('display','none');
            $("#user-name").css('display','none');
            $("#sign-out").css('display','none');

            // Show sign-in button.
            $("#sign-in").css('display','block');
        // Sign-out successful.
        }, function(error) {
        // An error happened.
        });
        // var auth2 = gapi.auth2.getAuthInstance();
        // auth2.signOut().then(function () {
        //   console.log('User signed out.');
        // });
        // $("sign-in").show();
        // $("#user-pic").hide();
        // $("#user-name").hide();
        // $("#sign-out").hide();
      }

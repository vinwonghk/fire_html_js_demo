/**
 * @return {!Object} The FirebaseUI config.
 */
function getUiConfig() {
  return {
    callbacks: {
      // Called when the user has been successfully signed in.
      signInSuccessWithAuthResult: function (authResult, redirectUrl) {
        if (authResult.user) {
          handleSignedInUser(authResult.user);
        }
        if (authResult.additionalUserInfo) {
          document.getElementById("is-new-user").textContent = authResult
            .additionalUserInfo.isNewUser
            ? "New User"
            : "Existing User";
        }
        // Do not redirect.
        return false;
      },
    },
    // Opens IDP Providers sign-in flow in a popup.
    signInFlow: "popup",
    signInOptions: [
      {
        provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        clientId:
          "524438446975-nuc7cla806s1tssi9fmb49qcude4iqgt.apps.googleusercontent.com",
      },
      {
        provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
        requireDisplayName: true,
        signInMethod: getEmailSignInMethod(),
      },
      firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID,
    ],
    tosUrl: "https://www.google.com",
    privacyPolicyUrl: "https://www.google.com",
    credentialHelper:
      CLIENT_ID && CLIENT_ID != "YOUR_OAUTH_CLIENT_ID"
        ? firebaseui.auth.CredentialHelper.GOOGLE_YOLO
        : firebaseui.auth.CredentialHelper.NONE,
  };
}

// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());
// Disable auto-sign in.
ui.disableAutoSignIn();

/**
 * @return {string} The URL of the FirebaseUI standalone widget.
 */
function getWidgetUrl() {
  return "/widget#emailSignInMethod=" + getEmailSignInMethod();
}

/**
 * Redirects to the FirebaseUI widget.
 */
var signInWithRedirect = function () {
  window.location.assign(getWidgetUrl());
};

/**
 * Open a popup with the FirebaseUI widget.
 */
var signInWithPopup = function () {
  window.open(getWidgetUrl(), "Sign In", "width=985,height=735");
};

/**
 * Displays the UI for a signed in user.
 * @param {!firebase.User} user
 */
var handleSignedInUser = function (user) {
  document.getElementById("user-signed-in").style.display = "block";
  document.getElementById("user-signed-out").style.display = "none";
  document.getElementById("name").textContent = user.displayName;
  document.getElementById("email").textContent = user.email;
  document.getElementById("phone").textContent = user.phoneNumber;
  if (user.photoURL) {
    var photoURL = user.photoURL;
    // Append size to the photo URL for Google hosted images to avoid requesting
    // the image with its original resolution (using more bandwidth than needed)
    // when it is going to be presented in smaller size.
    if (
      photoURL.indexOf("googleusercontent.com") != -1 ||
      photoURL.indexOf("ggpht.com") != -1
    ) {
      photoURL =
        photoURL + "?sz=" + document.getElementById("photo").clientHeight;
    }
    document.getElementById("photo").src = photoURL;
    document.getElementById("photo").style.display = "block";
  } else {
    document.getElementById("photo").style.display = "none";
  }
};

/**
 * Displays the UI for a signed out user.
 */
var handleSignedOutUser = function () {
  document.getElementById("user-signed-in").style.display = "none";
  document.getElementById("user-signed-out").style.display = "block";
  ui.start("#firebaseui-container", getUiConfig());
};

// Listen to change in auth state so it displays the correct UI for when
// the user is signed in or not.
firebase.auth().onAuthStateChanged(function (user) {
  document.getElementById("loading").style.display = "none";
  document.getElementById("loaded").style.display = "block";
  user ? handleSignedInUser(user) : handleSignedOutUser();
});

/**
 * Deletes the user's account.
 */
var deleteAccount = function () {
  firebase
    .auth()
    .currentUser.delete()
    .catch(function (error) {
      if (error.code == "auth/requires-recent-login") {
        // The user's credential is too old. She needs to sign in again.
        firebase
          .auth()
          .signOut()
          .then(function () {
            // The timeout allows the message to be displayed after the UI has
            // changed to the signed out state.
            setTimeout(function () {
              alert("Please sign in again to delete your account.");
            }, 1);
          });
      }
    });
};

/**
 * Handles when the user changes the reCAPTCHA or email signInMethod config.
 */
function handleConfigChange() {
  var newEmailSignInMethodValue = document.querySelector(
    'input[name="emailSignInMethod"]:checked'
  ).value;
  location.replace(
    location.pathname +
      "#emailSignInMethod=" +
      newEmailSignInMethodValue
  );

  // Reset the inline widget so the config changes are reflected.
  ui.reset();
  ui.start("#firebaseui-container", getUiConfig());
}

/**
 * Initializes the app.
 */
var initApp = function () {
  document
    .getElementById("sign-in-with-redirect")
    .addEventListener("click", signInWithRedirect);
  document
    .getElementById("sign-in-with-popup")
    .addEventListener("click", signInWithPopup);
  document.getElementById("sign-out").addEventListener("click", function () {
    firebase.auth().signOut();
  });
  document
    .getElementById("delete-account")
    .addEventListener("click", function () {
      deleteAccount();
    });
  document
    .getElementById("email-signInMethod-password")
    .addEventListener("change", handleConfigChange);
  document
    .getElementById("email-signInMethod-emailLink")
    .addEventListener("change", handleConfigChange);
  // Check the selected email signInMethod mode.
  document.querySelector(
    'input[name="emailSignInMethod"][value="' + getEmailSignInMethod() + '"]'
  ).checked = true;
};

window.addEventListener("load", initApp);

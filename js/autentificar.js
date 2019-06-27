window.onload = inicializar;

function inicializar() {
  comprobarEstado();
  var formulario = document.getElementById("formLogin");
  formulario.addEventListener("submit", autentificar);
  document.getElementById("logOut").addEventListener("click", signOut);
}

function signOut() {
  firebase.auth().signOut().then(function() {
    // Sign-out successful.
  }).catch(function(error) {
    // An error happened.
  });
}

function autentificar(event) {
  event.preventDefault();
  var formulario = event.target;
  var email = formulario.email.value;
  var contrasena = formulario.contrasena.value;
  firebase.auth().signInWithEmailAndPassword(email, contrasena)
  .then(function() {
    //sign in sucessfull
    document.getElementById("error").style.display = "none";
  })
  .catch(function(error){
    //error
  document.getElementById("error").style.display = "inline";
  });

}

function comprobarEstado() {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      document.getElementById("formLogin").style.display = "none";
      document.getElementById("logout").style.display = "block";
    } else {
      // No user is signed in.
      document.getElementById("formLogin").style.display = "block";
      document.getElementById("logout").style.display = "none";
      document.getElementById("formLogin").reset();
    }
  });
}

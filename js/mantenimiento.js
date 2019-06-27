window.onload = inicializar;

var formRepuestos;
var refRepuestos;
var tbodyRepuestos;
var formRepuestosKE70;
var refRepuestosKE70;
var tbodyRepuestosKE70;
var formRepuestosCelica;
var refRepuestosCelica;
var tbodyRepuestosCelica;
var formRepuestosGT86;
var refRepuestosGT86;
var tbodyRepuestosGT86;
var formRepuestosStarlet;
var refRepuestosStarlet;
var tbodyRepuestosStarlet;
var formRepuestosPaseo;
var refRepuestosPaseo;
var tbodyRepuestosPaseo;
var formRepuestosHiace;
var refRepuestosHiace;
var tbodyRepuestosHiace;
var formRepuestosHilux;
var refRepuestosHilux;
var tbodyRepuestosHilux;
var CREATE = "Añadir repuesto";
var UPDATE = "Modificar repuesto";
var modo = CREATE;
var refRepuestoAEditar;
var refRepuestoAEditarKE70;
var refRepuestoAEditarCelica;
var refRepuestoAEditarGT86;
var refRepuestoAEditarStarlet;
var refRepuestoAEditarPaseo;
var refRepuestoAEditarHiace;
var refRepuestoAEditarHilux;
var myNews;
var refModelos;

function inicializar() {
  comprobarEstado();
  formRepuestos = document.getElementById("formRepuestos");
  formRepuestos.addEventListener("submit", enviarRepuestosAFirebase);

  formRepuestosKE70 = document.getElementById("formRepuestosKE70");
  formRepuestosKE70.addEventListener("submit", enviarRepuestosAFirebaseKE70);

  formRepuestosCelica = document.getElementById("formRepuestosCelica");
  formRepuestosCelica.addEventListener("submit", enviarRepuestosAFirebaseCelica);

  formRepuestosGT86 = document.getElementById("formRepuestosGT86");
  formRepuestosGT86.addEventListener("submit", enviarRepuestosAFirebaseGT86);

  formRepuestosStarlet = document.getElementById("formRepuestosStarlet");
  formRepuestosStarlet.addEventListener("submit", enviarRepuestosAFirebaseStarlet);

  formRepuestosPaseo = document.getElementById("formRepuestosPaseo");
  formRepuestosPaseo.addEventListener("submit", enviarRepuestosAFirebasePaseo);

  formRepuestosHiace = document.getElementById("formRepuestosHiace");
  formRepuestosHiace.addEventListener("submit", enviarRepuestosAFirebaseHiace);

  formRepuestosHilux = document.getElementById("formRepuestosHilux");
  formRepuestosHilux.addEventListener("submit", enviarRepuestosAFirebaseHilux);

  tbodyRepuestos = document.getElementById("repuestosAE86");
  tbodyRepuestosKE70 = document.getElementById("repuestosKE70");
  tbodyRepuestosCelica = document.getElementById("repuestosCelica");
  tbodyRepuestosGT86 = document.getElementById("repuestosGT86");
  tbodyRepuestosStarlet = document.getElementById("repuestosStarlet");
  tbodyRepuestosPaseo = document.getElementById("repuestosPaseo");
  tbodyRepuestosHiace = document.getElementById("repuestosHiace");
  tbodyRepuestosHilux = document.getElementById("repuestosHilux");

  refRepuestos = firebase.database().ref().child("repuestos");
  refRepuestosKE70 = firebase.database().ref().child("repuestosKE70");
  refRepuestosCelica = firebase.database().ref().child("repuestosCelica");
  refRepuestosGT86 = firebase.database().ref().child("repuestosGT86");
  refRepuestosStarlet = firebase.database().ref().child("repuestosStarlet");
  refRepuestosPaseo = firebase.database().ref().child("repuestosPaseo");
  refRepuestosHiace = firebase.database().ref().child("repuestosHiace");
  refRepuestosHilux = firebase.database().ref().child("repuestosHilux");
  myNews = firebase.database().ref().child("misNoticias");
  refModelos = firebase.database().ref().child("modelos");

  mostrarRepuestosDeFirebase();
  mostrarRepuestosDeFirebaseKE70();
  mostrarRepuestosDeFirebaseCelica();
  mostrarRepuestosDeFirebaseGT86();
  mostrarRepuestosDeFirebaseStarlet();
  mostrarRepuestosDeFirebasePaseo();
  mostrarRepuestosDeFirebaseHiace();
  mostrarRepuestosDeFirebaseHilux();
}

function comprobarEstado() {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.

    } else {
      // No user is signed in.
      document.getElementById("formRepuestos").style.display = "none";
      document.getElementById("formRepuestosKE70").style.display = "none";
      document.getElementById("formRepuestosCelica").style.display = "none";
      document.getElementById("formRepuestosGT86").style.display = "none";
      document.getElementById("formRepuestosStarlet").style.display = "none";
      document.getElementById("formRepuestosPaseo").style.display = "none";
      document.getElementById("formRepuestosHiace").style.display = "none";
      document.getElementById("formRepuestosHilux").style.display = "none";
    }
  });
}

function mostrarRepuestosDeFirebase() {
  refRepuestos.on("value", function(snap) {
    var datos = snap.val();
    var filasAMostrar = "";
    for (var key in datos) {
      filasAMostrar += "<tr>" +
                        "<td>" + datos[key].categoria + "</td>" +
                        "<td>"+ "<p>" + datos[key].repuesto + "</p>" + "</td>" +
                        "<td>"+ "<p>" + datos[key].referencia + "</p>" + "</td>" +
                        "<td>" +
                          '<button class ="btn btn-primary editar" data-repuesto="'+ key +'" id="editar">' +
                          '<span class="glyphicon glyphicon-pencil"></span>'+
                          '</button>'+
                        "</td>" +
                        "<td>" +
                          '<button class ="btn btn-danger borrar" data-repuesto="'+ key +'" id="borrar">' +
                          '<span class="glyphicon glyphicon-trash"></span>'+
                          '</button>'+
                        "</td>" +
                        "</tr>"
    }
    tbodyRepuestos.innerHTML = filasAMostrar;
    if (filasAMostrar != "") {
      var elementosEditables = document.getElementsByClassName("editar");
      for (var i = 0; i < elementosEditables.length; i++) {
        elementosEditables[i].addEventListener("click", editarRepuestosDeFirebase, false);
      }

      var elementosBorrables = document.getElementsByClassName("borrar");
      for (var i = 0; i < elementosBorrables.length; i++) {
        elementosBorrables[i].addEventListener("click", borrarRepuestosDeFirebase, false);
      }
    }
  });
}

function mostrarRepuestosDeFirebaseHiace() {
  refRepuestosHiace.on("value", function(snap) {
    var datos = snap.val();
    var filasAMostrar = "";
    for (var key in datos) {
      filasAMostrar += "<tr>" +
                        "<td>" + datos[key].categoria + "</td>" +
                        "<td>"+ "<p>" + datos[key].repuesto + "</p>" + "</td>" +
                        "<td>"+ "<p>" + datos[key].referencia + "</p>" + "</td>" +
                        "<td>" +
                          '<button class ="btn btn-primary editar" data-repuesto="'+ key +'">' +
                          '<span class="glyphicon glyphicon-pencil"></span>'+
                          '</button>'+
                        "</td>" +
                        "<td>" +
                          '<button class ="btn btn-danger borrar" data-repuesto="'+ key +'">' +
                          '<span class="glyphicon glyphicon-trash"></span>'+
                          '</button>'+
                        "</td>" +
                        "</tr>"
    }
    tbodyRepuestosHiace.innerHTML = filasAMostrar;
    if (filasAMostrar != "") {
      var elementosEditables = document.getElementsByClassName("editar");
      for (var i = 0; i < elementosEditables.length; i++) {
        elementosEditables[i].addEventListener("click", editarRepuestosDeFirebaseHiace, false);
      }

      var elementosBorrables = document.getElementsByClassName("borrar");
      for (var i = 0; i < elementosBorrables.length; i++) {
        elementosBorrables[i].addEventListener("click", borrarRepuestosDeFirebaseHiace, false);
      }
    }
  });
}

function mostrarRepuestosDeFirebaseKE70() {
  refRepuestosKE70.on("value", function(snapshot) {
    var datos = snapshot.val();
    var filasAMostrar = "";
    for (var key in datos) {
      filasAMostrar += "<tr>" +
                        "<td>" + datos[key].categoria + "</td>" +
                        "<td>"+ "<p>" + datos[key].repuesto + "</p>" + "</td>" +
                        "<td>"+ "<p>" + datos[key].referencia + "</p>" + "</td>" +
                        "<td>" +
                          '<button class ="btn btn-primary editar" data-repuestoKE70="'+ key +'">' +
                          '<span class="glyphicon glyphicon-pencil"></span>'+
                          '</button>'+
                        "</td>" +
                        "<td>" +
                          '<button class ="btn btn-danger borrar" data-repuestoKE70="'+ key +'">' +
                          '<span class="glyphicon glyphicon-trash"></span>'+
                          '</button>'+
                        "</td>" +
                        "</tr>"
    }
    tbodyRepuestosKE70.innerHTML = filasAMostrar;
    if (filasAMostrar != "") {
      var elementosEditables = document.getElementsByClassName("editar");
      for (var i = 0; i < elementosEditables.length; i++) {
        elementosEditables[i].addEventListener("click", editarRepuestosDeFirebaseKE70, false);
      }

      var elementosBorrables = document.getElementsByClassName("borrar");
      for (var i = 0; i < elementosBorrables.length; i++) {
        elementosBorrables[i].addEventListener("click", borrarRepuestosDeFirebaseKE70, false);
      }
    }
  });
}

function mostrarRepuestosDeFirebaseCelica() {
  refRepuestosCelica.on("value", function(snap) {
    var datos = snap.val();
    var filasAMostrar = "";
    for (var key in datos) {
      filasAMostrar += "<tr>" +
                        "<td>" + datos[key].categoria + "</td>" +
                        "<td>"+ "<p>" + datos[key].repuesto + "</p>" + "</td>" +
                        "<td>"+ "<p>" + datos[key].referencia + "</p>" + "</td>" +
                        "<td>" +
                          '<button class ="btn btn-primary editar" data-repuesto="'+ key +'">' +
                          '<span class="glyphicon glyphicon-pencil"></span>'+
                          '</button>'+
                        "</td>" +
                        "<td>" +
                          '<button class ="btn btn-danger borrar" data-repuesto="'+ key +'">' +
                          '<span class="glyphicon glyphicon-trash"></span>'+
                          '</button>'+
                        "</td>" +
                        "</tr>"
    }
    tbodyRepuestosCelica.innerHTML = filasAMostrar;
    if (filasAMostrar != "") {
      var elementosEditables = document.getElementsByClassName("editar");
      for (var i = 0; i < elementosEditables.length; i++) {
        elementosEditables[i].addEventListener("click", editarRepuestosDeFirebaseCelica, false);
      }

      var elementosBorrables = document.getElementsByClassName("borrar");
      for (var i = 0; i < elementosBorrables.length; i++) {
        elementosBorrables[i].addEventListener("click", borrarRepuestosDeFirebaseCelica, false);
      }
    }
  });
}

function mostrarRepuestosDeFirebaseGT86() {
  refRepuestosGT86.on("value", function(snap) {
    var datos = snap.val();
    var filasAMostrar = "";
    for (var key in datos) {
      filasAMostrar += "<tr>" +
                        "<td>" + datos[key].categoria + "</td>" +
                        "<td>"+ "<p>" + datos[key].repuesto + "</p>" + "</td>" +
                        "<td>"+ "<p>" + datos[key].referencia + "</p>" + "</td>" +
                        "<td>" +
                          '<button class ="btn btn-primary editar" data-repuesto="'+ key +'">' +
                          '<span class="glyphicon glyphicon-pencil"></span>'+
                          '</button>'+
                        "</td>" +
                        "<td>" +
                          '<button class ="btn btn-danger borrar" data-repuesto="'+ key +'">' +
                          '<span class="glyphicon glyphicon-trash"></span>'+
                          '</button>'+
                        "</td>" +
                        "</tr>"
    }
    tbodyRepuestosGT86.innerHTML = filasAMostrar;
    if (filasAMostrar != "") {
      var elementosEditables = document.getElementsByClassName("editar");
      for (var i = 0; i < elementosEditables.length; i++) {
        elementosEditables[i].addEventListener("click", editarRepuestosDeFirebaseGT86, false);
      }

      var elementosBorrables = document.getElementsByClassName("borrar");
      for (var i = 0; i < elementosBorrables.length; i++) {
        elementosBorrables[i].addEventListener("click", borrarRepuestosDeFirebaseGT86, false);
      }
    }
  });
}

function mostrarRepuestosDeFirebaseStarlet() {
  refRepuestosStarlet.on("value", function(snap) {
    var datos = snap.val();
    var filasAMostrar = "";
    for (var key in datos) {
      filasAMostrar += "<tr>" +
                        "<td>" + datos[key].categoria + "</td>" +
                        "<td>"+ "<p>" + datos[key].repuesto + "</p>" + "</td>" +
                        "<td>"+ "<p>" + datos[key].referencia + "</p>" + "</td>" +
                        "<td>" +
                          '<button class ="btn btn-primary editar" data-repuesto="'+ key +'">' +
                          '<span class="glyphicon glyphicon-pencil"></span>'+
                          '</button>'+
                        "</td>" +
                        "<td>" +
                          '<button class ="btn btn-danger borrar" data-repuesto="'+ key +'">' +
                          '<span class="glyphicon glyphicon-trash"></span>'+
                          '</button>'+
                        "</td>" +
                        "</tr>"
    }
    tbodyRepuestosStarlet.innerHTML = filasAMostrar;
    if (filasAMostrar != "") {
      var elementosEditables = document.getElementsByClassName("editar");
      for (var i = 0; i < elementosEditables.length; i++) {
        elementosEditables[i].addEventListener("click", editarRepuestosDeFirebaseStarlet, false);
      }

      var elementosBorrables = document.getElementsByClassName("borrar");
      for (var i = 0; i < elementosBorrables.length; i++) {
        elementosBorrables[i].addEventListener("click", borrarRepuestosDeFirebaseStarlet, false);
      }
    }
  });
}

function mostrarRepuestosDeFirebasePaseo() {
  refRepuestosPaseo.on("value", function(snap) {
    var datos = snap.val();
    var filasAMostrar = "";
    for (var key in datos) {
      filasAMostrar += "<tr>" +
                        "<td>" + datos[key].categoria + "</td>" +
                        "<td>"+ "<p>" + datos[key].repuesto + "</p>" + "</td>" +
                        "<td>"+ "<p>" + datos[key].referencia + "</p>" + "</td>" +
                        "<td>" +
                          '<button class ="btn btn-primary editar" data-repuesto="'+ key +'">' +
                          '<span class="glyphicon glyphicon-pencil"></span>'+
                          '</button>'+
                        "</td>" +
                        "<td>" +
                          '<button class ="btn btn-danger borrar" data-repuesto="'+ key +'">' +
                          '<span class="glyphicon glyphicon-trash"></span>'+
                          '</button>'+
                        "</td>" +
                        "</tr>"
    }
    tbodyRepuestosPaseo.innerHTML = filasAMostrar;
    if (filasAMostrar != "") {
      var elementosEditables = document.getElementsByClassName("editar");
      for (var i = 0; i < elementosEditables.length; i++) {
        elementosEditables[i].addEventListener("click", editarRepuestosDeFirebasePaseo, false);
      }

      var elementosBorrables = document.getElementsByClassName("borrar");
      for (var i = 0; i < elementosBorrables.length; i++) {
        elementosBorrables[i].addEventListener("click", borrarRepuestosDeFirebasePaseo, false);
      }
    }
  });
}

function mostrarRepuestosDeFirebaseHilux() {
  refRepuestosHilux.on("value", function(snap) {
    var datos = snap.val();
    var filasAMostrar = "";
    for (var key in datos) {
      filasAMostrar += "<tr>" +
                        "<td>" + datos[key].categoria + "</td>" +
                        "<td>"+ "<p>" + datos[key].repuesto + "</p>" + "</td>" +
                        "<td>"+ "<p>" + datos[key].referencia + "</p>" + "</td>" +
                        "<td>" +
                          '<button class ="btn btn-primary editar" data-repuesto="'+ key +'">' +
                          '<span class="glyphicon glyphicon-pencil"></span>'+
                          '</button>'+
                        "</td>" +
                        "<td>" +
                          '<button class ="btn btn-danger borrar" data-repuesto="'+ key +'">' +
                          '<span class="glyphicon glyphicon-trash"></span>'+
                          '</button>'+
                        "</td>" +
                        "</tr>"
    }
    tbodyRepuestosHilux.innerHTML = filasAMostrar;
    if (filasAMostrar != "") {
      var elementosEditables = document.getElementsByClassName("editar");
      for (var i = 0; i < elementosEditables.length; i++) {
        elementosEditables[i].addEventListener("click", editarRepuestosDeFirebaseHilux, false);
      }

      var elementosBorrables = document.getElementsByClassName("borrar");
      for (var i = 0; i < elementosBorrables.length; i++) {
        elementosBorrables[i].addEventListener("click", borrarRepuestosDeFirebaseHilux, false);
      }
    }
  });
}

function editarRepuestosDeFirebase() {
  var keyDeRepuestoAEditar = this.getAttribute("data-repuesto");
  refRepuestoAEditar = refRepuestos.child(keyDeRepuestoAEditar);
  refRepuestoAEditar.once("value", function(snap){
    var datos = snap.val();
    document.getElementById("categoria").value = datos.categoria;
    document.getElementById("repuesto").value = datos.repuesto;
    document.getElementById("referencia").value = datos.referencia;
  });
  document.getElementById("boton-enviar-repuesto").value = UPDATE;
  modo = UPDATE;
}

function editarRepuestosDeFirebaseKE70() {
  var keyDeRepuestoAEditar = this.getAttribute("data-repuestoKE70");
  refRepuestoAEditarKE70 = refRepuestosKE70.child(keyDeRepuestoAEditar);
  refRepuestoAEditarKE70.once("value", function(snapshot){
    var datos = snapshot.val();
    document.getElementById("categoriaKE70").value = datos.categoria;
    document.getElementById("repuestoKE70").value = datos.repuesto;
    document.getElementById("referenciaKE70").value = datos.referencia;
  });
  document.getElementById("boton-enviar-repuesto-KE70").value = UPDATE;
  modo = UPDATE;
}

function editarRepuestosDeFirebaseCelica() {
  var keyDeRepuestoAEditar = this.getAttribute("data-repuesto");
  refRepuestoAEditarCelica = refRepuestosCelica.child(keyDeRepuestoAEditar);
  refRepuestoAEditarCelica.once("value", function(snap){
    var datos = snap.val();
    document.getElementById("categoriaCelica").value = datos.categoria;
    document.getElementById("repuestoCelica").value = datos.repuesto;
    document.getElementById("referenciaCelica").value = datos.referencia;
  });
  document.getElementById("boton-enviar-repuesto-Celica").value = UPDATE;
  modo = UPDATE;
}

function editarRepuestosDeFirebaseGT86() {
  var keyDeRepuestoAEditar = this.getAttribute("data-repuesto");
  refRepuestoAEditarGT86 = refRepuestosGT86.child(keyDeRepuestoAEditar);
  refRepuestoAEditarGT86.once("value", function(snap){
    var datos = snap.val();
    document.getElementById("categoriaGT86").value = datos.categoria;
    document.getElementById("repuestoGT86").value = datos.repuesto;
    document.getElementById("referenciaGT86").value = datos.referencia;
  });
  document.getElementById("boton-enviar-repuesto-GT86").value = UPDATE;
  modo = UPDATE;
}

function editarRepuestosDeFirebaseStarlet() {
  var keyDeRepuestoAEditar = this.getAttribute("data-repuesto");
  refRepuestoAEditarStarlet = refRepuestosStarlet.child(keyDeRepuestoAEditar);
  refRepuestoAEditarStarlet.once("value", function(snap){
    var datos = snap.val();
    document.getElementById("categoriaStarlet").value = datos.categoria;
    document.getElementById("repuestoStarlet").value = datos.repuesto;
    document.getElementById("referenciaStarlet").value = datos.referencia;
  });
  document.getElementById("boton-enviar-repuesto-Starlet").value = UPDATE;
  modo = UPDATE;
}

function editarRepuestosDeFirebasePaseo() {
  var keyDeRepuestoAEditar = this.getAttribute("data-repuesto");
  refRepuestoAEditarPaseo = refRepuestosPaseo.child(keyDeRepuestoAEditar);
  refRepuestoAEditarPaseo.once("value", function(snap){
    var datos = snap.val();
    document.getElementById("categoriaPaseo").value = datos.categoria;
    document.getElementById("repuestoPaseo").value = datos.repuesto;
    document.getElementById("referenciaPaseo").value = datos.referencia;
  });
  document.getElementById("boton-enviar-repuesto-Paseo").value = UPDATE;
  modo = UPDATE;
}

function editarRepuestosDeFirebaseHiace() {
  var keyDeRepuestoAEditar = this.getAttribute("data-repuesto");
  refRepuestoAEditarHiace = refRepuestosHiace.child(keyDeRepuestoAEditar);
  refRepuestoAEditarHiace.once("value", function(snap){
    var datos = snap.val();
    document.getElementById("categoriaHiace").value = datos.categoria;
    document.getElementById("repuestoHiace").value = datos.repuesto;
    document.getElementById("referenciaHiace").value = datos.referencia;
  });
  document.getElementById("boton-enviar-repuesto-Hiace").value = UPDATE;
  modo = UPDATE;
}

function editarRepuestosDeFirebaseHilux() {
  var keyDeRepuestoAEditar = this.getAttribute("data-repuesto");
  refRepuestoAEditarHilux = refRepuestosHilux.child(keyDeRepuestoAEditar);
  refRepuestoAEditarHilux.once("value", function(snap){
    var datos = snap.val();
    document.getElementById("categoriaHilux").value = datos.categoria;
    document.getElementById("repuestoHilux").value = datos.repuesto;
    document.getElementById("referenciaHilux").value = datos.referencia;
  });
  document.getElementById("boton-enviar-repuesto-Hilux").value = UPDATE;
  modo = UPDATE;
}

function borrarRepuestosDeFirebase() {
  var keyDeRepuestoABorrar = this.getAttribute("data-repuesto");
  var refRepuestoABorrar = refRepuestos.child(keyDeRepuestoABorrar);
  refRepuestoABorrar.remove();
}

function borrarRepuestosDeFirebaseKE70() {
  var keyDeRepuestoABorrar = this.getAttribute("data-repuestoKE70");
  var refRepuestoABorrarKE70 = refRepuestosKE70.child(keyDeRepuestoABorrar);
  refRepuestoABorrarKE70.remove();
}

function borrarRepuestosDeFirebaseCelica() {
  var keyDeRepuestoABorrar = this.getAttribute("data-repuesto");
  var refRepuestoABorrarCelica = refRepuestosCelica.child(keyDeRepuestoABorrar);
  refRepuestoABorrarCelica.remove();
}

function borrarRepuestosDeFirebaseGT86() {
  var keyDeRepuestoABorrar = this.getAttribute("data-repuesto");
  var refRepuestoABorrarGT86 = refRepuestosGT86.child(keyDeRepuestoABorrar);
  refRepuestoABorrarGT86.remove();
}

function borrarRepuestosDeFirebaseStarlet() {
  var keyDeRepuestoABorrar = this.getAttribute("data-repuesto");
  var refRepuestoABorrarStarlet = refRepuestosStarlet.child(keyDeRepuestoABorrar);
  refRepuestoABorrarStarlet.remove();
}

function borrarRepuestosDeFirebasePaseo() {
  var keyDeRepuestoABorrar = this.getAttribute("data-repuesto");
  var refRepuestoABorrarPaseo = refRepuestosPaseo.child(keyDeRepuestoABorrar);
  refRepuestoABorrarPaseo.remove();
}

function borrarRepuestosDeFirebaseHiace() {
  var keyDeRepuestoABorrar = this.getAttribute("data-repuesto");
  var refRepuestoABorrarHiace = refRepuestosHiace.child(keyDeRepuestoABorrar);
  refRepuestoABorrarHiace.remove();
}

function borrarRepuestosDeFirebaseHilux() {
  var keyDeRepuestoABorrar = this.getAttribute("data-repuesto");
  var refRepuestoABorrarHilux = refRepuestosHilux.child(keyDeRepuestoABorrar);
  refRepuestoABorrarHilux.remove();
}

function enviarRepuestosAFirebase(event) {
  event.preventDefault();
  switch (modo) {
    case CREATE:
      refRepuestos.push({
        categoria: event.target.categoria.value,
        repuesto: event.target.repuesto.value,
        referencia: event.target.referencia.value,
        //modelo: refModelos.push(event.target.modelo.value)
      }),
      myNews.push({
        descripcion: event.target.repuesto.value,
        titulo: "Nuevo artículo añadido AE86",
        url: "http://autorecambiosbealber.com"
      });
      break;
    case UPDATE:
      refRepuestoAEditar.update({
        categoria: event.target.categoria.value,
        repuesto: event.target.repuesto.value,
        referencia: event.target.referencia.value
      });
      modo = CREATE;
      document.getElementById("boton-enviar-repuesto").value = CREATE;
      break;
  }
  formRepuestos.reset();
}

function enviarRepuestosAFirebaseKE70(event) {
  event.preventDefault();
  switch (modo) {
    case CREATE:
      refRepuestosKE70.push({
        categoria: event.target.categoriaKE70.value,
        repuesto: event.target.repuestoKE70.value,
        referencia: event.target.referenciaKE70.value
      }),
      myNews.push({
        descripcion: event.target.repuestoKE70.value,
        titulo: "Nuevo artículo añadido KE70",
        url: "http://autorecambiosbealber.com"
      });
      break;
    case UPDATE:
      refRepuestoAEditarKE70.update({
        categoria: event.target.categoriaKE70.value,
        repuesto: event.target.repuestoKE70.value,
        referencia: event.target.referenciaKE70.value
      });
      modo = CREATE;
      document.getElementById("boton-enviar-repuesto-KE70").value = CREATE;
      break;
  }
  formRepuestosKE70.reset();
}

function enviarRepuestosAFirebaseCelica(event) {
  event.preventDefault();
  switch (modo) {
    case CREATE:
      refRepuestosCelica.push({
        categoria: event.target.categoriaCelica.value,
        repuesto: event.target.repuestoCelica.value,
        referencia: event.target.referenciaCelica.value
      }),
      myNews.push({
        descripcion: event.target.repuestoCelica.value,
        titulo: "Nuevo artículo añadido Celica",
        url: "http://autorecambiosbealber.com"
      });
      break;
    case UPDATE:
      refRepuestoAEditarCelica.update({
        categoria: event.target.categoriaCelica.value,
        repuesto: event.target.repuestoCelica.value,
        referencia: event.target.referenciaCelica.value
      });
      modo = CREATE;
      document.getElementById("boton-enviar-repuesto-Celica").value = CREATE;
      break;
  }
  formRepuestosCelica.reset();
}

function enviarRepuestosAFirebaseGT86(event) {
  event.preventDefault();
  switch (modo) {
    case CREATE:
      refRepuestosGT86.push({
        categoria: event.target.categoriaGT86.value,
        repuesto: event.target.repuestoGT86.value,
        referencia: event.target.referenciaGT86.value
      }),
      myNews.push({
        descripcion: event.target.repuestoGT86.value,
        titulo: "Nuevo artículo añadido GT86",
        url: "http://autorecambiosbealber.com"
      });
      break;
    case UPDATE:
      refRepuestoAEditarGT86.update({
        categoria: event.target.categoriaGT86.value,
        repuesto: event.target.repuestoGT86.value,
        referencia: event.target.referenciaGT86.value
      });
      modo = CREATE;
      document.getElementById("boton-enviar-repuesto-GT86").value = CREATE;
      break;
  }
  formRepuestosGT86.reset();
}

function enviarRepuestosAFirebaseStarlet(event) {
  event.preventDefault();
  switch (modo) {
    case CREATE:
      refRepuestosStarlet.push({
        categoria: event.target.categoriaStarlet.value,
        repuesto: event.target.repuestoStarlet.value,
        referencia: event.target.referenciaStarlet.value
      }),
      myNews.push({
        descripcion: event.target.repuestoStarlet.value,
        titulo: "Nuevo artículo añadido Starlet",
        url: "http://autorecambiosbealber.com"
      });
      break;
    case UPDATE:
      refRepuestoAEditarStarlet.update({
        categoria: event.target.categoriaStarlet.value,
        repuesto: event.target.repuestoStarlet.value,
        referencia: event.target.referenciaStarlet.value
      });
      modo = CREATE;
      document.getElementById("boton-enviar-repuesto-Starlet").value = CREATE;
      break;
  }
  formRepuestosStarlet.reset();
}

function enviarRepuestosAFirebasePaseo(event) {
  event.preventDefault();
  switch (modo) {
    case CREATE:
      refRepuestosPaseo.push({
        categoria: event.target.categoriaPaseo.value,
        repuesto: event.target.repuestoPaseo.value,
        referencia: event.target.referenciaPaseo.value
      }),
      myNews.push({
        descripcion: event.target.repuestoPaseo.value,
        titulo: "Nuevo artículo añadido Paseo",
        url: "http://autorecambiosbealber.com"
      });
      break;
    case UPDATE:
      refRepuestoAEditarPaseo.update({
        categoria: event.target.categoriaPaseo.value,
        repuesto: event.target.repuestoPaseo.value,
        referencia: event.target.referenciaPaseo.value
      });
      modo = CREATE;
      document.getElementById("boton-enviar-repuesto-Paseo").value = CREATE;
      break;
  }
  formRepuestosPaseo.reset();
}

function enviarRepuestosAFirebaseHiace(event) {
  event.preventDefault();
  switch (modo) {
    case CREATE:
      refRepuestosHiace.push({
        categoria: event.target.categoriaHiace.value,
        repuesto: event.target.repuestoHiace.value,
        referencia: event.target.referenciaHiace.value
      }),
      myNews.push({
        descripcion: event.target.repuestoHiace.value,
        titulo: "Nuevo artículo añadido Hiace",
        url: "http://autorecambiosbealber.com"
      });
      break;
    case UPDATE:
      refRepuestoAEditarHiace.update({
        categoria: event.target.categoriaHiace.value,
        repuesto: event.target.repuestoHiace.value,
        referencia: event.target.referenciaHiace.value
      });
      modo = CREATE;
      document.getElementById("boton-enviar-repuesto-Hiace").value = CREATE;
      break;
  }
  formRepuestosHiace.reset();
}

function enviarRepuestosAFirebaseHilux(event) {
  event.preventDefault();
  switch (modo) {
    case CREATE:
      refRepuestosHilux.push({
        categoria: event.target.categoriaHilux.value,
        repuesto: event.target.repuestoHilux.value,
        referencia: event.target.referenciaHilux.value
      }),
      myNews.push({
        descripcion: event.target.repuestoHilux.value,
        titulo: "Nuevo artículo añadido Hilux",
        url: "http://autorecambiosbealber.com"
      });
      break;
    case UPDATE:
      refRepuestoAEditarHilux.update({
        categoria: event.target.categoriaHilux.value,
        repuesto: event.target.repuestoHilux.value,
        referencia: event.target.referenciaHilux.value
      });
      modo = CREATE;
      document.getElementById("boton-enviar-repuesto-Hilux").value = CREATE;
      break;
  }
  formRepuestosHilux.reset();
}

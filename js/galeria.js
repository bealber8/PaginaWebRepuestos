window.onload = inicializar;
var subirImagenes;;
var refImagenesDatabase;
var refImagenesStorage;
var refImagenAEditar;
var downloadURL;
var imagenSeleccionada;
var uploadTask;
var CREATE = "Añadir modelo";
var UPDATE = "Modificar modelo";
var modo = CREATE;
var ANADIR = "Añadir imagen";
var MODIFICAR = "Modificar imagen";
var estadoImagen = ANADIR;
var formModelo;
var refModelos;
var listModelos;
var refModeloAEditar;

function inicializar() {
  comprobarEstado();
  subirImagenes = document.getElementById("subirImagen");
  subirImagenes.addEventListener("change", subirImagenFirebase);

  //refImagenesDatabase = firebase.database().ref().child("imagenes");
  refImagenesStorage = firebase.storage().ref();

  //mostrarImagenesFirebase();

  formModelo = document.getElementById("formModelo");
  formModelo.addEventListener("submit", enviarModeloAFirebase);
  refModelos = firebase.database().ref().child("modelos");
  listModelos = document.getElementById("listModelos");
  mostrarModelosDeFirebase();

  document.getElementById("rss").addEventListener("click", showRSS);
  refRepuestos = firebase.database().ref().child("repuestos");
  refRepuestosKE70 = firebase.database().ref().child("repuestosKE70");
  refRepuestosCelica = firebase.database().ref().child("repuestosCelica");
  refRepuestosGT86 = firebase.database().ref().child("repuestosGT86");
  refRepuestosStarlet = firebase.database().ref().child("repuestosStarlet");
  refRepuestosPaseo = firebase.database().ref().child("repuestosPaseo");
  refRepuestosHiace = firebase.database().ref().child("repuestosHiace");
  refRepuestosHilux = firebase.database().ref().child("repuestosHilux");

}

function comprobarEstado() {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.

    } else {
      // No user is signed in.
      document.getElementById("formModelo").style.display = "none";
    }
  });
}

function showRSS(){
  createRSS();
  // location.href = "rss.xml";
}

function createRSS(){
  var myRSS = '<?xml version="1.0" encoding="UTF-8"?>';
  myRSS += '<rss version="2.0">';
  myRSS += '<channel>';
  myRSS += '<title>Auto Recambios Bealber</title>';
  myRSS += '<link>http://www.autorecambiosbealber.com</link>';
  myRSS += '<description>Noticias de nuevos productos en el inventario</description>';

  var myNews = firebase.database().ref().child("misNoticias");
  myNews.once("value", function(snapshot){
    var data = snapshot.val();
    for (var key in data) {
      myRSS += '<item>';
      myRSS += '<title>' + data[key].titulo + '</title>';
      myRSS += '<description>' + data[key].descripcion + '</description>';
      myRSS += '<link>' + data[key].url + '</link>';
      myRSS += '</item>';
    }

    myRSS += '</channel>';
    myRSS += '</rss>';

    console.log(myRSS);

    window.open('data:text/xml,'+encodeURIComponent(myRSS),
     "Test", "width=300,height=300,scrollbars=1,resizable=1");

  });

}

function enviarModeloAFirebase(event) {
  event.preventDefault();
  switch (modo) {
    case CREATE:
      refModelos.push({
        nombre: event.target.modelo.value,
        url: downloadURL
      });
      break;
    case UPDATE:
      refModeloAEditar.update({
        nombre: event.target.modelo.value,
        url: downloadURL
      });
      modo = CREATE;
      document.getElementById("boton-enviar-modelo").value = CREATE;
      break;
  }
  formModelo.reset();
}

function mostrarModelosDeFirebase() {
  refModelos.on("value", function(snap) {
    var datos = snap.val();
    var filasAMostrar = "";
    for (var key in datos) {
      filasAMostrar += '<div class="col-sm-7">'+
                          '<a href="repuesto.html" class="list-group-item">'+ datos[key].nombre + '</a>' +
                          '</div>' +
                          '<div class="col-sm-3">'+
                          '<img width="200" src="'+ datos[key].url+'">'+
                          '</div>' +
                          '<div class="col-sm-2">'+
                          '<button class ="btn btn-primary editar" data-modelo="'+ key +'">' +
                          '<span class="glyphicon glyphicon-pencil" ></span>'+
                          '</button>'+
                          '<button class ="btn btn-danger borrar" data-modelo="'+ key +'">' +
                          '<span class="glyphicon glyphicon-trash"></span>'+
                          '</button>' +
                          '</div>'

    }
    listModelos.innerHTML = filasAMostrar;
    if (filasAMostrar != "") {
      var elementosEditables = document.getElementsByClassName("editar");
      for (var i = 0; i < elementosEditables.length; i++) {
        elementosEditables[i].addEventListener("click", editarModelosDeFirebase);
      }

      var elementosBorrables = document.getElementsByClassName("borrar");
      for (var i = 0; i < elementosBorrables.length; i++) {
        elementosBorrables[i].addEventListener("click", borrarModelosDeFirebase);
      }
    }
  });
}

function editarModelosDeFirebase() {
  var keyDeModeloAEditar = this.getAttribute("data-modelo");
  refModeloAEditar = refModelos.child(keyDeModeloAEditar);
  refModeloAEditar.once("value", function(snap){
    var datos = snap.val();
    document.getElementById("modelo").value = datos.nombre;
  });
  document.getElementById("boton-enviar-modelo").value = UPDATE;
  modo = UPDATE;
}

function borrarModelosDeFirebase() {
  var keyDeModeloABorrar = this.getAttribute("data-modelo");
  var refModeloABorrar = refModelos.child(keyDeModeloABorrar);
  refModeloABorrar.remove();
}

// function mostrarImagenesFirebase() {
//   refImagenesDatabase.on("value", function(snapshot){
//     var datos = snapshot.val();
//     var imagenes = "";
//     for(var key in datos){
//       imagenes += '<div class="thumbnail">' +
//                   '<a href="'+ datos[key].url+'">' +
//                   '<img src="'+ datos[key].url+'">' +
//                   '</a>' +
//                   '<button class ="btn btn-danger borrar" data-imagen="'+ key +'" id="borrar">' +
//                   '<span class="glyphicon glyphicon-trash"></span>'+
//                   '</button>'+
//                   '<button class ="btn btn-primary editar" data-imagen="'+ key +'" id="editar">' +
//                   '<span class="glyphicon glyphicon-pencil"></span>'+
//                   '</button>'+
//                   '</div>'
//     }
//     var ponerImagenes = document.getElementById("imagenes");
//     ponerImagenes.innerHTML = imagenes;
//
//     if (imagenes != "") {
//       var elementosBorrables = document.getElementsByClassName("borrar");
//       for (var i = 0; i < elementosBorrables.length; i++) {
//         elementosBorrables[i].addEventListener("click", borrarImagenesFirebase);
//       }
//       var elementosEditables = document.getElementsByClassName("editar");
//       for (var i = 0; i < elementosEditables.length; i++) {
//         elementosEditables[i].addEventListener("click", editarImagenesFirebase);
//       }
//     }
//   })
// }

// function editarImagenesFirebase() {
//   var keyImagenAEditar = this.getAttribute("data-imagen");
//   refImagenAEditar = refImagenesDatabase.child(keyImagenAEditar);
//   // refImagenAEditar.once("value", function(snapshot){
//   //   var datos = snapshot.val();
//   //   refImagenAEditar.update({ nombre: imagenSeleccionada.name, url: downloadURL })
//   // });
//
//   estadoImagen = MODIFICAR;
//   // subirImagenFirebase();
// }

// function borrarImagenesFirebase() {
//   var keyImagenABorrar = this.getAttribute("data-imagen");
//   var refImagenABorrar = refImagenesDatabase.child(keyImagenABorrar);
//   refImagenABorrar.remove();
// }

function subirImagenFirebase() {
  imagenSeleccionada = subirImagenes.files[0];
  uploadTask = refImagenesStorage.child('imagenes/' +imagenSeleccionada.name).put(imagenSeleccionada);

  document.getElementById("progreso").className = "";

  uploadTask.on('state_changed',
  function(snapshot){
     var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
     document.getElementById("barraProgreso").style.width = progress + "%";
}, function(error) {
  // Handle unsuccessful uploads
  alert("hubo un error")
}, function() {
  // Handle successful uploads on complete
  // For instance, get the download URL: https://firebasestorage.googleapis.com/...
  downloadURL = uploadTask.snapshot.downloadURL;
  //crearHijoDatabase(imagenSeleccionada.name, downloadURL);
  //enviarModeloAFirebase(downloadURL);
  document.getElementById("progreso").className = "hidden";
});
}

// function crearHijoDatabase(nombreImagen, downloadURL) {
//   //refImagenesDatabase.push({ nombre: nombreImagen, url: downloadURL });
//   switch (estadoImagen) {
//     case ANADIR:
//       refImagenesDatabase.push({ nombre: nombreImagen, url: downloadURL });
//       break;
//     case MODIFICAR:
//       refImagenAEditar.update({ nombre: nombreImagen, url: downloadURL });
//       estadoImagen= ANADIR;
//       break;
//   }

//}

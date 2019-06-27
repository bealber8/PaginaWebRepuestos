window.onload = inicializar;
// var datos = [];

function inicializar(){
  var refdatosFormulario = firebase.database().ref().child("datosFormulario");
  refdatosFormulario.on("value", refrescar);

  var formulario = document.getElementById("formulario");
  formulario.addEventListener("submit", validar);

  document.getElementById("rss").addEventListener("click", showRSS);
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

function refrescar(snapshot) {
  var datos = snapshot.val();
  var todosLosDatos = "";
  for(var key in datos){
    todosLosDatos += "<br>" + "Nombre: "+ datos[key].nombre + "<br>" +
    "Apellido1: " + datos[key].apellido1 + "<br>" +
    "Apellido2: " + datos[key].apellido2 + "<br>" +
    "País: " + datos[key].pais + "<br>" +
    "Localidad: " + datos[key].localidad + "<br>" +
    "Dirección: " + datos[key].direccion + "<br>" +
    "Edad: " + datos[key].edad + "<br>" +
    "Email: " + datos[key].email + "<br>" +
    "Teléfono: " + datos[key].telefono + "<br>" +
    "Asunto: " + datos[key].asunto +"<br>"
  }
  document.getElementById("datosFormulario").innerHTML = todosLosDatos;
}

function validar(event) {
  var formulario = event.target;

  //Valido el nombre
  if (document.formulario.nombre.value.length == 0) {
    event.preventDefault();
    // alert("Campo requerido");
    document.getElementById("error-nombre").style.display = "inline";
    // document.getElementById("nombre").innerHTML = "Error en el campo1.....";
    document.formulario.nombre.focus();
    return false;
  } else {
    document.getElementById("error-nombre").style.display = "none";
  }

  //valido Apellido1
  if (document.formulario.apellido1.value.length == 0) {
    event.preventDefault();
    document.getElementById("error-apellido1").style.display = "inline";
    document.formulario.apellido1.focus();
    return false;
  } else {
    document.getElementById("error-apellido1").style.display = "none";
  }

  //valido Apellido2
  if (document.formulario.apellido2.value.length == 0) {
    event.preventDefault();
    document.getElementById("error-apellido2").style.display = "inline";
    document.formulario.apellido2.focus();
    return false;
  } else {
    document.getElementById("error-apellido2").style.display = "none";
  }

  //valido el País
  if (document.formulario.pais.value.length == 0) {
    event.preventDefault();
    document.getElementById("error-pais").style.display = "inline";
    document.formulario.pais.focus();
    return false;
  } else {
    document.getElementById("error-pais").style.display = "none";
  }

  //valido la Localidad
  if (document.formulario.localidad.value.length == 0) {
    event.preventDefault();
    document.getElementById("error-localidad").style.display = "inline";
    document.formulario.localidad.focus();
    return false;
  } else {
    document.getElementById("error-localidad").style.display = "none";
  }

  //valido la dirección
  if (document.formulario.direccion.value.length == 0) {
    event.preventDefault();
    document.getElementById("error-direccion").style.display = "inline";
    document.formulario.direccion.focus();
    return false;
  } else {
    document.getElementById("error-direccion").style.display = "none";
  }

  //valido la edad
  if (document.formulario.edad.value.length == 0) {
    event.preventDefault();
document.getElementById("error-edad").style.display = "inline";
document.formulario.edad.focus();
    return false;
  } else {
    document.getElementById("error-edad").style.display = "none";
  }
  if (document.formulario.edad.value < 10 || document.formulario.edad.value > 100) {
    event.preventDefault();
    document.getElementById("error-edad").style.display = "inline";
    document.formulario.edad.focus();
    return false;
  } else {
    document.getElementById("error-edad").style.display = "none";
  }

  //valido el email
  if (document.formulario.email.value.length == 0) {
    event.preventDefault();
    document.getElementById("error-email").style.display = "inline";
    document.formulario.email.focus();
    return false;
  } else {
    document.getElementById("error-email").style.display = "none";
  }

  //valido el teléfono
  var telefono = document.getElementById("telefono").value;
  if (telefono != "") {
    if (!(/^\d{9}$/.test(telefono))) {
      event.preventDefault();
      document.getElementById("error-telefono").style.display = "inline";
      document.formulario.telefono.focus();
      return false;
    } else {
      document.getElementById("error-telefono").style.display = "none";
    }
  }

  //valido si los botones de radio han sido seleccionados
  var opcionesRadio = document.getElementsByName("opcionesRadio");
  var seleccionado = false;
  for (var i = 0; i < opcionesRadio.length; i++) {
    if (opcionesRadio[i].checked) {
      seleccionado = true;
      break;
    }
  }
  if (!seleccionado) {
    event.preventDefault();
    document.getElementById("error-radio").style.display = "inline";
    return false;
  } else {
    document.getElementById("error-radio").style.display = "none";
  }

  //valido el asunto
  if (document.formulario.asunto.value.length == 0) {
    event.preventDefault();
    document.getElementById("error-asunto").style.display = "inline";
    document.formulario.asunto.focus();
    return false;
  } else {
    document.getElementById("error-asunto").style.display = "none";
  }

  //valido si el elemento select ha sido seleccionado
  if (document.formulario.opciones.selectedIndex==0){
    event.preventDefault();
    document.getElementById("error-select").style.display = "inline";
    document.formulario.opciones.focus();
    return false;
  } else {
    document.getElementById("error-select").style.display = "none";
  }

  var refdatosFormulario = firebase.database().ref().child("datosFormulario");
  refdatosFormulario.push({
    nombre: formulario.nombre.value,
    apellido1: formulario.apellido1.value,
    apellido2: formulario.apellido2.value,
    pais: formulario.pais.value,
    localidad: formulario.localidad.value,
    direccion: formulario.direccion.value,
    edad: formulario.edad.value,
    email: formulario.email.value,
    telefono: formulario.telefono.value,
    asunto: formulario.asunto.value
  });
  // //el formulario se envía
  // document.formulario.submit();
}


//
// function nuevoDatoIntroducido(event){
//   event.preventDefault();
//   var formulario = event.target;
//   var nuevosDatosIntroducidos = {
//     nombre: formulario.nombre.value,
//     apellido1: formulario.apellido1.value,
//     apellido2: formulario.apellido2.value,
//     pais: formulario.pais.value,
//     localidad: formulario.localidad.value,
//     direccion: formulario.direccion.value,
//     edad: formulario.edad.value,
//     email: formulario.email.value,
//     telefono: formulario.telefono.value,
//     asunto: formulario.asunto.value
//   };
//
//   datos.push(nuevosDatosIntroducidos);
//   mostrarDatos(nuevosDatosIntroducidos);
// }
//
// function mostrarDatos(datos) {
//   console.log("mostrarDatos");
//   console.log(datos);
//   var fila = document.createElement("tr");
//   var columnaNombre = document.createElement("td");
//   var textoNombre = document.createTextNode(datos.nombre);
//
//   columnaNombre.append(textoNombre);
//     console.log(textoNombre);
//   fila.append(columnaNombre);
//   document.getElementById("filas").append(fila);
//
//   var columnaApellido1 = document.createElement("td");
//   var textoApellido1 = document.createTextNode(datos.apellido1);
//
//   columnaApellido1.appendChild(textoApellido1);
//   fila.appendChild(columnaApellido1);
//   document.getElementById("filas").appendChild(fila);
//
//   var columnaApellido2 = document.createElement("td");
//   var textoApellido2 = document.createTextNode(datos.apellido2);
//
//   columnaApellido2.appendChild(textoApellido2);
//   fila.appendChild(columnaApellido2);
//   document.getElementById("filas").appendChild(fila);
//
//   var columnaPais = document.createElement("td");
//   var textoPais = document.createTextNode(datos.pais);
//
//   columnaPais.appendChild(textoPais);
//   fila.appendChild(columnaPais);
//   document.getElementById("filas").appendChild(fila);
//
//   var columnaLocalidad = document.createElement("td");
//   var textoLocalidad = document.createTextNode(datos.localidad);
//
//   columnaLocalidad.appendChild(textoLocalidad);
//   fila.appendChild(columnaLocalidad);
//   document.getElementById("filas").appendChild(fila);
//
//   var columnaDireccion = document.createElement("td");
//   var textoDireccion = document.createTextNode(datos.direccion);
//
//   columnaDireccion.appendChild(textoDireccion);
//   fila.appendChild(columnaDireccion);
//   document.getElementById("filas").appendChild(fila);
//
//   var columnaEdad = document.createElement("td");
//   var textoEdad = document.createTextNode(datos.edad);
//
//   columnaEdad.appendChild(textoEdad);
//   fila.appendChild(columnaEdad);
//   document.getElementById("filas").appendChild(fila);
//
//   var columnaEmail = document.createElement("td");
//   var textoEmail = document.createTextNode(datos.email);
//
//   columnaEmail.appendChild(textoEmail);
//   fila.appendChild(columnaEmail);
//   document.getElementById("filas").appendChild(fila);
//
//   var columnaTelefono = document.createElement("td");
//   var textoTelefono = document.createTextNode(datos.telefono);
//
//   columnaTelefono.appendChild(textoTelefono);
//   fila.appendChild(columnaTelefono);
//   document.getElementById("filas").appendChild(fila);
//
//   var columnaasunto = document.createElement("td");
//   var textoasunto = document.createTextNode(datos.asunto);
//
//   columnaasunto.appendChild(textoasunto);
//   fila.appendChild(columnaasunto);
//   document.getElementById("filas").appendChild(fila);
//
// }

(function () {

  // Variable para guardar el formulario 
  var app = document.getElementById("app");

  // Variables que guardan los datos modificables del form
  var inputCaracteres = document.getElementById("numero-caracteres");
  var inputCantidad = document.getElementById("cantidad-contrasenas");

  // Objeto con la configuracion para generar la contraseña.

  var configuracion = {
    cantidad: parseInt(inputCantidad.value),
    impreso: parseInt(inputCantidad.value),
    caracteres: parseInt(inputCaracteres.value)
  }

 // objeto para validación de caracteres a usar
  var validacion = {
    simbolos: true,
    numeros: true,
    mayusculas: true,
    minusculas: true
  };

  // Objeto con cadenas de texto  con los caracteres de cada "atributo" para la contraseña

  var caracteres = {
    numeros: "1 2 3 4 5 6 7 8 9",
    simbolos: "",
    mayusculas: "A B C D E F G H I J K L M N P Q R S T U V W X Y Z",
    minusculas: "a b c d e f g h j k m n o p q r s t u v w x y z",
  };

  function agregaSimbolos() {

    caracteres.simbolos = "";
    var simbolos_temp = document.getElementById("input-simbolos").value;

    if (validacion.simbolos == true) {

      for (var i = 0; i < simbolos_temp.length; i++){
        caracteres.simbolos += simbolos_temp.charAt(i);
        caracteres.simbolos += " ";
      }
      caracteres.simbolos = caracteres.simbolos.trim();
    }
}


  // Evento para evitar que la app haga un submit para enviar los datos y se refresque la pagina.
  app.addEventListener("submit", function (e) {
    e.preventDefault();
  });


  app.elements.namedItem("btn-mas-uno").addEventListener("click", function () {
    configuracion.caracteres++;
    inputCaracteres.value = configuracion.caracteres;
  });


  app.elements
    .namedItem("btn-menos-uno")
    .addEventListener("click", function () {

      if (configuracion.caracteres > 1) {
        configuracion.caracteres--;
        inputCaracteres.value = configuracion.caracteres;
      }
    });

  app.elements.namedItem("btn-mas-uno1").addEventListener("click", function () {
    configuracion.cantidad++;
    inputCantidad.value = configuracion.cantidad;
    document.getElementById("input-password").setAttribute("rows", configuracion.cantidad);

  });


  app.elements
    .namedItem("btn-menos-uno1")
    .addEventListener("click", function () {

      if (configuracion.cantidad > 1) {
        configuracion.cantidad--;
        inputCantidad.value = configuracion.cantidad;
        document.getElementById("input-password").setAttribute("rows", configuracion.cantidad);
      }
    });

 	// Evento para el boton de simbolos que activara o desactivara si queremos simbolos en la contraseña.
	app.elements.namedItem('btn-simbolos').addEventListener('click', function(){
		btnToggle(this);
		validacion.simbolos = !validacion.simbolos;
        document.getElementById("input-simbolos").disabled = !document.getElementById("input-simbolos").disabled;

        if (document.getElementById("label-input-simbolos").className == 'disabled') {
          
            document.getElementById("label-input-simbolos").className =  "";
            document.getElementById("label-simbolos").className =  "";

        } else {

            document.getElementById("label-input-simbolos").className = 'disabled';
            document.getElementById("label-simbolos").className =  "disabled";
        }
           


	});
	// Evento para el boton de numeros que activara o desactivara si queremos numeros en la contraseña.
	app.elements.namedItem('btn-numeros').addEventListener('click', function(){

		btnToggle(this);

		validacion.numeros = !validacion.numeros;

        if (document.getElementById("label-numeros").className == 'disabled') {
          
            document.getElementById("label-numeros").className =  "";
            
        } else {

            document.getElementById("label-numeros").className = 'disabled';
        }

	});

	// Evento para el boton de mayusculas que activara o desactivara si queremos mayusculas en la contraseña.
	app.elements.namedItem('btn-mayusculas').addEventListener('click', function(){

		btnToggle(this);

		validacion.mayusculas = !validacion.mayusculas;

        if (document.getElementById("label-mayusculas").className == 'disabled') {
          
            document.getElementById("label-mayusculas").className =  "";
            
        } else {

            document.getElementById("label-mayusculas").className = 'disabled';
        }

	});

  // Evento para el boton de generar contraseña.
    app.elements.namedItem("btn-generar").addEventListener("click", function () {
    
    // Limpia el textarea al clickear el botón, y asigna la cantidad de 
    // contraseñas solicitadas a la variable que controla el while

    app.elements.namedItem("input-password").value= "";
    configuracion.impreso = configuracion.cantidad;
    
    if (validacion.simbolos == true) {
        agregaSimbolos();
    }

    while (configuracion.impreso > 0) {

      app.elements.namedItem("input-password").value += generarPassword();
      app.elements.namedItem("input-password").value += "\n";
      configuracion.impreso--;
    }

  });

  // Evento para el input de contraseña cuando reciba un click.
  app.elements
    .namedItem("input-password")
    .addEventListener("click", function () {
      // Ejecutamos la funcion que copiara el texto.
      copiarPassword();
    });

  // Funcion que permite alternar el estilo e icono de los botones.
  	function btnToggle(elemento){
		elemento.classList.toggle('false');
		elemento.childNodes[0].classList.toggle('fa-check');
		elemento.childNodes[0].classList.toggle('fa-times');
	} 

  // Funcion que genera la contraseña.
  function generarPassword() {
    // Variable en donde guardaremos la cadena de texto con todos los caracteres que podemos usar para generar la contraseña.
    var caracteresFinales = "";

    // Variable en donde guardaremos caracter por caractere la contraseña.
    var password = "";

    // Iteramos sobre el objeto configuracion para acceder a cada una de las propiedades.
    for (propiedad in validacion) {
      // Preguntamos si la propiedad es igual a true.
      if (validacion[propiedad] == true) {
        // se concatena la lista de caracteres disponibles para usar
        caracteresFinales += caracteres[propiedad] + " ";
      }
    }

    // Eliminamos el ultimo espaciado que sobra en la cadena de texto.
    caracteresFinales = caracteresFinales.trim();

    // Convertimos la cadena de texto de caracteres finales a un arreglo.
    caracteresFinales = caracteresFinales.split(" ");

    // Se utiliza una variable para contener solo las letras para primer caracter
    var letrasTemp = caracteres.minusculas; 
    
    if (validacion.mayusculas == true) {letrasTemp += " " + caracteres.mayusculas;}
    
    letrasTemp = letrasTemp.split(" "); // Convierte el string en un array de las letras

    for (var i = 0; i < configuracion.caracteres; i++) {

      // Fuerza a que en el primer indice del password elija una letra minuscula o mayuscula
      if (i == 0) {
        password = letrasTemp[Math.floor(Math.random() * letrasTemp.length)];
      } else {
        // A la variable password le vamos sumando un caracter al azar por cada iteracion.
        password += caracteresFinales[Math.floor(Math.random() * caracteresFinales.length)];
      }

      while (password.charAt(i) == password.charAt(i-1)){

        var nva = caracteresFinales[Math.floor(Math.random() * caracteresFinales.length)];
        password = password.substring(0,i) + nva + password.substring(i +1);

      }

    }

/*     for (let i = 0; i < password.length; i++){
      if(caracteres.mayusculas.match(password.charAt(i))){
          console.log(password.charAt(i));
          console.log("validado");
      }
    }  */
    return password;
  }

  // Funcion copia el texto al portapapeles.
  function copiarPassword() {
    // Selecciona el texto de un input
    app.elements.namedItem("input-password").select();
    // Copiamos el Texto
    document.execCommand("copy");
    document.getElementById("alerta-copiado").classList.add("active");

    setTimeout(function () {
      document.getElementById("alerta-copiado").classList.remove("active");
    }, 2000);
  }

  // Generamos una password con la configuracion por defecto al cargar la pagina
  generarPassword();
})();

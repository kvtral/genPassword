# Generador de Contraseñas
Generador de contraseñas en JS

[Funcionamiento Online](https://kvtral.github.io/genPassword/)

Debido a requerir creación de contraseñas seguras con caracteristicas muy especificas
en la creación masiva de usuarios:

* Contraseñas deben partir por una letra
* Debe contener al menos 1 número, 1 mayuscula, 1 minuscula y 1 caracter especial
* No debe tener 2 caracteres iguales seguidos

Es un fork a partir de codigo de [@FalconMasters](https://github.com/falconmasters) 
del siguiente [proyecto](https://github.com/falconmasters/Generador_Passwords)


## Features

* Cantidad de contraseñas:
* Cantidad de caracteres para c/contraseña
* Incluir / No Incluir : 
[ Caracteres  |
Números |
Mayusculas ]
* Genera en un textarea la cantidad solicitada

Para los caracteres se genera un input para colocar los que se requieran, por defecto carga los siguientes: [!@#$%^&*()_-+={[}];:<.>?/] 

La coma se excluyó intencionalmente* (en carga masiva de usuarios se utiiliza un csv separado por comas)

El textarea se ajusta a la cantidad solicitada

Click en textarea copia al portapapeles


### Actualización 

Se fuerza a función para que primer caracter sea letra mayuscula o minuscula, creo que esta funcion se puede mejorar:

```javascript
    for (var i = 0; i < configuracion.caracteres; i++) {

      // Fuerza a que en el primer indice del password elija una letra minuscula o mayuscula
      if (i == 0) {
        password = letrasTemp[Math.floor(Math.random() * letrasTemp.length)];
      } else {
        // A la variable password le vamos sumando un caracter al azar por cada iteracion.
        password += caracteresFinales[Math.floor(Math.random() * caracteresFinales.length)];
      }
    }
```

Se genera un bucle para reemplazar caracter en caso de tener dos caracteres seguidos iguales:

```javascript
      while (password.charAt(i) == password.charAt(i-1)){

        var nva = caracteresFinales[Math.floor(Math.random() * caracteresFinales.length)];
        password = password.substring(0,i) + nva + password.substring(i +1);
        
      }
```

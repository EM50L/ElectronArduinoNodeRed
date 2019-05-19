---
title: "Control Remoto por Comandos de Voz con Alexa"
date: 2019-05-12T18:48:09+02:00
draft: false
imagen_portada: "/posts/node-red/flows/alexa1/portada.gif"
categories: ["programacion","node-red","android"]
tags: ["node-red","iot","http","aprendizaje","alexa"]
weight: 1

---
Aqui dejo un flujo para node red.  
que recoge y procesa comandos de voz de alexa.  
Ahora solo queda hacer con el comando lo que quieras.  
Persianas, luces, comandos pc, control arduino...
<!--more-->

<!-- https://www.w3schools.com/js/tryit.asp?filename=tryjs_intro_lightbulb -->
<!-- https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_toggle_hide_show -->

<div id="danim" class="col-sm-3">
Animacion:
<img  id="anim" src="portada.gif" alt="Animacion Control Remoto por Comandos de Voz con Alexa" class="img-responsive img-thumbnail">
</div><div>
<br><br><button id="banim" onclick="
document.getElementById('anim').src='Em50L_ElectronArduinoNodeRed_Ejemplo_Control_con_Comandos_Alexa3.gif';
document.getElementById('danim').style.width='100%' 
document.getElementById('banim').style.display='none' ">
Cargar Animacion alta resolucion (1Mb)
</button></div><div class='clearfix'></div>
______________________________________

# Explicacion paso a paso.
______________________________________


## Necesitaras lo siguiente
- Aplicacion  [ElectronArduinoNodeRed] ({{< ref "ElectronArduinoNodeRed" >}})
- O tener instalado node red y los modulos indicados (node-red-contrib-wemo-emulator)
- Un alexa operativo.
- Todos los equipos visibles en la misma red wifi. (si no alexa no podra comunicarse)


### 1) Abrir aplicacion  [ElectronArduinoNodeRed] ({{< ref "ElectronArduinoNodeRed" >}})
<div class="col-xs-6 col-sm-6">
<img src="em50l_alexa1_1a.jpg" alt="imagen de la aplicacion" class="img-responsive img-thumbnail">
</div><div class='clearfix'></div><hr>


### 2) Arrastrar bloque wemo-emulator al tablero
<div class="col-xs-6 col-sm-6">
<img src="em50l_alexa1_1.jpg" alt="recuadro configuracion wemo emulator" class="img-responsive img-thumbnail">
</div><div>
**nota:**  
Para entrar en la configuracion hay que dar doble click en el bloque.
</div><div class='clearfix'></div><hr>


### 3) Parametrizarlo/configurarlo
<div class="col-xs-9 col-sm-9">
<img src="em50l_alexa1_2.jpg"  alt="imagen del parametrizado del bloque" class="img-responsive img-thumbnail">
</div><div>

- node name: test
- Friendly name: test
- Unique ID: test
- Port: 3000
- On topic: encender
- On Payload: encender
- Off topic: apagar
- Off Payload: apagar

</div><div class='clearfix'></div><hr>

### 4) Deploy / Deteccion
<div class="col-xs-8 col-sm-8">
<img src="em50l_alexa1_3.jpg" alt="pantallazo momento deploy" class="img-responsive img-thumbnail">
</div><div>

</div><div class='clearfix'></div><hr>

**Nota:** Despues de Configurar e implantar el bloque
Tendremos que pronunciar `Alexa Buscar dispositivos`  
Si los dos equipos el que esta corriendo el node-red y alexa estan en la misma red,  
Alexa lo detectara en unos 20Seg, y nos dira su nombre (`test')


### 5) Probar Respuesta a los comandos de voz 
<div class="col-xs-6 col-sm-6">
<img src="em50l_alexa1_Resp_Comandos.gif"  alt="animacion Respuesta a los comandos de voz" class="img-responsive img-thumbnail">
</div><div>
Y ya  esta todo listo. solo nos queda probarlo.  
Como se ve en la imagen.   
al pronunciar `alexa encender test` vemos como cambia el estado del bloque a `on`  
y al pronunciar `alexa apagar test ` vemos como cambia el estado del bloque a `off`
</div><div class='clearfix'></div><hr>

## Enlaces 
Pagina del proyecto y el codigo.   
https://github.com/EM50L/ElectronArduinoNodeRed/   
Releases / Versiones   
https://github.com/EM50L/ElectronArduinoNodeRed/releases/   

 
 
 <!-- -->
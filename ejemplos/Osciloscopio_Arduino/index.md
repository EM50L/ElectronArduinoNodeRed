---
title: "OsciloscopioArduino"
date: 2019-04-23T18:33:46+02:00
imagen_portada: "/posts/osciloscopio_arduino/portada.jpg"
draft: false
categories: ["Development","arduino","node-red","ElectronJs"]
tags: ["iot","aprendizaje","electronica"]

weight: 1
---

### Un osciloscopio con Arduino en solo 3 Nodos y sin programar nada.
<!--more-->
![](EjemploOsciloscopio.jpg)


## Necesitaras lo siguiente
- Entorno Arduino.
- Arduino con Firmdata cargado.
- Aplicacion  [ElectronArduinoNodeRed] ({{< ref "ElectronArduinoNodeRed" >}})

## Pasos a seguir  

- ### Cargar StandarFirmData en Arduino
>![](ArduinoFirmData1.jpg)  
>
>Nota:Comprobar puerto y modelo de placa antes de subir
![](ArduinoFirmData2.jpg) 


- ### Abrir la aplicacion ElectronArduinoNodeRed e ir a editar codigo
>![](MenuEditarCodigo.jpg) 


- ### Insertar Pin Arduino  
 (Arrastrar y soltar elemento al tablero)
![](InsertarPinArduino.jpg) 


- ### Configurar Pin Arduino  
(Doble click en el elemento)
![](ConfiguracionPinArduino.jpg) 


- ### Insertar Grafica dashboard  
 (Arrastrar y soltar elemento al tablero)
![](InsertarGraficaDashboard.jpg) 


- ### Configurar Grafica  
(Doble click en el elemento)
![](ConfiguracionGraficaChar.jpg) 


- ### Conectar Nodos  
 (Arrastrar y desde un noto al otro con un conector)
 ![](Conectar_Nodos.jpg) 
 
 
 - ### Deploy  
 ![](Deploy.jpg) 
 
 
  - ### Si todo ha ido bien  
  Deberiamos ver esto. 
  Deberian haber desaparecido los puntos rojos y azules encima de los nodos  
   ![](DeployOK.jpg)
   
   
   - ### Conexion Arduino con Firmdata  
   Cuando conecte con el arduino si todo ha ido bien  
  Deberiamos ver conected debajo del nodo.  
![](TodoOK.jpg) 


 - ### Volver al dashboard
 ![](Volver_a_Dashboard.jpg) 
 
 
 - ### Deberíamos ver esto.
 Las oscilaciones son por los pararitos de la red AC en la almientacion del arduino.   
 se ve algo parecido a uno onda sinuidal de 50Hz(hercios)
 ![](FluctuacionesAC.jpg) 
 
## License [CC0 (Public Domain)](https://creativecommons.org/publicdomain/zero/1.0/)
<!--
## Ver Tambien
 - **Electron Node-RED Project which this project was forked from** - https://github.com/natcl/electron-node-red
 - **Stand-alone Starter Project** - https://github.com/dceejay/node-red-project-starter
 - **mpm serial port** - https://www.npmjs.com/package/serialport
- **node serial port** - https://serialport.io/
-->
// Se procesa los datos de campo para fecha, dias y pais
function procesarFormulario(){
	cantidadDiasMes = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	
	var fecha = document.getElementById("fecha").value; 	
	var dias = document.getElementById("dias").value; 
	var pais = document.getElementById("pais").value; 
	
	console.log("Fecha: " + fecha);
	
	// Construir el formato fecha 08/15/2008 08/01/2008
	var str = "How are you doing today?";
	var res = fecha.split("/");
	
	// new Date(year, month, day, hours, minutes, seconds, milliseconds)
	// JavaScript counts months from 0 to 11. January is 0. December is 11.
	// res[0]
	console.log("Mes: " + res[0]);
	console.log("Dia: " + res[1]);
	console.log("Anno: " + res[2]);
	var fechaFmt = new Date(res[2],res[0]-1,res[1]);
	
	console.log("Fecha Real: " + fechaFmt);
	for(var i = 0; i <= 1; i++ ){
		// Puede crear varias tablas llamando a un mismo metodo
		crearTabla(1,2, fechaFmt, dias, pais);	
		var body = document.getElementsByTagName("body")[0];
		var salto = document.createElement("br");
		body.appendChild(salto);
	}
}

// Se crea la tabla
function crearTabla(filas, columnas, fecha, dias,pais){
	// alert("crear tabla");
	// Poner atencion a variable diafecha
	var feriados = "";
	
	etiquetaNombreMes = ['January', 'February', 'March', 'April',
                     'May', 'June', 'July', 'August', 'September',
                     'October', 'November', 'December'];
	
	etiquetaNombreDia = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
	
	cantidadDiasMes = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	
	var body = document.getElementsByTagName("body")[0];
	
	var tabla = document.createElement("table");
	
	var tableRows = tabla.rows.length; 
    
	var row = tabla.insertRow(tableRows);
	// Inserta las Etiquetas de Dias
	for(var i = 0; i <= 6; i++ ){    
		var cell1 = row.insertCell(i);
		cell1.innerHTML = etiquetaNombreDia[i];
	}
	
	// Inserta la fila th con nombre de mes 
	var tableRowsEnc = tabla.rows.length; 
	var tituloMes = tabla.insertRow(tableRowsEnc);
	var etiquetaMes = tituloMes.insertCell(0);
	etiquetaMes.colSpan = 7;
	etiquetaMes.style.textAlign = "center"; 
	var mesFecha = fecha.getMonth();
	var nombreMes = etiquetaNombreMes[mesFecha];
	etiquetaMes.innerHTML = nombreMes + " "+ fecha.getFullYear();
	
	// Crea la cuadricula de dias
	// Filas es igual a semanas 
	var diafecha = fecha.getDate();	
	
	var cantDiasMes = 0;
  
	// Si es Febrero
	var qtyMeses = mesFecha + 1;
	
	if (mesFecha == 1) { // Para Febrero!
		if((fecha.getFullYear() % 4 == 0 && fecha.getFullYear() % 100 != 0) || fecha.getFullYear() % 400 == 0){
			cantDiasMes = 29;
		}
	}else{
		cantDiasMes = cantidadDiasMes[mesFecha];		
	}
	
	// feriados = getWebServiceObj();
	console.log("anno: " + fecha.getFullYear());	
	if(fecha.getFullYear() == 2008){
		alert("Hacer WS");
		feriados = getWebService(pais, fecha.getFullYear(), qtyMeses);
	}
	
	// feriados = getWebService(pais, fecha.getFullYear(), qtyMeses);
	console.log("feriados: " + feriados);	
	// console.log("Remanente dias: " + remanenteDias);
	// Se calcula la fecha de inicio y remanente
	console.log("cantidadDiasMes: " + cantDiasMes);
	
	// El dia de inicio cuenta
	var remanenteDias = (cantDiasMes - diafecha) + 1;
	// Remanente se encarga de generar los otros calendarios
	console.log("Remanente dias: " + remanenteDias);
	console.log("Dias param: " + dias);
	
	// Caso de pedir 15 dias Caso Base 
	if(dias <= remanenteDias){
		alert("17 dias");
		var contador = diafecha;
		var semanas = Math.trunc(dias/7)+1;
		console.log("semanas: " + semanas);	
		alert(semanas);
		for(var filas = 0; filas <= semanas; filas++ ){
			var tableRowsAct = tabla.rows.length; 
			// var tituloMes = tabla.insertRow(tableRowsEnc);
			var row = tabla.insertRow(tableRowsAct);	
			for(var columnas = 0; columnas <= 6; columnas++ ){
				
				var celda = row.insertCell(columnas);
				// celda.innerHTML = "("+filas+","+columnas+")";
				//alert(fecha.getDay());
				
				if(filas == 0){	// Semana 0					
					// Test
					if(columnas < fecha.getDay()){
						celda.innerHTML = "";		
						celda.style.backgroundColor = "rgb(190,190,190)"; 						
					}
					else{
						if(columnas >= fecha.getDay()){
						contador = contador + 1;	
						celda.innerHTML = contador-1;
						// celda.innerHTML = contador;
						 var etiqueta = contador;
						// celda.style.backgroundColor = "red"; 	
						// Verifica Festivo		
																			
						}
					if(columnas == 0 || columnas == 6){									
						celda.style.backgroundColor = "yellow"; 				
					}
					else{									
						celda.style.backgroundColor = "rgb(190,190,190)"; 												
					}
					// celda.style.backgroundColor = "red"; 
						// alert("test cococ");		
						console.log("Fila 0 Feriados: " + feriados.length);			
								
						for(var contador1 = 0;contador1<feriados.length;contador1++){
							console.log("Respuesta fila 0: " + feriados[contador1].name);		
							console.log("Respuesta fila 0: " + feriados[contador1].date);		
							console.log("Contador fila 0: " + etiqueta);		
							// feriados[contador1].date = 0;
							if(celda.innerHTML  == feriados[contador1].date){
							celda.style.backgroundColor = "rgb(255,165,0)"; 	
																				
							}		
						}						
						// alert(celda.innerHTML);
						// console.log("Respuesta: " + feriados[contador].date);							
					}
				}
				else{ // Otras Semanas	
					var limite =  parseInt(dias) +  parseInt(diafecha);				
					contador = contador + 1;
					// Posible Bug	
					
					if(columnas == 0 || columnas == 6){		
						/*
						if(celda.innerHTML == ""){
							celda.style.backgroundColor = "rgb(190,190,190)"; 
						}else{
							celda.style.backgroundColor = "yellow"; 
						}
						*/
						celda.style.backgroundColor = "yellow"; 				
					}			
					else{									
						celda.style.backgroundColor = "rgb(190,190,190)"; 				
					}
					if(contador<=cantDiasMes+1){
						console.log("for cantidadDiasMes: " + cantDiasMes);
						celda.innerHTML = contador-1;	
						// Verifica Festivo	
						for(var contador2 = 0;contador2<feriados.length;contador2++){													
							if(contador -1  == feriados[contador2].date){
							celda.style.backgroundColor = "rgb(255,165,0)"; 	
																				
							}		
						}
						// var limite =  parseInt(dias) +  parseInt(diafecha);
						// alert(limite);
						if(celda.innerHTML>=limite){
							// celda.style.backgroundColor = "rgb(190,190,190)"; 
							celda.innerHTML = "";							
						}
					}	
					else	{									
						celda.style.backgroundColor = "rgb(190,190,190)"; 
						celda.innerHTML = "";	
					}
				}								
			}	
		}
		
		// Agrega la tabla al documento
		body.appendChild(tabla);			
		// getWebService();
	}	else{
		// Caso de mas de días remanentes
		
		
	}
}

function getWebService(paramPais, paramAnno, paramMes) {
	var response = "";
	var feriados = ""; 
	var pais = "CR";
	var anno = "2014";
	var mes = "08";
	var url = "https://holidayapi.com/v1/holidays?key=987767f3-2678-41bb-b09e-c57d37ecbe6e&country="+paramPais+"&year="+paramAnno+"&month="+paramMes;
    var xhttp = new XMLHttpRequest();
    // xhttp.open("GET", "https://holidayapi.com/v1/holidays?key=987767f3-2678-41bb-b09e-c57d37ecbe6e&country=CR&year=2014&month=08");
	xhttp.open("GET", url, true);
    // xhttp.setRequestHeader("Content-type", "application/json");
	// console.log("TEst WS: " + xhttp.readyState());
    xhttp.send();
	 if(xhttp.readyState == 4 && xhttp.status == 200) {
        response = JSON.parse(xhttp.responseText);
		console.log("Respuesta: " + response);
    }else{
		// alert(xhttp.readyState); // 1
		alert(xhttp.status); // 0
		// if(xhttp.status == "0"){
	    response = JSON.parse(xhttp.responseText);
		
		// 2014-08-24 YYYY-MM-DD		
		feriados = response.holidays;
		for(var contador = 0;contador<feriados.length;contador++){
			// console.log("Respuesta: " + feriados[contador].name);		
			// console.log("Respuesta: " + feriados[contador].date);	
			var arregloFecha = feriados[contador].date.split("-");			
			feriados[contador].date = parseInt(arregloFecha[2]);	
			// Formatea las fechas
		}
		// }		
		// 08/15/2008 YYYY-MM-DD to MM/DD/YYYY		
	}
    
	return feriados;
}

function validacionDatos(){
	// Se ejecuta antes de Formatear las fechas
	
}

function getWebServiceObj(){
	var feriados = ""; 
	if (window.XMLHttpRequest) {
		xmlhttpp = new XMLHttpRequest();
	} else {
		xmlhttpp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttpp.onreadystatechange = function () {
    var json, obj;
    if (xmlhttpp.readyState === 4) {
        if (xmlhttpp.status === 200) {
            json = xmlhttpp.responseText;
            obj = JSON.parse(json);
            alert('json' + obj.holidays[1].date);
			feriados = obj.holidays;
		for(var contador = 0;contador<feriados.length;contador++){
			console.log("Respuesta: " + feriados[contador].name);		
			console.log("Respuesta: " + feriados[contador].date);	
			var arregloFecha = feriados[contador].date.split("-");			
			feriados[contador].date = parseInt(arregloFecha[2]);	
			// Formatea las fechas
		}
        } else {
            alert('the call failed');
        }
    }
};
	xmlhttpp.open("GET", "https://holidayapi.com/v1/holidays?key=987767f3-2678-41bb-b09e-c57d37ecbe6e&country=CR&year=2014&month=08");
	// xmlhttpp.open("GET", "http://localhost:8080/myApp/services/userService/getUser/1");

	xmlhttpp.send();
	
	return feriados;
}
var canvas, ctx;
var recargar;

var turno = 0;

var pikachu = new Pokemones(170, 30, false, "pikachu.png", confirmarPikachu);
var charmander = new Pokemones(170, 30, false, "charmander.png", confirmarCharmander);

//Con estas variables controlo el tamaño de la barra verde de vida
var barraPikachu = 480;
var botonPikachu;

var barraCharmander = 710;
var botonCharmander;

function Pokemones(v, a,imagenOK, imagenSRC, confirmarImagen){
	this.vida = v;
	this.ataque = a;
	this.imagenCargada = imagenOK;
	this.imagen = new Image();
	this.imagen.src = imagenSRC;
	this.imagen.onload = confirmarImagen; 
}

function inicio(){
	canvas = document.getElementById("c");
	ctx = canvas.getContext("2d");

	recargar = document.getElementById("refrescar");
	recargar.style.display = 'none';

	//Nombre de Pikachu
	ctx.beginPath();
	ctx.font = "18pt arial";
	ctx.fillText("Pikachu",340,30);
	ctx.closePath();

	//Nombre de Charmander
	ctx.beginPath();
	ctx.font = "18pt arial";
	ctx.fillText("Charmander",545,30);
	ctx.closePath();

	botonPikachu = document.getElementById("ataquePikachu");
	botonPikachu.addEventListener("click", logica);

	botonCharmander = document.getElementById("ataqueCharmander");
	botonCharmander.addEventListener("click", logica);

	botonCharmander.disabled = true;
	botonPikachu.disabled = false;

	dibujarComponentes();
}

function confirmarPikachu(){
	pikachu.imagenCargada = true;
	dibujarPokemon();
}
function confirmarCharmander(){
	charmander.imagenCargada = true;
	dibujarPokemon();
}

function logica(){
	if(pikachu.vida > 0 && charmander.vida > 0)
	{
		if(turno == 0)
		{
			charmander.vida -= pikachu.ataque;
			barraCharmander -= pikachu.ataque;
			turno = 1;
			botonCharmander.disabled = false;
			botonPikachu.disabled = true;
		}
		else if(turno == 1){
			pikachu.vida -= charmander.ataque;
			barraPikachu -= charmander.ataque;
			turno = 0;
			botonCharmander.disabled = true;
			botonPikachu.disabled = false;
		} 
	}
	dibujarComponentes();
	win();
}

function win(){
	var mensaje = document.getElementById("ganador");
	var texto;

	if(pikachu.vida <= 0)
	{
		texto = "Charmander es el GANADOR!!";
		mensaje.innerText = texto;
		recargar.style.display = 'inline-block';
		botonPikachu.style.display = 'none';
		botonCharmander.style.display = 'none';
	}
	else if(charmander.vida < 0){
		texto = "Pikachu es el GANADOR!!";
		mensaje.innerText = texto;
		recargar.style.display = 'inline-block';
		botonPikachu.style.display = 'none';
		botonCharmander.style.display = 'none';
	}
}

function dibujarPokemon(){
	if(pikachu.vida > 0 && pikachu.imagenCargada == true)
	{
		ctx.drawImage(pikachu.imagen, 50, 90);
	}
	if(charmander.vida > 0 && charmander.imagenCargada == true)
	{
		ctx.drawImage(charmander.imagen, 650, 60);
	}
}

function dibujarComponentes(){
	//INICIO - Centro de la arena

	//Linea Vertical
	ctx.beginPath();
	ctx.moveTo(500, 0);
	ctx.lineTo(500, 150);
	ctx.strokeStyle = "#000";
	ctx.lineWidth = 10;
	ctx.stroke();
	ctx.closePath();

	ctx.beginPath();
	ctx.moveTo(500, 350);
	ctx.lineTo(500, 500);
	ctx.strokeStyle = "#000";
	ctx.lineWidth = 10;
	ctx.stroke();
	ctx.closePath();

	//Ovalo Rojo
	ctx.beginPath();
	ctx.arc(500, 250, 100, Math.PI, false);
	ctx.fillStyle = "red";
	ctx.fill();
	ctx.closePath();

	//Linea horizontal Pokebola
	ctx.beginPath();
	ctx.moveTo(400, 250);
	ctx.lineTo(600, 250);
	ctx.strokeStyle = "#000";
	ctx.lineWidth = 10;
	ctx.stroke();
	ctx.closePath();

	//Ovalo negro del centro de la Pokebola
	ctx.beginPath();
	ctx.arc(500, 250, 20, Math.PI * 2, false);
	ctx.fillStyle = "#000";
	ctx.fill();
	ctx.closePath();

	//Ovalo blanco del centro de la Pokebola
	ctx.beginPath();
	ctx.arc(500, 250, 10, Math.PI * 2, false);
	ctx.fillStyle = "#fff";
	ctx.fill();
	ctx.closePath();

	//Borde Negro de la Pokebola
	ctx.beginPath();
	ctx.arc(500, 250, 100, Math.PI * 2, false);
	ctx.strokeStyle = "#000";
	ctx.stroke();
	ctx.closePath();

	//FIN - Centro de la arena

	//Barra de HP de Pikachu
	ctx.beginPath();
	ctx.moveTo(300, 40);
	ctx.lineTo(480, 40);
	ctx.strokeStyle = "red";
	ctx.stroke();
	ctx.closePath();

	ctx.beginPath();
	ctx.moveTo(300, 40);
	ctx.lineTo(barraPikachu, 40);
	ctx.strokeStyle = "green";
	ctx.stroke();
	ctx.closePath();

	//Barra de HP de Charmander
	ctx.beginPath();
	ctx.moveTo(530, 40);
	ctx.lineTo(710, 40);
	ctx.strokeStyle = "red";
	ctx.stroke();
	ctx.closePath();

	ctx.beginPath();
	ctx.moveTo(530, 40);
	ctx.lineTo(barraCharmander, 40);
	ctx.strokeStyle = "green";
	ctx.stroke();
	ctx.closePath();
}

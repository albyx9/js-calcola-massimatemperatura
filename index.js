// Import stylesheets
import "./style.css";

const apiKey = "d11be8fa8826b6777bc94891b01f0767";
const URL =
  "https://api.openweathermap.org/data/2.5/weather?APPID=" +
  apiKey +
  "&units=metric&q=";
//array di ButtonElement
var cityElems = Array.from(document.getElementsByClassName("citta"));

for (let elem of cityElems){
  elem.onclick = () => display(elem.innerHTML); //gestione evento click
  //al click di una delle città invoco funzione display
}
document.getElementById("calcoloMedia").onclick = () => media();
//al click di calcolo media invoco funzione media
document.getElementById("calcoloMax").onclick = () => massimo();


function doCity(city, callback){

  let promise = fetch(URL + city)
    .then(response => response.json(), error => alert(error))
    .then(data => callback(data));
  return promise;
}

//inner cioè visualizza i dati
async function display(city){
  //l'esecuzione attende la promessa in docity
  let tem = await doCity(city, data => data.main.temp); //data=>data.main???
  document.getElementById("risposta").innerHTML = 
  "A" + city + " ci sono " + tem + " gradi";

}
//calcola media temps
async function media(){
  let temps = await Promise.all(
    cityElems.map(cityElem => doCity(cityElem.innerHTML, data => data.main.temp)) //cityElem e data sono i due parametri passati alla funzione
  ); //attendi l'esecuzione di un numero di casi in parallelo
  let somma = temps.reduce((somma, temp) => temp + somma);
  document.getElementById("media").innerText = somma / cityElems.length;
}
//////////////////////////////

//////////////////////////////

async function massimo(){
  let temps = await Promise.all(
    cityElems.map(cityElem => doCity(cityElem.innerHTML, data => data.main.temp_max))
  ); //il metodo map esegue una funzione per ogni elemento dell'array cityElems
  let max = temps.reduce((max,temp) => Math.max(temp, max));
  document.getElementById("massimo").innerText = max;
}
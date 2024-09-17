
class Vivienda {
  constructor(tipoDeVivienda, ubicacion, ciudad, descripcion, precio) {
    this.tipoDeVivienda = tipoDeVivienda;
    this.ubicacion = ubicacion;
    this.ciudad = ciudad;
    this.descripcion = descripcion;
    this.precio = precio;
  }
}

let cardsDeHtml = document.querySelectorAll(".card");

let InformacionDeViviendas = {};

cardsDeHtml.forEach((card, index) => {
  const tipoDeVivienda = card.getAttribute('data-tipoDeVivienda');
  const ubicacion = card.getAttribute('data-ubicacion');
  const ciudad = card.getAttribute('data-ciudad');
  const descripcion = card.getAttribute('data-descripcion');
  const precio = card.getAttribute('data-precio');


  const viviendasInstaciadas = new Vivienda(tipoDeVivienda, ubicacion, ciudad, descripcion, precio);


  InformacionDeViviendas[`${index + 1}`] = viviendasInstaciadas;

  //esto es para que se les haga un minizoom

  card.addEventListener('mouseover', () => {
    card.style.transform = 'scale(1.1)'
  });
  card.addEventListener('mouseout', () => {
    card.style.transform = 'scale(1)'
  });
  card.addEventListener('click', () => {

    document.getElementById('spinner-overlay').style.display = 'flex';

    localStorage.setItem('tipoDeVivienda', tipoDeVivienda);
    localStorage.setItem('ubicacion', ubicacion);
    localStorage.setItem('ciudad', ciudad);
    localStorage.setItem('descripcion', descripcion);
    localStorage.setItem('precio', precio);

    setTimeout(() => {
      window.location.href = 'cotizaciones.html';
    }, 2000);

  })
});

console.log(InformacionDeViviendas);

document.querySelector('#tipoPropiedad').value = localStorage.getItem('tipoDeVivienda')
document.querySelector('#tipoPropiedad').disabled = true

//recoger datos del local storage

const tipoDeVivienda = localStorage.getItem('tipoDeVivienda');
const ubicacion = localStorage.getItem('ubicacion');
const ciudad = localStorage.getItem('ciudad');
const descripcion = localStorage.getItem('descripcion');
const precio = localStorage.getItem('precio');

// Mostrar los datos de la vivienda seleccionada
const resumenViviendaDiv = document.getElementById('resumen-vivienda');
resumenViviendaDiv.innerHTML = `
            <div class="card mt-3">
                <div class="card-header">
                    Vivienda Seleccionada
                </div>
                <div class="card-body">
                    <h5 class="card-title">${tipoDeVivienda}</h5>
                    <p class="card-text"><strong>Ubicación:</strong> ${ubicacion}</p>
                    <p class="card-text"><strong>Región:</strong> ${ciudad}</p>
                    <p class="card-text"><strong>Descripción:</strong> ${descripcion}</p>
                    <p class="card-text"><strong>Precio:</strong> UF ${precio}</p>
                </div>
            </div>
        `;


// Función para crear el objeto SeguroPropiedad y generar el resumen completo
function SeguroPropiedad(tipoPropiedad, anioCotizacion, segurosSeleccionados, vivienda) {
  this.tipoPropiedad = tipoPropiedad;
  this.anioCotizacion = anioCotizacion;
  this.segurosSeleccionados = segurosSeleccionados;
  this.vivienda = vivienda; // Información de la vivienda
}

SeguroPropiedad.prototype.generarResumen = function () {
  return `
                <div class="card">
                    <div class="card-header">
                        Resumen de Cotización
                    </div>
                    <div class="card-body">
                        <p><strong>Año para Cotizar:</strong> ${this.anioCotizacion}</p>
                        <p><strong>Seguros Seleccionados:</strong> ${this.segurosSeleccionados.join(', ') || 'Ninguno'}</p>
                    </div>
                </div>
            `;
};

//Generar el resumen de cotización
document.getElementById('formularioSeguro').addEventListener('submit', function (event) {
  event.preventDefault();

  // Obtener los datos del formulario
  const tipoPropiedad = document.getElementById('tipoPropiedad').value;
  const anioCotizacion = document.getElementById('anioCotizacion').value;

  const segurosSeleccionados = [];

  if (document.getElementById('incendio').checked) segurosSeleccionados.push('Incendio');
  if (document.getElementById('robo').checked) segurosSeleccionados.push('Robo');
  if (document.getElementById('terremoto').checked) segurosSeleccionados.push('Terremoto');
  if (document.getElementById('tsunami').checked) segurosSeleccionados.push('Tsunami');
  if (document.getElementById('socavon').checked) segurosSeleccionados.push('Socavón');
  if (document.getElementById('seguridad').checked) segurosSeleccionados.push('Seguridad (Guardias)');


  // objeto con los datos del seguro y la vivienda
  const viviendaSeleccionada = {
    tipoDeVivienda,
    ubicacion,
    descripcion,
    precio
  };

  const seguroPropiedad = new SeguroPropiedad(tipoPropiedad, anioCotizacion, segurosSeleccionados, viviendaSeleccionada);

  // Mostrar el resumen en la página
  document.getElementById('resumenCotizacion').innerHTML = seguroPropiedad.generarResumen();
});
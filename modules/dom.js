import {
  cambiarMonedaBaseYFecha,
  cargarMonedasDesdeTabla,
} from './servicios.js';
function mostrarDiaYMoneda(dia, moneda) {
  $('#fecha').text(`En el día ${dia}`);
  $('#descripcion').text(`1 ${moneda} es igual a:`);
}

function definirFechaMaximaCalendario() {
  let fechaActual = new Date().toISOString().split('T');
  const calendario = $('#calendario');
  calendario.attr('max', fechaActual[0]);
}

function armarTablaDeCambios(monedasYPrecio) {
  const $filaMoneda = $('#moneda');
  const $filaPrecio = $('#precio');
  const $listaMonedas = $('#lista-monedas');
  Object.keys(monedasYPrecio).forEach((item) => {
    const botonMoneda = document.createElement('button');
    botonMoneda.innerText = item;
    botonMoneda.classList = 'list-group-item moneda ';
    botonMoneda.value = item;
    botonMoneda.id = item;

    botonMoneda.addEventListener('click', () => {
      cargarMonedasDesdeTabla(`${botonMoneda.value}`);
    });
    $filaMoneda.append(botonMoneda);

    $filaPrecio.append(
      `<li class="list-group-item precio">${monedasYPrecio[item]}</li>`,
    );
    $listaMonedas.append(`<option value="${item}">`);
  });
}

// Tengo que llamar a inicializar con la url, con el valor del boton clickeado

function limpiarCampos() {
  $('.precio').remove();
  $('.moneda').remove();
  $('#lista-monedas').html('');
}
function remueveClaseAlert(input) {
  input.removeClass('alert');
  input.removeClass('alert-danger');
}
function agregaClaseAlert(input) {
  input.addClass('alert');
  input.addClass('alert-danger');
}

function actualizarContenido(monedasJSON) {
  mostrarDiaYMoneda(monedasJSON.date, monedasJSON.base);
  definirFechaMaximaCalendario();
  armarTablaDeCambios(monedasJSON.rates);
}

async function armarPagina(monedasJSON) {
  mostrarDiaYMoneda(monedasJSON.date, monedasJSON.base);
  definirFechaMaximaCalendario();
  armarTablaDeCambios(monedasJSON.rates);
  $('#boton-actualizar-tabla').on('click', () => {
    cambiarMonedaBaseYFecha(Object.keys(monedasJSON.rates));
  });
}

export {
  armarPagina,
  limpiarCampos,
  remueveClaseAlert,
  agregaClaseAlert,
  actualizarContenido,
};

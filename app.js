// Funcion que se ejecuta al cargar la pagina
// Crea el checkbox y el boton de eliminar para cada elemento
window.addEventListener('load', () => {
  var items = document.getElementsByTagName('tr');
  for (var i = 0; i < items.length; i++) {
    var tdCheckBox = document.createElement('td');
    var tdDelete = document.createElement('td');
    var textDelete = document.createTextNode('x');

    tdCheckBox.className = 'checkBox';
    tdDelete.appendChild(textDelete);
    tdDelete.className = 'delete';
    tdDelete.onclick = function () {
      var tr = this.parentElement;
      tr.remove();
      updateTotal();
    };
    items[i].insertBefore(tdCheckBox, items[i].firstChild);
    items[i].appendChild(tdDelete);
  }
  updateTotal();
});

// Funcion que añade elementos a la lista
function addItem() {
  var table = document.querySelector('table');
  // Se toman los valores ingresados
  var nameInput = document.getElementById('nameInput').value;
  var priceInput = document.getElementById('priceInput').value;

  if (nameInput === '' || priceInput === '') {
    alert('Llena los campos correctamente :)');
  } else {
    var nameText = document.createTextNode(nameInput);
    var priceText = document.createTextNode('$' + priceInput);
    var tr = document.createElement('tr');
    var tdName = document.createElement('td');
    var tdPrice = document.createElement('td');

    tdName.appendChild(nameText);
    tdPrice.appendChild(priceText);
    tdPrice.className = 'price';
    tr.appendChild(tdName);
    tr.appendChild(tdPrice);
    table.appendChild(tr);

    var tdCheckBox = document.createElement('td');
    var tdDelete = document.createElement('td');
    var textDelete = document.createTextNode('x');

    tdCheckBox.className = 'checkBox';
    tdDelete.appendChild(textDelete);
    tdDelete.className = 'delete';
    tdDelete.onclick = function () {
      var tr = this.parentElement;
      tr.remove();
      updateTotal();
    };
    tr.insertBefore(tdCheckBox, tr.firstChild);
    tr.appendChild(tdDelete);
    document.getElementById('nameInput').value = '';
    document.getElementById('priceInput').value = '';
    updateTotal();
  }
}

// Funcion que actualiza los totales cada que ocurre un cambio en la lista
function updateTotal() {
  // Total de TODOS los elementos de la lista
  var total = 0.0;
  var prices = document.getElementsByClassName('price');
  for (var i = 0; i < prices.length; i++) {
    var priceNum = parseFloat(prices[i].innerHTML.substring(1));
    total += priceNum;
  }
  document.getElementById('total').innerHTML = 'Total $' + total.toFixed(2);

  // Total de los elementos MARCADOS
  var checkedTotal = 0.0;
  var checkedPrices = document.getElementsByClassName('checkedPrice');
  for (var i = 0; i < checkedPrices.length; i++) {
    var checkedPriceNum = parseFloat(checkedPrices[i].innerHTML.substring(1));
    checkedTotal += checkedPriceNum;
  }
  document.getElementById('checkedTotal').innerHTML =
    'Total Marcado $' + checkedTotal.toFixed(2);
}

// Evento que ocurre al dar click a un elemento
// Se agregan o quitan clases para dar estilo
var table = document.querySelector('table');
table.addEventListener('click', function (e) {
  if (e.target.tagName === 'TD') {
    var tr = e.target.parentElement;
    tr.classList.toggle('checked');
    var tdPrice = tr.querySelector('.price');
    tdPrice.classList.toggle('checkedPrice');
    var checkBox = tr.querySelector('.checkBox');
    if (checkBox.innerHTML === '') {
      var check = document.createTextNode('\u2713');
      checkBox.appendChild(check);
    } else {
      checkBox.innerHTML = '';
    }
  }
  updateTotal();
});

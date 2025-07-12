const socket = io();

socket.on('productsUpdated', (products) => {
  const list = document.getElementById('product-list');
  list.innerHTML = '';

  products.forEach((p) => {
    const li = document.createElement('li');
    li.textContent = `${p.title} - R$ ${p.price}`;
    list.appendChild(li);
  });
});

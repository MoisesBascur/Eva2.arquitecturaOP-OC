async function cargarProductos() {
    try {
        const res = await fetch('/api/productos');
        const productos = await res.json();
        const tbody = document.querySelector('#tablaProductos tbody');
        tbody.innerHTML = ''; 
        
        productos.forEach(p => {
            let badgeClass = 'badge-success';
            let estadoTexto = 'Óptimo';
            
            if (p.stock === 0) {
                badgeClass = 'badge-danger';
                estadoTexto = 'Agotado';
            } else if (p.stock < 10) {
                badgeClass = 'badge-warning';
                estadoTexto = 'Stock Bajo';
            }

            const precioFormateado = new Intl.NumberFormat('es-CL', { 
                style: 'currency', 
                currency: 'CLP' 
            }).format(p.precio);

            tbody.innerHTML += `
                <tr>
                    <td><strong>#${p.id}</strong></td>
                    <td>${p.nombre}</td>
                    <td>${p.descripcion}</td>
                    <td>${precioFormateado}</td>
                    <td>${p.stock} unid.</td>
                    <td><span class="badge ${badgeClass}">${estadoTexto}</span></td>
                </tr>
            `;
        });
    } catch (error) {
        console.error('Error al cargar productos:', error);
    }
}

document.getElementById('productoForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const nuevoProducto = {
        nombre: document.getElementById('nombre').value,
        descripcion: document.getElementById('descripcion').value,
        precio: parseFloat(document.getElementById('precio').value),
        stock: parseInt(document.getElementById('stock').value)
    };
    
    try {
        await fetch('/api/productos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(nuevoProducto)
        });
        
        e.target.reset();
        cargarProductos();
    } catch (error) {
        console.error('Error al guardar producto:', error);
        alert('Hubo un error al guardar el producto.');
    }
});

cargarProductos();
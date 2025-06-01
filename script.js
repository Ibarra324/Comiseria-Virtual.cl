document.getElementById("tramiteForm").addEventListener("submit", function(e){
  e.preventDefault();

  // Leer valores
  const nombre = document.getElementById("nombre").value.trim();
  const rut = document.getElementById("rut").value.trim();
  const tramite = document.getElementById("tramite").value;
  const descripcion = document.getElementById("descripcion").value.trim();

  if(!nombre || !rut || !tramite || !descripcion){
    alert("Por favor completa todos los campos");
    return;
  }

  // Guardar en localStorage (simulando base de datos)
  let solicitudes = JSON.parse(localStorage.getItem("solicitudes") || "[]");
  solicitudes.push({
    nombre,
    rut,
    tramite,
    descripcion,
    fecha: new Date().toLocaleString()
  });
  localStorage.setItem("solicitudes", JSON.stringify(solicitudes));

  alert("Solicitud enviada correctamente!");
  this.reset();
});


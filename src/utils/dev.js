// isLoggedIn.js

let isLoggedIn = false;

const setIsLoggedIn = (value) => {
  isLoggedIn = value;
};

const user = {
  TuristaID: "1",
  UsuarioID: "1",
  Nombre: "John",
  Apellido: "Doe",
  Direccion: "123 Main St",
  Telefono: "555-1234",
  FechaDeNacimiento: "1990-01-01",
  FotoDePerfil: "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/7.jpg",
  FechaDeRegistro: "2022-05-01",
  Estado: "Active"
};

export { isLoggedIn, setIsLoggedIn, user };

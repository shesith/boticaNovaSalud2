export const getCredentials = () => {
  const local = localStorage.getItem("user");
  const credenciales = JSON.parse(local);
  return credenciales;
};

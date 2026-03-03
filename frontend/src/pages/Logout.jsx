function Logout() {
  localStorage.clear();
  return <Navigate to="/" />;
}

export default Logout
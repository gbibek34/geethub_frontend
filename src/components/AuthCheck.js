const useAuth = () => {
  const token = localStorage.getItem("token");
  return token ? true : false;
};

export default useAuth;

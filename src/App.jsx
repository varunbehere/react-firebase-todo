import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAppContext } from "./Contexts/AppContext";

function App() {
  const navigate = useNavigate();
  const { currentUser, isNewUser } = useAppContext();

  useEffect(() => {
    if (currentUser) {
      navigate("/home");
    } else {
      if (isNewUser) {
        navigate("/signup");
      } else {
        navigate("/login");
      }
    }
  }, [currentUser, navigate, isNewUser]);

  return (
    <>
      <Outlet />
    </>
  );
}

export default App;
uj``;

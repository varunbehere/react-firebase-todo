import { createContext, useContext, useState } from "react";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const AppContext = createContext({
  todo: [],
  isNewUser: false,
  currentUser: null,
  toggleIsNewUser: function () {},
  login: function () {},
  logout: function () {},
  signup: function () {},
});

function AppContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [todo, setTodo] = useState([]);
  const [isNewUser, setIsNewUser] = useState(false);

  function toggleIsNewUser() {
    setIsNewUser((prev) => !prev);
  }

  async function login(email, password) {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setCurrentUser(email);
    } catch (error) {
      alert(error.message);
    }
  }

  async function signup(email, password) {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setIsNewUser(false);
    } catch (error) {
      alert(error.message);
    }
  }

  async function logout() {
    try {
      await signOut(auth);
      setCurrentUser(null);
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <AppContext.Provider
      value={{
        isNewUser,
        currentUser,
        toggleIsNewUser,
        todo,
        login,
        logout,
        signup,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

function useAppContext() {
  return useContext(AppContext);
}

export { AppContext, AppContextProvider, useAppContext };

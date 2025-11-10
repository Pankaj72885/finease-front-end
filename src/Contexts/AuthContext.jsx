import { createContext, useState, useEffect, useContext } from "react";
import { auth } from "../lib/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const login = async (email, password) => {
    // eslint-disable-next-line no-useless-catch
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      return result.user;
    } catch (error) {
      throw error;
    }
  };

  const register = async (name, email, password, photoURL) => {
    // eslint-disable-next-line no-useless-catch
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Update profile with name and photo
      await updateProfile(result.user, {
        displayName: name,
        photoURL: photoURL || null,
      });

      return result.user;
    } catch (error) {
      throw error;
    }
  };

  const loginWithGoogle = async () => {
    // eslint-disable-next-line no-useless-catch
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      return result.user;
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    // eslint-disable-next-line no-useless-catch
    try {
      await signOut(auth);
    } catch (error) {
      throw error;
    }
  };

  const getIdToken = async () => {
    if (currentUser) {
      return await currentUser.getIdToken();
    }
    return null;
  };

  const value = {
    currentUser,
    login,
    register,
    loginWithGoogle,
    logout,
    getIdToken,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  return useContext(AuthContext);
};

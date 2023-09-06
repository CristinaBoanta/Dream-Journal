import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { AuthState } from "../types";

interface AuthContext {
  dispatch: React.Dispatch<any>;
}

export const useAuthContext = (): AuthContext & AuthState => {
  const context = useContext<any>(AuthContext);

  if (!context) {
    throw Error("useAuthContext must be used inside an AuthContextProvider");
  }

  return context;
};

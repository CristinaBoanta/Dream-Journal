import { useAuthContext } from "./useAuthContext";
import { useDreamsContext } from "./useDreamsContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: dreamsDispatch } = useDreamsContext()

  const logout = () => {
    // remove user from localstorage

    localStorage.removeItem("user");

    // dispatch logout
    dispatch({ type: "LOGOUT" });
    dreamsDispatch({type: 'SET_DREAMS', payload: null})
  };
  return { logout };
};

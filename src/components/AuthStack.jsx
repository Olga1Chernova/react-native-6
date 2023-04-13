import { NavigationContainer } from "@react-navigation/native";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRoute } from "./routing";
import { authIsLoggedIn } from "../../redux/auth/auth-operations";

const AuthStack = () => {
  const dispatch = useDispatch();

  const { isLoggedIn } = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(authIsLoggedIn());
  }, [])

  const routing = useRoute(isLoggedIn);

  return <NavigationContainer>{routing}</NavigationContainer>;
};
export default AuthStack;

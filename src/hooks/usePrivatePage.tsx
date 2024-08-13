import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useUserProvider } from "../providers/User/userProvider";

export const usePrivatePage = () => {
  const { isLogged } = useUserProvider();

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogged) {
      navigate("/");
    }
  }, [isLogged]);

  return null;
};

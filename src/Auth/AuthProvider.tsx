import { useEffect, useState } from "react";

import { jwtDecode } from "jwt-decode";

import PageLoader from "../components/PageLoader";
import { AuthContext } from "../context/auth-context";
import { getCookie } from "../utils";
import AxiosResponseInterceptors from "./AxiosResponseInterceptors";
import { UserType } from "./types";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<UserType>({
    email: "",
    userId: "",
    fullName: "",
  });

  useEffect(() => {
    (async () => {
      try {
        const accessToken = getCookie("accessToken");
        if (accessToken) {
          const decodedToken: any = jwtDecode(accessToken);

          if (decodedToken) {
            if (decodedToken.exp < Date.now() / 1000) {
              setIsAuthenticated(false);
              setIsLoading(false);
              return;
            }
            const userObj = {
              email: decodedToken.email,
              fullName: decodedToken.fullName,
              userId: decodedToken._id,
            };
            setUser(userObj);
            setIsAuthenticated(true);
          }
        }
      } catch (error) {
        console.error("Auth ERROR", error);
        setIsLoading(false);
      }
      setIsLoading(false);
    })();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, user, setUser }}
    >
      <AxiosResponseInterceptors>
        {isLoading && <PageLoader />}
        {!isLoading && children}
      </AxiosResponseInterceptors>
    </AuthContext.Provider>
  );
};

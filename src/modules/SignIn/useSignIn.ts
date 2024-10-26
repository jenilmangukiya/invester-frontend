import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Auth/useAuth";
import { useSnackbar } from "../../components/SnackbarAlert";

import { setCookie } from "../../utils";
import { useLoginUser } from "../../services";

export const useSignIn = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated, setUser } = useAuth();

  const { setSnackbarConfig } = useSnackbar();

  const { mutate: loginMutation, isPending } = useLoginUser({
    onError: (e: any) => {
      console.log("e", e);
      setSnackbarConfig({
        open: true,
        message: e?.response?.data?.message || "Login failed",
        severity: "error",
      });
      setIsAuthenticated(false);
    },
    onSuccess: (response) => {
      // Set accessToken
      if (response?.data?.data?.accessToken) {
        const todayExpires = new Date();
        todayExpires.setDate(todayExpires.getDate() + 100000);
        setCookie("accessToken", response?.data?.data?.accessToken, {
          expires: todayExpires,
        });
      }

      // Set refreshToken
      if (response?.data?.data?.refreshToken) {
        const tenDaysExpires = new Date();
        tenDaysExpires.setDate(tenDaysExpires.getDate() + 1000000);
        setCookie("refreshToken", response?.data?.data?.refreshToken, {
          expires: tenDaysExpires,
        });
      }

      // Set Auth
      const user = response?.data?.data.user;
      if (
        user &&
        response?.data?.data?.refreshToken &&
        response?.data?.data?.accessToken
      ) {
        setIsAuthenticated(true);
        setUser({
          email: user.email,
          fullName: user.fullName,
          userId: user._id,
        });

        navigate("/dashboard");
      } else {
        setIsAuthenticated(false);
        setSnackbarConfig({
          open: true,
          message: "Login Failed",
          severity: "error",
        });
      }
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if (!data.get("email") || !data.get("password")) {
      setSnackbarConfig({
        message: "All fields are required",
        open: true,
        severity: "error",
      });
    } else {
      loginMutation({
        email: data.get("email"),
        password: data.get("password"),
      });
    }
  };

  return { handleSubmit, isPending };
};

import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../services/api";
import Router from "next/router";
import { destroyCookie, parseCookies, setCookie } from "nookies";

type User = {
  id?: string;
  firstname?: string;
  lastname?: string;
  username: string;
};

type SignCredentials = {
  username: string;
  password: string;
};

type AuthContextData = {
  signIn(credentials: SignCredentials): Promise<void>;
  user: User;
  isAuthenticated: boolean;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);

export function signOut() {
  destroyCookie(undefined, "0dayTokenFront.token");
  destroyCookie(undefined, "0dayTokenFront.refreshToken");

  Router.push("/");
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>();

  const isAuthenticated = !!user;

  useEffect(() => {
    const { "0dayTokenFront.token": token } = parseCookies();

    if (token) {
      api
        .get("/users/profile")
        .then((response) => {
          const { id, firstname, lastname, username } = response.data;

          setUser({ id, firstname, lastname, username });
        })
        .catch(() => {
          signOut();
        });
    }
  }, []);

  async function signIn({ username, password }: SignCredentials) {
    try {
      const response = await api.post("/auth/signin", {
        username,
        password,
      });

      const { accessToken, refreshToken } = response.data;

      setCookie(undefined, "0dayTokenFront.token", accessToken, {
        maxAge: 60 * 60 * 24 * 30, //30 days
        path: "/",
      });

      setCookie(undefined, "0dayTokenFront.refreshToken", refreshToken, {
        maxAge: 60 * 60 * 24 * 30, //30 days
        path: "/",
      });

      api.defaults.headers["Authorization"] = `Bearer ${accessToken}`;

      const userDate = await api.get("/users/profile");

      const { id, firstname, lastname } = userDate.data;

      setUser({ id, firstname, lastname, username });

      Router.push("/dashboard");
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <AuthContext.Provider value={{ signIn, isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  );
}

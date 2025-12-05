import { login, register } from "@/services/authService";
import { AuthContextProps, DecodedTokenProps, UserProps } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { jwtDecode } from "jwt-decode";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

export const AuthContext = createContext<AuthContextProps>({
  token: null,
  user: null,
  signIn: async () => {},
  signUp: async () => {},
  signOut: async () => {},
  updateToken: async () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserProps | null>(null);
  const router = useRouter();

  useEffect(() => {
    loadToken();
  }, []);

  const loadToken = async () => {
    const storedToken = await AsyncStorage.getItem("token");
    const userString = await AsyncStorage.getItem("user");
    if (storedToken && userString) {
      try {
        const decoded = jwtDecode<DecodedTokenProps>(storedToken);
        const user = JSON.parse(userString);
        if (decoded.exp && decoded.exp < Date.now() / 1000) {
          await AsyncStorage.removeItem("token");
          await AsyncStorage.removeItem("user");
          gotoWelcomePage();
          return;
        }
        setToken(storedToken);
        setUser({ email: user.email, id: user.id, name: user.name });
        gotoHomePage();
      } catch (error) {
        gotoWelcomePage();
        console.log("Falha ao decodificar o token: ", error);
      }
    } else {
      gotoWelcomePage();
    }
  };

  const gotoHomePage = () => {
    setTimeout(() => {
      router.replace("/(main)/home");
    }, 1500);
  };

  const gotoWelcomePage = () => {
    setTimeout(() => {
      router.replace("/(auth)/welcome");
    }, 1500);
  };

  const updateToken = async (data: any) => {
    if (data.token) {
      setToken(data.token);
      await AsyncStorage.setItem("token", data.token);
      await AsyncStorage.setItem(
        "user",
        JSON.stringify({ email: data.email, id: data.id, name: data.name })
      );
      setUser({ email: data.email, id: data.id, name: data.name });
    }
  };

  const signIn = async (email: string, password: string) => {
    const response = await login(email, password);
    await updateToken(response);
    router.replace("/(main)/home");
  };

  const signUp = async (email: string, password: string, name: string) => {
    await register(email, password, name);
    router.replace("/(auth)/login");
  };

  const signOut = async () => {
    setToken(null);
    setUser(null);
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("user");
    router.replace("/(auth)/welcome");
  };

  return (
    <AuthContext.Provider
      value={{ token, user, signIn, signUp, signOut, updateToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

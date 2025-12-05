import { API_URL } from "@/constants";
import axios from "axios";

export const login = async (
  email: string,
  password: string
): Promise<{ token: string }> => {
  try {
    const response = await axios.post(`${API_URL}/auth`, {
      email,
      password,
    });
    return response.data;
  } catch (error: any) {
    console.log("Error", error);
    const msg = error?.response?.data?.msg || "Login failed";
    throw new Error(msg);
  }
};

export const register = async (
  email: string,
  password: string,
  name: string
): Promise<{ token: string }> => {
  try {
    const response = await axios.post(`${API_URL}/users`, {
      email: email,
      passwordHash: password,
      name: name,
    });
    return response.data;
  } catch (error: any) {
    console.log("Error", error);
    const msg = error?.response?.data?.msg || "Register failed";
    throw new Error(msg);
  }
};

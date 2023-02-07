import { setStoredData } from "@/utils/localStorage";
import api from "./config/axiosinstance";

const authAPI = {
  async registerOrSignUp(data) {
    const response = await api.post("signup", data);

    return response;
  },

  async signIn(data) {
    try {
      const response = await api.post("login", data);

      if (response?.status !== 200) throw new Error("Login failed");

      const jwtResponse = await api.post("login/t", {
        token: response.data,
      });

      if (jwtResponse?.status !== 200) throw new Error("JWT retrieval failed");

      const verifyJWT = await api.post("auth", "", {
        headers: {
          Authorization: `Bearer ${jwtResponse.data}`,
        },
      });

      setStoredData("JWT", { token: jwtResponse?.data });

      return verifyJWT;
    } catch (error) {
      return error;
    }
  },
};

export const { registerOrSignUp, signIn } = authAPI;

export default authAPI;

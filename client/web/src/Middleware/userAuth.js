import { instance as axios } from "../services/axios";

const authenticate = async () => {
  const res = await axios.get("/auth");
  return res;
};

export default authenticate;

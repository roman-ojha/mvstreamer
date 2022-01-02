import { instance as axios } from "../services/axios";

const userAuth = async () => {
  const res = await axios.get("/auth", { withCredentials: true });
  console.log(res.status);
  return res;
};

export default userAuth;

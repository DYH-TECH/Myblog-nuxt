import type useUser from "../types/user";
export const useCurrentUser = () => {
  const user = useState<useUser>("user", () => {
    return {
      isLogin: false,
      userName: "",
      userId: "",
    };
  });
};

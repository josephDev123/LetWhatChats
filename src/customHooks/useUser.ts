type userType = {
  data: {
    email: string;
    name: string;
    password: string;
    profile_img: string;
    username: string;
    _id: string;
  };
};

export function useUser() {
  const userString = localStorage.getItem("user");
  // Use optional chaining to handle null or undefined
  const user = userString
    ? (JSON.parse(userString) as userType)
    : ({} as userType);

  return user;
}

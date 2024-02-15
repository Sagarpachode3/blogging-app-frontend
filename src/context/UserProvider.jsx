import React, { useEffect, useState } from "react";
import userContext from "./userContext";

function UserProvider({ children }) {
  // Destructure children from props
  const [user, setUser] = useState({
    data: {},
    login: false,
  });

  return <userContext.Provider value={{user,setUser}}>{children}</userContext.Provider>;
}

export default UserProvider;

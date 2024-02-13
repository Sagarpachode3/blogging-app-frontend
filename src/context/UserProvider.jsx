import React, { useEffect, useState } from "react";
import userContext from "./userContext";

function UserProvider({ children }) {
  // Destructure children from props
  const [user, setUser] = useState({
    name: "Sagar",
  });
  useEffect(() => {
    setUser({
      name: "Rakesh Patil",
    });
  }, []);
  return <userContext.Provider value={user}>{children}</userContext.Provider>;
}

export default UserProvider;

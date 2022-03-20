import React, { createContext, useState, useEffect } from "react";

const UserContext = createContext({});

const UserContextWrapper = props => {
  const updateUser = data => {
    setUserData({
      ...userData,
      ...data,
    });
  };
  const [userData, setUserData] = useState({
    isLoggedIn: false,
    setLoggedIn: updateUser,
  });

  useEffect(() => {
    const session = localStorage.getItem("AUTH_TOKEN");
    if (session) {
      setUserData({
        ...userData,
        ...{ isLoggedIn: true },
      });
    }
  }, []);

  return (
    <UserContext.Provider value={userData}>
      {props.children({ userData })}
    </UserContext.Provider>
  );
};

UserContext.Wrapper = UserContextWrapper;
export default UserContext;

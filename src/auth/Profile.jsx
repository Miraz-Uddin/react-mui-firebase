import React, { useContext } from "react";
import { AuthContext } from "../context/Auth.context";

export default function Profile() {
  const user = useContext(AuthContext);
  return (
    <>
      {user && (
        <>
          <p>{user.email}</p>
        </>
      )}
    </>
  );
}

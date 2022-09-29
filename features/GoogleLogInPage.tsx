import React, { useState } from "react";
import { GoogleLogin, googleLogout } from "@react-oauth/google";

export const GoogleLogInPage = () => {
  const [user, setUser] = useState(false);
  return (
    <div className="google-login">
      {user ? (
        <div>Logged In</div>
      ) : (
        <GoogleLogin
          onSuccess={(response: any) => console.log(response)}
          onError={() => console.log("Error")}
        />
      )}
    </div>
  );
};

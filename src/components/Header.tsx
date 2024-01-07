import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { LoginPopup } from "./LoginPopup";
import { Button } from "@mui/material";

export const Header = () => {
  const auth = useAuth();
  const [showLogin, setShowLogin] = useState(true);
  const handleLogout = (e: any) => {
    e.preventDefault();
    auth.logout();
  };

  useEffect(() => {
    console.log("showLogin: ", showLogin);
  });

  return (
    <header className="w-full flex py-5 px-7 justify-between bg-orange-400">
      <h1 className="m-0 text-3xl">Bite Buddies</h1>
      <section>
        {auth.loggedInUser ? (
          <div className="flex gap-5">
            {"Hello, " + auth.loggedInUser.name}
            <Button variant="contained" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        ) : (
          <div>{"Hello, User"}</div>
          // <div className="flex gap-5">
          //   {"Hello, User"}
          //   <Button
          //     variant="contained"
          //     onClick={() => setShowLogin(!showLogin)}
          //   >
          //     Login now
          //   </Button>
          // </div>
        )}

        {/* <LoginPopup
          open={!showLogin}
          onClose={() => setShowLogin(!showLogin)}
        /> */}
      </section>
    </header>
  );
};

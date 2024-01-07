import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { IoEyeOffSharp } from "react-icons/io5";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
interface Props {
  open: boolean;
  onLogin?: (details: {}) => void;
  onClose?: () => void;
}

const style = {
  // display: 'flex',
  // flexDirection: 'column',
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  // border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const UserLogin = () => {
  const auth = useAuth();
  const [fullName, setFullName] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>();
  const [password, setPassword] = useState<string | null>(null);
  const [confirmPassword, setConfirmPassword] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const [alreadyHaveAccount, setAlreadyHaveAccount] = useState(true);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = (e: any) => {
    e.preventDefault();
    if (username && password) {
      auth.login(username, password);
    }
  };

  const handleSignup = (e: any) => {
    e.preventDefault();
    console.log(fullName, username, password, confirmPassword);
    if (fullName && username && password && confirmPassword) {
      auth.signUp(fullName, username, password);
    }
  };

  return (
    <div className="flex p-5 w-96">
      {alreadyHaveAccount ? (
        <form>
          <FormControl className="flex gap-4">
            <TextField
              id="username"
              label="Username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              label="Password"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mb-4"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleTogglePasswordVisibility}
                      edge="end"
                    >
                      {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button variant="contained" onClick={handleLogin}>
              Log in
            </Button>
            <div
              onClick={() => setAlreadyHaveAccount(false)}
              style={{ cursor: "pointer" }}
            >
              Don't have an Account?
            </div>
          </FormControl>
        </form>
      ) : (
        <form onSubmit={handleSignup}>
          <FormControl className="flex gap-4">
            <TextField
              required
              id="full-name"
              label="Full name"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            <TextField
              id="username"
              required
              label="Username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              label="Password"
              required
              type={showPassword ? "text" : "password"}
              variant="outlined"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mb-4"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleTogglePasswordVisibility}
                      edge="end"
                    >
                      {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              label="Confirm password"
              required
              fullWidth
              type={"password"}
              variant="outlined"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mb-4"
            />

            <Button variant="contained" type="submit">
              Sign up
            </Button>
            <span
              onClick={() => setAlreadyHaveAccount(true)}
              style={{ cursor: "pointer" }}
            >
              Already have an Account?
            </span>
          </FormControl>
        </form>
      )}
    </div>
  );
};

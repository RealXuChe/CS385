"use client";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import {
  Checkbox,
  FormControlLabel,
  InputAdornment,
  Typography,
} from "@mui/material";
import React, { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

const buttonTheme = createTheme({
  palette: {
    primary: {
      main: "#6366F1",
      light: "#c4b5fd",
      dark: "#4f46e5",
    },
  },
});

const inputTheme = createTheme({
  palette: {
    primary: {
      main: "#6366F1",
      light: "#c4b5fd",
      dark: "#4f46e5",
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "--TextField-brandBorderColor": "#E0E3E7",
          "--TextField-brandBorderHoverColor": "#B2BAC2",
          "--TextField-brandBorderFocusedColor": "#6F7E8C",
          borderRadius: "0.75rem",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderRadius: "0.75rem",
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          "&:before, &:after": {
            borderBottom: "2px solid var(--TextField-brandBorderColor)",
          },
          "&:hover:not(.Mui-disabled, .Mui-error):before": {
            borderBottom: "2px solid var(--TextField-brandBorderHoverColor)",
          },
          "&.Mui-focused:after": {
            borderBottom: "2px solid var(--TextField-brandBorderFocusedColor)",
          },
        },
      },
    },
  },
});

export default function Signin() {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };
  let name = useRef<string | null>(null);
  let passwd = useRef<string | null>(null);
  let [errorStat, setErrorStat] = useState<string | null>(null);
  const route = useRouter();
  function signInHandler() {
    if (name.current === null) {
      return;
    }
    localStorage.setItem("username", name.current);
    console.log(`User ${name.current} logged in.`);
    route.refresh();
    route.push("/");
  }
  return (
    <div>
      <div
        className="flex flex-shrink-0 justify-center mx-auto w-[30rem] h-[37rem] rounded-2xl mt-20
            bg-gradient-to-r from-pink-600/30 via-purple-600/30 to-indigo-500/30
            blur-[3.125rem]
            "
      ></div>
      <div
        className="flex flex-shrink-0 flex-col mx-auto w-[30rem] h-[37rem] rounded-2xl
            relative bottom-[37rem]
            bg-[#F4F4F4]/40 border-4 border-[#FFFAFA]/20"
      >
        <div
          className="flex justify-center mx-auto mt-[2.12rem] text-[2rem] font-bold
                text-transparent bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-500 bg-clip-text"
        >
          Hi, Welcome Back
        </div>

        <div className="flex justify-center mx-auto mt-[3.06rem] rounded-xl">
          <ThemeProvider theme={inputTheme}>
            <TextField
              label="Username"
              required={true}
              className=" w-[24.5rem]"
              onBlur={(e) => {
                name.current = e.currentTarget.value;
              }}
            ></TextField>
          </ThemeProvider>
        </div>

        <div className="flex justify-center mx-auto mt-[1.14rem]">
          <ThemeProvider theme={inputTheme}>
            <FormControl
              sx={{ m: 1, width: "24.5rem", borderRadius: "12rem" }}
              variant="outlined"
            >
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                onBlur={(e) => {
                  passwd.current = e.currentTarget.value;
                }}
                label="Password"
              />
            </FormControl>
          </ThemeProvider>
        </div>

        {errorStat !== null && (
          <Typography className="ml-[2.56rem]" color="error" variant="caption">
            {errorStat}
          </Typography>
        )}

        {/*需要修改一下remember me的颜色#727D8D*/}
        <div className="ml-[2.56rem]">
          <ThemeProvider theme={buttonTheme}>
            <FormControlLabel
              control={<Checkbox></Checkbox>}
              label="Remember me"
            ></FormControlLabel>
          </ThemeProvider>
        </div>
        <div className="flex justify-center mt-[1rem] ">
          <ThemeProvider theme={buttonTheme}>
            <Button
              variant="contained"
              color={"primary"}
              className="rounded-full bg-indigo-500 px-8"
              onClick={signInHandler}
            >
              <p className="text-[1.6rem] text-[#FFFFFF]">sign in</p>
            </Button>
          </ThemeProvider>
        </div>

        <div className="flex justify-center mt-[2rem] mx-auto w-[9.5rem] border-t-2 border-[#727D8D]/30"></div>

        <div className="flex justify-center mt-[1.5rem] text-[#727D8D]">
          <Link href="Signup">Do not have an account?</Link>
        </div>
      </div>
    </div>
  );
}

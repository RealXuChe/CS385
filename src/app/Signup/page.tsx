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

import { InputAdornment, Typography } from "@mui/material";
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

export default function Signup() {
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
  function signUpHandler() {
    if (name.current === null || passwd.current === null) {
      return;
    }
    console.log(`Username ${name.current}, Password ${passwd.current}.`);
    route.push("/Signin");
  }
  return (
    <div>
      <div
        className="flex flex-shrink-0 justify-center mx-auto w-[30rem] h-[42rem] rounded-2xl mt-20
            bg-gradient-to-r from-pink-600/30 via-purple-600/30 to-indigo-500/30
            blur-[3.125rem]
            "
      ></div>
      <div
        className="flex flex-shrink-0 flex-col mx-auto w-[30rem] h-[42rem] rounded-2xl
            relative bottom-[43.4rem]
            bg-[#F4F4F4]/40 border-4 border-[#FFFAFA]/20 items-center"
      >
        <div
          className="mx-auto mt-[1.5rem] text-[2rem] font-bold
                text-transparent bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-500 bg-clip-text"
        >
          Sign up
        </div>

        <Typography className="text-[#727D8D]" variant="overline">
          Sign up with Email address
        </Typography>

        <ThemeProvider theme={inputTheme}>
          <TextField
            label="Email Address"
            required={true}
            className=" w-[24.5rem] mt-8"
          ></TextField>

          <TextField
            label="Username"
            required={true}
            className=" w-[24.5rem] mt-8"
            onBlur={(e) => {
              name.current = e.currentTarget.value;
            }}
          ></TextField>

          <FormControl
            sx={{ width: "24.5rem" }}
            className="mt-8"
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

        {errorStat !== null && (
          <Typography className="ml-[2.56rem]" color="error" variant="caption">
            {errorStat}
          </Typography>
        )}

        <ThemeProvider theme={buttonTheme}>
          <Button
            variant="contained"
            color={"primary"}
            className="rounded-full bg-indigo-500 px-8 mt-8"
            onClick={signUpHandler}
          >
            <p className="text-[1.6rem] text-[#FFFFFF]">sign up</p>
          </Button>
        </ThemeProvider>

        <div className="mt-[2rem] mx-auto w-[9.5rem] border-t-2 border-[#727D8D]/30"></div>

        <Link href="Signin" className="mt-8">
          <Typography className="text-[#727D8D]" variant="caption">
            Already have an account?
          </Typography>
        </Link>
      </div>
    </div>
  );
}

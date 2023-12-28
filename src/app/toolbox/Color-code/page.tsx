"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  TextField,
  IconButton,
  Grid,
  Paper,
  InputAdornment,
  Button,
} from "@mui/material";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import { Converter } from "./Converter/page";
import copy from "copy-to-clipboard";
import { HexColorPicker } from "react-colorful";

const ColorConverter = () => {
  const toolName = "Color-code";
  const formatDate = (date: Date) => {
    return (
      date.getFullYear() +
      "-" +
      ("0" + (date.getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + date.getDate()).slice(-2) +
      " " +
      ("0" + date.getHours()).slice(-2) +
      ":" +
      ("0" + date.getMinutes()).slice(-2) +
      ":" +
      ("0" + date.getSeconds()).slice(-2)
    );
  };

  const saveHistory = (type: string, code: string) => {
    let rawInfo = localStorage.getItem(toolName);
    if (rawInfo == null) {
      // 如果当前工具的历史记录是空的，则创建仅包含当前询问记录的数组
      let newInfo = {
        query: [[type, code]],
        time: [formatDate(new Date())],
      };
      let newInfoStr = JSON.stringify(newInfo);
      localStorage.setItem(toolName, newInfoStr);
    } else {
      // 如果当前工具已有历史记录，则追加当前询问记录到数组末尾
      let parsedInfo = JSON.parse(rawInfo);
      let queries = parsedInfo["query"];
      let times = parsedInfo["time"];
      let nowQuery = [type, code];
      let nowTime = formatDate(new Date());
      queries.push(nowQuery);
      times.push(nowTime);
      let newInfo = {
        query: queries,
        time: times,
      };
      let newInfoStr = JSON.stringify(newInfo);
      localStorage.setItem(toolName, newInfoStr);
    }
  };

  const handleCopy = (text: string) => {
    const textWithoutQuotes = text.replace(/"/g, "");
    copy(textWithoutQuotes);
    alert("Copied to Clipboard!");
  };
  const [color, setColor] = useState("");

  const [state, setState] = useState({
    HEX: { hex: "79BD9A" },
    RGB: { r: "121", g: "189", b: "154" },
    CMYK: { c: "36", m: "0", y: "19", k: "26" },
    HSV: { h: "149", s: "36", v: "74" },
  });
  const [InputValid, setInputValid] = useState({
    HEX: true,
    RGBr: true,
    RGBg: true,
    RGBb: true,
    CMYKc: true,
    CMYKm: true,
    CMYKy: true,
    CMYKk: true,
    HSVh: true,
    HSVs: true,
    HSVv: true,
  });

  const hexvalid = (input: string) => {
    if (input === "") {
      setInputValid({ ...InputValid, HEX: true });
    } else {
      const hexRegex1 = /^[0-9a-fA-F]{1,6}$/;
      const hexRegex2 = /^[0-9a-fA-F]{6}$/;
      if (input.length == 6) {
        setInputValid({ ...InputValid, HEX: hexRegex2.test(input) });
      } else {
        setInputValid({ ...InputValid, HEX: hexRegex1.test(input) });
      }
    }
  };

  const rgbvalid = (input: string, type: string) => {
    if (input === "") {
      setInputValid({ ...InputValid, [type]: true });
    } else {
      const intValue = parseInt(input, 10);
      setInputValid({
        ...InputValid,
        [type]: !isNaN(intValue) && intValue >= 0 && intValue <= 255,
      });
    }
  };
  const cmykvalid = (input: string, type: string) => {
    if (input === "") {
      setInputValid({ ...InputValid, [type]: true });
    } else {
      const intValue = parseInt(input, 10);
      setInputValid({
        ...InputValid,
        [type]: !isNaN(intValue) && intValue >= 0 && intValue <= 100,
      });
    }
  };

  const hsvvalid = (input: string, type: string) => {
    if (input === "") {
      setInputValid({ ...InputValid, [type]: true });
    } else {
      const floatValue = parseFloat(input);
      if (type === "HSVh") {
        setInputValid({
          ...InputValid,
          HSVh: !isNaN(floatValue) && floatValue >= 0 && floatValue <= 360,
        });
      } else {
        setInputValid({
          ...InputValid,
          [type]: !isNaN(floatValue) && floatValue >= 0 && floatValue <= 100,
        });
      }
    }
  };

  const handleInputChange = (value: any, type: string) => {
    const convertedValues = convertColor(value, type);
    setState({
      ...state,
      ...convertedValues,
    });
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const history = queryParams.get("history");
    if (history != null) {
      const sys = history.split(",");
      const sysval = sys.slice(1);
      Object.keys((state as any)[sys[0].toUpperCase()]).forEach(
        (key, index) => {
          (state as any)[sys[0].toUpperCase()][key] = sysval[index];
        },
      );
      handleInputChange((state as any)[sys[0].toUpperCase()], sys[0]);
    }
  }, []);

  const convertColor = (value: any, type: string) => {
    switch (type) {
      case "hex": {
        if (InputValid.HEX) {
          return {
            HEX: { hex: value.hex },
            RGB: Converter.hex2rgb(value.hex),
            CMYK: Converter.hex2cmyk(value.hex),
            HSV: Converter.hex2hsv(value.hex),
          };
        }
      }
      case "rgb": {
        if (InputValid.RGBr && InputValid.RGBg && InputValid.RGBb) {
          return {
            HEX: Converter.rgb2hex(value.r, value.g, value.b),
            RGB: { r: value.r, g: value.g, b: value.b },
            CMYK: Converter.rgb2cmyk(value.r, value.g, value.b),
            HSV: Converter.rgb2hsv(value.r, value.g, value.b),
          };
        }
      }
      case "cmyk": {
        if (
          InputValid.CMYKc &&
          InputValid.CMYKk &&
          InputValid.CMYKm &&
          InputValid.CMYKy
        ) {
          return {
            RGB: Converter.cmyk2rgb(value.c, value.m, value.y, value.k),
            HEX: Converter.cmyk2hex(value.c, value.m, value.y, value.k),
            CMYK: { c: value.c, m: value.m, y: value.y, k: value.k },
            HSV: Converter.cmyk2hsv(value.c, value.m, value.y, value.k),
          };
        }
      }
      case "hsv": {
        if (InputValid.HSVh && InputValid.HSVs && InputValid.HSVv) {
          return {
            RGB: Converter.hsv2rgb(value.h, value.s, value.v),
            HEX: Converter.hsv2hex(value.h, value.s, value.v),
            CMYK: Converter.hsv2cmyk(value.h, value.s, value.v),
            HSV: { h: value.h, s: value.s, v: value.v },
          };
        }
      }
      default:
        return {};
    }
  };

  const containstyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: "0",
    left: "0",
    width: "100%",
    height: "111%",
  };
  const gridconstyle = {
    flexDirection: "column",
    alignItems: "center",
    justify: "center",
    marginLeft: "10%",
  };
  const textfieldstyle = {
    width: "100%",
  };
  const paperstyle = {
    display: "flex",
    padding: "16px",
    textAlign: "left",
    width: "180%",
    marginLeft: "-40%",
    flexDirection: "row",
    alignItems: "center",
    justify: "center",
  };
  const buttonStyle = {
    fontSize: "12px",
    marginLeft: "4px",
    height: "40px",
    width: "20%",
    "&:hover": {
      backgroundColor: "#b1e3fd",
    },
  };

  return (
    <div
      style={{
        ...containstyle,
        backgroundColor:
          state.HEX.hex.length >= 6
            ? "#" + state.HEX.hex
            : !(state.RGB.r === "") &&
                !(state.RGB.g === "") &&
                !(state.RGB.b === "")
              ? "#" + convertColor(state.RGB, "rgb").HEX?.hex
              : !(state.CMYK.c === "") &&
                  !(state.CMYK.m === "") &&
                  !(state.CMYK.y === "") &&
                  !(state.CMYK.k === "")
                ? "#" + convertColor(state.CMYK, "cmyk").HEX?.hex
                : !(state.HSV.h === "") &&
                    !(state.HSV.s === "") &&
                    !(state.HSV.v === "")
                  ? "#" + convertColor(state.HSV, "hsv").HEX?.hex
                  : "#ffffff",
      }}
    >
      <Grid container spacing={2} sx={gridconstyle}>
        {/* HEX输入框 */}
        <Grid item xs={10} md={5} sm={5}>
          <Paper sx={paperstyle}>
            <TextField
              sx={textfieldstyle}
              label="HEX"
              value={state.HEX.hex.substring(0, 6)}
              error={!InputValid.HEX}
              onKeyDown={(e) => {
                const isValidKey =
                  /^[0-9a-fA-F]$/.test(e.key) || ["Backspace"].includes(e.key);
                if (!isValidKey) {
                  e.preventDefault();
                }
              }}
              onChange={(e) => {
                hexvalid(e.target.value.substring(0, 6));
                setState({
                  ...state,
                  HEX: { hex: e.target.value.substring(0, 6) },
                });
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">#</InputAdornment>
                ),
              }}
            />
            <Button
              variant="outlined"
              sx={buttonStyle}
              onClick={(e) => {
                if (state.HEX.hex.length >= 6 && !(state.HEX.hex === "")) {
                  handleInputChange(state.HEX, "hex");
                  saveHistory("hex", state.HEX.hex);
                } else {
                }
              }}
            >
              Convert
            </Button>

            <IconButton
              style={{ margin: "4px" }}
              onClick={() => handleCopy(JSON.stringify("#" + state.HEX.hex))}
            >
              <FileCopyIcon />
            </IconButton>
          </Paper>
        </Grid>

        {/* RGB输入框 */}
        <Grid item xs={10} md={5} sm={5}>
          <Paper sx={paperstyle}>
            <TextField
              label="R"
              value={state.RGB.r}
              onKeyDown={(e) => {
                const isValidKey =
                  /^[0-9]$/.test(e.key) || ["Backspace"].includes(e.key);
                if (!isValidKey) {
                  e.preventDefault();
                }
              }}
              onChange={(e) => {
                rgbvalid(e.target.value, "RGBr");
                setState({
                  ...state,
                  RGB: { ...state.RGB, r: e.target.value },
                });
              }}
              error={!InputValid.RGBr}
            />

            <div style={{ alignSelf: "flex-end", margin: "2px" }}>,</div>
            <TextField
              label="G"
              value={state.RGB.g}
              onKeyDown={(e) => {
                const isValidKey =
                  /^[0-9]$/.test(e.key) || ["Backspace"].includes(e.key);
                if (!isValidKey) {
                  e.preventDefault();
                }
              }}
              onChange={(e) => {
                rgbvalid(e.target.value, "RGBg");
                setState({
                  ...state,
                  RGB: { ...state.RGB, g: e.target.value },
                });
              }}
              error={!InputValid.RGBg}
            />

            <div style={{ alignSelf: "flex-end", margin: "2px" }}>,</div>
            <TextField
              label="B"
              value={state.RGB.b}
              onKeyDown={(e) => {
                const isValidKey =
                  /^[0-9]$/.test(e.key) || ["Backspace"].includes(e.key);
                if (!isValidKey) {
                  e.preventDefault();
                }
              }}
              onChange={(e) => {
                rgbvalid(e.target.value, "RGBb");
                setState({
                  ...state,
                  RGB: { ...state.RGB, b: e.target.value },
                });
              }}
              error={!InputValid.RGBb}
            />

            <Button
              variant="outlined"
              sx={buttonStyle}
              onClick={(e) => {
                if (
                  InputValid.RGBr &&
                  InputValid.RGBg &&
                  InputValid.RGBb &&
                  !(state.RGB.r === "") &&
                  !(state.RGB.g === "") &&
                  !(state.RGB.b === "")
                ) {
                  handleInputChange(state.RGB, "rgb");
                  saveHistory(
                    "rgb",
                    state.RGB.r + "," + state.RGB.g + "," + state.RGB.b,
                  );
                } else {
                }
              }}
            >
              Convert
            </Button>
            <IconButton
              style={{ margin: "4px" }}
              onClick={() =>
                handleCopy(
                  JSON.stringify(
                    state.RGB.r + "," + state.RGB.g + "," + state.RGB.b,
                  ),
                )
              }
            >
              <FileCopyIcon />
            </IconButton>
          </Paper>
        </Grid>

        {/* CMYK输入框 */}
        <Grid item xs={10} md={5} sm={5}>
          <Paper sx={paperstyle}>
            <TextField
              label="C"
              value={state.CMYK.c}
              onKeyDown={(e) => {
                const isValidKey =
                  /^[0-9]$/.test(e.key) || ["Backspace"].includes(e.key);
                if (!isValidKey) {
                  e.preventDefault();
                }
              }}
              onChange={(e) => {
                cmykvalid(e.target.value, "CMYKc");
                setState({
                  ...state,
                  CMYK: { ...state.CMYK, c: e.target.value },
                });
              }}
              error={!InputValid.CMYKc}
            />
            <div style={{ alignSelf: "flex-end", margin: "2px" }}>,</div>
            <TextField
              label="M"
              value={state.CMYK.m}
              onKeyDown={(e) => {
                const isValidKey =
                  /^[0-9]$/.test(e.key) || ["Backspace"].includes(e.key);
                if (!isValidKey) {
                  e.preventDefault();
                }
              }}
              onChange={(e) => {
                cmykvalid(e.target.value, "CMYKm");
                setState({
                  ...state,
                  CMYK: { ...state.CMYK, m: e.target.value },
                });
              }}
              error={!InputValid.CMYKm}
            />
            <div style={{ alignSelf: "flex-end", margin: "2px" }}>,</div>
            <TextField
              label="Y"
              value={state.CMYK.y}
              onKeyDown={(e) => {
                const isValidKey =
                  /^[0-9]$/.test(e.key) || ["Backspace"].includes(e.key);
                if (!isValidKey) {
                  e.preventDefault();
                }
              }}
              onChange={(e) => {
                cmykvalid(e.target.value, "CMYKy");
                setState({
                  ...state,
                  CMYK: { ...state.CMYK, y: e.target.value },
                });
              }}
              error={!InputValid.CMYKy}
            />
            <div style={{ alignSelf: "flex-end", margin: "2px" }}>,</div>
            <TextField
              label="K"
              value={state.CMYK.k}
              onKeyDown={(e) => {
                const isValidKey =
                  /^[0-9]$/.test(e.key) || ["Backspace"].includes(e.key);
                if (!isValidKey) {
                  e.preventDefault();
                }
              }}
              onChange={(e) => {
                cmykvalid(e.target.value, "CMYKk");
                setState({
                  ...state,
                  CMYK: { ...state.CMYK, k: e.target.value },
                });
              }}
              error={!InputValid.CMYKk}
            />
            <Button
              variant="outlined"
              sx={buttonStyle}
              onClick={(e) => {
                if (
                  InputValid.CMYKc &&
                  InputValid.CMYKk &&
                  InputValid.CMYKm &&
                  InputValid.CMYKy &&
                  !(state.CMYK.c === "") &&
                  !(state.CMYK.m === "") &&
                  !(state.CMYK.y === "") &&
                  !(state.CMYK.k === "")
                ) {
                  handleInputChange(state.CMYK, "cmyk");
                  saveHistory(
                    "cmyk",
                    state.CMYK.c +
                      "," +
                      state.CMYK.m +
                      "," +
                      state.CMYK.y +
                      "," +
                      state.CMYK.k,
                  );
                } else {
                }
              }}
            >
              Convert
            </Button>

            <IconButton
              style={{ margin: "4px" }}
              onClick={() =>
                handleCopy(
                  JSON.stringify(
                    state.CMYK.c +
                      "," +
                      state.CMYK.m +
                      "," +
                      state.CMYK.y +
                      "," +
                      state.CMYK.k,
                  ),
                )
              }
            >
              <FileCopyIcon />
            </IconButton>
          </Paper>
        </Grid>

        {/* HSV输入框 */}
        <Grid item xs={10} md={5} sm={5}>
          <Paper sx={paperstyle}>
            <TextField
              label="H"
              value={state.HSV.h}
              onKeyDown={(e) => {
                const isValidKey =
                  /^[0-9.]$/.test(e.key) || ["Backspace"].includes(e.key);
                if (!isValidKey) {
                  e.preventDefault();
                }
              }}
              onChange={(e) => {
                hsvvalid(e.target.value, "HSVh");
                setState({
                  ...state,
                  HSV: { ...state.HSV, h: e.target.value },
                });
              }}
              error={!InputValid.HSVh}
            />
            <div style={{ alignSelf: "flex-end", margin: "2px" }}>,</div>
            <TextField
              label="S"
              value={state.HSV.s}
              onKeyDown={(e) => {
                const isValidKey =
                  /^[0-9.]$/.test(e.key) || ["Backspace"].includes(e.key);
                if (!isValidKey) {
                  e.preventDefault();
                }
              }}
              onChange={(e) => {
                hsvvalid(e.target.value, "HSVs");
                setState({
                  ...state,
                  HSV: { ...state.HSV, s: e.target.value },
                });
              }}
              error={!InputValid.HSVs}
            />
            <div style={{ alignSelf: "flex-end", margin: "2px" }}>,</div>
            <TextField
              label="V"
              value={state.HSV.v}
              onKeyDown={(e) => {
                const isValidKey =
                  /^[0-9.]$/.test(e.key) || ["Backspace"].includes(e.key);
                if (!isValidKey) {
                  e.preventDefault();
                }
              }}
              onChange={(e) => {
                hsvvalid(e.target.value, "HSVv");
                setState({
                  ...state,
                  HSV: { ...state.HSV, v: e.target.value },
                });
              }}
              error={!InputValid.HSVv}
            />
            <Button
              variant="outlined"
              sx={buttonStyle}
              onClick={(e) => {
                if (
                  InputValid.HSVh &&
                  InputValid.HSVs &&
                  InputValid.HSVv &&
                  !(state.HSV.h === "") &&
                  !(state.HSV.s === "") &&
                  !(state.HSV.v === "")
                ) {
                  handleInputChange(state.HSV, "hsv");
                  saveHistory(
                    "hsv",
                    state.HSV.h + "," + state.HSV.s + "," + state.HSV.v,
                  );
                } else {
                }
              }}
            >
              Convert
            </Button>
            <IconButton
              style={{ margin: "4px" }}
              onClick={() =>
                handleCopy(
                  JSON.stringify(
                    state.HSV.h + "," + state.HSV.s + "," + state.HSV.v,
                  ),
                )
              }
            >
              <FileCopyIcon />
            </IconButton>
          </Paper>
        </Grid>
      </Grid>

      <Grid
        container
        spacing={0}
        sx={{
          ...gridconstyle,
          alignItems: "left",
          justify: "left",
          marginLeft: "-5%",
        }}
      >
        <Grid item xs={10} md={5} sm={5}>
          <HexColorPicker
            style={{ width: "350px", height: "400px" }}
            color={
              state.HEX.hex.length >= 6
                ? "#" + state.HEX.hex
                : !(state.RGB.r === "") &&
                    !(state.RGB.g === "") &&
                    !(state.RGB.b === "")
                  ? "#" + convertColor(state.RGB, "rgb").HEX?.hex
                  : !(state.CMYK.c === "") &&
                      !(state.CMYK.m === "") &&
                      !(state.CMYK.y === "") &&
                      !(state.CMYK.k === "")
                    ? "#" + convertColor(state.CMYK, "cmyk").HEX?.hex
                    : !(state.HSV.h === "") &&
                        !(state.HSV.s === "") &&
                        !(state.HSV.v === "")
                      ? "#" + convertColor(state.HSV, "hsv").HEX?.hex
                      : "#ffffff"
            }
            onChange={(e) => {
              if (e.length >= 7) {
                setState({ ...state, HEX: { hex: e.substring(1) } });
              }
            }}
            onClick={(e) => {
              handleInputChange(state.HEX, "hex");
              saveHistory("hex", state.HEX.hex);
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default ColorConverter;

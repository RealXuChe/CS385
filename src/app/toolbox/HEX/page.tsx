"use client";
import React, { useEffect, useState } from "react";
import {
  TextField,
  IconButton,
  Grid,
  Paper,
  InputAdornment,
  Button,
} from "@mui/material";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import copy from "copy-to-clipboard";

const NumberConverter = () => {
  const toolName = "HEX";
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
  const [state, setState] = useState({
    binary: "",
    octal: "",
    decimal: "",
    hexadecimal: "",
  });
  const [InputValid, setInputValid] = useState({
    binaryv: true,
    octalv: true,
    decimalv: true,
    hexadecimalv: true,
  });
  const binaryvalid = (input: string) => {
    const binRegex = /^[0-1]+$/;
    setInputValid({ ...InputValid, binaryv: binRegex.test(input) });
  };

  const octalvalid = (input: string) => {
    const octRegex = /^[0-7]+$/;
    setInputValid({ ...InputValid, octalv: octRegex.test(input) });
  };

  const decimalvalid = (input: string) => {
    const decRegex = /^\d+$/;
    setInputValid({ ...InputValid, decimalv: decRegex.test(input) });
  };

  const hexvalid = (input: string) => {
    const hexRegex = /^[0-9a-fA-F]+$/;
    setInputValid({ ...InputValid, hexadecimalv: hexRegex.test(input) });
  };

  const handleCopy = (text: string) => {
    copy(text);
    alert("Copied to Clipboard!");
  };

  const handleInputChange = (value: string, type: string) => {
    const convertedValues = convertNumber(value, type);
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
      setState({ ...state, [sys[0]]: sys[1] });
      handleInputChange(sys[1], sys[0]);
    }
  });

  const convertNumber = (value: string, type: string) => {
    switch (type) {
      case "binary":
        if (InputValid.binaryv) {
          return {
            binary: value,
            octal: parseInt(value, 2).toString(8),
            decimal: parseInt(value, 2).toString(10),
            hexadecimal: parseInt(value, 2).toString(16).toUpperCase(),
          };
        }
      case "octal":
        if (InputValid.octalv) {
          return {
            binary: parseInt(value, 8).toString(2),
            octal: value,
            decimal: parseInt(value, 8).toString(10),
            hexadecimal: parseInt(value, 8).toString(16).toUpperCase(),
          };
        }
      case "decimal":
        if (InputValid.decimalv) {
          return {
            binary: parseInt(value, 10).toString(2),
            octal: parseInt(value, 10).toString(8),
            decimal: value,
            hexadecimal: parseInt(value, 10).toString(16).toUpperCase(),
          };
        }
      case "hexadecimal":
        if (InputValid.hexadecimalv) {
          return {
            binary: parseInt(value, 16).toString(2),
            octal: parseInt(value, 16).toString(8),
            decimal: parseInt(value, 16).toString(10),
            hexadecimal: value,
          };
        }
      default:
        return {};
    }
  };

  const containstyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: "18px",
  };
  const gridconstyle = {
    flexDirection: "column",
    alignItems: "center",
    justify: "center",
  };
  const textfieldstyle = {
    width: "100%",
  };
  const paperstyle = {
    display: "flex",
    padding: "16px",
    textAlign: "center",
    width: "100%",
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
    <div style={containstyle}>
      <Grid container spacing={2} sx={gridconstyle}>
        {/* Binary Input */}
        <Grid item xs={10} md={5}>
          <Paper sx={paperstyle}>
            <TextField
              style={textfieldstyle}
              label="Binary"
              value={state.binary}
              error={!InputValid.binaryv}
              onKeyDown={(e) => {
                const isValidKey =
                  /^[0-1]$/.test(e.key) || ["Backspace"].includes(e.key);
                if (!isValidKey) {
                  e.preventDefault();
                }
              }}
              onChange={(e) => {
                binaryvalid(e.target.value);
                setState({ ...state, binary: e.target.value });
              }}
            />
            <Button
              variant="outlined"
              sx={buttonStyle}
              onClick={(e) => {
                if (InputValid.binaryv && !(state.binary === "")) {
                  handleInputChange(state.binary, "binary");
                  saveHistory("binary", state.binary);
                }
              }}
            >
              Convert
            </Button>
            <IconButton
              style={{ margin: "4px" }}
              onClick={() => handleCopy(state.binary)}
            >
              <FileCopyIcon />
            </IconButton>
          </Paper>
        </Grid>

        {/* Octal Input */}
        <Grid item xs={10} md={5}>
          <Paper sx={paperstyle}>
            <TextField
              style={textfieldstyle}
              label="Octal"
              value={state.octal}
              error={!InputValid.octalv}
              onKeyDown={(e) => {
                const isValidKey =
                  /^[0-7]$/.test(e.key) || ["Backspace"].includes(e.key);
                if (!isValidKey) {
                  e.preventDefault();
                }
              }}
              onChange={(e) => {
                octalvalid(e.target.value);

                setState({ ...state, octal: e.target.value });
              }}
            />
            <Button
              variant="outlined"
              sx={buttonStyle}
              onClick={(e) => {
                if (InputValid.octalv && !(state.octal === "")) {
                  handleInputChange(state.octal, "octal");
                  saveHistory("octal", state.octal);
                }
              }}
            >
              Convert
            </Button>
            <IconButton style={{}} onClick={() => handleCopy(state.octal)}>
              <FileCopyIcon />
            </IconButton>
          </Paper>
        </Grid>

        {/* Decimal Input */}
        <Grid item xs={10} md={5}>
          <Paper sx={paperstyle}>
            <TextField
              style={textfieldstyle}
              label="Decimal"
              value={state.decimal}
              error={!InputValid.decimalv}
              onKeyDown={(e) => {
                const isValidKey =
                  /^\d$/.test(e.key) || ["Backspace"].includes(e.key);
                if (!isValidKey) {
                  e.preventDefault();
                }
              }}
              onChange={(e) => {
                decimalvalid(e.target.value);
                setState({ ...state, decimal: e.target.value });
              }}
            />
            <Button
              variant="outlined"
              sx={buttonStyle}
              onClick={(e) => {
                if (InputValid.decimalv && !(state.decimal === "")) {
                  handleInputChange(state.decimal, "decimal");
                  saveHistory("decimal", state.decimal);
                }
              }}
            >
              Convert
            </Button>
            <IconButton
              style={{ margin: "4px" }}
              onClick={() => handleCopy(state.decimal)}
            >
              <FileCopyIcon />
            </IconButton>
          </Paper>
        </Grid>

        {/* Hexadecimal Input */}
        <Grid item xs={10} md={5}>
          <Paper sx={paperstyle}>
            <TextField
              style={textfieldstyle}
              label="Hexadecimal"
              value={state.hexadecimal}
              error={!InputValid.hexadecimalv}
              onKeyDown={(e) => {
                const isValidKey =
                  /^[0-9a-fA-F]$/.test(e.key) || ["Backspace"].includes(e.key);
                if (!isValidKey) {
                  e.preventDefault();
                }
              }}
              onChange={(e) => {
                hexvalid(e.target.value);
                setState({ ...state, hexadecimal: e.target.value });
              }}
            />
            <Button
              variant="outlined"
              sx={buttonStyle}
              onClick={(e) => {
                if (InputValid.hexadecimalv && !(state.hexadecimal === "")) {
                  handleInputChange(state.hexadecimal, "hexadecimal");
                  saveHistory("hexadecimal", state.hexadecimal);
                }
              }}
            >
              Convert
            </Button>
            <IconButton
              style={{ margin: "4px" }}
              onClick={() => handleCopy(state.hexadecimal)}
            >
              <FileCopyIcon />
            </IconButton>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default NumberConverter;

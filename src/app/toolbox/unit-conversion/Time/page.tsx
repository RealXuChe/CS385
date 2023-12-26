"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  Button,
  TextField,
  Grid,
  Paper,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { UnitConverter } from "@/app/toolbox/unit-conversion/UnitConverter/unitconverter";

export default function UnitConversionTool() {
  const toolName = "unit-conversion";
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

  const saveHistory = (
    unit: string,
    size: string,
    fromunit: string,
    tounit: string,
  ) => {
    let rawInfo = localStorage.getItem(toolName);
    if (rawInfo == null) {
      // 如果当前工具的历史记录是空的，则创建仅包含当前询问记录的数组
      let newInfo = {
        query: [[unit, size, fromunit, tounit]],
        time: [formatDate(new Date())],
      };
      let newInfoStr = JSON.stringify(newInfo);
      localStorage.setItem(toolName, newInfoStr);
    } else {
      // 如果当前工具已有历史记录，则追加当前询问记录到数组末尾
      let parsedInfo = JSON.parse(rawInfo);
      let queries = parsedInfo["query"];
      let times = parsedInfo["time"];
      let nowQuery = [unit, size, fromunit, tounit];
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
    time: "",
    timeResult: 0,
  });

  const inputRef = useRef({
    Time: { fromUnit: "", toUnit: "" },
  });

  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: "50%",
    paddingTop: "32px",
  };

  const paperStyle = {
    padding: "32px",
    textAlign: "center",
    color: "#000",
    width: "260%",
    marginLeft: "-130%",
  };

  const inputlabelStyle = {
    background: `linear-gradient(to bottom, transparent 30%, white 30%)`,
    backgroundClip: "padding-box",
  };

  const textfieldStyle = {
    marginBottom: "7px",
  };

  const selectStyle1 = {
    marginBottom: "7px",
  };
  const handleTimeConvert = () => {
    const { fromUnit, toUnit } = inputRef.current.Time;
    const result = UnitConverter.convertTime(
      parseFloat(state.time),
      fromUnit,
      toUnit,
    );
    setState({ ...state, timeResult: result });
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const history = queryParams.get("history");
    if (history != null) {
      const sysval = history.split(",").slice(1);
      const sta = [sysval[0], 0];
      Object.keys(state).forEach((key, index) => {
        (state as any)[key] = sta[index];
      });
      inputRef.current.Time.fromUnit = sysval[1];
      inputRef.current.Time.toUnit = sysval[2];
      handleTimeConvert();
    }
  }, []);

  return (
    <div style={containerStyle}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper sx={paperStyle}>
            <h2 style={{ marginBottom: "4px" }}>Time</h2>
            <TextField
              style={textfieldStyle}
              label="value"
              value={state.time}
              onChange={(e) => {
                setState({ ...state, time: e.target.value });
              }}
            />
            <FormControl fullWidth>
              <InputLabel id="timeFromUnitLabel" sx={inputlabelStyle}>
                From Unit
              </InputLabel>
              <Select
                style={selectStyle1}
                labelId="timeFromUnitLabel"
                value={inputRef.current.Time.fromUnit}
                onChange={(e) => {
                  const value = e.target.value as string;
                  inputRef.current.Time.fromUnit = value;
                  setState({ ...state });
                }}
              >
                <MenuItem value="Years">Years</MenuItem>
                <MenuItem value="Months">Months</MenuItem>
                <MenuItem value="Weeks">Weeks</MenuItem>
                <MenuItem value="Days">Days</MenuItem>
                <MenuItem value="h">h</MenuItem>
                <MenuItem value="min">min</MenuItem>
                <MenuItem value="s">s</MenuItem>
                <MenuItem value="ms">ms</MenuItem>
                <MenuItem value="µs">µs</MenuItem>
                <MenuItem value="ns">ns</MenuItem>
                {/* Add more units as needed */}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel id="timeToUnitLabel" sx={inputlabelStyle}>
                To Unit
              </InputLabel>
              <Select
                style={selectStyle1}
                labelId="timetoUnitLabel"
                value={inputRef.current.Time.toUnit}
                onChange={(e) => {
                  const value = e.target.value as string;
                  inputRef.current.Time.toUnit = value;
                  setState({ ...state });
                }}
              >
                <MenuItem value="Years">Years</MenuItem>
                <MenuItem value="Months">Months</MenuItem>
                <MenuItem value="Weeks">Weeks</MenuItem>
                <MenuItem value="Days">Days</MenuItem>
                <MenuItem value="h">h</MenuItem>
                <MenuItem value="min">min</MenuItem>
                <MenuItem value="s">s</MenuItem>
                <MenuItem value="ms">ms</MenuItem>
                <MenuItem value="µs">µs</MenuItem>
                <MenuItem value="ns">ns</MenuItem>
                {/* Add more units as needed */}
              </Select>
            </FormControl>
            <Button
              onClick={(e) => {
                handleTimeConvert();
                saveHistory(
                  "Time",
                  state.time,
                  inputRef.current.Time.fromUnit,
                  inputRef.current.Time.toUnit,
                );
              }}
            >
              Convert
            </Button>
            <p>Result: {state.timeResult}</p>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

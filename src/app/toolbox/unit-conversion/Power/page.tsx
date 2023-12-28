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
    power: "",
    powerResult: 0,
  });

  const inputRef = useRef({
    Power: { fromUnit: "", toUnit: "" },
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
  const handlePowerConvert = () => {
    const { fromUnit, toUnit } = inputRef.current.Power;
    const result = UnitConverter.convertPower(
      parseFloat(state.power),
      fromUnit,
      toUnit,
    );
    setState({ ...state, powerResult: result });
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
      inputRef.current.Power.fromUnit = sysval[1];
      inputRef.current.Power.toUnit = sysval[2];
      handlePowerConvert();
    }
  }, []);

  return (
    <div style={containerStyle}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper sx={paperStyle}>
            <h2 style={{ marginBottom: "4px" }}>Power</h2>
            <TextField
              style={textfieldStyle}
              label="value"
              value={state.power}
              onChange={(e) => {
                setState({ ...state, power: e.target.value });
              }}
            />
            <FormControl fullWidth>
              <InputLabel id="powerFromUnitLabel" sx={inputlabelStyle}>
                From Unit
              </InputLabel>
              <Select
                style={selectStyle1}
                labelId="powerFromUnitLabel"
                value={inputRef.current.Power.fromUnit}
                onChange={(e) => {
                  const value = e.target.value as string;
                  inputRef.current.Power.fromUnit = value;
                  setState({ ...state });
                }}
              >
                <MenuItem value="MW">MW</MenuItem>
                <MenuItem value="kW">kW</MenuItem>
                <MenuItem value="W">W</MenuItem>
                <MenuItem value="mW">mW</MenuItem>
                <MenuItem value="hp">hp</MenuItem>
                <MenuItem value="ps">ps</MenuItem>
                <MenuItem value="J/s">J/s</MenuItem>
                <MenuItem value="ft·lb/s">ft·lb/s</MenuItem>
                <MenuItem value="Btu/s">Btu/s</MenuItem>
                <MenuItem value="cal/h">cal/h</MenuItem>
                {/* Add more units as needed */}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel id="powerToUnitLabel" sx={inputlabelStyle}>
                To Unit
              </InputLabel>
              <Select
                style={selectStyle1}
                labelId="powerToUnitLabel"
                value={inputRef.current.Power.toUnit}
                onChange={(e) => {
                  const value = e.target.value as string;
                  inputRef.current.Power.toUnit = value;
                  setState({ ...state });
                }}
              >
                <MenuItem value="MW">MW</MenuItem>
                <MenuItem value="kW">kW</MenuItem>
                <MenuItem value="W">W</MenuItem>
                <MenuItem value="mW">mW</MenuItem>
                <MenuItem value="hp">hp</MenuItem>
                <MenuItem value="ps">ps</MenuItem>
                <MenuItem value="J/s">J/s</MenuItem>
                <MenuItem value="ft·lb/s">ft·lb/s</MenuItem>
                <MenuItem value="Btu/s">Btu/s</MenuItem>
                <MenuItem value="cal/h">cal/h</MenuItem>
                {/* Add more units as needed */}
              </Select>
            </FormControl>
            <Button
              onClick={(e) => {
                handlePowerConvert();
                saveHistory(
                  "Power",
                  state.power,
                  inputRef.current.Power.fromUnit,
                  inputRef.current.Power.toUnit,
                );
              }}
            >
              Convert
            </Button>
            <p>Result: {state.powerResult}</p>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

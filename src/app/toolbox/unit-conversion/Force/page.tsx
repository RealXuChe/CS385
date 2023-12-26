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
    force: "",
    forceResult: 0,
  });

  const inputRef = useRef({
    Force: { fromUnit: "", toUnit: "" },
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
  const handleForceConvert = () => {
    const { fromUnit, toUnit } = inputRef.current.Force;
    const result = UnitConverter.convertForce(
      parseFloat(state.force),
      fromUnit,
      toUnit,
    );
    setState({ ...state, forceResult: result });
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
      inputRef.current.Force.fromUnit = sysval[1];
      inputRef.current.Force.toUnit = sysval[2];
      handleForceConvert();
    }
  }, []);

  return (
    <div style={containerStyle}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper sx={paperStyle}>
            <h2 style={{ marginBottom: "4px" }}>Force</h2>
            <TextField
              style={textfieldStyle}
              label="value"
              value={state.force}
              onChange={(e) => {
                setState({ ...state, force: e.target.value });
              }}
            />
            <FormControl fullWidth>
              <InputLabel id="forceFromUnitLabel" sx={inputlabelStyle}>
                From Unit
              </InputLabel>
              <Select
                style={selectStyle1}
                labelId="forceFromUnitLabel"
                value={inputRef.current.Force.fromUnit}
                onChange={(e) => {
                  const value = e.target.value as string;
                  inputRef.current.Force.fromUnit = value;
                  setState({ ...state });
                }}
              >
                <MenuItem value="nN">nN</MenuItem>
                <MenuItem value="µN">µN</MenuItem>
                <MenuItem value="mN">mN</MenuItem>
                <MenuItem value="N">N</MenuItem>
                <MenuItem value="kN">kN</MenuItem>
                <MenuItem value="MN">MN</MenuItem>
                <MenuItem value="GN">GN</MenuItem>
                <MenuItem value="dyn">dyn</MenuItem>
                <MenuItem value="pdl">pdl</MenuItem>
                <MenuItem value="Pa/m²">Pa/m²</MenuItem>
                <MenuItem value="kp">kp</MenuItem>
                <MenuItem value="sn">sn</MenuItem>
                <MenuItem value="kipf">kipf</MenuItem>
                <MenuItem value="kgf">kgf</MenuItem>
                <MenuItem value="tnf">tnf</MenuItem>
                <MenuItem value="lbf">lbf</MenuItem>
                <MenuItem value="stnf">stnf</MenuItem>
                <MenuItem value="ltnf">ltnf</MenuItem>
                <MenuItem value="ozf">ozf</MenuItem>
                <MenuItem value="mGf">mGf</MenuItem>
                <MenuItem value="Gf">Gf</MenuItem>
                {/* Add more units as needed */}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel id="powerToUnitLabel" sx={inputlabelStyle}>
                To Unit
              </InputLabel>
              <Select
                style={selectStyle1}
                labelId="forcetoUnitLabel"
                value={inputRef.current.Force.toUnit}
                onChange={(e) => {
                  const value = e.target.value as string;
                  inputRef.current.Force.toUnit = value;
                  setState({ ...state });
                }}
              >
                <MenuItem value="nN">nN</MenuItem>
                <MenuItem value="µN">µN</MenuItem>
                <MenuItem value="mN">mN</MenuItem>
                <MenuItem value="N">N</MenuItem>
                <MenuItem value="kN">kN</MenuItem>
                <MenuItem value="MN">MN</MenuItem>
                <MenuItem value="GN">GN</MenuItem>
                <MenuItem value="dyn">dyn</MenuItem>
                <MenuItem value="pdl">pdl</MenuItem>
                <MenuItem value="Pa/m²">Pa/m²</MenuItem>
                <MenuItem value="kp">kp</MenuItem>
                <MenuItem value="sn">sn</MenuItem>
                <MenuItem value="kipf">kipf</MenuItem>
                <MenuItem value="kgf">kgf</MenuItem>
                <MenuItem value="tnf">tnf</MenuItem>
                <MenuItem value="lbf">lbf</MenuItem>
                <MenuItem value="stnf">stnf</MenuItem>
                <MenuItem value="ltnf">ltnf</MenuItem>
                <MenuItem value="ozf">ozf</MenuItem>
                <MenuItem value="mGf">mGf</MenuItem>
                <MenuItem value="Gf">Gf</MenuItem>
                {/* Add more units as needed */}
              </Select>
            </FormControl>
            <Button
              onClick={(e) => {
                handleForceConvert();
                saveHistory(
                  "Force",
                  state.force,
                  inputRef.current.Force.fromUnit,
                  inputRef.current.Force.toUnit,
                );
              }}
            >
              Convert
            </Button>
            <p>Result: {state.forceResult}</p>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

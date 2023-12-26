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
    size: "",
    fileSizeResult: 0,
  });

  const inputRef = useRef({
    fileSize: { fromUnit: "", toUnit: "" },
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

  const handleFileSizeConvert = () => {
    const { fromUnit, toUnit } = inputRef.current.fileSize;
    const result = UnitConverter.convertFileSize(
      parseFloat(state.size),
      fromUnit,
      toUnit,
    );
    setState({ ...state, fileSizeResult: result });
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
      inputRef.current.fileSize.fromUnit = sysval[1];
      inputRef.current.fileSize.toUnit = sysval[2];
      handleFileSizeConvert();
    }
  }, []);

  return (
    <div style={containerStyle}>
      <Grid container spacing={3}>
        {/* File Size Conversion */}
        <Grid item xs={12} md={4}>
          <Paper sx={paperStyle}>
            <h2 style={{ marginBottom: "4px" }}>File Storage</h2>
            <TextField
              style={textfieldStyle}
              label="Size"
              value={state.size}
              onChange={(e) => {
                setState({ ...state, size: e.target.value });
              }}
            />
            <FormControl fullWidth>
              <InputLabel id="fromUnitLabelFile" sx={inputlabelStyle}>
                From Unit
              </InputLabel>
              <Select
                style={selectStyle1}
                labelId="fromUnitLabelFile"
                value={inputRef.current.fileSize.fromUnit}
                onChange={(e) => {
                  const value = e.target.value as string;
                  inputRef.current.fileSize.fromUnit = value;
                  setState({ ...state });
                }}
              >
                <MenuItem value="Sector">Sector</MenuItem>
                <MenuItem value="Cluster">Cluster</MenuItem>
                <MenuItem value="Block">Block</MenuItem>
                <MenuItem value="AllocationUnit">AllocationUnit</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="toUnitLabelFile" sx={inputlabelStyle}>
                To Unit
              </InputLabel>
              <Select
                labelId="toUnitLabelFile"
                value={inputRef.current.fileSize.toUnit}
                onChange={(e) => {
                  const value = e.target.value as string;
                  inputRef.current.fileSize.toUnit = value;
                  setState({ ...state });
                }}
              >
                <MenuItem value="Sector">Sector</MenuItem>
                <MenuItem value="Cluster">Cluster</MenuItem>
                <MenuItem value="Block">Block</MenuItem>
                <MenuItem value="AllocationUnit">AllocationUnit</MenuItem>
              </Select>
            </FormControl>
            <Button
              onClick={(e) => {
                handleFileSizeConvert();
                saveHistory(
                  "File_System",
                  state.size,
                  inputRef.current.fileSize.fromUnit,
                  inputRef.current.fileSize.toUnit,
                );
              }}
            >
              Convert
            </Button>
            <p>Result: {state.fileSizeResult}</p>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

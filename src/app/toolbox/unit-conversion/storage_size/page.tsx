"use client";
import React, { useState, useRef } from "react";
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
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { UnitConverter } from "@/app/toolbox/unit-conversion/UnitConverter/unitconverter";

export default function UnitConversionTool() {
  const [state, setState] = useState({
    storageSizeResult: "",
  });

  const inputRef = useRef({
    storageSize: { size: 0, fromUnit: "", toUnit: "", unitSystem: "binary" },
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
  const handleUnitSystemChange = (e: { target: { value: String } }) => {
    const value = e.target.value as string;
    inputRef.current.storageSize.unitSystem = value;
    inputRef.current.storageSize.fromUnit = "";
    inputRef.current.storageSize.toUnit = "";
    setState({ ...state, storageSizeResult: "" });
  };
  const handleStorageSizeConvert = () => {
    const { size, fromUnit, toUnit, unitSystem } = inputRef.current.storageSize;
    const result = UnitConverter.convertStorageSize(
      size,
      fromUnit,
      toUnit,
      unitSystem,
    );
    setState({ ...state, storageSizeResult: result });
  };

  return (
    <div style={containerStyle}>
      <Grid container spacing={3}>
        {/* Storage Size Conversion */}
        <Grid item xs={12} md={4}>
          <Paper sx={paperStyle}>
            <h2 style={{ marginBottom: "4px" }}>Storage Size</h2>
            <TextField
              style={textfieldStyle}
              label="Size"
              onChange={(e) =>
                (inputRef.current.storageSize.size =
                  parseFloat(e.target.value) || 0)
              }
            />

            <FormControl component="fieldset" fullWidth>
              <RadioGroup
                row
                aria-label="unit-system"
                name="unit-system"
                value={inputRef.current.storageSize.unitSystem}
                onChange={handleUnitSystemChange}
              >
                <FormControlLabel
                  value="binary"
                  control={<Radio />}
                  label="Binary"
                />
                <FormControlLabel
                  value="decimal"
                  control={<Radio />}
                  label="Decimal"
                />
              </RadioGroup>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel id="fromUnitLabel" sx={inputlabelStyle}>
                From Unit
              </InputLabel>
              {inputRef.current.storageSize.unitSystem === "binary" ? (
                <Select
                  style={selectStyle1}
                  labelId="fromUnitLabel"
                  value={inputRef.current.storageSize.fromUnit}
                  onChange={(e) => {
                    const value = e.target.value as string;
                    inputRef.current.storageSize.fromUnit = value;
                    setState({ ...state });
                  }}
                >
                  <MenuItem value="B">B</MenuItem>
                  <MenuItem value="KiB">KiB</MenuItem>
                  <MenuItem value="MiB">MiB</MenuItem>
                  <MenuItem value="GiB">GiB</MenuItem>
                  <MenuItem value="TiB">TiB</MenuItem>
                  <MenuItem value="PiB">PiB</MenuItem>
                  <MenuItem value="EiB">EiB</MenuItem>
                </Select>
              ) : (
                <Select
                  style={selectStyle1}
                  labelId="fromUnitLabel"
                  value={inputRef.current.storageSize.fromUnit}
                  onChange={(e) => {
                    const value = e.target.value as string;
                    inputRef.current.storageSize.fromUnit = value;
                    setState({ ...state });
                  }}
                >
                  <MenuItem value="B">B</MenuItem>
                  <MenuItem value="KB">KB</MenuItem>
                  <MenuItem value="MB">MB</MenuItem>
                  <MenuItem value="GB">GB</MenuItem>
                  <MenuItem value="TB">TB</MenuItem>
                  <MenuItem value="PB">PB</MenuItem>
                  <MenuItem value="EB">EB</MenuItem>
                </Select>
              )}
            </FormControl>

            <FormControl fullWidth>
              <InputLabel id="toUnitLabel" sx={inputlabelStyle}>
                To Unit
              </InputLabel>
              {inputRef.current.storageSize.unitSystem === "binary" ? (
                <Select
                  style={selectStyle1}
                  labelId="fromUnitLabel"
                  value={inputRef.current.storageSize.toUnit}
                  onChange={(e) => {
                    const value = e.target.value as string;
                    inputRef.current.storageSize.toUnit = value;
                    setState({ ...state });
                  }}
                >
                  <MenuItem value="B">B</MenuItem>
                  <MenuItem value="KiB">KiB</MenuItem>
                  <MenuItem value="MiB">MiB</MenuItem>
                  <MenuItem value="GiB">GiB</MenuItem>
                  <MenuItem value="TiB">TiB</MenuItem>
                  <MenuItem value="PiB">PiB</MenuItem>
                  <MenuItem value="EiB">EiB</MenuItem>
                </Select>
              ) : (
                <Select
                  style={selectStyle1}
                  labelId="fromUnitLabel"
                  value={inputRef.current.storageSize.toUnit}
                  onChange={(e) => {
                    const value = e.target.value as string;
                    inputRef.current.storageSize.toUnit = value;
                    setState({ ...state });
                  }}
                >
                  <MenuItem value="B">B</MenuItem>
                  <MenuItem value="KB">KB</MenuItem>
                  <MenuItem value="MB">MB</MenuItem>
                  <MenuItem value="GB">GB</MenuItem>
                  <MenuItem value="TB">TB</MenuItem>
                  <MenuItem value="PB">PB</MenuItem>
                  <MenuItem value="EB">EB</MenuItem>
                </Select>
              )}
            </FormControl>
            <Button onClick={handleStorageSizeConvert}>Convert</Button>
            <p>Result: {state.storageSizeResult}</p>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

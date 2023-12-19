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
import { UnitConverter } from "@/app/toolbox/unit-conversion/UnitConverter/unitconverter";

export default function UnitConversionTool() {
  const [state, setState] = useState({
    forceResult: 0,
  });

  const inputRef = useRef({
    Force: { force: 0, fromUnit: "", toUnit: "" },
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
    const { force, fromUnit, toUnit } = inputRef.current.Force;
    const result = UnitConverter.convertForce(force, fromUnit, toUnit);
    setState({ ...state, forceResult: result });
  };

  return (
    <div style={containerStyle}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper sx={paperStyle}>
            <h2 style={{ marginBottom: "4px" }}>Force</h2>
            <TextField
              style={textfieldStyle}
              label="value"
              onChange={(e) =>
                (inputRef.current.Force.force = parseFloat(e.target.value) || 0)
              }
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
            <Button onClick={handleForceConvert}>Convert</Button>
            <p>Result: {state.forceResult}</p>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

"use client";
import React, { useEffect, useState } from "react";
import { Button, Grid, IconButton } from "@mui/material";
import StorageIcon from "@mui/icons-material/Storage";
import VibrationIcon from "@mui/icons-material/Vibration";
import DescriptionIcon from "@mui/icons-material/Description";
import NetworkWifi3BarIcon from "@mui/icons-material/NetworkWifi3Bar";
import Battery0BarIcon from "@mui/icons-material/Battery0Bar";
import ElectricMeterIcon from "@mui/icons-material/ElectricMeter";
import BlurLinearIcon from "@mui/icons-material/BlurLinear";
import StreamIcon from "@mui/icons-material/Stream";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import ModelTrainingIcon from "@mui/icons-material/ModelTraining";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Link from "next/link";

const IconNavigation = () => {
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const history = queryParams.get("history");
    if (history != null) {
      const sys = history.split(",");
      console.log(" :", history);
      window.location.href = `/toolbox/unit-conversion/${sys[0]}?history=${history}`;
    }
  }, []);

  const buttonStyle = {
    width: "100%",
    height: "100%",
    fontSize: "24px",
    flexDirection: "column",
    gap: 0.6,
    "&:hover": {
      backgroundColor: "#000080",
    },
  };
  const divStyle = {
    display: "flex",
    justifyContent: "center",
    padding: "16px",
  };

  return (
    <div style={divStyle}>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={6} sm={3}>
          <Link href="/toolbox/unit-conversion/storage_size">
            <Button
              startIcon={<StorageIcon style={{ fontSize: "100" }} />}
              variant="outlined"
              sx={buttonStyle}
            >
              Data Storage
            </Button>
          </Link>
        </Grid>

        <Grid item xs={6} sm={3}>
          <Link href="/toolbox/unit-conversion/Frequency">
            <Button
              startIcon={<VibrationIcon style={{ fontSize: "90" }} />}
              variant="outlined"
              sx={buttonStyle}
            >
              Frequency
            </Button>
          </Link>
        </Grid>

        <Grid item xs={6} sm={3}>
          <Link href="/toolbox/unit-conversion/File_System">
            <Button
              startIcon={<DescriptionIcon style={{ fontSize: "90" }} />}
              variant="outlined"
              sx={buttonStyle}
            >
              File System
            </Button>
          </Link>
        </Grid>

        <Grid item xs={6} sm={3}>
          <Link href="/toolbox/unit-conversion/Broadband">
            <Button
              startIcon={<NetworkWifi3BarIcon style={{ fontSize: "90" }} />}
              variant="outlined"
              sx={buttonStyle}
            >
              Broadband
            </Button>
          </Link>
        </Grid>

        <Grid item xs={6} sm={3}>
          <Link href="/toolbox/unit-conversion/Capacitance">
            <Button
              startIcon={<Battery0BarIcon style={{ fontSize: "90" }} />}
              variant="outlined"
              sx={buttonStyle}
            >
              Capacitance
            </Button>
          </Link>
        </Grid>

        <Grid item xs={6} sm={3}>
          <Link href="/toolbox/unit-conversion/Conductivity">
            <Button
              startIcon={<ElectricMeterIcon style={{ fontSize: "90" }} />}
              variant="outlined"
              sx={buttonStyle}
            >
              Conductivity
            </Button>
          </Link>
        </Grid>

        <Grid item xs={6} sm={3}>
          <Link href="/toolbox/unit-conversion/Inductance">
            <Button
              startIcon={<BlurLinearIcon style={{ fontSize: "90" }} />}
              variant="outlined"
              sx={buttonStyle}
            >
              Inductance
            </Button>
          </Link>
        </Grid>

        <Grid item xs={6} sm={3}>
          <Link href="/toolbox/unit-conversion/Density">
            <Button
              startIcon={<StreamIcon style={{ fontSize: "90" }} />}
              variant="outlined"
              sx={buttonStyle}
            >
              Density
            </Button>
          </Link>
        </Grid>

        <Grid item xs={6} sm={3}>
          <Link href="/toolbox/unit-conversion/Energy">
            <Button
              startIcon={<LocalFireDepartmentIcon style={{ fontSize: "90" }} />}
              variant="outlined"
              sx={buttonStyle}
            >
              Energy
            </Button>
          </Link>
        </Grid>

        <Grid item xs={6} sm={3}>
          <Link href="/toolbox/unit-conversion/Power">
            <Button
              startIcon={<ModelTrainingIcon style={{ fontSize: "90" }} />}
              variant="outlined"
              sx={buttonStyle}
            >
              Power
            </Button>
          </Link>
        </Grid>

        <Grid item xs={6} sm={3}>
          <Link href="/toolbox/unit-conversion/Force">
            <Button
              startIcon={<FitnessCenterIcon style={{ fontSize: "90" }} />}
              variant="outlined"
              sx={buttonStyle}
            >
              Force
            </Button>
          </Link>
        </Grid>

        <Grid item xs={6} sm={3}>
          <Link href="/toolbox/unit-conversion/Time">
            <Button
              startIcon={<AccessTimeIcon style={{ fontSize: "90" }} />}
              variant="outlined"
              sx={buttonStyle}
            >
              Time
            </Button>
          </Link>
        </Grid>
      </Grid>
    </div>
  );
};

export default IconNavigation;

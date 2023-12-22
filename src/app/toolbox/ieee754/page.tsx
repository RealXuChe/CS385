"use client";
import React, { MouseEvent, useState, useEffect } from "react";
import { Grid, Paper, Typography, TextField } from "@mui/material";

require("./IEEE754.css");

export default function Home() {
  const tot = 32;
  const signLen = 1,
    expLen = 8,
    fracLen = 23;
  const bias = (1 << (expLen - 1)) - 1;

  const [signValue, setSignValue] = useState("0".repeat(signLen));
  const [expValues, setExpValues] = useState("0".repeat(expLen));
  const [fracValues, setFracValues] = useState("0".repeat(fracLen));
  const [finalAns, setFinalAns] = useState("0");

  const setNthBox = (nth: number, val: string) => {
    const boxId = `bit-${nth}`;
    const boxElement = document.getElementById(boxId);
    boxElement!.innerText = val;
  };

  const getBoxRange = (l: number, r: number): string => {
    let res = "";
    for (let i = l; i <= r; ++i)
      res += document.getElementById(`bit-${i}`)!.innerText;
    return res;
  };
  const updateThreeParts = () => {
    let updatedSignValue: string = getBoxRange(0, signLen - 1);
    let updatedExpValues: string = getBoxRange(signLen, signLen + expLen - 1);
    let updatedFracValues: string = getBoxRange(
      signLen + expLen,
      signLen + expLen + fracLen - 1,
    );
    setSignValue(updatedSignValue);
    setExpValues(updatedExpValues);
    setFracValues(updatedFracValues);
  };

  const setBoxes = (nowText: string) => {
    const buffer = new ArrayBuffer(4);
    const float32Arr = new Float32Array(buffer);
    const uint32Array = new Uint32Array(buffer);
    float32Arr[0] = parseFloat(nowText);
    const integerValue = uint32Array[0];
    const integerBitsHex = integerValue.toString(16);
    let integerBitsBin = integerValue.toString(2);
    while (integerBitsBin.length < tot) integerBitsBin = "0" + integerBitsBin;
    // console.log(integerValue, integerBitsHex, integerBitsBin);

    for (let i = 0; i < tot; ++i) setNthBox(i, integerBitsBin[i]);
  };

  const handleUserInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    let nowText = event.target.value;
    if (nowText == "") nowText = "0";
    let special = false;
    if (
      nowText.length >= 1 &&
      nowText.at(-1) === "e" &&
      !isNaN(Number(nowText + "0"))
    )
      special = true;
    if (
      nowText.length >= 2 &&
      nowText.at(-2) === "e" &&
      nowText.at(-1) == "-" &&
      !isNaN(Number(nowText + "0"))
    )
      special = true;
    if (!special && isNaN(Number(nowText))) return;

    setFinalAns(nowText);
    setBoxes(nowText);
    updateThreeParts();
  };

  const flipAndUpdate = (event: MouseEvent<HTMLDivElement>) => {
    event.currentTarget.innerText = String(
      1 ^ parseInt(event.currentTarget.innerText),
    );
    updateThreeParts();
    // compute the fp_number and display the final ans
    var str = getBoxRange(0, 31);
    var data = [0, 0, 0, 0];
    for (var i = 0; i < 4; ++i)
      data[i] = parseInt(str.substring(8 * i, 8 * i + 8), 2);
    var view = new DataView(new ArrayBuffer(4));
    data.forEach(function (b, i) {
      view.setUint8(i, b);
    });
    var ans = view.getFloat32(0);
    setFinalAns(String(ans));
  };

  const renderBox = (value: string, index: number, type: string) => (
    <div
      key={index}
      id={`bit-${index}`}
      className={`monospace box ${type} ${value === "1" ? "value-one" : ""}`}
      onClick={flipAndUpdate}
    >
      {value}
    </div>
  );

  const signBox = signValue
    .split("")
    .map((value, index) => renderBox(value, index, "sign"));
  const expBoxes = expValues
    .split("")
    .map((value, index) => renderBox(value, signLen + index, "exponent"));
  const fracBoxes = fracValues
    .split("")
    .map((value, index) =>
      renderBox(value, signLen + expLen + index, "fraction"),
    );

  // for recovering from history...
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const history = queryParams.get("history");
    if (history != null) {
      setFinalAns(history);
      setBoxes(history);
      updateThreeParts();
    }
  }, [setFinalAns, setBoxes, updateThreeParts]);

  // for updating history per 1000ms...
  useEffect(() => {
    const toolName = "ieee754";
    const loopTime = 1000;
    const updateHistory = () => {
      let now: string = finalAns;
      // console.log("checking..." + now);
      let rawInfo = localStorage.getItem(toolName);
      if (rawInfo == null) {
        localStorage.setItem(toolName, JSON.stringify(new Array(now)));
      } else {
        let parsedInfo = JSON.parse(rawInfo);
        let last = parsedInfo[parsedInfo.length - 1];
        if (now != last) {
          parsedInfo.push(now);
          localStorage.setItem(toolName, JSON.stringify(parsedInfo));
        }
      }
    };
    const intervalId = setInterval(updateHistory, loopTime);
    return () => clearInterval(intervalId);
  }, [finalAns]);

  return (
    <div style={{ padding: 20 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper style={{ padding: 20, backgroundColor: "rgb(227, 227, 227)" }}>
            <Typography variant="h6" sx={{ userSelect: "none" }}>
              Bits in memory
            </Typography>
            <div
              style={{
                overflowX: "auto",
                whiteSpace: "nowrap",
                padding: "10px",
                width: "100%",
              }}
            >
              <div
                id="bit-container"
                style={{ margin: "auto", textAlign: "center" }}
              >
                {signBox}
                {expBoxes}
                {fracBoxes}
              </div>
            </div>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper style={{ padding: "20px", backgroundColor: "#eee" }}>
            <Typography variant="subtitle1">Sign bit:</Typography>
            <Paper style={{ padding: "10px", backgroundColor: "#f5f5f5" }}>
              <Typography className="monospace" variant="body1">
                {signValue}
              </Typography>
            </Paper>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper style={{ padding: "20px", backgroundColor: "#eee" }}>
            <Typography variant="subtitle1">Exponent bits:</Typography>
            <Paper style={{ padding: "10px", backgroundColor: "#f5f5f5" }}>
              <Typography className="monospace" variant="body1">
                {expValues}
              </Typography>
            </Paper>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper style={{ padding: "20px", backgroundColor: "#eee" }}>
            <Typography variant="subtitle1">Fraction bits:</Typography>
            <Paper style={{ padding: "10px", backgroundColor: "#f5f5f5" }}>
              <Typography className="monospace" variant="body1">
                {fracValues}
              </Typography>
            </Paper>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            type="text"
            value={finalAns}
            onChange={handleUserInput}
            InputProps={{
              inputProps: { style: { textAlign: "center" } },
            }}
            sx={{
              backgroundColor: "#fff",
              border: "1px solid #ddd",
              borderRadius: "4px",
              padding: "8px",
              "&:hover": {
                backgroundColor: "#f9f9f9",
              },
              "& .Mui-focused": {
                borderColor: "#3f51b5",
              },
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
}

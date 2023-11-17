'use client';
import React, { useEffect, MouseEvent, useRef, useState } from 'react';
import { Button, List, ListItem, ListItemText, TextField } from '@mui/material';

require("./IEEE754.css");

export default function Home() {
  const tot = 32;
  const signLen = 1, expLen = 8, fracLen = 23;
  const bias = (1 << (expLen - 1)) - 1;

  const [signValue, setSignValue] = useState("0".repeat(signLen));
  const [expValues, setExpValues] = useState("0".repeat(expLen));
  const [fracValues, setFracValues] = useState("0".repeat(fracLen));
  const [finalAns, setFinalAns] = useState("0");

  const setNthBox = (nth: number, val: string) => {
    const boxId = `bit-${nth}`;
    const boxElement = document.getElementById(boxId);
    boxElement!.innerText = val;
  }



  const getBoxRange = (l: number, r: number): string => {
    let res = "";
    for (let i = l; i <= r; ++i) res += document.getElementById(`bit-${i}`)!.innerText;
    return res;
  }
  const updateThreeParts = () => {
    let updatedSignValue: string = getBoxRange(0, signLen - 1);
    let updatedExpValues: string = getBoxRange(signLen, signLen + expLen - 1);
    let updatedFracValues: string = getBoxRange(signLen + expLen, signLen + expLen + fracLen - 1);
    setSignValue(updatedSignValue);
    setExpValues(updatedExpValues);
    setFracValues(updatedFracValues);
  }

  const handleUserInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    let nowText = event.target.value;
    if (nowText == "") nowText = "0";
    let special = false;
    if (nowText.length >= 1 && nowText.at(-1) === 'e' && !isNaN(Number(nowText + '0'))) special = true;
    if (nowText.length >= 2 && nowText.at(-2) === 'e' && nowText.at(-1) == '-' && !isNaN(Number(nowText + '0'))) special = true;
    if (!special && isNaN(Number(nowText))) return;

    setFinalAns(nowText);

    const buffer = new ArrayBuffer(4);
    const float32Arr = new Float32Array(buffer);
    const uint32Array = new Uint32Array(buffer);
    float32Arr[0] = parseFloat(nowText);
    const integerValue = uint32Array[0];
    const integerBitsHex = integerValue.toString(16);
    let integerBitsBin = integerValue.toString(2);
    while (integerBitsBin.length < tot) integerBitsBin = "0" + integerBitsBin;
    console.log(integerValue, integerBitsHex, integerBitsBin);

    for (let i = 0; i < tot; ++i) setNthBox(i, integerBitsBin[i]);
    updateThreeParts();
  };

  const flipAndUpdate = (event: MouseEvent<HTMLDivElement>) => {
    event.currentTarget.innerText = String(1 ^ parseInt(event.currentTarget.innerText));


    updateThreeParts();
    // compute the fp_number and display the final ans
    var str = getBoxRange(0, 31);
    var data = [0, 0, 0, 0];
    for (var i = 0; i < 4; ++i)
      data[i] = parseInt(str.substring(8 * i, 8 * i + 8), 2);
    var view = new DataView(new ArrayBuffer(4));
    data.forEach(function (b, i) { view.setUint8(i, b); });
    var ans = view.getFloat32(0);
    setFinalAns(String(ans));
  };


  const signBox = Array.from({ length: signLen }, (_, index) => (
    <div
      key={index}
      id={"bit-" + String(index)}
      className="box sign"
      onClick={flipAndUpdate}
    >
      0
    </div>
  ));
  const expBoxes = Array.from({ length: expLen }, (_, index) => (
    <div
      key={index}
      id={"bit-" + String(signLen + index)}
      className="box exponent"
      onClick={flipAndUpdate}
    >
      0
    </div>
  ));
  const fracBoxes = Array.from({ length: fracLen }, (_, index) => (
    <div
      key={index}
      id={"bit-" + String(signLen + expLen + index)}
      className="box fraction"
      onClick={flipAndUpdate}
    >
      0
    </div>
  ));

  return (
    <div className="justdiv">
      <div id="bit-container">
        {signBox}{expBoxes}{fracBoxes}
      </div>

      <hr />

      <div id="binValue-container">
        Sign bit:&nbsp;
        <div id="signV" className="binValue">{signValue}</div>
        <br />
        Exponent bits:&nbsp;
        <div id="expV" className="binValue">{expValues}</div>
        <br />
        Fraction bits:&nbsp;
        <div id="fracV" className="binValue">{fracValues}</div>
      </div>

      <hr />

      <div id="ans-container">
        Final value:&nbsp;
        <TextField type="text" id="ans" value={finalAns} onChange={handleUserInput} />
      </div>
    </div>
  );
}
"use client";
import { Button, TextField } from "@mui/material";
import { useRef, useState, useEffect } from "react";
import QRCode from "qrcode.react";
import Image from "next/image";

export default function Home() {
  const toolName = "QR-Code";
  const [text, setText] = useState("");
  const [inputText, setInputText] = useState("");
  const [showQRCode, setShowQRCode] = useState(false);
  const qrCodeRef = useRef(null);

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
  const saveHistory = (text: string) => {
    let rawInfo = localStorage.getItem(toolName);
    if (rawInfo == null) {
      let newInfo = {
        query: [text],
        time: [formatDate(new Date())],
      };
      let newInfoStr = JSON.stringify(newInfo);
      localStorage.setItem(toolName, newInfoStr);
    } else {
      let parsedInfo = JSON.parse(rawInfo);
      let queries = parsedInfo["query"];
      let times = parsedInfo["time"];
      let nowQuery = text;
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

  const qrCodeGenerate = () => {
    setInputText(text);
    saveHistory(text);
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const history = queryParams.get("history");
    if (history != null) {
      setText(history);
      setShowQRCode(true);
      setInputText(history);
    }
  }, []);

  return (
    <div className={"column"}>
      <div className="flex justify-center p-8">
        <TextField
          label={"Input"}
          value={text}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setText(event.target.value);
          }}
        />
        <Button
          onClick={() => {
            setShowQRCode(true);
            qrCodeGenerate();
          }}
        >
          Generate QR Code
        </Button>
      </div>
      <div className="flex justify-center p-8">
        {showQRCode && (
          <div ref={qrCodeRef}>
            {/* eslint-disable-next-line react/jsx-no-undef */}
            <QRCode value={inputText} />
          </div>
        )}
        {!showQRCode && (
          <div className="flex justify-center p-8" style={{ padding: 0 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <Image
              alt="QRCodeLogo"
              src="/icon-QRcode.svg"
              width={128}
              height={128}
            />
          </div>
        )}
        <div className="flex justify-center p-8">
          <Button
            onClick={() => {
              if (qrCodeRef.current) {
                // @ts-ignore
                const canvas = qrCodeRef.current.querySelector("canvas");
                const link = document.createElement("a");
                link.href = canvas.toDataURL("image/png");
                link.download = "qrcode.png";
                link.click();
              }
            }}
            disabled={!showQRCode}
          >
            Download
          </Button>
        </div>
      </div>
    </div>
  );
}

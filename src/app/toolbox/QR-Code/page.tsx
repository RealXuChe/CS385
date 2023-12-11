"use client";
import { Button, TextField } from "@mui/material";
import { useRef, useState } from "react";
import QRCode from "qrcode.react";
import Image from "next/image";

export default function Home() {
  const [text, setText] = useState("");
  const [showQRCode, setShowQRCode] = useState(false);
  const qrCodeRef = useRef(null);
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
          }}
        >
          Generate QR Code
        </Button>
      </div>
      <div className="flex justify-center p-8">
        {showQRCode && (
          <div ref={qrCodeRef}>
            {/* eslint-disable-next-line react/jsx-no-undef */}
            <QRCode value={text} />
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

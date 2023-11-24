'use client';
import {Button, TextField} from "@mui/material";
import {useRef, useState} from "react";
import QRCode from "qrcode.react";

export default function Home() {
    const [text, setText] = useState('');
    const [showQRCode, setShowQRCode] = useState(false);
    const qrCodeRef = useRef(null);
    return (
        <div className={"column"}>
            <div className="flex justify-center p-8">
                <TextField label={"Input"} value={text} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setText(event.target.value);
                }}/>
                <Button onClick={() => {
                    setShowQRCode(true);
                }
                }>Generate QR Code</Button>

            </div>
            <div className="flex justify-center p-8">
                {showQRCode && <div ref={qrCodeRef}>
                    {/* eslint-disable-next-line react/jsx-no-undef */}
                    <QRCode value={text} />
                </div>}
                <div className="flex justify-center p-8">
                    {showQRCode && (
                        <Button onClick={() => {
                            if (qrCodeRef.current) {
                                // @ts-ignore
                                const canvas = qrCodeRef.current.querySelector('canvas');
                                const link = document.createElement('a');
                                link.href = canvas.toDataURL('image/png');
                                link.download = 'qrcode.png';
                                link.click();
                            }
                        }}>Download</Button>
                    )}
                </div>
            </div>
        </div>
    );
}
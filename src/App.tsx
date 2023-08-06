import React, { useEffect, useState } from "react";
import {
    convertTextTo16Bit,
    convert8BitToAscii,
    convertAsciiToBase64,
    convertBase64ToAscii,
    convertAsciiToUtf16,
} from "./util";

interface ITextarea {
    title: string;
    value: string;
    type?: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

function Textarea({ title, value, type, onChange }: ITextarea) {
    return (
        <>
            <h3>{title}</h3>
            <textarea
                style={
                    type !== "main"
                        ? { width: "800px", height: "50px" }
                        : { width: "800px", height: "100px" }
                }
                value={value}
                onChange={onChange}
            />
        </>
    );
}

function App() {
    const [mainText, setText] = useState<string>("");
    const [textToBit, setTextToBits] = useState<string>("");
    const [eightBitToAscii, setEightBitToAscii] = useState<string>("");
    const [asciiToBase64, setAsciiToBase64] = useState<string>("");
    const [base64ToAscii, setBase64ToAscii] = useState<string>("");
    const [asciiToUtf16, setAsciiToUtf16] = useState<string>("");

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);
    };

    useEffect(() => {
        // bits
        const dataTextTobit = convertTextTo16Bit(mainText);
        setTextToBits(dataTextTobit);
        // bits → ASCII
        const dataBitsToAscii = convert8BitToAscii(dataTextTobit);
        setEightBitToAscii(dataBitsToAscii);
        // ASCII → Base64
        const dataAsciiToBase64 = convertAsciiToBase64(dataBitsToAscii);
        setAsciiToBase64(dataAsciiToBase64);
        // Base64 → ASCII
        const dataBase64ToAscii = convertBase64ToAscii(dataAsciiToBase64);
        setBase64ToAscii(dataBase64ToAscii);
        // ASCII → UTF-16
        const dataAsciiToUtf16 = convertAsciiToUtf16(dataBase64ToAscii);
        setAsciiToUtf16(dataAsciiToUtf16);
    }, [mainText]);

    return (
        <div className="App">
            <h1>Text Encoding</h1>
            <Textarea
                type="main"
                title={"입력"}
                value={mainText}
                onChange={handleChange}
            />

            <Textarea
                title={"bits"}
                value={textToBit}
                onChange={handleChange}
            />
            <Textarea
                title={"인코드 : bits → ASCII"}
                value={eightBitToAscii}
                onChange={handleChange}
            />
            <Textarea
                title={"인코드 : ASCII → Base64"}
                value={asciiToBase64}
                onChange={handleChange}
            />
            <Textarea
                title={"디코드 : Base64 → ASCII"}
                value={base64ToAscii}
                onChange={handleChange}
            />
            <Textarea
                title={"디코드 : ASCII → UTF-16"}
                value={asciiToUtf16}
                onChange={handleChange}
            />
        </div>
    );
}

export default App;

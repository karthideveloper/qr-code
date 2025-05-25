import React, { useEffect, useRef, useState } from "react";
import QRCodeStyling from "qr-code-styling";
import * as htmlToImage from "html-to-image";
import { ChromePicker } from "react-color";

const CustomQRCodeGenerator = () => {
  const [text, setText] = useState("https://example.com");
  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [eyeColor, setEyeColor] = useState("#000000");
  const [logoUrl, setLogoUrl] = useState("");
  const [theme, setTheme] = useState("light");
  const [format, setFormat] = useState("png");
  const [dotStyle, setDotStyle] = useState("square");
  const [eyeStyle, setEyeStyle] = useState("square");
  const [qrSize, setQrSize] = useState(256);
  const [errorCorrectionLevel, setErrorCorrectionLevel] = useState("M");

  const qrRef = useRef(null);
  const qrPreviewRef = useRef(null);
  const qrCode = useRef(null);

  useEffect(() => {
    const gradient = {
      type: "linear",
      rotation: 45,
      colorStops: [
        { offset: 0, color: fgColor },
        { offset: 1, color: "#ff007f" },
      ],
    };

    if (!qrCode.current) {
      qrCode.current = new QRCodeStyling({
        width: qrSize,
        height: qrSize,
        data: text,
        image: logoUrl || "",
        dotsOptions: {
          gradient,
          type: dotStyle,
        },
        cornersSquareOptions: {
          type: eyeStyle,
          color: eyeColor,
        },
        cornersDotOptions: {
          color: eyeColor,
        },
        backgroundOptions: {
          color: bgColor,
        },
        imageOptions: {
          crossOrigin: "anonymous",
          margin: 10,
          hideBackgroundDots: true,
        },
        qrOptions: {
          errorCorrectionLevel,
        },
      });
    } else {
      qrCode.current.update({
        width: qrSize,
        height: qrSize,
        data: text,
        image: logoUrl || "",
        dotsOptions: {
          gradient,
          type: dotStyle,
        },
        cornersSquareOptions: {
          type: eyeStyle,
          color: eyeColor,
        },
        cornersDotOptions: {
          color: eyeColor,
        },
        backgroundOptions: {
          color: bgColor,
        },
        imageOptions: {
          margin: 10,
          hideBackgroundDots: true,
        },
        qrOptions: {
          errorCorrectionLevel,
        },
      });
    }

    if (qrRef.current) {
      qrRef.current.innerHTML = "";
      qrCode.current.append(qrRef.current);
    }

    if (qrPreviewRef.current) {
      qrPreviewRef.current.innerHTML = "";
      qrCode.current.append(qrPreviewRef.current);
    }
  }, [
    text,
    fgColor,
    bgColor,
    logoUrl,
    dotStyle,
    eyeStyle,
    qrSize,
    errorCorrectionLevel,
    eyeColor,
  ]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setText(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setLogoUrl(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const downloadQRCode = () => {
    if (!qrRef.current) return;
    qrCode.current.download({ extension: format });
  };

  const isDark = theme === "dark";

  return (
    <div
      style={{
        padding: 20,
        background: isDark ? "#121212" : "#f9f9f9",
        color: isDark ? "#f0f0f0" : "#000",
        minHeight: "100vh",
        fontFamily: "sans-serif",
      }}
    >
      <h2 style={{ textAlign: "center" }}>Custom QR Code Generator</h2>

      <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
        <div style={{ flex: "1 1 400px" }}>
          <label>Enter Text / URL:</label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={{ width: "100%", padding: 8, marginBottom: 20 }}
          />

          <label>Upload File (auto-generate QR):</label>
          <input
            type="file"
            accept="image/*,.txt,.pdf"
            onChange={handleImageUpload}
          />

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 20,
              marginTop: 20,
            }}
          >
            <div>
              <label>Foreground Gradient Start Color:</label>
              <ChromePicker
                color={fgColor}
                onChangeComplete={(color) => setFgColor(color.hex)}
              />
            </div>
            <div>
              <label>Background Color:</label>
              <ChromePicker
                color={bgColor}
                onChangeComplete={(color) => setBgColor(color.hex)}
              />
            </div>
            <div>
              <label>Eye Color:</label>
              <ChromePicker
                color={eyeColor}
                onChangeComplete={(color) => setEyeColor(color.hex)}
              />
            </div>
          </div>

          <div style={{ marginTop: 20 }}>
            <label>Upload Logo:</label>
            <input type="file" accept="image/*" onChange={handleLogoUpload} />
          </div>

          <div style={{ marginTop: 20 }}>
            <label>QR Code Size: {qrSize}px</label>
            <input
              type="range"
              min="128"
              max="512"
              value={qrSize}
              onChange={(e) => setQrSize(parseInt(e.target.value))}
              style={{ width: "100%" }}
            />
          </div>

          <div style={{ marginTop: 20 }}>
            <label>Dot Shape:</label>
            <select
              value={dotStyle}
              onChange={(e) => setDotStyle(e.target.value)}
            >
              <option value="square">Square</option>
              <option value="dots">Dots</option>
              <option value="rounded">Rounded</option>
              <option value="extra-rounded">Extra Rounded</option>
              <option value="classy">Classy</option>
            </select>

            <label style={{ marginLeft: 20 }}>Eye Shape:</label>
            <select
              value={eyeStyle}
              onChange={(e) => setEyeStyle(e.target.value)}
            >
              <option value="square">Square</option>
              <option value="circle">Circle</option>
              <option value="extra-rounded">Extra Rounded</option>
              <option value="classy">Classy</option>
              <option value="rounded">Rounded</option>
            </select>
          </div>

          <div style={{ marginTop: 20 }}>
            <label>Error Correction Level:</label>
            <select
              value={errorCorrectionLevel}
              onChange={(e) => setErrorCorrectionLevel(e.target.value)}
            >
              <option value="L">L (Low)</option>
              <option value="M">M (Medium)</option>
              <option value="Q">Q (Quartile)</option>
              <option value="H">H (High)</option>
            </select>

            <label style={{ marginLeft: 20 }}>Theme:</label>
            <select value={theme} onChange={(e) => setTheme(e.target.value)}>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>

            <label style={{ marginLeft: 20 }}>Format:</label>
            <select value={format} onChange={(e) => setFormat(e.target.value)}>
              <option value="png">PNG</option>
              <option value="jpeg">JPEG</option>
              <option value="svg">SVG</option>
            </select>
          </div>
        </div>

        <div style={{ flex: "1 1 300px", textAlign: "center" }}>
          <div
            style={{
              marginTop: 100,
              border: "2px dashed #ccc",
              padding: 20,
              textAlign: "center",
              background: "#fff",
              animation: "pulse 2s infinite",
            }}
          >
            <p>Scan this QR with your camera</p>
            <div
              ref={qrPreviewRef}
              style={{
                width: qrSize,
                height: qrSize,
                margin: "0 auto",
                transition: "all 0.3s ease",
              }}
            />
          </div>

          <div style={{ marginTop: 30 }}>
            <button
              onClick={downloadQRCode}
              style={{
                padding: "10px 20px",
                background: "#007bff",
                color: "#fff",
                border: "none",
                borderRadius: 5,
                cursor: "pointer",
              }}
            >
              Download QR Code
            </button>
          </div>
          <div
            ref={qrRef}
            style={{
              width: qrSize,
              height: qrSize,
              margin: "0 auto",
              transition: "all 0.3s ease",
            }}
          />
        </div>
      </div>

      <style>
        {`
          @keyframes pulse {
            0% { box-shadow: 0 0 0 0 rgba(0,0,0,0.2); }
            70% { box-shadow: 0 0 0 10px rgba(0,0,0,0); }
            100% { box-shadow: 0 0 0 0 rgba(0,0,0,0); }
          }

          @media (max-width: 600px) {
            input, select, button { width: 100%; margin-top: 10px; }
            .chrome-picker { width: 100% !important; }
          }
        `}
      </style>
    </div>
  );
};

export default CustomQRCodeGenerator;

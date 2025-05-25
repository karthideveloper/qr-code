import React, { useEffect, useRef, useState } from "react";
import QRCodeStyling from "qr-code-styling";
import * as htmlToImage from "html-to-image";
import { ChromePicker } from "react-color";
import {
  Box,
  Grid,
  Typography,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  Button,
  FormControl,
} from "@mui/material";

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
    <Box
      sx={{
        p: 3,
        backgroundColor: isDark ? "#121212" : "#f9f9f9",
        color: isDark ? "#fff" : "#000",
        minHeight: "100vh",
      }}
    >
      <Typography variant="h4" textAlign="center" gutterBottom>
        Custom QR Code Generator
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Enter Text / URL"
            value={text}
            onChange={(e) => setText(e.target.value)}
            margin="normal"
          />

          <Box mt={2}>
            <InputLabel>Upload File (auto-generate QR):</InputLabel>
            <input
              type="file"
              accept="image/*,.txt,.pdf"
              onChange={handleImageUpload}
            />
          </Box>

          <Grid container spacing={2} mt={2}>
            <Grid item xs={12} sm={4}>
              <InputLabel>Foreground Gradient</InputLabel>
              <ChromePicker
                color={fgColor}
                onChangeComplete={(c) => setFgColor(c.hex)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <InputLabel>Background</InputLabel>
              <ChromePicker
                color={bgColor}
                onChangeComplete={(c) => setBgColor(c.hex)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <InputLabel>Eye Color</InputLabel>
              <ChromePicker
                color={eyeColor}
                onChangeComplete={(c) => setEyeColor(c.hex)}
              />
            </Grid>
          </Grid>

          <Box mt={2}>
            <InputLabel>Upload Logo:</InputLabel>
            <input type="file" accept="image/*" onChange={handleLogoUpload} />
          </Box>

          <Box mt={2}>
            <Typography gutterBottom>QR Size: {qrSize}px</Typography>
            <input
              type="range"
              min="128"
              max="512"
              value={qrSize}
              onChange={(e) => setQrSize(Number(e.target.value))}
              style={{ width: "100%" }}
            />
          </Box>

          <Grid container spacing={2} mt={1}>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Dot Style</InputLabel>
                <Select
                  value={dotStyle}
                  onChange={(e) => setDotStyle(e.target.value)}
                >
                  <MenuItem value="square">Square</MenuItem>
                  <MenuItem value="dots">Dots</MenuItem>
                  <MenuItem value="rounded">Rounded</MenuItem>
                  <MenuItem value="extra-rounded">Extra Rounded</MenuItem>
                  <MenuItem value="classy">Classy</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Eye Style</InputLabel>
                <Select
                  value={eyeStyle}
                  onChange={(e) => setEyeStyle(e.target.value)}
                >
                  <MenuItem value="square">Square</MenuItem>
                  <MenuItem value="circle">Circle</MenuItem>
                  <MenuItem value="extra-rounded">Extra Rounded</MenuItem>
                  <MenuItem value="classy">Classy</MenuItem>
                  <MenuItem value="rounded">Rounded</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Grid container spacing={2} mt={1}>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel>Error Level</InputLabel>
                <Select
                  value={errorCorrectionLevel}
                  onChange={(e) => setErrorCorrectionLevel(e.target.value)}
                >
                  <MenuItem value="L">L</MenuItem>
                  <MenuItem value="M">M</MenuItem>
                  <MenuItem value="Q">Q</MenuItem>
                  <MenuItem value="H">H</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel>Theme</InputLabel>
                <Select
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                >
                  <MenuItem value="light">Light</MenuItem>
                  <MenuItem value="dark">Dark</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel>Format</InputLabel>
                <Select
                  value={format}
                  onChange={(e) => setFormat(e.target.value)}
                >
                  <MenuItem value="png">PNG</MenuItem>
                  <MenuItem value="jpeg">JPEG</MenuItem>
                  <MenuItem value="svg">SVG</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} md={6} textAlign="center">
          <Typography variant="body1" mb={1}>
            Scan this QR Code
          </Typography>
          <Box
            ref={qrPreviewRef}
            sx={{
              width: qrSize,
              height: qrSize,
              mx: "auto",
              background: "#fff",
              p: 2,
              borderRadius: 2,
              boxShadow: 3,
            }}
          />
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 3 }}
            onClick={downloadQRCode}
          >
            Download QR Code
          </Button>
          <Box ref={qrRef} sx={{ display: "none" }} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default CustomQRCodeGenerator;

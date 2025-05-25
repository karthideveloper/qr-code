# 🎨 Custom QR Code Generator

A fully customizable QR code generator built with React. Users can tweak colors, add logos, set shapes, themes, error correction levels, and download the generated QR code in PNG, JPEG, or SVG formats.

---

## 🔧 Features

- ✅ Enter custom text or upload a file to generate QR data
- 🎨 Foreground gradient, background, and eye color pickers (via `react-color`)
- 🟦 Add a logo/image at the center of the QR code
- 🔲 Customize dot and eye styles
- 📏 Adjustable QR size
- 🛠️ Set error correction levels (L, M, Q, H)
- 🌗 Light/Dark theme toggle
- 📸 Preview area with animation
- 💾 Download as PNG, JPEG, or SVG
- 📱 Fully responsive UI (mobile & desktop)

---

## 📦 Tech Stack

- **React** (frontend library)
- **qr-code-styling** for dynamic QR code generation
- **html-to-image** for image manipulation
- **react-color (ChromePicker)** for color input
- **Vite / Create React App** (choose based on your setup)

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/karthideveloper/qr-code.git
cd custom-qr-code

📝 TODO
Add history and saved QR presets

Support animated QR styles

Add dark mode toggle on UI

Add unit tests for QR logic

💡 Tips
Keep logos under 25% of QR size for better scanning reliability.

Use high error correction levels (H) when adding logos.

Use SVG format for vector-based QR if you want to scale without quality loss.

🧾 License
This project is licensed under the MIT License.

👨‍💻 Author
Developed by Karthikeyak kathirvel

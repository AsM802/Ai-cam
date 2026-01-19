# Traffic Violation Detection App

A React Native mobile application for detecting traffic violations using on-device AI. The app can be mounted on helmets, car dashboards, or used handheld to capture traffic violations including helmet violations and license plate recognition.

## Features

- 📸 **Real-time Camera Detection** - Live camera feed with AI-powered violation detection
- 🎯 **Helmet Detection** - Identifies riders without helmets
- 🚗 **License Plate Recognition** - OCR for capturing vehicle plates (coming soon)
- 📍 **GPS Tagging** - Automatic location data for all captures
- 💾 **Local Storage** - Save violations with metadata
- 🖼️ **Gallery View** - Browse and manage captured violations
- ⚙️ **Settings** - Customize detection and capture settings

## Tech Stack

- **Framework**: React Native with Expo
- **Navigation**: React Navigation
- **Camera**: Expo Camera
- **Storage**: Expo Media Library
- **Location**: Expo Location
- **AI/ML**: Simulated detection (ready for TensorFlow Lite integration)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/AsM802/Ai-cam.git
cd traffic-violation-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Run on your device:
   - Install **Expo Go** app on your Android/iOS device
   - Scan the QR code from the terminal
   - Or run `npm run android` / `npm run ios` for emulator

## Usage

1. **Camera Screen**: 
   - Point camera at traffic
   - Detection runs automatically
   - Tap capture button to save violations
   - Tap video button to record

2. **Gallery Screen**:
   - View all captured violations
   - Long press to delete items
   - Filter by date and type

3. **Settings Screen**:
   - Toggle auto-capture
   - Enable/disable sound alerts
   - Adjust quality settings
   - Manage GPS tagging

## Permissions Required

- Camera access
- Media library (storage)
- Location services

## Development Status

**Current Version**: 1.0.0 (Prototype)

✅ Completed:
- Basic app structure
- Camera integration
- Detection overlay UI
- Gallery and settings screens
- Navigation setup

🚧 In Progress:
- Real ML model integration (YOLOv8)
- License plate OCR
- Cloud sync capabilities
- Advanced filtering

## Future Enhancements

- [ ] Integrate real YOLOv8 TFLite model for helmet detection
- [ ] Add license plate OCR using ML Kit
- [ ] Cloud storage and sync
- [ ] Export reports (PDF/CSV)
- [ ] Multiple violation types (red light, speed, etc.)
- [ ] Dark/Light theme toggle
- [ ] Multi-language support

## Contributing

This is a prototype project. Contributions are welcome!

## License

MIT License

## Contact

For questions or feedback, please open an issue on GitHub.

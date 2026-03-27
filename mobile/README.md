# AURORA Mobile App

## Build:
AURORA React Native + Expo App for GSR/IR Sensor Monitoring

## Requirements
- Node.js 16+
- npm or yarn
- EAS CLI
- Expo account

## Installation
1. Install dependencies: npm install
2. Create .env file: cp .env.example .env
3. Add your Supabase credentials to .env

## Development
npm start

## Build APK
eas build -p android --profile preview

## Features
- Real-time GSR and IR sensor monitoring
- Animated circular gauge for IR visualization
- Glassmorphism Aurora theme design
- Supabase cloud integration
- 5-second sensor update frequency
- Conductance calculation (G = 1/R)
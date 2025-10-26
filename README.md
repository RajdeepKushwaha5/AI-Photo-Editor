# AI Photo Editor

Transform images with natural-language prompts using Google's Gemini image-editing API. This Vite + React application enables creators to upload a photo, apply AI-powered edits, blur backgrounds, crop, and download results with an intuitive interface that supports both keyboard and screen-reader users.

## Table of Contents

- [AI Photo Editor](#ai-photo-editor)
  - [Table of Contents](#table-of-contents)
  - [Key Features](#key-features)
  - [Live Demo](#live-demo)
  - [Tech Stack](#tech-stack)
  - [Prerequisites](#prerequisites)
  - [Getting Started](#getting-started)
    - [1. Clone the repository](#1-clone-the-repository)
    - [2. Install dependencies](#2-install-dependencies)
    - [3. Configure environment variables](#3-configure-environment-variables)
    - [4. Run the development server](#4-run-the-development-server)
    - [5. Build for production](#5-build-for-production)
  - [Project Structure](#project-structure)
  - [Core Workflows](#core-workflows)
    - [Uploading an Image](#uploading-an-image)
    - [Applying AI Edits](#applying-ai-edits)
    - [Cropping \& Filters](#cropping--filters)
  - [Environment Variables](#environment-variables)
  - [Available Scripts](#available-scripts)
  - [Contributing](#contributing)
  - [License](#license)
  - [Acknowledgements](#acknowledgements)

## Key Features

- **Prompt-based editing** – Describe the desired change in plain text; the Gemini API generates an updated image.
- **Quality enhancement toggle** – Automatically boosts resolution and detail before applying your prompt.
- **Background blur presets** – Apply low, medium, or high blur intensity with a single click.
- **Undo/redo history** – Navigate between generated variants without losing previous edits.
- **Cropping workflow** – Refine framing with an interactive crop modal powered by `react-image-crop`.
- **Filter previews** – Quickly preview grayscale, sepia, and invert filters on top of the edited result.
- **Session persistence** – Reloading the page restores the last uploaded image and editing state from `localStorage`.
- **Responsive UI** – Tailwind-style utility classes and modern layout patterns ensure a polished experience on desktop and mobile.

## Live Demo

> Coming soon. For now, clone the repo and run it locally.

## Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite 6](https://vitejs.dev/)
- **Language**: TypeScript
- **Styling**: Tailwind CSS (via CDN) + custom utility classes
- **AI Integration**: [`@google/genai`](https://www.npmjs.com/package/@google/genai)
- **Image Utilities**: [`react-image-crop`](https://www.npmjs.com/package/react-image-crop)

## Prerequisites

- [Node.js](https://nodejs.org/) **v18+** (LTS recommended)
- [npm](https://www.npmjs.com/) **v9+**
- A valid **Google AI Studio** API key with access to the `gemini-2.5-flash-image` model.

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/RajdeepKushwaha5/AI-Photo-Editor.git
cd AI-Photo-Editor
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Copy `.env.local.example` to `.env.local` (or create it) and set the Gemini API key:

```bash
echo "GEMINI_API_KEY=your_api_key_here" > .env.local
```

> **Security tip:** never commit `.env.local` files or share API keys publicly.

### 4. Run the development server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to use the editor. The terminal will display the exact URL and QR code (if available) for easy device testing.

### 5. Build for production

```bash
npm run build
npm run preview
```

`npm run preview` serves the built assets locally so you can validate the production bundle.

## Project Structure

```
AI-Photo-Editor/
├── App.tsx                # Application root – orchestrates workflows and state
├── components/            # Reusable UI components (uploader, viewer, controls, modals, icons)
├── services/
│   └── geminiService.ts   # API client for Google Gemini image edits
├── types.ts               # Shared TypeScript types (image, filters, blur intensity)
├── vite.config.ts         # Vite configuration (React plugin, env injection, aliases)
├── tsconfig.json          # TypeScript compiler settings
├── index.tsx              # Entry point rendering <App />
├── index.html             # HTML shell loading Tailwind via CDN
├── package.json           # Scripts and dependency manifest
└── README.md              # Project documentation (this file)
```

> A future refactor will migrate the root files into a dedicated `src/` directory for clearer separation between app code, configuration, and public assets.

## Core Workflows

### Uploading an Image

1. Use the drag-and-drop zone or file picker.
2. The original file is read via `FileReader` and stored in component state as a data URL.
3. Session data (image + history) is persisted in `localStorage` under the key `aiPhotoEditorSession`.

### Applying AI Edits

1. The current image (original or latest edit) is converted from its data URL to base64.
2. `editImageWithPrompt` sends the prompt and image payload to Google Gemini.
3. Successful responses push the returned image into history, enabling undo/redo.

### Cropping & Filters

- Cropping uses `react-image-crop` to return a new PNG data URL.
- Filters toggle CSS classes (`grayscale`, `sepia`, etc.) on the preview image for instant feedback.

## Environment Variables

| Variable          | Required | Description                                               |
|-------------------|----------|-----------------------------------------------------------|
| `GEMINI_API_KEY`  | Yes      | Google AI Studio API key with Gemini image model access. |

Store variables in `.env.local` (ignored by Git). Vite exposes them at build time via `define` in `vite.config.ts`.

## Available Scripts

| Command            | Description                                 |
|--------------------|---------------------------------------------|
| `npm run dev`      | Start the Vite development server.          |
| `npm run build`    | Produce a production-ready build.           |
| `npm run preview`  | Preview the production build locally.       |

## Contributing

Contributions are welcome! To get started:

1. Fork the repository and create a feature branch.
2. Ensure the dev server runs cleanly (`npm run dev`).
3. Add or update tests if you introduce new behavior.
4. Open a pull request describing your changes.

Please adhere to the existing code style (TypeScript + functional React components) and keep dependencies lightweight.

## License

This project is licensed under the [MIT License](LICENSE). You are free to use, modify, and distribute the code with attribution.

## Acknowledgements

- [Google AI Studio](https://ai.google.dev/) for providing the Gemini image model.
- [Vite](https://vitejs.dev/) for lightning-fast development tooling.
- All open-source contributors whose packages power this editor.

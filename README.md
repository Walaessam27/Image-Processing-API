# Image Processing API

A production-ready Image Processing API built with **Node.js**, **Express**, and **TypeScript**. This project serves as both a placeholder image generator and an image resizing library for frontend optimization.

## Features
- **Scalable Architecture**: Separate routes, utilities, and tests.
- **Image Resizing**: Uses the high-performance `Sharp` library.
- **Caching**: Processed images are saved to disk. Subsequent requests for the same image/size are served directly from the cache to improve performance.
- **Error Handling**: Comprehensive validation for missing parameters, invalid dimensions, or non-existent files.
- **Testing**: Full test suite using `Jasmine` and `Supertest`.

---

## 🛠 Prerequisites
- **Node.js**: v14+ or newer.
- **npm**: v6+ or newer.

---

## Getting Started

### 1. Installation
Install all dependencies (including development tools like TypeScript, ESLint, and Jasmine):
```bash
npm install
```

### 2. Available Scripts
- `npm run build`: Compiles TypeScript files into the `dist` directory.
- `npm start`: Starts the production server (runs the compiled JS from `dist`).
- `npm test`: Runs the automated test suite with Jasmine.
- `npm run lint`: Checks for code linting errors using ESLint.
- `npm run format`: Formats code using Prettier.

### How to Use
Once the server is running (`npm start`), you can access the API via the following endpoint:

**Endpoint URL:**  
`http://localhost:3000/api/images`

**Required Query Parameters:**
- **filename**: Name of the image (without extension). *Example: fjord, santorini, palmtunnel.*
- **width**: Desired width in pixels (positive integer).
- **height**: Desired height in pixels (positive integer).

**Example Request:**  
`http://localhost:3000/api/images?filename=fjord&width=200&height=200`

---

###  Project Structure
- `assets/full/`: Contains original high-resolution images.
- `assets/thumb/`: Stores processed/resized images for caching.
- `src/routes/`: Express route definitions.
- `src/utilities/`: Image processing logic (Sharp implementation).
- `src/tests/`: Jasmine test files for endpoints and units.

---

###  Testing and Verification
The reviewer can verify the functionality by following these steps:
1. Run `npm test` to ensure all tests pass.
2. Delete any existing images in the `assets/thumb` folder.
3. Access a valid endpoint URL in your browser (e.g., `?filename=icelandwaterfall&width=400&height=400`).
4. Observe that the image is created in the `assets/thumb` folder.
5. Refresh the page; the server will log `Serving from cache...` and serve the image faster without re-processing.

---

###  Included Images for Testing:
- `encenadaport`
- `fjord`
- `icelandwaterfall`
- `palmtunnel`
- `santorini`
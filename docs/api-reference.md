# 🔧 API Reference

## Core Classes

### ImageProcessor
Main class handling image processing operations.

```javascript
class ImageProcessor {
    constructor(canvas, context)
    
    // Methods
    loadImage(file)           // Load image from file
    resizeImage(width, height, maintainAspect)  // Resize image
    rotateImage(degrees)      // Rotate image
    flipImage(horizontal, vertical)  // Flip image
    exportImage(format, quality)     // Export processed image
}
```

### UIController
Manages user interface interactions and state.

```javascript
class UIController {
    constructor()
    
    // Methods
    initializeEventListeners()  // Setup UI event handlers
    updatePreview(imageData)    // Update preview display
    showProgress(percentage)    // Show processing progress
    toggleTheme()              // Switch dark/light mode
}
```

## Global Functions

### Image Processing

#### `processImage(options)`
Main image processing function.

**Parameters:**
```javascript
{
    width: number,          // Target width
    height: number,         // Target height
    format: string,         // Output format ('jpeg', 'png', 'webp', 'gif')
    quality: number,        // Quality (0-1)
    maintainAspect: boolean // Maintain aspect ratio
}
```

**Returns:** `Promise<Blob>` - Processed image blob

#### `loadImageFile(file)`
Load and validate image file.

**Parameters:**
- `file` (File) - Image file object

**Returns:** `Promise<HTMLImageElement>` - Loaded image element

#### `calculateDimensions(originalWidth, originalHeight, targetWidth, targetHeight, maintainAspect)`
Calculate optimal dimensions for resizing.

**Parameters:**
- `originalWidth` (number) - Source image width
- `originalHeight` (number) - Source image height  
- `targetWidth` (number) - Desired width
- `targetHeight` (number) - Desired height
- `maintainAspect` (boolean) - Maintain aspect ratio

**Returns:** `{width: number, height: number}` - Calculated dimensions

### Utility Functions

#### `formatFileSize(bytes)`
Format file size for display.

**Parameters:**
- `bytes` (number) - File size in bytes

**Returns:** `string` - Formatted size (e.g., "2.5 MB")

#### `validateImageFile(file)`
Validate uploaded image file.

**Parameters:**
- `file` (File) - File to validate

**Returns:** `{valid: boolean, error?: string}` - Validation result

#### `downloadBlob(blob, filename)`
Trigger download of processed image.

**Parameters:**
- `blob` (Blob) - Image data
- `filename` (string) - Download filename

## Event System

### Custom Events

#### `imageLoaded`
Fired when image is successfully loaded.

```javascript
document.addEventListener('imageLoaded', (event) => {
    const { width, height, size } = event.detail;
    // Handle image loaded
});
```

#### `imageProcessed`
Fired when image processing is complete.

```javascript
document.addEventListener('imageProcessed', (event) => {
    const { blob, dimensions } = event.detail;
    // Handle processed image
});
```

#### `processingProgress`
Fired during image processing for progress updates.

```javascript
document.addEventListener('processingProgress', (event) => {
    const { percentage } = event.detail;
    // Update progress indicator
});
```

## Configuration

### Global Configuration Object

```javascript
window.ImageResizerConfig = {
    // File constraints
    maxFileSize: 50 * 1024 * 1024,  // 50MB
    supportedFormats: [
        'image/jpeg',
        'image/png', 
        'image/webp',
        'image/gif'
    ],
    
    // Processing defaults
    defaultQuality: 0.9,
    maxDimensions: {
        width: 8192,
        height: 8192
    },
    
    // UI preferences
    theme: 'auto',  // 'light', 'dark', 'auto'
    animations: true,
    
    // Performance
    useWebWorkers: true,
    chunkSize: 1024 * 1024  // 1MB chunks
};
```

## Canvas API Integration

### Drawing Context Methods

#### `drawImageToCanvas(image, canvas, options)`
Draw image to canvas with specified options.

```javascript
const options = {
    x: 0,
    y: 0,
    width: canvas.width,
    height: canvas.height,
    rotation: 0,        // Degrees
    flipH: false,       // Horizontal flip
    flipV: false        // Vertical flip
};
```

#### `getImageData(canvas)`
Extract image data from canvas.

**Returns:** `ImageData` - Canvas image data

#### `applyFilters(imageData, filters)`
Apply image filters to image data.

**Parameters:**
- `imageData` (ImageData) - Source image data
- `filters` (Object) - Filter configuration

## Error Handling

### Error Types

#### `ImageProcessingError`
Thrown during image processing operations.

```javascript
class ImageProcessingError extends Error {
    constructor(message, code) {
        super(message);
        this.name = 'ImageProcessingError';
        this.code = code;
    }
}
```

#### `ValidationError`
Thrown for invalid input parameters.

```javascript
class ValidationError extends Error {
    constructor(message, field) {
        super(message);
        this.name = 'ValidationError';
        this.field = field;
    }
}
```

### Error Codes

| Code | Description |
|------|-------------|
| `FILE_TOO_LARGE` | File exceeds size limit |
| `INVALID_FORMAT` | Unsupported file format |
| `PROCESSING_FAILED` | Image processing error |
| `CANVAS_ERROR` | Canvas operation failed |
| `MEMORY_ERROR` | Insufficient memory |

## Browser Compatibility

### Required APIs
- **Canvas API** - Image processing
- **File API** - File handling
- **Blob API** - Data export
- **URL.createObjectURL** - Preview generation

### Feature Detection

```javascript
function checkBrowserSupport() {
    const features = {
        canvas: !!document.createElement('canvas').getContext,
        fileAPI: !!(window.File && window.FileReader),
        webp: checkWebPSupport(),
        webWorkers: !!window.Worker
    };
    
    return features;
}
```

## Performance Optimization

### Memory Management

```javascript
// Clean up canvas resources
function cleanupCanvas(canvas) {
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas.width = canvas.height = 0;
}

// Revoke object URLs
function cleanupObjectURL(url) {
    URL.revokeObjectURL(url);
}
```

### Async Processing

```javascript
// Process large images in chunks
async function processLargeImage(imageData, chunkSize = 1024 * 1024) {
    const chunks = Math.ceil(imageData.data.length / chunkSize);
    
    for (let i = 0; i < chunks; i++) {
        await processChunk(imageData, i * chunkSize, chunkSize);
        // Yield control to prevent blocking
        await new Promise(resolve => setTimeout(resolve, 0));
    }
}
```
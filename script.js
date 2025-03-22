document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('fileInput');
    const selectFileBtn = document.getElementById('selectFileBtn');
    const editorContainer = document.getElementById('editorContainer');
    const previewImage = document.getElementById('previewImage');
    const originalSizeEl = document.getElementById('originalSize');
    const newSizeEl = document.getElementById('newSize');
    const fileSizeEl = document.getElementById('fileSize');
    const widthInput = document.getElementById('widthInput');
    const heightInput = document.getElementById('heightInput');
    const maintainAspectRatio = document.getElementById('maintainAspectRatio');
    const formatSelect = document.getElementById('formatSelect');
    const qualitySlider = document.getElementById('qualitySlider');
    const qualityValue = document.getElementById('qualityValue');
    const processBtn = document.getElementById('processBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    const resetBtn = document.getElementById('resetBtn');
    const presetButtons = document.querySelectorAll('.preset-buttons button');  // Keep this declaration
    const showGuideBtn = document.getElementById('showGuideBtn');
    const closeGuideBtn = document.getElementById('closeGuideBtn');
    const userGuide = document.getElementById('userGuide');

    // Add loading indicator elements
    const loadingIndicator = document.createElement('div');
    loadingIndicator.className = 'loading';
    loadingIndicator.innerHTML = '<div class="loading-spinner"></div>';
    document.body.appendChild(loadingIndicator);

    // Add error message container
    const errorMessage = document.createElement('div');
    errorMessage.className = 'error-message';
    editorContainer.appendChild(errorMessage);

    // Variables
    let originalImage = null;
    let processedImage = null;
    let originalWidth = 0;
    let originalHeight = 0;
    let aspectRatio = 0;
    let processedBlob = null;
    let imageHistory = []; // Store image processing history for undo/redo

    // Event Listeners
    uploadArea.addEventListener('click', () => fileInput.click());
    selectFileBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        fileInput.click();
    });

    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.style.backgroundColor = 'rgba(74, 108, 247, 0.2)';
    });

    uploadArea.addEventListener('dragleave', () => {
        uploadArea.style.backgroundColor = 'rgba(74, 108, 247, 0.05)';
    });

    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.style.backgroundColor = 'rgba(74, 108, 247, 0.05)';
        
        if (e.dataTransfer.files.length) {
            handleFileUpload(e.dataTransfer.files[0]);
        }
    });

    fileInput.addEventListener('change', () => {
        if (fileInput.files.length) {
            handleFileUpload(fileInput.files[0]);
        }
    });

    widthInput.addEventListener('input', () => {
        if (maintainAspectRatio.checked && aspectRatio > 0) {
            heightInput.value = Math.round(widthInput.value / aspectRatio);
        }
        updateNewSize();
    });

    heightInput.addEventListener('input', () => {
        if (maintainAspectRatio.checked && aspectRatio > 0) {
            widthInput.value = Math.round(heightInput.value * aspectRatio);
        }
        updateNewSize();
    });

    qualitySlider.addEventListener('input', () => {
        qualityValue.textContent = `${qualitySlider.value}%`;
    });

    // Handle preset button selection
    // Update preset button selection (remove duplicate declaration)
    // Handle preset button selection
    presetButtons.forEach(button => {
        button.addEventListener('click', function() {
            presetButtons.forEach(btn => btn.classList.remove('selected'));
            this.classList.add('selected');
            
            // Get dimensions from the button's data attributes
            const presetWidth = parseInt(this.getAttribute('data-width'));
            const presetHeight = parseInt(this.getAttribute('data-height'));
            
            // Update input fields
            widthInput.value = presetWidth;
            heightInput.value = presetHeight;
            
            // Update the display size
            updateNewSize();
        });
    });

    processBtn.addEventListener('click', processImage);
    downloadBtn.addEventListener('click', downloadImage);
    resetBtn.addEventListener('click', resetEditor);
    
    showGuideBtn.addEventListener('click', (e) => {
        e.preventDefault();
        userGuide.style.display = 'block';
    });
    
    closeGuideBtn.addEventListener('click', () => {
        userGuide.style.display = 'none';
    });

    // Add keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Ctrl+O to open file
        if (e.ctrlKey && e.key === 'o') {
            e.preventDefault();
            fileInput.click();
        }
        
        // Ctrl+S to save/download
        if (e.ctrlKey && e.key === 's' && !downloadBtn.disabled) {
            e.preventDefault();
            downloadImage();
        }
        
        // Ctrl+P to process image
        if (e.ctrlKey && e.key === 'p' && originalImage) {
            e.preventDefault();
            processImage();
        }
    });

    // Functions
    function handleFileUpload(file) {
        if (!file.type.match('image.*')) {
            showError('Please select a valid image file.');
            return;
        }

        showLoading(true);
        const reader = new FileReader();
        
        reader.onload = function(e) {
            originalImage = new Image();
            originalImage.onload = function() {
                originalWidth = originalImage.width;
                originalHeight = originalImage.height;
                aspectRatio = originalWidth / originalHeight;
                
                // Set initial dimensions
                widthInput.value = originalWidth;
                heightInput.value = originalHeight;
                
                // Display image and show editor
                previewImage.src = e.target.result;
                editorContainer.style.display = 'flex';
                uploadArea.style.display = 'none';
                
                // Update info
                originalSizeEl.textContent = `${originalWidth}×${originalHeight}px`;
                updateNewSize();
                
                // Display file size
                const fileSizeMB = (file.size / (1024 * 1024)).toFixed(2);
                fileSizeEl.textContent = `${fileSizeMB} MB`;
                
                showLoading(false);
            };
            originalImage.onerror = function() {
                showError('Failed to load image. Please try another file.');
                showLoading(false);
            };
            originalImage.src = e.target.result;
        };
        
        reader.onerror = function() {
            showError('Failed to read file. Please try again.');
            showLoading(false);
        };
        
        reader.readAsDataURL(file);
    }

    function processImage() {
        if (!originalImage) return;
        
        showLoading(true);
        
        // Add a small delay to allow the loading indicator to appear
        setTimeout(() => {
            try {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                
                const newWidth = parseInt(widthInput.value);
                const newHeight = parseInt(heightInput.value);
                
                if (isNaN(newWidth) || isNaN(newHeight) || newWidth <= 0 || newHeight <= 0) {
                    throw new Error('Please enter valid dimensions.');
                }
                
                canvas.width = newWidth;
                canvas.height = newHeight;
                
                // Draw resized image
                ctx.drawImage(originalImage, 0, 0, newWidth, newHeight);
                
                // Apply basic image enhancements if needed
                // This is a placeholder for future AI enhancements
                
                // Convert to selected format
                const format = formatSelect.value;
                const quality = parseInt(qualitySlider.value) / 100;
                
                let mimeType;
                switch(format) {
                    case 'jpeg':
                        mimeType = 'image/jpeg';
                        break;
                    case 'png':
                        mimeType = 'image/png';
                        break;
                    case 'webp':
                        mimeType = 'image/webp';
                        break;
                    case 'gif':
                        mimeType = 'image/gif';
                        break;
                    default:
                        mimeType = 'image/jpeg';
                }
                
                canvas.toBlob(blob => {
                    processedBlob = blob;
                    const url = URL.createObjectURL(blob);
                    
                    // Save to history
                    imageHistory.push({
                        blob: blob,
                        width: newWidth,
                        height: newHeight,
                        format: format,
                        quality: quality
                    });
                    
                    previewImage.src = url;
                    
                    // Update file size
                    const fileSizeMB = (blob.size / (1024 * 1024)).toFixed(2);
                    fileSizeEl.textContent = `${fileSizeMB} MB`;
                    
                    // Enable download button
                    downloadBtn.disabled = false;
                    
                    showLoading(false);
                }, mimeType, quality);
            } catch (error) {
                showError(error.message || 'An error occurred during processing.');
                showLoading(false);
            }
        }, 100);
    }

    function downloadImage() {
        if (!processedBlob) return;
        
        const format = formatSelect.value;
        const filename = `resized_image_${new Date().getTime()}.${format}`;
        
        const a = document.createElement('a');
        a.href = URL.createObjectURL(processedBlob);
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        
        // Show success message
        showMessage('Image downloaded successfully!', 'success');
    }

    // Helper functions
    function showLoading(show) {
        loadingIndicator.style.display = show ? 'flex' : 'none';
    }
    
    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
        
        // Hide error after 5 seconds
        setTimeout(() => {
            errorMessage.style.display = 'none';
        }, 5000);
    }
    
    function showMessage(message, type) {
        const messageEl = document.createElement('div');
        messageEl.className = `message ${type}`;
        messageEl.textContent = message;
        
        document.body.appendChild(messageEl);
        
        // Animate in
        setTimeout(() => {
            messageEl.style.opacity = '1';
            messageEl.style.transform = 'translateY(0)';
        }, 10);
        
        // Remove after 3 seconds
        setTimeout(() => {
            messageEl.style.opacity = '0';
            messageEl.style.transform = 'translateY(-20px)';
            
            setTimeout(() => {
                document.body.removeChild(messageEl);
            }, 300);
        }, 3000);
    }

    // Keep existing functions
    function updateNewSize() {
        if (widthInput.value && heightInput.value) {
            newSizeEl.textContent = `${widthInput.value}×${heightInput.value}px`;
        }
    }

    function resetEditor() {
        if (confirm('Are you sure you want to reset? This will clear your current image.')) {
            editorContainer.style.display = 'none';
            uploadArea.style.display = 'block';
            previewImage.src = '';
            fileInput.value = '';
            originalImage = null;
            processedBlob = null;
            downloadBtn.disabled = true;
            imageHistory = [];
        }
    }
});

// Add these event listeners after your existing DOM elements are defined

// Tab switching for resize options
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        tabBtns.forEach(b => b.classList.remove('active'));
        
        // Add active class to clicked button
        btn.classList.add('active');
        
        // Hide all tab contents
        tabContents.forEach(content => {
            content.style.display = 'none';
        });
        
        // Show the selected tab content
        const tabId = btn.getAttribute('data-tab');
        document.getElementById(`${tabId}-tab`).style.display = 'block';
    });
});

// Advanced options toggle
const advancedOptionsBtn = document.getElementById('advancedOptionsBtn');
const advancedOptions = document.getElementById('advancedOptions');

advancedOptionsBtn.addEventListener('click', () => {
    advancedOptionsBtn.classList.toggle('active');
    
    if (advancedOptions.style.display === 'none' || !advancedOptions.style.display) {
        advancedOptions.style.display = 'block';
    } else {
        advancedOptions.style.display = 'none';
    }
});

// Crop options toggle
const enableCrop = document.getElementById('enableCrop');
const cropDimensions = document.querySelector('.crop-dimensions');

enableCrop.addEventListener('change', () => {
    cropDimensions.style.display = enableCrop.checked ? 'block' : 'none';
});

// Sync unit selectors
const widthUnit = document.getElementById('widthUnit');
const heightUnit = document.getElementById('heightUnit');

widthUnit.addEventListener('change', function() {
    heightUnit.value = this.value;
});

heightUnit.addEventListener('change', function() {
    widthUnit.value = this.value;
});
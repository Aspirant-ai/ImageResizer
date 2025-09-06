document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('fileInput');
    const selectFileBtn = document.getElementById('selectFileBtn');
    const getStartedBtn = document.getElementById('getStartedBtn');
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
    const presetButtons = document.querySelectorAll('.preset-btn');
    const showGuideBtn = document.getElementById('showGuideBtn');
    const closeGuideBtn = document.getElementById('closeGuideBtn');
    const userGuide = document.getElementById('userGuide');
    const rotateLeft = document.getElementById('rotateLeft');
    const rotateRight = document.getElementById('rotateRight');
    const flipHorizontalBtn = document.getElementById('flipHorizontal');
    const flipVerticalBtn = document.getElementById('flipVertical');
    const darkModeToggle = document.getElementById('darkModeToggle');
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    // Advanced editing elements
    const enableCropBtn = document.getElementById('enableCrop');
    const removeBackgroundBtn = document.getElementById('removeBackground');
    const replaceBackgroundBtn = document.getElementById('replaceBackground');
    const backgroundInput = document.getElementById('backgroundInput');
    const colorBtns = document.querySelectorAll('.color-btn');
    const customColor = document.getElementById('customColor');
    const brightnessSlider = document.getElementById('brightness');
    const contrastSlider = document.getElementById('contrast');
    const saturationSlider = document.getElementById('saturation');
    const blurSlider = document.getElementById('blur');
    const filterPresets = document.querySelectorAll('.filter-preset');

    // Add loading indicator
    const loadingIndicator = document.createElement('div');
    loadingIndicator.className = 'loading';
    loadingIndicator.innerHTML = '<div class="loading-spinner"></div><div class="loading-text">Processing...</div>';
    document.body.appendChild(loadingIndicator);

    // Add notification system
    const notificationContainer = document.createElement('div');
    notificationContainer.className = 'notification-container';
    notificationContainer.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 2000;
        display: flex;
        flex-direction: column;
        gap: 10px;
    `;
    document.body.appendChild(notificationContainer);

    // Variables
    let originalImage = null;
    let originalWidth = 0;
    let originalHeight = 0;
    let aspectRatio = 0;
    let processedBlob = null;
    let rotationAngle = 0;
    let flipHorizontalState = false;
    let flipVerticalState = false;
    let cropEnabled = false;
    let currentFilters = {
        brightness: 100,
        contrast: 100,
        saturation: 100,
        blur: 0
    };
    let backgroundImage = null;

    // Utility Functions
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `glass-card notification ${type}`;
        notification.style.cssText = `
            padding: 15px 20px;
            margin-bottom: 10px;
            border-left: 4px solid ${type === 'success' ? '#4facfe' : type === 'error' ? '#fa709a' : '#667eea'};
            animation: slideInRight 0.3s ease;
            max-width: 300px;
        `;
        notification.innerHTML = `
            <div style="display: flex; align-items: center; gap: 10px; color: var(--text-light);">
                <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
                <span>${message}</span>
            </div>
        `;
        
        notificationContainer.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    function showLoading() {
        loadingIndicator.classList.add('active');
    }

    function hideLoading() {
        loadingIndicator.classList.remove('active');
    }

    // Event Listeners
    // Get Started button
    if (getStartedBtn) {
        getStartedBtn.addEventListener('click', () => {
            const uploadSection = document.getElementById('uploadSection');
            if (uploadSection) {
                uploadSection.style.display = 'block';
                uploadSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
    
    uploadArea.addEventListener('click', () => fileInput.click());
    
    selectFileBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        fileInput.click();
    });
    
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('drag-over');
    });
    
    uploadArea.addEventListener('dragleave', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('drag-over');
    });
    
    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('drag-over');
        if (e.dataTransfer.files.length) {
            handleFileUpload(e.dataTransfer.files[0]);
        }
    });
    
    fileInput.addEventListener('change', () => {
        if (fileInput.files.length) {
            handleFileUpload(fileInput.files[0]);
        }
    });

    // Tab functionality
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.getAttribute('data-tab');
            switchTab(tabId);
        });
    });

    function switchTab(tabId) {
        // Remove active class from all tabs and contents
        tabBtns.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        // Add active class to selected tab and content
        document.querySelector(`[data-tab="${tabId}"]`).classList.add('active');
        document.getElementById(`${tabId}-tab`).classList.add('active');
    }

    // Input handlers with live preview
    if (widthInput) {
        widthInput.addEventListener('input', () => {
            if (maintainAspectRatio && maintainAspectRatio.checked && aspectRatio > 0) {
                heightInput.value = Math.round(widthInput.value / aspectRatio);
            }
            updateNewSize();
            updateLivePreview();
        });
    }

    if (heightInput) {
        heightInput.addEventListener('input', () => {
            if (maintainAspectRatio && maintainAspectRatio.checked && aspectRatio > 0) {
                widthInput.value = Math.round(heightInput.value * aspectRatio);
            }
            updateNewSize();
            updateLivePreview();
        });
    }

    // Preset buttons with live preview
    presetButtons.forEach(button => {
        button.addEventListener('click', () => {
            const width = button.getAttribute('data-width');
            const height = button.getAttribute('data-height');
            
            if (widthInput) widthInput.value = width;
            if (heightInput) heightInput.value = height;
            
            // Remove active class from all preset buttons
            presetButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            updateNewSize();
            updateLivePreview();
            showNotification(`Preset applied: ${width}×${height}`, 'success');
        });
    });

    // Quality slider
    if (qualitySlider && qualityValue) {
        qualitySlider.addEventListener('input', () => {
            qualityValue.textContent = qualitySlider.value + '%';
        });
    }

    // Transform buttons
    if (rotateLeft) {
        rotateLeft.addEventListener('click', () => {
            rotationAngle -= 90;
            if (rotationAngle < 0) rotationAngle = 270;
            updateLivePreview();
            showNotification('Rotated left 90°', 'success');
        });
    }

    if (rotateRight) {
        rotateRight.addEventListener('click', () => {
            rotationAngle += 90;
            if (rotationAngle >= 360) rotationAngle = 0;
            updateLivePreview();
            showNotification('Rotated right 90°', 'success');
        });
    }

    if (flipHorizontalBtn) {
        flipHorizontalBtn.addEventListener('click', () => {
            flipHorizontalState = !flipHorizontalState;
            updateLivePreview();
            showNotification('Flipped horizontally', 'success');
        });
    }

    if (flipVerticalBtn) {
        flipVerticalBtn.addEventListener('click', () => {
            flipVerticalState = !flipVerticalState;
            updateLivePreview();
            showNotification('Flipped vertically', 'success');
        });
    }

    // Advanced editing event listeners
    if (enableCropBtn) {
        enableCropBtn.addEventListener('click', () => {
            cropEnabled = !cropEnabled;
            enableCropBtn.classList.toggle('active');
            if (cropEnabled) {
                showNotification('Crop mode enabled - Click and drag on image', 'info');
                enableCropBtn.innerHTML = '<i class="fas fa-times"></i> Disable Crop';
            } else {
                showNotification('Crop mode disabled', 'info');
                enableCropBtn.innerHTML = '<i class="fas fa-crop-alt"></i> Enable Crop';
            }
        });
    }

    if (removeBackgroundBtn) {
        removeBackgroundBtn.addEventListener('click', () => {
            if (!originalImage) {
                showNotification('Please upload an image first', 'error');
                return;
            }
            removeBackground();
        });
    }

    if (replaceBackgroundBtn) {
        replaceBackgroundBtn.addEventListener('click', () => {
            backgroundInput.click();
        });
    }

    if (backgroundInput) {
        backgroundInput.addEventListener('change', (e) => {
            if (e.target.files.length) {
                loadBackgroundImage(e.target.files[0]);
            }
        });
    }

    colorBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const color = btn.getAttribute('data-color');
            replaceBackgroundWithColor(color);
        });
    });

    if (customColor) {
        customColor.addEventListener('change', (e) => {
            replaceBackgroundWithColor(e.target.value);
        });
    }

    // Filter controls
    if (brightnessSlider) {
        brightnessSlider.addEventListener('input', () => {
            currentFilters.brightness = brightnessSlider.value;
            document.getElementById('brightnessValue').textContent = brightnessSlider.value + '%';
            applyFilters();
        });
    }

    if (contrastSlider) {
        contrastSlider.addEventListener('input', () => {
            currentFilters.contrast = contrastSlider.value;
            document.getElementById('contrastValue').textContent = contrastSlider.value + '%';
            applyFilters();
        });
    }

    if (saturationSlider) {
        saturationSlider.addEventListener('input', () => {
            currentFilters.saturation = saturationSlider.value;
            document.getElementById('saturationValue').textContent = saturationSlider.value + '%';
            applyFilters();
        });
    }

    if (blurSlider) {
        blurSlider.addEventListener('input', () => {
            currentFilters.blur = blurSlider.value;
            document.getElementById('blurValue').textContent = blurSlider.value + 'px';
            applyFilters();
        });
    }

    filterPresets.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');
            applyFilterPreset(filter);
        });
    });

    // Dark mode toggle
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const isDark = document.body.classList.contains('dark-mode');
            darkModeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
            localStorage.setItem('darkMode', isDark);
            showNotification(`${isDark ? 'Dark' : 'Light'} mode enabled`, 'info');
        });

        // Load dark mode preference
        if (localStorage.getItem('darkMode') === 'true') {
            document.body.classList.add('dark-mode');
            darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
    }

    // Guide modal
    if (showGuideBtn && userGuide) {
        showGuideBtn.addEventListener('click', () => {
            userGuide.classList.add('active');
        });
    }

    if (closeGuideBtn && userGuide) {
        closeGuideBtn.addEventListener('click', () => {
            userGuide.classList.remove('active');
        });

        userGuide.addEventListener('click', (e) => {
            if (e.target === userGuide) {
                userGuide.classList.remove('active');
            }
        });
    }

    // Process button
    if (processBtn) {
        processBtn.addEventListener('click', () => {
            if (!originalImage) {
                showNotification('Please upload an image first', 'error');
                return;
            }
            processImage();
        });
    }

    // Download button
    if (downloadBtn) {
        downloadBtn.addEventListener('click', () => {
            if (processedBlob) {
                downloadImage();
            }
        });
    }

    // Reset button
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            resetEditor();
            showNotification('Editor reset', 'info');
        });
    }

    // File upload handler
    function handleFileUpload(file) {
        if (!file.type.startsWith('image/')) {
            showNotification('Please select a valid image file', 'error');
            return;
        }

        if (file.size > 50 * 1024 * 1024) { // 50MB limit
            showNotification('File size too large. Please select a file under 50MB', 'error');
            return;
        }

        showLoading();
        
        const reader = new FileReader();
        reader.onload = (e) => {
            originalImage = new Image();
            originalImage.onload = () => {
                setupEditor(e.target.result, file);
                hideLoading();
                showNotification('Image uploaded successfully', 'success');
            };
            originalImage.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }

    function setupEditor(imageSrc, file) {
        if (previewImage) previewImage.src = imageSrc;
        originalWidth = originalImage.width;
        originalHeight = originalImage.height;
        aspectRatio = originalWidth / originalHeight;
        
        if (widthInput) widthInput.value = originalWidth;
        if (heightInput) heightInput.value = originalHeight;
        
        if (originalSizeEl) originalSizeEl.textContent = `${originalWidth} × ${originalHeight}`;
        if (fileSizeEl) fileSizeEl.textContent = formatFileSize(file.size);
        
        // Hide upload section and show editor
        const uploadSection = document.getElementById('uploadSection');
        if (uploadSection) uploadSection.style.display = 'none';
        if (editorContainer) editorContainer.style.display = 'block';
        updateNewSize();
        
        // Scroll to editor
        if (editorContainer) editorContainer.scrollIntoView({ behavior: 'smooth' });
    }

    function updateNewSize() {
        if (widthInput && heightInput && newSizeEl) {
            const width = parseInt(widthInput.value) || 0;
            const height = parseInt(heightInput.value) || 0;
            newSizeEl.textContent = `${width} × ${height}`;
        }
    }

    // Live preview function
    function updateLivePreview() {
        if (!originalImage || !previewImage) return;
        
        const newWidth = parseInt(widthInput.value) || originalWidth;
        const newHeight = parseInt(heightInput.value) || originalHeight;
        
        // Create temporary canvas for preview
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        canvas.width = newWidth;
        canvas.height = newHeight;
        
        // Apply current transformations
        ctx.save();
        ctx.translate(newWidth / 2, newHeight / 2);
        
        if (rotationAngle !== 0) {
            ctx.rotate((rotationAngle * Math.PI) / 180);
        }
        
        if (flipHorizontalState) {
            ctx.scale(-1, 1);
        }
        
        if (flipVerticalState) {
            ctx.scale(1, -1);
        }
        
        ctx.drawImage(originalImage, -newWidth / 2, -newHeight / 2, newWidth, newHeight);
        ctx.restore();
        
        // Update preview with low quality for performance
        canvas.toBlob((blob) => {
            const url = URL.createObjectURL(blob);
            previewImage.src = url;
            
            // Clean up previous URL
            setTimeout(() => URL.revokeObjectURL(url), 1000);
        }, 'image/jpeg', 0.7);
    }

    function applyTransforms() {
        if (!previewImage || !previewImage.src) return;
        
        let transform = '';
        
        if (rotationAngle !== 0) {
            transform += `rotate(${rotationAngle}deg) `;
        }
        
        if (flipHorizontalState) {
            transform += 'scaleX(-1) ';
        }
        
        if (flipVerticalState) {
            transform += 'scaleY(-1) ';
        }
        
        previewImage.style.transform = transform;
    }

    function processImage() {
        if (!originalImage) return;
        
        showLoading();
        
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        const newWidth = parseInt(widthInput.value);
        const newHeight = parseInt(heightInput.value);
        
        canvas.width = newWidth;
        canvas.height = newHeight;
        
        // Apply transformations
        ctx.save();
        ctx.translate(newWidth / 2, newHeight / 2);
        
        if (rotationAngle !== 0) {
            ctx.rotate((rotationAngle * Math.PI) / 180);
        }
        
        if (flipHorizontalState) {
            ctx.scale(-1, 1);
        }
        
        if (flipVerticalState) {
            ctx.scale(1, -1);
        }
        
        ctx.drawImage(originalImage, -newWidth / 2, -newHeight / 2, newWidth, newHeight);
        ctx.restore();
        
        const quality = qualitySlider ? qualitySlider.value / 100 : 0.9;
        const format = formatSelect ? formatSelect.value : 'jpeg';
        const mimeType = format === 'jpeg' ? 'image/jpeg' : 
                        format === 'png' ? 'image/png' : 
                        format === 'webp' ? 'image/webp' : 'image/gif';
        
        canvas.toBlob((blob) => {
            processedBlob = blob;
            const url = URL.createObjectURL(blob);
            if (previewImage) previewImage.src = url;
            
            if (downloadBtn) {
                downloadBtn.disabled = false;
                downloadBtn.classList.remove('disabled');
            }
            
            if (fileSizeEl) fileSizeEl.textContent = formatFileSize(blob.size);
            
            hideLoading();
            showNotification('Image processed successfully', 'success');
        }, mimeType, quality);
    }

    function downloadImage() {
        if (!processedBlob) return;
        
        // Generate timestamp
        const now = new Date();
        const timestamp = now.getFullYear() + 
                         String(now.getMonth() + 1).padStart(2, '0') + 
                         String(now.getDate()).padStart(2, '0') + '_' +
                         String(now.getHours()).padStart(2, '0') + 
                         String(now.getMinutes()).padStart(2, '0') + 
                         String(now.getSeconds()).padStart(2, '0');
        
        const url = URL.createObjectURL(processedBlob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `resized-by-img.sscgram.com-${timestamp}.${formatSelect ? formatSelect.value : 'jpeg'}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        showNotification('Image downloaded successfully', 'success');
    }

    // Advanced editing functions
    function removeBackground() {
        if (!originalImage) return;
        
        showLoading();
        showNotification('Removing background...', 'info');
        
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        canvas.width = originalImage.width;
        canvas.height = originalImage.height;
        
        ctx.drawImage(originalImage, 0, 0);
        
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        
        // Simple background removal (white/light backgrounds)
        for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            
            if (r > 240 && g > 240 && b > 240) {
                data[i + 3] = 0;
            }
        }
        
        ctx.putImageData(imageData, 0, 0);
        
        canvas.toBlob((blob) => {
            const url = URL.createObjectURL(blob);
            previewImage.src = url;
            processedBlob = blob;
            hideLoading();
            showNotification('Background removed successfully', 'success');
        }, 'image/png');
    }

    function loadBackgroundImage(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            backgroundImage = new Image();
            backgroundImage.onload = () => {
                replaceBackgroundWithImage();
            };
            backgroundImage.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }

    function replaceBackgroundWithColor(color) {
        if (!originalImage) return;
        
        showLoading();
        
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        canvas.width = originalImage.width;
        canvas.height = originalImage.height;
        
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(originalImage, 0, 0);
        
        canvas.toBlob((blob) => {
            const url = URL.createObjectURL(blob);
            previewImage.src = url;
            processedBlob = blob;
            hideLoading();
            showNotification(`Background replaced with ${color}`, 'success');
        });
    }

    function replaceBackgroundWithImage() {
        if (!originalImage || !backgroundImage) return;
        
        showLoading();
        
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        canvas.width = originalImage.width;
        canvas.height = originalImage.height;
        
        ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
        ctx.drawImage(originalImage, 0, 0);
        
        canvas.toBlob((blob) => {
            const url = URL.createObjectURL(blob);
            previewImage.src = url;
            processedBlob = blob;
            hideLoading();
            showNotification('Background replaced with image', 'success');
        });
    }

    function applyFilters() {
        if (!previewImage || !previewImage.src) return;
        
        const filterString = `
            brightness(${currentFilters.brightness}%) 
            contrast(${currentFilters.contrast}%) 
            saturate(${currentFilters.saturation}%) 
            blur(${currentFilters.blur}px)
        `;
        
        previewImage.style.filter = filterString;
    }

    function applyFilterPreset(preset) {
        switch (preset) {
            case 'vintage':
                currentFilters = { brightness: 110, contrast: 120, saturation: 80, blur: 0 };
                break;
            case 'bw':
                currentFilters = { brightness: 100, contrast: 110, saturation: 0, blur: 0 };
                break;
            case 'sepia':
                currentFilters = { brightness: 110, contrast: 90, saturation: 120, blur: 0 };
                break;
            case 'reset':
                currentFilters = { brightness: 100, contrast: 100, saturation: 100, blur: 0 };
                break;
        }
        
        updateFilterSliders();
        applyFilters();
        showNotification(`${preset.charAt(0).toUpperCase() + preset.slice(1)} filter applied`, 'success');
    }

    function updateFilterSliders() {
        if (brightnessSlider) {
            brightnessSlider.value = currentFilters.brightness;
            document.getElementById('brightnessValue').textContent = currentFilters.brightness + '%';
        }
        if (contrastSlider) {
            contrastSlider.value = currentFilters.contrast;
            document.getElementById('contrastValue').textContent = currentFilters.contrast + '%';
        }
        if (saturationSlider) {
            saturationSlider.value = currentFilters.saturation;
            document.getElementById('saturationValue').textContent = currentFilters.saturation + '%';
        }
        if (blurSlider) {
            blurSlider.value = currentFilters.blur;
            document.getElementById('blurValue').textContent = currentFilters.blur + 'px';
        }
    }

    function resetEditor() {
        const uploadSection = document.getElementById('uploadSection');
        if (uploadSection) uploadSection.style.display = 'block';
        if (editorContainer) editorContainer.style.display = 'none';
        
        if (previewImage) {
            previewImage.src = '';
            previewImage.style.filter = '';
            previewImage.style.transform = '';
        }
        if (widthInput) widthInput.value = '';
        if (heightInput) heightInput.value = '';
        if (originalSizeEl) originalSizeEl.textContent = '';
        if (newSizeEl) newSizeEl.textContent = '';
        if (fileSizeEl) fileSizeEl.textContent = '';
        if (downloadBtn) {
            downloadBtn.disabled = true;
            downloadBtn.classList.add('disabled');
        }
        
        // Reset all states
        rotationAngle = 0;
        flipHorizontalState = false;
        flipVerticalState = false;
        cropEnabled = false;
        currentFilters = { brightness: 100, contrast: 100, saturation: 100, blur: 0 };
        backgroundImage = null;
        processedBlob = null;
        originalImage = null;
        
        if (fileInput) fileInput.value = '';
        
        // Reset UI elements
        presetButtons.forEach(btn => btn.classList.remove('active'));
        if (enableCropBtn) {
            enableCropBtn.classList.remove('active');
            enableCropBtn.innerHTML = '<i class="fas fa-crop-alt"></i> Enable Crop';
        }
        
        updateFilterSliders();
        
        if (uploadSection) uploadSection.scrollIntoView({ behavior: 'smooth' });
    }

    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    // Add CSS animations for notifications
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        .upload-area.drag-over {
            border-color: rgba(255, 255, 255, 0.6) !important;
            background: rgba(255, 255, 255, 0.1) !important;
        }
        
        .preset-btn.active {
            background: var(--primary) !important;
            color: white !important;
            transform: translateY(-2px);
        }
    `;
    document.head.appendChild(style);

    // Initialize
    updateNewSize();
});
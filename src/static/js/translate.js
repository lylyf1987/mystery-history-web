// Language Toggle System for Mystery History Website
// Switches between separate .html and -zh.html files

(function() {
    // Current URL path detection
    function getCurrentPageName() {
        const path = window.location.pathname;
        // Extract filename from path
        const filename = path.split('/').pop() || 'index.html';
        return filename;
    }
    
    function isChinesePage() {
        const filename = getCurrentPageName();
        return filename.endsWith('-zh.html');
    }
    
    function getBasePath() {
        const path = window.location.pathname;
        // Get directory path
        return path.substring(0, path.lastIndexOf('/')) + '/';
    }
    
    // Toggle language by navigating to corresponding file
    window.toggleLanguage = function() {
        const basePath = getBasePath();
        const filename = getCurrentPageName();
        
        let newFilename;
        if (filename.endsWith('-zh.html')) {
            // Switch to English version
            newFilename = filename.replace('-zh.html', '.html');
        } else {
            // Switch to Chinese version
            newFilename = filename.replace('.html', '-zh.html');
        }
        
        window.location.href = basePath + newFilename;
    };
    
    // Update button text on page load
    function updateButton() {
        const buttons = document.querySelectorAll('.language-toggle');
        const isZh = isChinesePage();
        
        buttons.forEach(function(btn) {
            // Show what language we CAN switch TO
            btn.textContent = isZh ? 'EN' : '中文';
        });
    }
    
    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', updateButton);
    } else {
        updateButton();
    }
})();

// Language Toggle System for Mystery History Website
// Switches between separate files using Vercel clean URLs (no .html extension)

(function() {
    // Detect if current page is Chinese version
    function isChinesePage() {
        const path = window.location.pathname;
        // Simply check if the path ends with -zh or -zh.html
        return path.endsWith('-zh') || path.endsWith('-zh.html') || path === '/index-zh';
    }
    
    // Get current base path (directory or root)
    function getBasePath() {
        const path = window.location.pathname;
        const lastSlash = path.lastIndexOf('/');
        if (lastSlash <= 0) {
            return '/';
        }
        return path.substring(0, lastSlash + 1);
    }
    
    // Get page name without extension
    function getPageName() {
        const path = window.location.pathname;
        // Handle root path
        if (path === '/' || path === '' || path === '/index' || path === '/index.html') {
            return 'index';
        }
        // Remove trailing slash if present
        let cleanPath = path.endsWith('/') ? path.slice(0, -1) : path;
        // Get last segment
        const segments = cleanPath.split('/');
        let pageName = segments[segments.length - 1];
        // Remove .html extension if present (for local dev)
        if (pageName.endsWith('.html')) {
            pageName = pageName.replace('.html', '');
        }
        return pageName;
    }
    
    // Toggle language by navigating to corresponding file
    window.toggleLanguage = function() {
        const basePath = getBasePath();
        const pageName = getPageName();
        
        let newPageName;
        if (pageName.endsWith('-zh')) {
            // Switch to English version - remove -zh suffix
            newPageName = pageName.replace(/-zh$/, '');
            // Handle empty result (e.g., index-zh -> '')
            if (newPageName === '' || newPageName === '-') {
                newPageName = 'index';
            }
        } else {
            // Switch to Chinese version - add -zh suffix
            newPageName = pageName + '-zh';
        }
        
        // Build new URL
        let newUrl;
        if (basePath === '/' && newPageName === 'index') {
            newUrl = '/index';
        } else {
            newUrl = basePath + newPageName;
        }
        
        window.location.href = newUrl;
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

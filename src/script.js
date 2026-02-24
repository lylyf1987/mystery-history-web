/**
 * Mystery History - Interactive Features
 * - Dark Mode Toggle with localStorage persistence
 * - Reading Progress Bar
 * - Back to Top Button
 */

(function() {
    'use strict';
    
    // ============================================
    // Dark Mode Toggle
    // ============================================
    
    const themeToggle = document.querySelector('.theme-toggle');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Get saved theme or use system preference
    function getTheme() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            return savedTheme;
        }
        return prefersDark.matches ? 'dark' : 'light';
    }
    
    // Apply theme to document
    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        updateThemeIcon(theme);
    }
    
    // Update toggle button icon
    function updateThemeIcon(theme) {
        if (themeToggle) {
            themeToggle.innerHTML = theme === 'dark' ? '☀️' : '🌙';
            themeToggle.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
        }
    }
    
    // Toggle theme
    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    }
    
    // Initialize theme
    setTheme(getTheme());
    
    // Add click listener
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    // Listen for system theme changes
    prefersDark.addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            setTheme(e.matches ? 'dark' : 'light');
        }
    });
    
    // ============================================
    // Reading Progress Bar
    // ============================================
    
    const progressBar = document.querySelector('.progress-bar');
    const articleContent = document.querySelector('.article-content');
    
    function updateReadingProgress() {
        if (!progressBar) return;
        
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        
        if (docHeight > 0) {
            const progress = (scrollTop / docHeight) * 100;
            progressBar.style.width = Math.min(progress, 100) + '%';
        }
    }
    
    // Throttle scroll events
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
        }
        scrollTimeout = window.requestAnimationFrame(updateReadingProgress);
    }, { passive: true });
    
    // Initial update
    updateReadingProgress();
    
    // ============================================
    // Back to Top Button
    // ============================================
    
    const backToTop = document.querySelector('.back-to-top');
    
    function toggleBackToTop() {
        if (!backToTop) return;
        
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }
    
    if (backToTop) {
        // Show/hide based on scroll position
        window.addEventListener('scroll', () => {
            if (scrollTimeout) {
                window.cancelAnimationFrame(scrollTimeout);
            }
            scrollTimeout = window.requestAnimationFrame(toggleBackToTop);
        }, { passive: true });
        
        // Scroll to top on click
        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // ============================================
    // Add Theme Toggle to Header (if not present)
    // ============================================
    
    function addThemeToggle() {
        const siteNav = document.querySelector('.site-nav');
        if (siteNav && !document.querySelector('.theme-toggle')) {
            const toggle = document.createElement('button');
            toggle.className = 'theme-toggle';
            toggle.setAttribute('aria-label', 'Toggle dark mode');
            toggle.innerHTML = getTheme() === 'dark' ? '☀️' : '🌙';
            toggle.addEventListener('click', toggleTheme);
            siteNav.appendChild(toggle);
        }
    }
    
    // ============================================
    // Add Progress Bar (if not present)
    // ============================================
    
    function addProgressBar() {
        if (!document.querySelector('.progress-bar')) {
            const bar = document.createElement('div');
            bar.className = 'progress-bar';
            document.body.insertBefore(bar, document.body.firstChild);
        }
    }
    
    // ============================================
    // Add Back to Top Button (if not present)
    // ============================================
    
    function addBackToTop() {
        if (!document.querySelector('.back-to-top')) {
            const btn = document.createElement('button');
            btn.className = 'back-to-top';
            btn.setAttribute('aria-label', 'Back to top');
            btn.innerHTML = '↑';
            btn.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
            document.body.appendChild(btn);
        }
    }
    
    // Initialize all components
    document.addEventListener('DOMContentLoaded', () => {
        addProgressBar();
        addThemeToggle();
        addBackToTop();
        updateReadingProgress();
    });
    
})();

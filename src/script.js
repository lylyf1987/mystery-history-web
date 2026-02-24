/**
 * Mystery History - Interactive Features
 * - Reading Progress Bar
 * - Back to Top Button
 */

(function() {
    'use strict';
    
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
        addBackToTop();
        updateReadingProgress();
    });
    
})();

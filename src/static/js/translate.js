// Language Toggle System for Mystery History Website
// Clean implementation with proper translations

(function() {
    // Translation dictionary: English -> Chinese
    const translations = {
        'Home': '首页',
        'About': '关于我们',
        'Mystery History': '神秘历史',
        'Explore Stories': '探索故事',
        'Ancient Mysteries': '古代之谜',
        'Enigmas from antiquity that defy explanation': '来自远古的难解之谜',
        'Interesting History': '趣味历史',
        'Fascinating lesser-known stories from world history': '世界历史中鲜为人知的精彩故事',
        'Unknown Phenomena': '未解之谜',
        'UFOs, paranormal events, and unexplained mysteries': '不明飞行物、超自然现象和未解之谜',
        'All rights reserved.': '版权所有。',
        'Back to Categories': '返回分类'
    };


    // Current language state
    let currentLang = localStorage.getItem('preferredLanguage') || 'en';

    // Initialize on page load
    document.addEventListener('DOMContentLoaded', function() {
        if (currentLang === 'zh') {
            applyTranslations();
        }
        updateToggleButton();
    });

    // Toggle language function
    window.toggleLanguage = function() {
        currentLang = currentLang === 'en' ? 'zh' : 'en';
        localStorage.setItem('preferredLanguage', currentLang);
        
        if (currentLang === 'zh') {
            applyTranslations();
        } else {
            restoreEnglish();
        }
        updateToggleButton();
    };

    function applyTranslations() {
        document.querySelectorAll('[data-translate]').forEach(function(el) {
            const key = el.getAttribute('data-translate');
            if (translations[key]) {
                if (!el.getAttribute('data-original')) {
                    el.setAttribute('data-original', el.textContent.trim());
                }
                el.textContent = translations[key];
            }
        });
    }

    function restoreEnglish() {
        document.querySelectorAll('[data-translate]').forEach(function(el) {
            const original = el.getAttribute('data-original');
            if (original) {
                el.textContent = original;
            }
        });
    }

    function updateToggleButton() {
        const btn = document.getElementById('langToggle');
        if (btn) {
            btn.textContent = currentLang === 'en' ? 'EN | 中文' : 'EN | 中文';
        }
    }
})();

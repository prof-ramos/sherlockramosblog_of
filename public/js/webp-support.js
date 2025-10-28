// WebP Support Detection
// Adds 'webp' or 'no-webp' class to HTML element for CSS targeting

(function() {
    'use strict';
    
    function supportsWebP() {
        const canvas = document.createElement('canvas');
        
        if (!!(canvas.getContext && canvas.getContext('2d'))) {
            // WebP support detected through data URI
            return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
        }
        
        return false;
    }
    
    // Add class to HTML element
    if (supportsWebP()) {
        document.documentElement.classList.add('webp');
        console.log('[WebP] Browser supports WebP format');
    } else {
        document.documentElement.classList.add('no-webp');
        console.log('[WebP] Browser does NOT support WebP, using fallback');
    }
})();

document.addEventListener('DOMContentLoaded', () => {
    // Initialize LoadUp Partner
    const initLoadUp = () => {
        if (typeof LoadUp !== 'undefined') {
            LoadUp.setPartner('https://junk-removal-webpage-lt4p.vercel.app/');
            const iframe = document.querySelector('#quote-form iframe');
            if (iframe) {
                // Fix iframe styling
                iframe.style.background = 'transparent';
                iframe.style.border = 'none';
                
                // Force scrollable container
                const forceScroll = () => {
                    try {
                        iframe.style.height = '1000px';
                        iframe.style.overflowY = 'scroll';
                        
                        // Access iframe document if permitted
                        if (iframe.contentDocument) {
                            iframe.contentDocument.body.style.overflowY = 'visible';
                            iframe.contentDocument.body.style.minHeight = '1000px';
                        }
                    } catch (e) {
                        console.log('Cross-origin iframe restrictions apply');
                    }
                };
                
                // Initial fix
                forceScroll();
                
                // Ongoing monitoring
                const resizeObserver = new ResizeObserver(forceScroll);
                resizeObserver.observe(iframe);
                
                // Periodic checks (for dynamic content)
                const scrollCheck = setInterval(() => {
                    if (iframe.scrollHeight > iframe.clientHeight) {
                        iframe.style.height = iframe.scrollHeight + 'px';
                    }
                }, 1000);
                
                // Cleanup when iframe unloads
                iframe.addEventListener('load', () => {
                    clearInterval(scrollCheck);
                    forceScroll();
                });
            }
        } else {
            setTimeout(initLoadUp, 500);
        }
    };

    // Cyber CTA Handler
    const cta = document.getElementById('mainCta');
    cta.addEventListener('click', () => {
        document.getElementById('quote-form').scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
        
        // Add energy pulse effect
        const pulse = document.createElement('div');
        pulse.className = 'cta-pulse';
        cta.appendChild(pulse);
        setTimeout(() => pulse.remove(), 1000);
    });

    // Dynamic Styles - Added iframe fixes
    const cyberStyles = document.createElement('style');
    cyberStyles.textContent = `
        /* CTA Effects */
        .cta-pulse {
            position: absolute;
            width: 100%;
            height: 100%;
            border: 2px solid var(--neon-cyan);
            border-radius: 4px;
            animation: pulseExpand 1s ease-out;
        }
        
        @keyframes pulseExpand {
            from { transform: scale(1); opacity: 1; }
            to { transform: scale(1.5); opacity: 0; }
        }
        
        /* Iframe Fixes */
        #quote-form {
            min-height: 1000px !important;
            overflow: visible !important;
            -webkit-overflow-scrolling: touch !important;
        }
        
        #quote-form iframe {
            height: 1000px !important;
            overflow-y: scroll !important;
            pointer-events: auto !important;
        }
        
        @media (max-width: 768px) {
            #quote-form {
                min-height: 1200px !important;
            }
        }
    `;
    document.head.appendChild(cyberStyles);

    // Start LoadUp verification
    initLoadUp();
    
    // Fallback check every 3 seconds
    const fallbackCheck = setInterval(() => {
        const iframe = document.querySelector('#quote-form iframe');
        if (iframe && iframe.contentDocument) {
            try {
                iframe.contentDocument.body.style.overflowY = 'scroll';
                clearInterval(fallbackCheck);
            } catch (e) {
                // Cross-origin error
            }
        }
    }, 3000);
});

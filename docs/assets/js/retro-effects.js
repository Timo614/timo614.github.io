// Retro Terminal Effects for Cosmic Bee Blog

document.addEventListener('DOMContentLoaded', function() {
    
    // Typing effect for titles
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            } else {
                element.classList.add('terminal-cursor');
            }
        }
        type();
    }
    
    // Apply typing effect to main title on home page
    const mainTitle = document.querySelector('.terminal-welcome h1');
    if (mainTitle) {
        const titleText = mainTitle.textContent;
        typeWriter(mainTitle, titleText, 150);
    }
    
    // Matrix rain effect (subtle)
    function createMatrixRain() {
        const canvas = document.createElement('canvas');
        canvas.className = 'matrix-bg';
        document.body.appendChild(canvas);
        
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        const chars = '01';
        const charArray = chars.split('');
        const fontSize = 14;
        const columns = canvas.width / fontSize;
        const drops = [];
        
        for (let x = 0; x < columns; x++) {
            drops[x] = 1;
        }
        
        function draw() {
            ctx.fillStyle = 'rgba(10, 10, 10, 0.04)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.fillStyle = '#ffd700';
            ctx.font = fontSize + 'px Share Tech Mono';
            
            for (let i = 0; i < drops.length; i++) {
                const text = charArray[Math.floor(Math.random() * charArray.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        }
        
        setInterval(draw, 100);
        
        // Resize handler
        window.addEventListener('resize', function() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }
    
    // Create matrix effect on all pages
    createMatrixRain();
    
    // Terminal prompt effect for code blocks
    const codeBlocks = document.querySelectorAll('pre');
    codeBlocks.forEach(block => {
        if (!block.querySelector('code')) return;
        
        const prompt = document.createElement('div');
        prompt.className = 'terminal-prompt';
        prompt.innerHTML = '<span class="prompt-user">cosmic-bee@terminal</span><span class="prompt-path">:~$</span> ';
        block.insertBefore(prompt, block.firstChild);
    });
    
    // Glitch effect on hover for images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('mouseenter', function() {
            this.style.filter = 'hue-rotate(90deg) saturate(1.5)';
            this.style.transform = 'scale(1.02)';
            this.style.transition = 'all 0.3s ease';
        });
        
        img.addEventListener('mouseleave', function() {
            this.style.filter = 'none';
            this.style.transform = 'scale(1)';
        });
    });
    
    // Terminal beep sound effect (visual)
    function terminalBeep() {
        const flash = document.createElement('div');
        flash.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(255, 255, 0, 0.1);
            pointer-events: none;
            z-index: 9999;
            animation: flash 0.1s ease-out;
        `;
        
        const style = document.createElement('style');
        style.textContent = `
            @keyframes flash {
                0% { opacity: 0; }
                50% { opacity: 1; }
                100% { opacity: 0; }
            }
        `;
        document.head.appendChild(style);
        document.body.appendChild(flash);
        
        setTimeout(() => {
            document.body.removeChild(flash);
            document.head.removeChild(style);
        }, 100);
    }
    
    // Add beep effect to certain interactions
    const buttons = document.querySelectorAll('.btn, a[href^="#"]');
    buttons.forEach(button => {
        button.addEventListener('click', terminalBeep);
    });
    
    // Console welcome message
    console.log(`
    ╔══════════════════════════════════════╗
    ║        COSMIC BEE TERMINAL v2.0      ║
    ║                                      ║
    ║  Welcome to the retro blog system!   ║
    ║  Type 'help' for available commands  ║
    ║                                      ║
    ║  Status: ONLINE                      ║
    ║  Mode: RETRO                         ║
    ║  Theme: 1980s TERMINAL               ║
    ╚══════════════════════════════════════╝
    `);
    
    // Easter egg: konami code
    let konamiCode = [];
    const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA
    
    document.addEventListener('keydown', function(e) {
        konamiCode.push(e.keyCode);
        if (konamiCode.length > konamiSequence.length) {
            konamiCode.shift();
        }
        
        if (konamiCode.join(',') === konamiSequence.join(',')) {
            // Activate super retro mode
            document.body.style.filter = 'hue-rotate(180deg) saturate(2)';
            terminalBeep();
            console.log('🐝 SUPER RETRO MODE ACTIVATED! 🐝');
            
            setTimeout(() => {
                document.body.style.filter = 'none';
            }, 3000);
        }
    });
});
const PUZZLE_DATA = [
    {
        question: "اسم المدينة المفقودة",
        answers: ["سيبار", "sippar"]
    },
    {
        question: "اربعة ارقام التاريخ",
        answers: ["1768"]
    },
    {
        question: "اسم التلة",
        answers: ["تل أبو حبة", "تل ابو حبة", "تل ابوحبة"]
    },
    {
        question: "اسم المملكة الجبلية",
        answers: ["أورارتو", "urartu", "اورارتو"]
    }
];

let currentQuestionIndex = 0;

// Generate random IP address for effect
function generateRandomIP() {
    return `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
}

// Set random IP on page load
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('fakeIP').textContent = generateRandomIP();
    
    const codeInput = document.getElementById('codeInput');
    const submitBtn = document.getElementById('submitBtn');
    const errorMsg = document.getElementById('errorMsg');
    
    // Focus on input when page loads
    codeInput.focus();
    
    // Submit on Enter key
    codeInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            checkCode();
        }
    });
    
    // Submit button click
    submitBtn.addEventListener('click', checkCode);
    
    function checkCode() {
        const userInput = codeInput.value.trim().toLowerCase();
        const currentPuzzle = PUZZLE_DATA[currentQuestionIndex];
        
        if (userInput === '') {
            showError('> ERROR: ANSWER REQUIRED');
            return;
        }
        
        const isCorrect = currentPuzzle.answers.some(ans => ans.toLowerCase() === userInput);
        
        if (isCorrect) {
            currentQuestionIndex++;
            
            if (currentQuestionIndex < PUZZLE_DATA.length) {
                // Move to next question
                const nextQuestion = PUZZLE_DATA[currentQuestionIndex].question;
                document.getElementById('questionLabel').textContent = nextQuestion;
                codeInput.value = '';
                
                // Success notification in green
                errorMsg.style.color = '#00ff00';
                showError('> CORRECT. NEXT QUESTION...');
                
                setTimeout(() => {
                    errorMsg.textContent = '';
                }, 2000);
            } else {
                // All questions answered!
                grantAccess();
            }
        } else {
            // Wrong answer
            errorMsg.style.color = ''; // Reset to default error color (red)
            showError('> ACCESS DENIED: INCORRECT ANSWER');
            codeInput.value = '';
            codeInput.focus();
            
            // Add shake effect to panel
            const panel = document.querySelector('.access-panel');
            panel.style.animation = 'none';
            setTimeout(() => {
                panel.style.animation = '';
            }, 10);
        }
    }
    
    function showError(message) {
        errorMsg.textContent = message;
        errorMsg.style.animation = 'none';
        setTimeout(() => {
            errorMsg.style.animation = 'shake 0.5s';
        }, 10);
    }
    
    function grantAccess() {
        errorMsg.textContent = '';
        const container = document.querySelector('.container');
        
        // Success animation
        container.classList.add('success');
        
        // Show success message
        errorMsg.style.color = '#00ff00';
        errorMsg.textContent = '> ACCESS GRANTED';
        errorMsg.style.animation = 'none';
        
        // Disable input
        codeInput.disabled = true;
        submitBtn.disabled = true;
        
        // Create loading effect
        let dots = 0;
        const loadingInterval = setInterval(() => {
            dots = (dots + 1) % 4;
            errorMsg.textContent = '> ACCESS GRANTED - REDIRECTING' + '.'.repeat(dots);
        }, 300);
        
        // Redirect to level 2 after 2 seconds
        setTimeout(() => {
            clearInterval(loadingInterval);
            window.location.href = 'level2.html';
        }, 2000);
    }
});

// Add matrix rain effect in background (optional enhancement)
function createMatrixRain() {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '1';
    canvas.style.opacity = '0.1';
    canvas.style.pointerEvents = 'none';
    document.body.insertBefore(canvas, document.body.firstChild);
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);
    
    function draw() {
        ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#00ff00';
        ctx.font = fontSize + 'px monospace';
        
        for (let i = 0; i < drops.length; i++) {
            const text = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    setInterval(draw, 33);
}

// Uncomment to enable matrix rain effect
// createMatrixRain();

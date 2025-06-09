// DOM Elements
const calculateBtn = document.querySelector('#cal');
const resetBtn = document.querySelector('#reset');
const oddSemInput = document.getElementById('oddSem');
const evenSemInput = document.getElementById('evenSem');
const totalMarksInput = document.getElementById('totalMarks');
const resultElements = {
    totalMarks: document.getElementById('one'),
    marksObtained: document.getElementById('two'),
    percentage: document.getElementById('three'),
    warning: document.getElementById('warning'),
    warningText: document.querySelector('.warning-text')
};

// Animation utilities
const animateResult = (element, value, delay = 0) => {
    setTimeout(() => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(10px)';
        
        setTimeout(() => {
            element.textContent = value;
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 150);
    }, delay);
};

const showWarning = (message) => {
    resultElements.warningText.textContent = message;
    resultElements.warning.classList.add('show');
};

const hideWarning = () => {
    resultElements.warning.classList.remove('show');
    setTimeout(() => {
        resultElements.warningText.textContent = '';
    }, 300);
};

// Input validation
const validateInputs = (marks1, marks2, total) => {
    if (isNaN(marks1) || isNaN(marks2) || isNaN(total)) {
        return 'Please enter valid numbers for all fields.';
    }
    
    if (marks1 < 0 || marks1 > 10) {
        return 'Odd semester SGPA should be between 0 and 10.';
    }
    
    if (marks2 < 0 || marks2 > 10) {
        return 'Even semester SGPA should be between 0 and 10.';
    }
    
    if (total <= 0) {
        return 'Total marks should be greater than 0.';
    }
    
    return null;
};

// Enhanced button click animation
const addButtonAnimation = (button) => {
    const ripple = document.createElement('div');
    ripple.classList.add('ripple');
    
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = (event.clientX - rect.left - size / 2) + 'px';
    ripple.style.top = (event.clientY - rect.top - size / 2) + 'px';
    
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
};

// Add CSS for ripple effect
const addRippleStyles = () => {
    const style = document.createElement('style');
    style.textContent = `
        .btn {
            position: relative;
            overflow: hidden;
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
};

// Input focus animations
const addInputAnimations = () => {
    const inputs = document.querySelectorAll('.form-input');
    
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('focused');
            }
        });
        
        // Auto-fill animation
        input.addEventListener('input', () => {
            if (input.value) {
                input.parentElement.classList.add('has-value');
            } else {
                input.parentElement.classList.remove('has-value');
            }
        });
    });
};

// Loading animation for calculate button
const showLoadingState = (button) => {
    const originalContent = button.innerHTML;
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Calculating...';
    button.disabled = true;
    
    return () => {
        setTimeout(() => {
            button.innerHTML = originalContent;
            button.disabled = false;
        }, 800);
    };
};

// Calculate functionality with enhanced UX
calculateBtn.addEventListener('click', (event) => {
    // Add ripple effect
    addButtonAnimation(calculateBtn);
    
    // Get input values
    const marks1 = parseFloat(oddSemInput.value);
    const marks2 = parseFloat(evenSemInput.value);
    const total = parseFloat(totalMarksInput.value);
    
    // Validate inputs
    const validationError = validateInputs(marks1, marks2, total);
    if (validationError) {
        showWarning(validationError);
        return;
    }
    
    // Show loading state
    const resetButton = showLoadingState(calculateBtn);
    
    // Hide previous warning
    hideWarning();
    
    // Perform calculations (same logic as original)
    const avg1 = (marks1 + marks2) / 2;
    const percentage = (avg1 * 10) - 5;
    const obtainedMarks = (percentage * total) / 100;
    
    // Animate results with staggered timing
    setTimeout(() => {
        animateResult(resultElements.totalMarks, total.toString(), 0);
        animateResult(resultElements.marksObtained, obtainedMarks.toFixed(2), 200);
        animateResult(resultElements.percentage, `${percentage.toPrecision(4)}%`, 400);
        
        // Show warning with delay
        setTimeout(() => {
            showWarning('** Result may be wrong, recheck yourself');
        }, 600);
        
        // Reset button state
        resetButton();
    }, 500);
});

// Reset functionality with enhanced UX
resetBtn.addEventListener('click', (event) => {
    // Add ripple effect
    addButtonAnimation(resetBtn);
    
    // Animate reset
    const elements = [resultElements.totalMarks, resultElements.marksObtained, resultElements.percentage];
    
    elements.forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(-10px)';
            
            setTimeout(() => {
                element.textContent = '-';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, 150);
        }, index * 100);
    });
    
    // Hide warning
    hideWarning();
    
    // Clear and animate inputs
    const inputs = [oddSemInput, evenSemInput, totalMarksInput];
    inputs.forEach((input, index) => {
        setTimeout(() => {
            input.style.transform = 'scale(0.95)';
            setTimeout(() => {
                input.value = '';
                input.style.transform = 'scale(1)';
                input.parentElement.classList.remove('has-value', 'focused');
            }, 100);
        }, index * 50);
    });
});

// Keyboard shortcuts
document.addEventListener('keydown', (event) => {
    if (event.ctrlKey || event.metaKey) {
        switch(event.key) {
            case 'Enter':
                event.preventDefault();
                calculateBtn.click();
                break;
            case 'r':
                event.preventDefault();
                resetBtn.click();
                break;
        }
    } else if (event.key === 'Enter') {
        event.preventDefault();
        calculateBtn.click();
    }
});

// Form submission prevention
document.getElementById('marksForm').addEventListener('submit', (event) => {
    event.preventDefault();
    calculateBtn.click();
});

// Auto-focus next input on Enter
const inputs = [oddSemInput, evenSemInput, totalMarksInput];
inputs.forEach((input, index) => {
    input.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            if (index < inputs.length - 1) {
                inputs[index + 1].focus();
            } else {
                calculateBtn.click();
            }
        }
    });
});

// Number input restrictions
const restrictNumberInput = (input, min = 0, max = 10) => {
    input.addEventListener('input', (event) => {
        let value = parseFloat(event.target.value);
        if (value < min) {
            event.target.value = min;
        } else if (value > max) {
            event.target.value = max;
        }
    });
};

// Apply restrictions to SGPA inputs
restrictNumberInput(oddSemInput, 0, 10);
restrictNumberInput(evenSemInput, 0, 10);
restrictNumberInput(totalMarksInput, 1, 9999);

// Smooth scroll to results after calculation
const scrollToResults = () => {
    const resultsContainer = document.querySelector('.results-container');
    resultsContainer.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'nearest' 
    });
};

// Add visual feedback for successful calculation
const showSuccessState = () => {
    const resultCards = document.querySelectorAll('.result-card');
    resultCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.transform = 'scale(1.02)';
            setTimeout(() => {
                card.style.transform = 'scale(1)';
            }, 200);
        }, index * 100);
    });
};

// Enhanced calculate function with success animation
const enhancedCalculate = () => {
    const marks1 = parseFloat(oddSemInput.value);
    const marks2 = parseFloat(evenSemInput.value);
    const total = parseFloat(totalMarksInput.value);
    
    const validationError = validateInputs(marks1, marks2, total);
    if (validationError) {
        showWarning(validationError);
        return;
    }
    
    const resetButton = showLoadingState(calculateBtn);
    hideWarning();
    
    const avg1 = (marks1 + marks2) / 2;
    const percentage = (avg1 * 10) - 5;
    const obtainedMarks = (percentage * total) / 100;
    
    setTimeout(() => {
        animateResult(resultElements.totalMarks, total.toString(), 0);
        animateResult(resultElements.marksObtained, obtainedMarks.toFixed(2), 200);
        animateResult(resultElements.percentage, `${percentage.toPrecision(4)}%`, 400);
        
        setTimeout(() => {
            showWarning('** Result may be wrong, recheck yourself');
            showSuccessState();
            scrollToResults();
        }, 600);
        
        resetButton();
    }, 500);
};

// Update calculate button event listener
calculateBtn.removeEventListener('click', calculateBtn.onclick);
calculateBtn.addEventListener('click', (event) => {
    addButtonAnimation(calculateBtn);
    enhancedCalculate();
});

// Initialize animations and effects
document.addEventListener('DOMContentLoaded', () => {
    addRippleStyles();
    addInputAnimations();
    
    // Add subtle entrance animations to form elements
    const formElements = document.querySelectorAll('.input-wrapper, .btn');
    formElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.6s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 100 + 500);
    });
});

// Add floating labels effect
const addFloatingLabels = () => {
    const style = document.createElement('style');
    style.textContent = `
        .input-wrapper.focused .input-label,
        .input-wrapper.has-value .input-label {
            transform: translateY(-8px) scale(0.9);
            color: var(--primary-gradient);
        }
        
        .input-label {
            transition: all 0.3s ease;
            transform-origin: left center;
        }
    `;
    document.head.appendChild(style);
};

// Particle effect for successful calculation
const createParticles = () => {
    const colors = ['#667eea', '#764ba2', '#f093fb', '#f5576c'];
    const particleCount = 15;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: 8px;
            height: 8px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
            left: 50%;
            top: 50%;
            animation: particle-burst 1.5s ease-out forwards;
        `;
        
        const angle = (360 / particleCount) * i;
        const velocity = 100 + Math.random() * 100;
        
        particle.style.setProperty('--angle', `${angle}deg`);
        particle.style.setProperty('--velocity', `${velocity}px`);
        
        document.body.appendChild(particle);
        
        setTimeout(() => particle.remove(), 1500);
    }
};

// Add particle animation CSS
const addParticleStyles = () => {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes particle-burst {
            0% {
                opacity: 1;
                transform: translate(-50%, -50%) rotate(var(--angle)) translateX(0) scale(1);
            }
            100% {
                opacity: 0;
                transform: translate(-50%, -50%) rotate(var(--angle)) translateX(var(--velocity)) scale(0);
            }
        }
    `;
    document.head.appendChild(style);
};

// Initialize all effects
addFloatingLabels();
addParticleStyles();
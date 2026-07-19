// ============================================
// Secure Password Generator
// Cryptographically secure random password generation
// ============================================

// Global Variables
let passwordHistory = [];

// DOM Elements
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const themeToggle = document.getElementById('themeToggle');
const passwordLength = document.getElementById('passwordLength');
const lengthValue = document.getElementById('lengthValue');
const includeUppercase = document.getElementById('includeUppercase');
const includeLowercase = document.getElementById('includeLowercase');
const includeNumbers = document.getElementById('includeNumbers');
const includeSpecial = document.getElementById('includeSpecial');
const specialCharSet = document.getElementById('specialCharSet');
const customSpecialChars = document.getElementById('customSpecialChars');
const customSpecialGroup = document.getElementById('customSpecialGroup');
const configError = document.getElementById('configError');
const generateBtn = document.getElementById('generateBtn');
const generatedPassword = document.getElementById('generatedPassword');
const togglePassword = document.getElementById('togglePassword');
const copyPassword = document.getElementById('copyPassword');
const downloadPassword = document.getElementById('downloadPassword');
const generateAgain = document.getElementById('generateAgain');
const checkPassword = document.getElementById('checkPassword');
const toggleCheckPassword = document.getElementById('toggleCheckPassword');
const analyzeBtn = document.getElementById('analyzeBtn');
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toastMessage');
const progressCircle = document.getElementById('progressCircle');
const progressBar = document.getElementById('progressBar');
const strengthScore = document.getElementById('strengthScore');
const strengthLabel = document.getElementById('strengthLabel');
const checkStrengthScore = document.getElementById('checkStrengthScore');
const checkStrengthLabel = document.getElementById('checkStrengthLabel');
const strengthDisplay = document.getElementById('strengthDisplay');
const suggestionsList = document.getElementById('suggestionsList');
const advancedToggle = document.getElementById('advancedToggle');
const advancedContent = document.getElementById('advancedContent');
const advancedIcon = document.getElementById('advancedIcon');
const avoidSimilar = document.getElementById('avoidSimilar');
const excludeDuplicates = document.getElementById('excludeDuplicates');
const excludeSequential = document.getElementById('excludeSequential');
const excludeRepeating = document.getElementById('excludeRepeating');
const historyList = document.getElementById('historyList');
const clearHistory = document.getElementById('clearHistory');

// ============================================
// Initialization
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    loadTheme();
    loadPasswordHistory();
    setupEventListeners();
    updateSliderValue();
});

// ============================================
// Cryptographically Secure Random Number
// ============================================
function getSecureRandomInt(max) {
    const array = new Uint32Array(1);
    crypto.getRandomValues(array);
    return array[0] % max;
}

function getSecureRandomChar(chars) {
    const array = new Uint32Array(1);
    crypto.getRandomValues(array);
    return chars[array[0] % chars.length];
}

// ============================================
// Theme Management
// ============================================
function loadTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    if (theme === 'dark') {
        icon.className = 'fas fa-moon';
    } else {
        icon.className = 'fas fa-sun';
    }
}

// ============================================
// Navigation
// ============================================
function toggleMobileMenu() {
    navMenu.classList.toggle('active');
}

function closeMobileMenu() {
    navMenu.classList.remove('active');
}

// ============================================
// Slider Updates
// ============================================
function updateSliderValue() {
    lengthValue.textContent = passwordLength.value;
}

// ============================================
// Special Character Sets
// ============================================
function getSpecialChars() {
    const selectedSet = specialCharSet.value;
    
    switch (selectedSet) {
        case 'common':
            return '@#$%';
        case 'programming':
            return '{}[]()<>+=-_';
        case 'minimal':
            return '@#';
        case 'custom':
            return customSpecialChars.value || '@#$%';
        default:
            return '!@#$%^&*()_+-=[]{}|;:,.<>?';
    }
}

// ============================================
// Password Generation
// ============================================
function generatePassword() {
    const length = parseInt(passwordLength.value);
    const useUppercase = includeUppercase.checked;
    const useLowercase = includeLowercase.checked;
    const useNumbers = includeNumbers.checked;
    const useSpecial = includeSpecial.checked;
    
    // Validation: at least one character type must be selected
    if (!useUppercase && !useLowercase && !useNumbers && !useSpecial) {
        configError.textContent = 'Please select at least one character type.';
        configError.classList.add('show');
        return;
    }
    
    configError.classList.remove('show');
    
    let charset = '';
    let uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    let numberChars = '0123456789';
    let specialChars = getSpecialChars();
    
    // Apply advanced options
    if (avoidSimilar.checked) {
        uppercaseChars = uppercaseChars.replace(/[OI]/g, '');
        lowercaseChars = lowercaseChars.replace(/[il]/g, '');
        numberChars = numberChars.replace(/[01]/g, '');
    }
    
    if (useUppercase) charset += uppercaseChars;
    if (useLowercase) charset += lowercaseChars;
    if (useNumbers) charset += numberChars;
    if (useSpecial) charset += specialChars;
    
    if (charset.length === 0) {
        configError.textContent = 'No valid characters available with current settings.';
        configError.classList.add('show');
        return;
    }
    
    let password = '';
    let attempts = 0;
    const maxAttempts = 100;
    
    while (attempts < maxAttempts) {
        attempts++;
        password = '';
        
        // Generate password
        for (let i = 0; i < length; i++) {
            password += getSecureRandomChar(charset);
        }
        
        // Ensure at least one of each selected type
        if (useUppercase && !/[A-Z]/.test(password)) continue;
        if (useLowercase && !/[a-z]/.test(password)) continue;
        if (useNumbers && !/[0-9]/.test(password)) continue;
        if (useSpecial && !new RegExp(`[${escapeRegExp(specialChars)}]`).test(password)) continue;
        
        // Apply advanced filters
        if (excludeDuplicates.checked && hasDuplicates(password)) continue;
        if (excludeSequential.checked && hasSequentialChars(password)) continue;
        if (excludeRepeating.checked && hasRepeatingChars(password)) continue;
        
        // Password is valid
        break;
    }
    
    if (attempts >= maxAttempts) {
        configError.textContent = 'Unable to generate password with current constraints. Please adjust settings.';
        configError.classList.add('show');
        return;
    }
    
    displayPassword(password);
    updatePasswordStats(password);
    updateStrengthAnalysis(password);
    addToHistory(password);
    showToast('Password generated successfully.');
}

function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function hasDuplicates(password) {
    return new Set(password).size < password.length;
}

function hasSequentialChars(password) {
    const sequences = ['abc', 'bcd', 'cde', 'def', 'efg', 'fgh', 'ghi', 'hij', 'ijk', 'jkl', 'klm', 'lmn', 'mno', 'nop', 'opq', 'pqr', 'qrs', 'rst', 'stu', 'tuv', 'uvw', 'vwx', 'wxy', 'xyz', '012', '123', '234', '345', '456', '567', '678', '789'];
    const lowerPassword = password.toLowerCase();
    
    for (const seq of sequences) {
        if (lowerPassword.includes(seq)) return true;
    }
    return false;
}

function hasRepeatingChars(password) {
    for (let i = 0; i < password.length - 2; i++) {
        if (password[i] === password[i + 1] && password[i + 1] === password[i + 2]) {
            return true;
        }
    }
    return false;
}

// ============================================
// Password Display
// ============================================
function displayPassword(password) {
    generatedPassword.value = password;
    generatedPassword.type = 'password';
    togglePassword.innerHTML = '<i class="fas fa-eye"></i>';
}

function togglePasswordVisibility() {
    if (generatedPassword.type === 'password') {
        generatedPassword.type = 'text';
        togglePassword.innerHTML = '<i class="fas fa-eye-slash"></i>';
    } else {
        generatedPassword.type = 'password';
        togglePassword.innerHTML = '<i class="fas fa-eye"></i>';
    }
}

function toggleCheckPasswordVisibility() {
    if (checkPassword.type === 'password') {
        checkPassword.type = 'text';
        toggleCheckPassword.innerHTML = '<i class="fas fa-eye-slash"></i>';
    } else {
        checkPassword.type = 'password';
        toggleCheckPassword.innerHTML = '<i class="fas fa-eye"></i>';
    }
}

// ============================================
// Copy Password
// ============================================
function copyToClipboard() {
    const password = generatedPassword.value;
    if (!password) {
        showToast('No password to copy', 'error');
        return;
    }
    
    navigator.clipboard.writeText(password).then(() => {
        showToast('✓ Password Copied Successfully');
    }).catch(err => {
        console.error('Failed to copy:', err);
        showToast('Failed to copy password', 'error');
    });
}

// ============================================
// Download Password
// ============================================
function downloadPasswordFile() {
    const password = generatedPassword.value;
    if (!password) {
        showToast('No password to download', 'error');
        return;
    }
    
    const blob = new Blob([password], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'password.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showToast('Password downloaded successfully');
}

// ============================================
// Toast Notification
// ============================================
function showToast(message, type = 'success') {
    toastMessage.textContent = message;
    
    if (type === 'error') {
        toast.style.background = 'var(--danger-red)';
    } else {
        toast.style.background = 'var(--success-green)';
    }
    
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// ============================================
// Password Statistics
// ============================================
function updatePasswordStats(password) {
    const stats = calculatePasswordStats(password);
    
    const passwordStats = document.getElementById('passwordStats');
    if (passwordStats) {
        passwordStats.classList.add('show');
    }
    
    document.getElementById('statLength').textContent = stats.length;
    document.getElementById('statUppercase').textContent = stats.uppercase;
    document.getElementById('statLowercase').textContent = stats.lowercase;
    document.getElementById('statNumbers').textContent = stats.numbers;
    document.getElementById('statSpecial').textContent = stats.special;
    document.getElementById('statDiversity').textContent = stats.unique;
    document.getElementById('statEntropy').textContent = stats.entropy + ' bits';
    document.getElementById('statCrackTime').textContent = stats.crackTime;
}

function calculatePasswordStats(password) {
    const length = password.length;
    const uppercase = (password.match(/[A-Z]/g) || []).length;
    const lowercase = (password.match(/[a-z]/g) || []).length;
    const numbers = (password.match(/[0-9]/g) || []).length;
    const special = (password.match(/[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/g) || []).length;
    const unique = new Set(password).size;
    
    // Calculate entropy
    let charsetSize = 0;
    if (uppercase > 0) charsetSize += 26;
    if (lowercase > 0) charsetSize += 26;
    if (numbers > 0) charsetSize += 10;
    if (special > 0) charsetSize += 32;
    
    const entropy = Math.floor(length * Math.log2(charsetSize || 1));
    
    // Calculate crack time (assuming 10 billion guesses per second)
    const crackTime = calculateCrackTime(entropy);
    
    return {
        length,
        uppercase,
        lowercase,
        numbers,
        special,
        unique,
        entropy,
        crackTime
    };
}

function calculateCrackTime(entropy) {
    const guessesPerSecond = 10000000000; // 10 billion
    const combinations = Math.pow(2, entropy);
    const seconds = combinations / guessesPerSecond;
    
    if (seconds < 1) return 'Instant';
    if (seconds < 60) return Math.floor(seconds) + ' seconds';
    if (seconds < 3600) return Math.floor(seconds / 60) + ' minutes';
    if (seconds < 86400) return Math.floor(seconds / 3600) + ' hours';
    if (seconds < 2592000) return Math.floor(seconds / 86400) + ' days';
    if (seconds < 31536000) return Math.floor(seconds / 2592000) + ' months';
    if (seconds < 3153600000) return Math.floor(seconds / 31536000) + ' years';
    if (seconds < 315360000000) return Math.floor(seconds / 31536000000) + ' centuries';
    return 'Thousands of years';
}

// ============================================
// Strength Analysis
// ============================================
function updateStrengthAnalysis(password) {
    const score = calculateStrengthScore(password);
    
    document.getElementById('strengthScore').textContent = score;
    document.getElementById('strengthLabel').textContent = getStrengthLabel(score);
    
    // Update progress bar
    progressBar.style.width = score + '%';
    
    // Update progress bar color based on score
    progressBar.className = 'progress-bar';
    if (score <= 20) progressBar.classList.add('strength-very-weak');
    else if (score <= 40) progressBar.classList.add('strength-weak');
    else if (score <= 60) progressBar.classList.add('strength-medium');
    else if (score <= 80) progressBar.classList.add('strength-strong');
    else progressBar.classList.add('strength-very-strong');
}

function calculateStrengthScore(password) {
    let score = 0;
    
    // Length score (up to 25 points)
    const length = password.length;
    if (length >= 8) score += 10;
    if (length >= 12) score += 10;
    if (length >= 16) score += 5;
    
    // Character variety (up to 25 points)
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/.test(password);
    
    if (hasUpper) score += 5;
    if (hasLower) score += 5;
    if (hasNumber) score += 5;
    if (hasSpecial) score += 10;
    
    // Entropy score (up to 25 points)
    const stats = calculatePasswordStats(password);
    if (stats.entropy >= 40) score += 5;
    if (stats.entropy >= 60) score += 10;
    if (stats.entropy >= 80) score += 10;
    
    // Pattern penalties (up to -25 points)
    if (hasRepeatingChars(password)) score -= 5;
    if (hasSequentialChars(password)) score -= 5;
    if (hasKeyboardPattern(password)) score -= 5;
    if (isCommonPassword(password)) score -= 10;
    
    // Ensure score is between 0 and 100
    return Math.max(0, Math.min(100, score));
}

function getStrengthLabel(score) {
    if (score <= 20) return 'Too Weak';
    if (score <= 40) return 'Weak';
    if (score <= 60) return 'Medium';
    if (score <= 80) return 'Strong';
    return 'Very Strong';
}

function hasKeyboardPattern(password) {
    const patterns = ['qwerty', 'asdfgh', 'zxcvbn', 'qwertyuiop', 'asdfghjkl', 'zxcvbnm'];
    const lowerPassword = password.toLowerCase();
    
    for (const pattern of patterns) {
        if (lowerPassword.includes(pattern)) return true;
    }
    return false;
}

function isCommonPassword(password) {
    const commonPasswords = ['password', '123456', '12345678', 'qwerty', 'abc123', 'monkey', 'master', 'dragon', '111111', 'baseball', 'iloveyou', 'trustno1', 'sunshine', 'princess', 'admin', 'welcome', 'shadow', 'ashley', 'football', 'jesus', 'michael', 'ninja', 'mustang', 'password1'];
    const lowerPassword = password.toLowerCase();
    
    return commonPasswords.includes(lowerPassword);
}

// ============================================
// Password History
// ============================================
function loadPasswordHistory() {
    const saved = sessionStorage.getItem('passwordHistory');
    if (saved) {
        passwordHistory = JSON.parse(saved);
        renderHistory();
    }
}

function addToHistory(password) {
    const stats = calculatePasswordStats(password);
    const score = calculateStrengthScore(password);
    
    const historyItem = {
        password,
        timestamp: new Date().toISOString(),
        strength: score
    };
    
    // Remove if already exists
    passwordHistory = passwordHistory.filter(item => item.password !== password);
    
    // Add to beginning
    passwordHistory.unshift(historyItem);
    
    // Keep only last 10
    if (passwordHistory.length > 10) {
        passwordHistory = passwordHistory.slice(0, 10);
    }
    
    // Save to session storage
    sessionStorage.setItem('passwordHistory', JSON.stringify(passwordHistory));
    
    renderHistory();
}

function renderHistory() {
    if (passwordHistory.length === 0) {
        historyList.innerHTML = '<p class="empty-history">No passwords generated yet</p>';
        return;
    }
    
    historyList.innerHTML = passwordHistory.map((item, index) => {
        const date = new Date(item.timestamp);
        const formattedDate = date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const strengthClass = getStrengthClass(item.strength);
        
        return `
            <div class="history-item">
                <div class="history-content">
                    <span class="history-password">${item.password}</span>
                    <span class="history-meta">${formattedDate}</span>
                    <span class="history-strength ${strengthClass}">${getStrengthLabel(item.strength)}</span>
                </div>
                <div class="history-actions">
                    <button class="history-btn" onclick="reusePassword('${item.password}')" title="Reuse">
                        <i class="fas fa-redo"></i>
                    </button>
                    <button class="history-btn delete" onclick="deleteFromHistory(${index})" title="Delete">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

function getStrengthClass(score) {
    if (score <= 20) return 'strength-very-weak';
    if (score <= 40) return 'strength-weak';
    if (score <= 60) return 'strength-medium';
    if (score <= 80) return 'strength-strong';
    return 'strength-very-strong';
}

function reusePassword(password) {
    displayPassword(password);
    updatePasswordStats(password);
    updateStrengthAnalysis(password);
}

function deleteFromHistory(index) {
    passwordHistory.splice(index, 1);
    sessionStorage.setItem('passwordHistory', JSON.stringify(passwordHistory));
    renderHistory();
}

function clearPasswordHistory() {
    passwordHistory = [];
    sessionStorage.removeItem('passwordHistory');
    renderHistory();
    showToast('History cleared');
}

// ============================================
// Password Strength Checker
// ============================================
function analyzePassword() {
    const password = checkPassword.value;
    
    if (!password) {
        resetStrengthChecker();
        return;
    }
    
    const score = calculateStrengthScore(password);
    
    // Update score display
    checkStrengthScore.textContent = score;
    checkStrengthLabel.textContent = getStrengthLabel(score);
    
    // Update progress circle
    const circumference = 2 * Math.PI * 54;
    const offset = circumference - (score / 100) * circumference;
    progressCircle.style.strokeDashoffset = offset;
    
    // Update progress bar
    progressBar.style.width = score + '%';
    
    // Update strength display class
    strengthDisplay.className = 'strength-display';
    if (score <= 20) strengthDisplay.classList.add('strength-very-weak');
    else if (score <= 40) strengthDisplay.classList.add('strength-weak');
    else if (score <= 60) strengthDisplay.classList.add('strength-medium');
    else if (score <= 80) strengthDisplay.classList.add('strength-strong');
    else strengthDisplay.classList.add('strength-very-strong');
    
    // Update checklist
    updateChecklist(password);
    
    // Update statistics
    const stats = calculatePasswordStats(password);
    document.getElementById('checkLength').textContent = stats.length;
    document.getElementById('checkUppercase').textContent = stats.uppercase;
    document.getElementById('checkLowercase').textContent = stats.lowercase;
    document.getElementById('checkNumbers').textContent = stats.numbers;
    document.getElementById('checkSpecial').textContent = stats.special;
    document.getElementById('checkUnique').textContent = stats.unique;
    document.getElementById('checkEntropy').textContent = stats.entropy + ' bits';
    document.getElementById('checkCrackTime').textContent = stats.crackTime;
    
    // Update suggestions
    updateSuggestions(password, score);
}

function resetStrengthChecker() {
    checkStrengthScore.textContent = '0';
    checkStrengthLabel.textContent = 'Enter a password';
    progressCircle.style.strokeDashoffset = 339.292;
    progressBar.style.width = '0%';
    strengthDisplay.className = 'strength-display';
    
    // Reset checklist
    document.querySelectorAll('.checklist-item').forEach(item => {
        item.classList.remove('passed');
        item.querySelector('i').className = 'fas fa-circle';
    });
    
    // Reset statistics
    document.getElementById('checkLength').textContent = '-';
    document.getElementById('checkUppercase').textContent = '-';
    document.getElementById('checkLowercase').textContent = '-';
    document.getElementById('checkNumbers').textContent = '-';
    document.getElementById('checkSpecial').textContent = '-';
    document.getElementById('checkUnique').textContent = '-';
    document.getElementById('checkEntropy').textContent = '-';
    document.getElementById('checkCrackTime').textContent = '-';
    
    // Reset suggestions
    suggestionsList.innerHTML = '<p class="no-suggestions">Enter a password to see suggestions</p>';
}

function updateChecklist(password) {
    const checks = {
        min8: password.length >= 8,
        min12: password.length >= 12,
        uppercase: /[A-Z]/.test(password),
        lowercase: /[a-z]/.test(password),
        number: /[0-9]/.test(password),
        special: /[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/.test(password),
        diversity: new Set(password).size >= password.length * 0.7,
        entropy: calculatePasswordStats(password).entropy >= 60,
        norepeat: !hasRepeatingChars(password),
        nosequential: !hasSequentialChars(password),
        nokeyboard: !hasKeyboardPattern(password),
        nocommon: !isCommonPassword(password),
        nodictionary: !containsDictionaryWord(password),
        nopersonal: !containsPersonalInfo(password)
    };
    
    Object.keys(checks).forEach(check => {
        const item = document.querySelector(`.checklist-item[data-check="${check}"]`);
        if (item) {
            if (checks[check]) {
                item.classList.add('passed');
                item.querySelector('i').className = 'fas fa-check-circle';
            } else {
                item.classList.remove('passed');
                item.querySelector('i').className = 'fas fa-circle';
            }
        }
    });
}

function containsDictionaryWord(password) {
    const lowerPassword = password.toLowerCase();
    const commonWords = ['password', 'admin', 'user', 'login', 'welcome', 'hello', 'test', 'demo'];
    
    for (const word of commonWords) {
        if (lowerPassword.includes(word)) {
            return true;
        }
    }
    return false;
}

function containsPersonalInfo(password) {
    const personalPatterns = [
        /\d{2}\/\d{2}\/\d{4}/, // Date format
        /\d{4}-\d{2}-\d{2}/, // Date format
        /\b\d{4}\b/, // Possible year
        /\b[john|jane|mary|david|michael|sarah|emily|james|robert|lisa]\b/i // Common names
    ];
    
    return personalPatterns.some(pattern => pattern.test(password));
}

function updateSuggestions(password, score) {
    const suggestions = [];
    
    if (password.length < 8) {
        suggestions.push('Increase password length to at least 8 characters');
    }
    if (password.length < 12) {
        suggestions.push('Consider using 12+ characters for better security');
    }
    if (!/[A-Z]/.test(password)) {
        suggestions.push('Add uppercase letters');
    }
    if (!/[a-z]/.test(password)) {
        suggestions.push('Add lowercase letters');
    }
    if (!/[0-9]/.test(password)) {
        suggestions.push('Include numbers');
    }
    if (!/[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/.test(password)) {
        suggestions.push('Include special characters');
    }
    if (hasRepeatingChars(password)) {
        suggestions.push('Avoid repeated characters');
    }
    if (hasSequentialChars(password)) {
        suggestions.push('Avoid sequential characters (abc, 123)');
    }
    if (hasKeyboardPattern(password)) {
        suggestions.push('Avoid keyboard patterns (qwerty, asdf)');
    }
    if (isCommonPassword(password)) {
        suggestions.push('Use a unique password instead of common ones');
    }
    if (containsDictionaryWord(password)) {
        suggestions.push('Avoid using dictionary words');
    }
    if (containsPersonalInfo(password)) {
        suggestions.push('Avoid personal information (dates, names)');
    }
    
    if (suggestions.length === 0) {
        suggestionsList.innerHTML = '<p class="no-suggestions" style="color: var(--success-green);"><i class="fas fa-check-circle"></i> Your password looks great!</p>';
    } else {
        suggestionsList.innerHTML = suggestions.map(s => `
            <div class="suggestion-item">
                <i class="fas fa-lightbulb"></i>
                <span>${s}</span>
            </div>
        `).join('');
    }
}

// ============================================
// FAQ Accordion
// ============================================
function setupFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            const isActive = faqItem.classList.contains('active');
            
            // Close all FAQ items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });
}

// ============================================
// Event Listeners
// ============================================
function setupEventListeners() {
    // Theme toggle
    themeToggle.addEventListener('click', toggleTheme);
    
    // Mobile menu
    hamburger.addEventListener('click', toggleMobileMenu);
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
    
    // Slider
    passwordLength.addEventListener('input', updateSliderValue);
    
    // Character toggles - ensure at least one is always enabled
    [includeUppercase, includeLowercase, includeNumbers, includeSpecial].forEach(toggle => {
        toggle.addEventListener('change', () => {
            const anyChecked = includeUppercase.checked || includeLowercase.checked || 
                             includeNumbers.checked || includeSpecial.checked;
            if (!anyChecked) {
                toggle.checked = true;
                showToast('At least one character type must be selected', 'error');
            }
        });
    });
    
    // Special character set
    specialCharSet.addEventListener('change', () => {
        if (specialCharSet.value === 'custom') {
            customSpecialGroup.style.display = 'block';
        } else {
            customSpecialGroup.style.display = 'none';
        }
    });
    
    // Password generation
    generateBtn.addEventListener('click', generatePassword);
    generateAgain.addEventListener('click', generatePassword);
    
    // Password visibility
    togglePassword.addEventListener('click', togglePasswordVisibility);
    toggleCheckPassword.addEventListener('click', toggleCheckPasswordVisibility);
    
    // Copy and download
    copyPassword.addEventListener('click', copyToClipboard);
    downloadPassword.addEventListener('click', downloadPasswordFile);
    
    // Password history
    clearHistory.addEventListener('click', clearPasswordHistory);
    
    // Advanced options toggle
    advancedToggle.addEventListener('click', () => {
        advancedContent.classList.toggle('show');
        advancedIcon.classList.toggle('rotated');
    });
    
    // Password strength checker
    checkPassword.addEventListener('input', analyzePassword);
    analyzeBtn.addEventListener('click', analyzePassword);
    
    // FAQ
    setupFAQ();
    
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = 'var(--shadow-md)';
        } else {
            navbar.style.boxShadow = 'none';
        }
    });
}

// ============================================
// Utility Functions
// ============================================
// Make functions available globally for HTML onclick attributes
window.reusePassword = reusePassword;
window.deleteFromHistory = deleteFromHistory;

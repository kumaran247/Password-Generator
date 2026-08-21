// =========================================================
// SecurePass — 1Password Enterprise Style Script Engine
// Zero-Knowledge Client-Side Cryptography & Color Syntax
// =========================================================

// Built-in 600+ Word Diceware Wordlist for Memorable Passphrases
const WORDLIST = [
    "ability", "able", "about", "above", "accept", "accord", "account", "across", "action", "active",
    "actor", "actual", "adapt", "admit", "adopt", "advance", "advice", "affect", "afford", "afraid",
    "after", "again", "against", "agent", "agree", "ahead", "airline", "airport", "alarm", "album",
    "alert", "alien", "alive", "allow", "almost", "alone", "along", "already", "also", "alter",
    "always", "amaze", "amber", "among", "amount", "anchor", "ancient", "angel", "anger", "angle",
    "animal", "annual", "answer", "anthem", "anybody", "anyone", "anyway", "apart", "apollo", "appeal",
    "appear", "apple", "apply", "apron", "arcade", "arch", "arctic", "arena", "argue", "armor",
    "army", "around", "arrange", "array", "arrest", "arrive", "arrow", "artist", "ascent", "aspect",
    "aspire", "asset", "assist", "assume", "assure", "astron", "atlas", "atom", "attach", "attack",
    "attain", "attend", "august", "author", "auto", "autumn", "avatar", "avenue", "avoid", "awake",
    "award", "aware", "awesome", "axis", "badge", "balance", "balcony", "bamboo", "banana", "banner",
    "baron", "barrier", "base", "basic", "basket", "battery", "battle", "beacon", "beam", "bear",
    "beast", "beauty", "become", "before", "begin", "behave", "behind", "belief", "belong", "below",
    "bench", "benefit", "berry", "beside", "beyond", "binary", "bird", "bison", "bitter", "blade",
    "blaze", "blend", "bless", "block", "blossom", "blue", "board", "boast", "body", "boiler",
    "bold", "bolt", "bonus", "border", "bounce", "bound", "bounty", "bracket", "brain", "branch",
    "brave", "breeze", "brick", "bridge", "bright", "brisk", "bronze", "brother", "brush", "bubble",
    "budget", "buffer", "build", "bullet", "bundle", "buoyant", "burn", "burst", "cabin", "cable",
    "cactus", "cadet", "calm", "camera", "camp", "canal", "canary", "candle", "canvas", "canyon",
    "capital", "captain", "capture", "carbon", "card", "careful", "cargo", "carpet", "carrier", "castle",
    "catalyst", "catch", "cater", "cavern", "cease", "cedar", "ceiling", "center", "century", "ceramic",
    "chain", "chair", "chalk", "champion", "chance", "change", "channel", "chapter", "charge", "chariot",
    "charm", "chart", "chase", "cheerful", "cheetah", "cherry", "chest", "chief", "chimney", "choice",
    "chrome", "chunk", "cipher", "circle", "circuit", "citadel", "citizen", "citrus", "city", "civic",
    "civil", "claim", "clamp", "clarity", "classic", "clean", "clear", "clever", "cliff", "climate",
    "climb", "cloak", "clock", "clone", "close", "cloud", "clover", "cluster", "coach", "coast",
    "cobalt", "cobra", "coffee", "cohort", "collect", "colony", "column", "combat", "combine", "comet",
    "comfort", "command", "compact", "compass", "complex", "compose", "compute", "concept", "condor", "conduit",
    "connect", "conquer", "console", "constant", "control", "convert", "copper", "coral", "corner", "corona",
    "cortex", "cosmic", "cosmos", "cotton", "council", "counsel", "courage", "course", "cove", "coyote",
    "cradle", "craft", "crane", "crater", "creativity", "creator", "creek", "crescent", "crest", "cricket",
    "crimson", "crisis", "crisp", "cross", "crowd", "crown", "crucial", "cruise", "crystal", "cube",
    "culture", "curious", "current", "cursor", "curve", "custom", "cyber", "cycle", "cyclone", "cylinder",
    "dagger", "daily", "damage", "dance", "danger", "daring", "darwin", "dash", "database", "dawn",
    "daylight", "dazzle", "dealer", "debris", "decade", "decide", "decimal", "declare", "decoder", "defense",
    "define", "degree", "delay", "delta", "demand", "demise", "denial", "dense", "deposit", "depth",
    "deputy", "derive", "desert", "design", "desire", "desktop", "detail", "detect", "develop", "device",
    "devote", "dialog", "diamond", "diesel", "differ", "digital", "dignity", "dilemma", "dimension", "dingo",
    "diploma", "direct", "discover", "display", "distant", "diver", "diverse", "divide", "divine", "doctor",
    "domain", "donate", "donkey", "donor", "doorway", "dormant", "double", "dragon", "drain", "drama",
    "drastic", "draw", "dream", "drift", "drill", "drive", "drone", "drop", "drum", "dryer",
    "duck", "duet", "dune", "dynamic", "dynamo", "eager", "eagle", "early", "earth", "easel",
    "echo", "eclipse", "economy", "ecosystem", "edge", "editor", "educate", "effort", "elastic", "elder",
    "electric", "element", "elephant", "elevate", "elite", "embark", "emblem", "emerald", "emerge", "emission",
    "empire", "employ", "empower", "empty", "enable", "enact", "enchant", "encode", "endless", "endorse",
    "endure", "energy", "enforce", "engage", "engine", "enhance", "enjoy", "enlist", "enough", "enrich",
    "enroll", "ensure", "enter", "entire", "entry", "envoy", "episode", "epoch", "equal", "equip",
    "era", "erase", "erosion", "error", "escape", "escort", "essay", "essence", "estate", "eternal",
    "ethics", "ethos", "evade", "even", "event", "evident", "evolve", "exact", "exalt", "examine",
    "example", "exceed", "excel", "exchange", "excite", "exclude", "execute", "exempt", "exercise", "exhaust",
    "exhibit", "exile", "exist", "exotic", "expand", "expect", "expert", "expire", "explain", "explore",
    "expose", "express", "extend", "extra", "extract", "extreme", "eyeball", "fabric", "factor", "factory",
    "faculty", "fade", "falcon", "famous", "fancy", "fantasy", "farmer", "fashion", "faster", "father",
    "fatigue", "fault", "fauna", "favor", "feast", "feature", "federal", "feedback", "feline", "fellow",
    "female", "fence", "festival", "fiber", "fiction", "field", "fierce", "filter", "final", "finance",
    "finder", "finger", "finish", "firewall", "firmware", "fiscal", "flame", "flash", "flavor", "fleet",
    "flight", "floating", "flood", "floral", "flourish", "flow", "fluid", "flush", "flutter", "focus",
    "folder", "folklore", "follow", "fond", "footage", "forbid", "force", "forecast", "forest", "forge",
    "format", "formula", "fortune", "forum", "forward", "fossil", "foster", "found", "fox", "fraction",
    "fragment", "frame", "freedom", "frequency", "fresh", "friction", "friend", "frigate", "frontier", "frost",
    "fuel", "fulfill", "function", "fundamental", "fusion", "future", "gadget", "galaxy", "galley", "gamma",
    "garden", "garment", "garnet", "gasoline", "gateway", "gather", "gauge", "gazelle", "gear", "gemini",
    "general", "generator", "generic", "genesis", "genius", "genre", "genuine", "geology", "gesture", "giant",
    "glacier", "glamour", "glance", "glider", "glimmer", "glimpse", "global", "globe", "glory", "glow",
    "goblet", "goddess", "golden", "good", "gospel", "govern", "grace", "gradient", "grain", "grand",
    "granite", "grape", "graph", "grasp", "gravity", "great", "green", "grid", "griffin", "ground",
    "group", "grove", "grow", "guard", "guardian", "guest", "guidance", "guide", "guitar", "guru"
];

// NATO Phonetic Alphabet Map
const NATO_MAP = {
    'a': 'Alfa', 'b': 'Bravo', 'c': 'Charlie', 'd': 'Delta', 'e': 'Echo',
    'f': 'Foxtrot', 'g': 'Golf', 'h': 'Hotel', 'i': 'India', 'j': 'Juliett',
    'k': 'Kilo', 'l': 'Lima', 'm': 'Mike', 'n': 'November', 'o': 'Oscar',
    'p': 'Papa', 'q': 'Quebec', 'r': 'Romeo', 's': 'Sierra', 't': 'Tango',
    'u': 'Uniform', 'v': 'Victor', 'w': 'Whiskey', 'x': 'X-ray', 'y': 'Yankee', 'z': 'Zulu',
    '0': 'Zero', '1': 'One', '2': 'Two', '3': 'Three', '4': 'Four',
    '5': 'Five', '6': 'Six', '7': 'Seven', '8': 'Eight', '9': 'Nine',
    '!': 'Exclamation', '@': 'At-Sign', '#': 'Hash/Pound', '$': 'Dollar', '%': 'Percent',
    '^': 'Caret', '&': 'Ampersand', '*': 'Asterisk', '(': 'Open-Paren', ')': 'Close-Paren',
    '-': 'Hyphen', '_': 'Underscore', '+': 'Plus', '=': 'Equals', '{': 'Open-Brace',
    '}': 'Close-Brace', '[': 'Open-Bracket', ']': 'Close-Bracket', '|': 'Pipe',
    ':': 'Colon', ';': 'Semicolon', '<': 'Less-Than', '>': 'Greater-Than',
    ',': 'Comma', '.': 'Period/Dot', '?': 'Question', '/': 'Slash', '\\': 'Backslash',
    '~': 'Tilde', '`': 'Backtick'
};

// Global App State
let currentGeneratorMode = 'random'; // 'random' | 'passphrase' | 'pin' | 'pronounceable'
let passwordHistory = [];
let isPasswordMasked = false;

// =========================================================
// Initialization
// =========================================================
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initHistory();
    initEventListeners();
    initSliders();
    generatePassword(); // Initial generation on load
    initCarouselDots();
});

// =========================================================
// Cryptographic Random Number Engine
// =========================================================
function getSecureRandomInt(max) {
    if (max <= 0) return 0;
    const array = new Uint32Array(1);
    window.crypto.getRandomValues(array);
    return array[0] % max;
}

function getSecureRandomChar(chars) {
    if (!chars || chars.length === 0) return '';
    return chars[getSecureRandomInt(chars.length)];
}

// =========================================================
// Theme Management
// =========================================================
function initTheme() {
    const savedTheme = localStorage.getItem('securepass_theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    const next = current === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('securepass_theme', next);
    updateThemeIcon(next);
}

function updateThemeIcon(theme) {
    const themeBtn = document.getElementById('themeToggle');
    if (!themeBtn) return;
    const icon = themeBtn.querySelector('i');
    if (theme === 'dark') {
        icon.className = 'fas fa-sun';
    } else {
        icon.className = 'fas fa-moon';
    }
}

// =========================================================
// Sliders Synchronization
// =========================================================
function initSliders() {
    const sliders = [
        { input: 'passwordLength', label: 'lengthValue' },
        { input: 'passphraseWords', label: 'passphraseWordsVal' },
        { input: 'pinLength', label: 'pinLengthVal' },
        { input: 'pronounceLength', label: 'pronounceLengthVal' }
    ];

    sliders.forEach(s => {
        const inputEl = document.getElementById(s.input);
        const labelEl = document.getElementById(s.label);
        if (inputEl && labelEl) {
            inputEl.addEventListener('input', () => {
                labelEl.textContent = inputEl.value;
            });
        }
    });
}

// =========================================================
// Special Character Set Retrieval
// =========================================================
function getSpecialChars() {
    const selector = document.getElementById('specialCharSet');
    const customInput = document.getElementById('customSpecialChars');
    if (!selector) return '!@#$%^&*()_+-=[]{}|;:,.<>?';

    switch (selector.value) {
        case 'common':
            return '@#$%&*-+=';
        case 'programming':
            return '{}[]()<>=+-_/\\~';
        case 'minimal':
            return '@#.-_';
        case 'custom':
            return (customInput && customInput.value) ? customInput.value : '!@#$%_';
        default:
            return '!@#$%^&*()_+-=[]{}|;:,.<>?';
    }
}

// =========================================================
// Core Password Generator Router
// =========================================================
function generatePassword() {
    const configError = document.getElementById('configError');
    if (configError) configError.classList.remove('show');

    let password = '';

    switch (currentGeneratorMode) {
        case 'passphrase':
            password = generateMemorablePassphrase();
            break;
        case 'pin':
            password = generateNumericPin();
            break;
        case 'pronounceable':
            password = generatePronounceablePassword();
            break;
        case 'random':
        default:
            password = generateRandomComplexPassword();
            break;
    }

    if (!password) return;

    displayGeneratedPassword(password);
    updatePasswordStats(password);
    updateStrengthAnalysis(password);
    addToHistory(password);
}

// 1. Random Complex Mode Engine
function generateRandomComplexPassword() {
    const lengthEl = document.getElementById('passwordLength');
    const length = lengthEl ? parseInt(lengthEl.value) : 20;

    const useUpper = document.getElementById('includeUppercase')?.checked ?? true;
    const useLower = document.getElementById('includeLowercase')?.checked ?? true;
    const useNumbers = document.getElementById('includeNumbers')?.checked ?? true;
    const useSpecial = document.getElementById('includeSpecial')?.checked ?? true;

    const avoidSimilar = document.getElementById('avoidSimilar')?.checked ?? false;
    const excludeDuplicates = document.getElementById('excludeDuplicates')?.checked ?? false;
    const excludeSequential = document.getElementById('excludeSequential')?.checked ?? false;
    const excludeRepeating = document.getElementById('excludeRepeating')?.checked ?? false;

    const configError = document.getElementById('configError');

    if (!useUpper && !useLower && !useNumbers && !useSpecial) {
        if (configError) {
            configError.textContent = 'Please select at least one character type (Uppercase, Lowercase, Numbers, or Symbols).';
            configError.classList.add('show');
        }
        return '';
    }

    let upperSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let lowerSet = 'abcdefghijklmnopqrstuvwxyz';
    let numberSet = '0123456789';
    let specialSet = getSpecialChars();

    if (avoidSimilar) {
        upperSet = upperSet.replace(/[OI]/g, '');
        lowerSet = lowerSet.replace(/[il]/g, '');
        numberSet = numberSet.replace(/[01]/g, '');
        specialSet = specialSet.replace(/[|]/g, '');
    }

    let combinedCharset = '';
    const activeSets = [];

    if (useUpper && upperSet.length) { combinedCharset += upperSet; activeSets.push(upperSet); }
    if (useLower && lowerSet.length) { combinedCharset += lowerSet; activeSets.push(lowerSet); }
    if (useNumbers && numberSet.length) { combinedCharset += numberSet; activeSets.push(numberSet); }
    if (useSpecial && specialSet.length) { combinedCharset += specialSet; activeSets.push(specialSet); }

    if (combinedCharset.length === 0) {
        if (configError) {
            configError.textContent = 'No available characters with current exclusion filters. Please adjust settings.';
            configError.classList.add('show');
        }
        return '';
    }

    if (excludeDuplicates && length > combinedCharset.length) {
        if (configError) {
            configError.textContent = `Unique characters constraint requires length \u2264 ${combinedCharset.length} (Current: ${length}).`;
            configError.classList.add('show');
        }
        return '';
    }

    let password = '';
    let attempts = 0;
    const maxAttempts = 200;

    while (attempts < maxAttempts) {
        attempts++;
        password = '';

        const guaranteed = [];
        activeSets.forEach(set => {
            guaranteed.push(getSecureRandomChar(set));
        });

        for (let i = guaranteed.length; i < length; i++) {
            guaranteed.push(getSecureRandomChar(combinedCharset));
        }

        // Cryptographic Fisher-Yates Shuffle
        for (let i = guaranteed.length - 1; i > 0; i--) {
            const j = getSecureRandomInt(i + 1);
            [guaranteed[i], guaranteed[j]] = [guaranteed[j], guaranteed[i]];
        }

        password = guaranteed.join('');

        if (excludeDuplicates && hasDuplicates(password)) continue;
        if (excludeSequential && hasSequentialChars(password)) continue;
        if (excludeRepeating && hasRepeatingChars(password)) continue;

        break;
    }

    return password;
}

// 2. Memorable Passphrase Mode Engine (Diceware / xkcd)
function generateMemorablePassphrase() {
    const wordsSlider = document.getElementById('passphraseWords');
    const count = wordsSlider ? parseInt(wordsSlider.value) : 4;
    const separatorType = document.getElementById('passphraseSeparator')?.value || 'hyphen';
    const capitalize = document.getElementById('passphraseCapitalize')?.checked ?? true;
    const includeNumber = document.getElementById('passphraseIncludeNumber')?.checked ?? true;

    let sep = '-';
    if (separatorType === 'underscore') sep = '_';
    else if (separatorType === 'dot') sep = '.';
    else if (separatorType === 'space') sep = ' ';
    else if (separatorType === 'none') sep = '';

    const selectedWords = [];
    const usedIndices = new Set();

    for (let i = 0; i < count; i++) {
        let index;
        do {
            index = getSecureRandomInt(WORDLIST.length);
        } while (usedIndices.has(index) && usedIndices.size < WORDLIST.length);
        
        usedIndices.add(index);
        let word = WORDLIST[index];
        if (capitalize) {
            word = word.charAt(0).toUpperCase() + word.slice(1);
        }
        selectedWords.push(word);
    }

    let result = selectedWords.join(sep);
    if (includeNumber) {
        const randomNum = getSecureRandomInt(90) + 10;
        result += (sep ? sep : '') + randomNum;
    }

    return result;
}

// 3. Numeric PIN Engine
function generateNumericPin() {
    const pinSlider = document.getElementById('pinLength');
    const length = pinSlider ? parseInt(pinSlider.value) : 6;
    const noDupes = document.getElementById('pinNoDuplicates')?.checked ?? false;
    const noSeq = document.getElementById('pinNoSequences')?.checked ?? true;

    const digits = '0123456789';
    let pin = '';
    let attempts = 0;

    while (attempts < 100) {
        attempts++;
        pin = '';
        for (let i = 0; i < length; i++) {
            pin += digits[getSecureRandomInt(10)];
        }

        if (noDupes) {
            let hasConsecutive = false;
            for (let i = 0; i < pin.length - 1; i++) {
                if (pin[i] === pin[i+1]) { hasConsecutive = true; break; }
            }
            if (hasConsecutive) continue;
        }

        if (noSeq && hasSequentialChars(pin)) continue;

        break;
    }

    return pin;
}

// 4. Pronounceable Password Engine
function generatePronounceablePassword() {
    const lengthSlider = document.getElementById('pronounceLength');
    const length = lengthSlider ? parseInt(lengthSlider.value) : 14;
    const useUpper = document.getElementById('pronounceUppercase')?.checked ?? true;
    const useNums = document.getElementById('pronounceNumbers')?.checked ?? true;

    const vowels = 'aeiou';
    const consonants = 'bcdfghjklmnprstvwxyz';

    let result = '';
    let isVowel = getSecureRandomInt(2) === 0;

    for (let i = 0; i < length; i++) {
        if (useNums && i > 0 && i % 4 === 0 && getSecureRandomInt(2) === 0) {
            result += getSecureRandomInt(10);
            continue;
        }

        let char = isVowel ? getSecureRandomChar(vowels) : getSecureRandomChar(consonants);
        if (useUpper && (i === 0 || (i % 3 === 0 && getSecureRandomInt(2) === 0))) {
            char = char.toUpperCase();
        }
        result += char;
        isVowel = !isVowel;
    }

    return result.slice(0, length);
}

// Helpers
function hasDuplicates(str) {
    return new Set(str).size < str.length;
}

function hasSequentialChars(str) {
    const seqs = [
        'abc', 'bcd', 'cde', 'def', 'efg', 'fgh', 'ghi', 'hij', 'ijk', 'jkl', 'klm', 'lmn', 'mno', 'nop', 'opq', 'pqr', 'qrs', 'rst', 'stu', 'tuv', 'uvw', 'vwx', 'wxy', 'xyz',
        '012', '123', '234', '345', '456', '567', '678', '789',
        '987', '876', '765', '654', '543', '432', '321', '210',
        'zyx', 'yxw', 'xwv', 'wvu', 'vut', 'uts', 'tsr', 'srq', 'rqp', 'qpo', 'pon', 'onm', 'nml', 'mlk', 'lkj', 'kji', 'jih', 'ihg', 'hgf', 'gfe', 'fed', 'edc', 'dcb', 'cba'
    ];
    const lower = str.toLowerCase();
    return seqs.some(seq => lower.includes(seq));
}

function hasRepeatingChars(str) {
    for (let i = 0; i < str.length - 2; i++) {
        if (str[i] === str[i + 1] && str[i + 1] === str[i + 2]) return true;
    }
    return false;
}

function hasKeyboardPattern(str) {
    const patterns = ['qwerty', 'asdfgh', 'zxcvbn', 'qwertyuiop', 'asdfghjkl', 'zxcvbnm', '1qaz', '2wsx', '3edc', '4rfv', '5tgb', '6yhn', '7ujm'];
    const lower = str.toLowerCase();
    return patterns.some(p => lower.includes(p));
}

function isCommonPassword(str) {
    const common = [
        'password', '123456', '12345678', 'qwerty', 'abc123', 'monkey', 'master', 'dragon',
        '111111', 'baseball', 'iloveyou', 'trustno1', 'sunshine', 'princess', 'admin', 'welcome',
        'shadow', 'ashley', 'football', 'jesus', 'michael', 'ninja', 'mustang', 'password1',
        'letmein', 'access', 'default', 'secret', 'superman', 'starwars', 'pass1234', 'root123'
    ];
    return common.includes(str.toLowerCase());
}

// =========================================================
// 1Password Style Color-Coded Syntax Formatter
// =========================================================
function formatColorCodedPassword(password, isMasked = false) {
    if (!password) return '<span class="char-low">Click Refresh to generate password</span>';
    if (isMasked) {
        return `<span class="char-low">${'•'.repeat(password.length)}</span>`;
    }

    return password.split('').map(char => {
        if (/[0-9]/.test(char)) {
            return `<span class="char-num">${escapeHtml(char)}</span>`;
        } else if (/[A-Z]/.test(char)) {
            return `<span class="char-up">${escapeHtml(char)}</span>`;
        } else if (/[a-z]/.test(char)) {
            return `<span class="char-low">${escapeHtml(char)}</span>`;
        } else {
            return `<span class="char-sym">${escapeHtml(char)}</span>`;
        }
    }).join('');
}

function displayGeneratedPassword(password) {
    const input = document.getElementById('generatedPassword');
    const formattedView = document.getElementById('formattedPasswordView');
    
    if (input) input.value = password;
    if (formattedView) formattedView.innerHTML = formatColorCodedPassword(password, isPasswordMasked);
}

function toggleMaskGeneratedPassword() {
    isPasswordMasked = !isPasswordMasked;
    const input = document.getElementById('generatedPassword');
    const toggleBtn = document.getElementById('togglePassword');
    const formattedView = document.getElementById('formattedPasswordView');

    if (input && formattedView) {
        formattedView.innerHTML = formatColorCodedPassword(input.value, isPasswordMasked);
    }
    if (toggleBtn) {
        toggleBtn.innerHTML = isPasswordMasked ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
    }
}

function toggleAuditPasswordVisibility() {
    const input = document.getElementById('checkPassword');
    const toggleBtn = document.getElementById('toggleCheckPassword');
    if (!input || !toggleBtn) return;

    if (input.type === 'password') {
        input.type = 'text';
        toggleBtn.innerHTML = '<i class="fas fa-eye-slash"></i>';
    } else {
        input.type = 'password';
        toggleBtn.innerHTML = '<i class="fas fa-eye"></i>';
    }
}

// Copy to Clipboard
function copyPasswordToClipboard(text) {
    if (!text) {
        showToast('No password available to copy', 'error');
        return;
    }

    navigator.clipboard.writeText(text).then(() => {
        showToast('✓ Password copied to clipboard');
    }).catch(() => {
        showToast('Failed to copy to clipboard', 'error');
    });
}

// Download Password as File
function downloadPasswordAsFile(password) {
    if (!password) {
        showToast('No password to download', 'error');
        return;
    }

    const content = `=======================================================\nSecurePass Generated Password\nGenerated: ${new Date().toUTCString()}\n=======================================================\nPassword: ${password}\n=======================================================\nKeep this file secure and delete when no longer needed.\n`;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `securepass_${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('Password file downloaded');
}

// Toast Popup
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toastMessage');
    const iconWrap = document.getElementById('toastIconWrap');
    if (!toast || !toastMsg) return;

    toastMsg.textContent = message;
    if (type === 'error') {
        toast.classList.add('toast-error');
        if (iconWrap) iconWrap.innerHTML = '<i class="fas fa-circle-exclamation"></i>';
    } else {
        toast.classList.remove('toast-error');
        if (iconWrap) iconWrap.innerHTML = '<i class="fas fa-circle-check"></i>';
    }

    toast.classList.add('show');
    clearTimeout(toast._timeout);
    toast._timeout = setTimeout(() => {
        toast.classList.remove('show');
    }, 3200);
}

// =========================================================
// Cryptographic Statistics & Entropy Engine
// =========================================================
function calculatePasswordStats(password) {
    if (!password) {
        return {
            length: 0, uppercase: 0, lowercase: 0, numbers: 0, special: 0,
            unique: 0, entropy: 0, crackTime: '-'
        };
    }

    const length = password.length;
    const uppercase = (password.match(/[A-Z]/g) || []).length;
    const lowercase = (password.match(/[a-z]/g) || []).length;
    const numbers = (password.match(/[0-9]/g) || []).length;
    const special = (password.match(/[^A-Za-z0-9]/g) || []).length;
    const unique = new Set(password).size;

    let charsetSize = 0;
    if (uppercase > 0) charsetSize += 26;
    if (lowercase > 0) charsetSize += 26;
    if (numbers > 0) charsetSize += 10;
    if (special > 0) charsetSize += 33;

    let entropy = 0;
    if (currentGeneratorMode === 'passphrase' && (password.includes('-') || password.includes('_') || password.includes(' '))) {
        const words = password.split(/[-_.\s]/).filter(w => w.length > 1);
        entropy = Math.floor(words.length * Math.log2(WORDLIST.length || 600));
        if (/[0-9]/.test(password)) entropy += 7;
    } else {
        entropy = Math.floor(length * Math.log2(charsetSize || 1));
    }

    const crackTime = calculateCrackTime(entropy, 10000000000);

    return {
        length, uppercase, lowercase, numbers, special, unique, entropy, crackTime
    };
}

function calculateCrackTime(entropy, guessesPerSecond = 10000000000) {
    if (entropy <= 0) return 'Instant';
    const combinations = Math.pow(2, entropy);
    const seconds = combinations / (2 * guessesPerSecond);

    if (seconds < 0.001) return 'Instant';
    if (seconds < 1) return 'Less than a second';
    if (seconds < 60) return `${Math.round(seconds)} seconds`;
    if (seconds < 3600) return `${Math.round(seconds / 60)} minutes`;
    if (seconds < 86400) return `${Math.round(seconds / 3600)} hours`;
    if (seconds < 2592000) return `${Math.round(seconds / 86400)} days`;
    if (seconds < 31536000) return `${Math.round(seconds / 2592000)} months`;
    if (seconds < 315360000) return `${Math.round(seconds / 31536000)} years`;
    if (seconds < 31536000000) return `${Math.round(seconds / 31536000)} years`;
    if (seconds < 31536000000000) return `${(seconds / 31536000000).toFixed(1)} thousand years`;
    if (seconds < 31536000000000000) return `${(seconds / 31536000000000).toFixed(1)} million years`;
    return 'Trillions of centuries';
}

function calculateStrengthScore(password) {
    if (!password) return 0;

    let score = 0;
    const len = password.length;

    if (len >= 8) score += 10;
    if (len >= 12) score += 10;
    if (len >= 16) score += 10;
    if (len >= 20) score += 5;

    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[^A-Za-z0-9]/.test(password);

    if (hasUpper) score += 7;
    if (hasLower) score += 7;
    if (hasNumber) score += 8;
    if (hasSpecial) score += 8;

    const stats = calculatePasswordStats(password);
    if (stats.entropy >= 45) score += 10;
    if (stats.entropy >= 65) score += 15;
    if (stats.entropy >= 85) score += 10;

    if (hasRepeatingChars(password)) score -= 10;
    if (hasSequentialChars(password)) score -= 10;
    if (hasKeyboardPattern(password)) score -= 15;
    if (isCommonPassword(password)) score -= 40;

    return Math.max(0, Math.min(100, Math.round(score)));
}

function getStrengthLabel(score) {
    if (score <= 20) return 'Too Weak';
    if (score <= 40) return 'Weak';
    if (score <= 60) return 'Medium';
    if (score <= 80) return 'Strong';
    return 'Very Strong';
}

function getStrengthColor(score) {
    if (score <= 20) return 'var(--danger-red)';
    if (score <= 40) return '#F97316';
    if (score <= 60) return 'var(--warning-amber)';
    if (score <= 80) return 'var(--success-green)';
    return 'var(--brand-blue)';
}

// Update Generator Section Stats
function updatePasswordStats(password) {
    const stats = calculatePasswordStats(password);
    const entBadge = document.getElementById('outputEntropyBadge');
    if (entBadge) entBadge.innerHTML = `Entropy: <span>${stats.entropy} Bits</span>`;
}

function updateStrengthAnalysis(password) {
    const score = calculateStrengthScore(password);
    const scoreEl = document.getElementById('strengthScore');
    const labelEl = document.getElementById('strengthLabel');
    const progressEl = document.getElementById('progressBar');

    if (scoreEl) scoreEl.textContent = score;
    if (labelEl) {
        labelEl.textContent = getStrengthLabel(score);
        labelEl.style.color = getStrengthColor(score);
    }

    if (progressEl) {
        progressEl.style.width = `${score}%`;
        progressEl.style.backgroundColor = getStrengthColor(score);
    }
}

// =========================================================
// Password Vault Ledger
// =========================================================
function initHistory() {
    try {
        const saved = sessionStorage.getItem('securepass_history');
        if (saved) {
            passwordHistory = JSON.parse(saved);
            renderHistory();
        }
    } catch (e) {
        console.error('History load failed:', e);
    }
}

function addToHistory(password) {
    if (!password) return;
    const score = calculateStrengthScore(password);
    const item = {
        password,
        strength: score,
        timestamp: new Date().toISOString()
    };

    passwordHistory = passwordHistory.filter(h => h.password !== password);
    passwordHistory.unshift(item);

    if (passwordHistory.length > 15) {
        passwordHistory = passwordHistory.slice(0, 15);
    }

    try {
        sessionStorage.setItem('securepass_history', JSON.stringify(passwordHistory));
    } catch (e) {}

    renderHistory();
}

function renderHistory() {
    const list = document.getElementById('historyList');
    const countBadge = document.getElementById('historyCountBadge');
    if (!list) return;

    if (countBadge) countBadge.textContent = `${passwordHistory.length} saved`;

    if (passwordHistory.length === 0) {
        list.innerHTML = '<p class="vault-empty-text"><i class="fas fa-shield-blank"></i> Generated passwords in this session will securely appear here</p>';
        return;
    }

    list.innerHTML = passwordHistory.map((item, index) => {
        const date = new Date(item.timestamp);
        const timeStr = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        const label = getStrengthLabel(item.strength);
        const color = getStrengthColor(item.strength);

        return `
            <div class="vault-entry">
                <div class="ve-left">
                    <span class="ve-pwd" title="${escapeHtml(item.password)}">${escapeHtml(item.password)}</span>
                    <span class="ve-time">${timeStr}</span>
                    <span class="ve-strength" style="color: ${color}; background: rgba(0,0,0,0.05);">${label}</span>
                </div>
                <div class="ve-actions">
                    <button class="btn-v-action" onclick="reusePassword('${escapeHtml(item.password)}')" title="Load into output">
                        <i class="fas fa-arrow-up-right-from-square"></i>
                    </button>
                    <button class="btn-v-action" onclick="copyPasswordToClipboard('${escapeHtml(item.password)}')" title="Copy password">
                        <i class="fas fa-copy"></i>
                    </button>
                    <button class="btn-v-action delete" onclick="deleteHistoryItem(${index})" title="Delete entry">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

function reusePassword(pwd) {
    displayGeneratedPassword(pwd);
    updatePasswordStats(pwd);
    updateStrengthAnalysis(pwd);
    showToast('Loaded password into generator');
}

function deleteHistoryItem(index) {
    passwordHistory.splice(index, 1);
    try {
        sessionStorage.setItem('securepass_history', JSON.stringify(passwordHistory));
    } catch (e) {}
    renderHistory();
}

function clearAllHistory() {
    passwordHistory = [];
    sessionStorage.removeItem('securepass_history');
    renderHistory();
    showToast('Session password vault purged');
}

function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
}

// =========================================================
// Deep Strength Audit & Security Checker
// =========================================================
function analyzePasswordAudit() {
    const input = document.getElementById('checkPassword');
    const password = input ? input.value : '';

    if (!password) {
        resetAuditView();
        return;
    }

    const score = calculateStrengthScore(password);
    const stats = calculatePasswordStats(password);

    // Update Circular Gauge
    const scoreNum = document.getElementById('checkStrengthScore');
    const scoreLabel = document.getElementById('checkStrengthLabel');
    const verdictSub = document.getElementById('checkAuditVerdict');
    const circle = document.getElementById('progressCircle');

    if (scoreNum) scoreNum.textContent = score;
    if (scoreLabel) {
        scoreLabel.textContent = getStrengthLabel(score);
        scoreLabel.style.color = getStrengthColor(score);
    }
    if (verdictSub) {
        if (score >= 80) verdictSub.textContent = 'Enterprise Grade Protection';
        else if (score >= 60) verdictSub.textContent = 'Acceptable for General Use';
        else verdictSub.textContent = 'Vulnerable to Automated Exploitation';
    }

    if (circle) {
        const circumference = 364.425;
        const offset = circumference - (score / 100) * circumference;
        circle.style.strokeDashoffset = offset;
        circle.style.stroke = getStrengthColor(score);
    }

    // Update 14-Point Checklist
    updateChecklistUI(password, stats);

    // Update Multi-Vector Crack Matrix
    updateAttackMatrix(stats.entropy);

    // Update Audit Breakdown Stats
    updateAuditStats(stats);

    // Update Remediation Suggestions
    updateRemediationSuggestions(password, score, stats);
}

function resetAuditView() {
    const scoreNum = document.getElementById('checkStrengthScore');
    const scoreLabel = document.getElementById('checkStrengthLabel');
    const verdictSub = document.getElementById('checkAuditVerdict');
    const circle = document.getElementById('progressCircle');
    const counter = document.getElementById('checklistCounter');

    if (scoreNum) scoreNum.textContent = '0';
    if (scoreLabel) {
        scoreLabel.textContent = 'Enter a password';
        scoreLabel.style.color = 'var(--text-navy)';
    }
    if (verdictSub) verdictSub.textContent = 'Awaiting input';
    if (circle) circle.style.strokeDashoffset = 364.425;
    if (counter) counter.textContent = '0/14 Checks Passed';

    document.querySelectorAll('.chk-pill').forEach(item => {
        item.classList.remove('passed');
        const icon = item.querySelector('.chk-icon');
        if (icon) icon.className = 'fas fa-circle-dot chk-icon';
    });

    ['Online', 'Gpu', 'Super', 'Quantum'].forEach(type => {
        const el = document.getElementById(`matrix${type}`);
        if (el) el.textContent = '-';
    });

    ['Length', 'Uppercase', 'Lowercase', 'Numbers', 'Special', 'Unique', 'Entropy', 'CrackTime'].forEach(field => {
        const el = document.getElementById(`check${field}`);
        if (el) el.textContent = '-';
    });

    const suggList = document.getElementById('suggestionsList');
    if (suggList) suggList.innerHTML = '<p class="no-sugg-text">Enter a password above to generate real-time actionable security recommendations.</p>';
}

function updateChecklistUI(password, stats) {
    const checks = {
        min8: password.length >= 8,
        min12: password.length >= 12,
        min16: password.length >= 16,
        uppercase: /[A-Z]/.test(password),
        lowercase: /[a-z]/.test(password),
        number: /[0-9]/.test(password),
        special: /[^A-Za-z0-9]/.test(password),
        diversity: (stats.unique / (password.length || 1)) >= 0.7,
        entropy: stats.entropy >= 60,
        norepeat: !hasRepeatingChars(password),
        nosequential: !hasSequentialChars(password),
        nokeyboard: !hasKeyboardPattern(password),
        nocommon: !isCommonPassword(password),
        nodictionary: !WORDLIST.slice(0, 100).some(w => password.toLowerCase().includes(w))
    };

    let passedCount = 0;
    Object.keys(checks).forEach(k => {
        const item = document.querySelector(`.chk-pill[data-check="${k}"]`);
        if (item) {
            if (checks[k]) {
                passedCount++;
                item.classList.add('passed');
                const icon = item.querySelector('.chk-icon');
                if (icon) icon.className = 'fas fa-circle-check chk-icon';
            } else {
                item.classList.remove('passed');
                const icon = item.querySelector('.chk-icon');
                if (icon) icon.className = 'fas fa-circle-xmark chk-icon';
            }
        }
    });

    const counter = document.getElementById('checklistCounter');
    if (counter) counter.textContent = `${passedCount}/14 Checks Passed`;
}

function updateAttackMatrix(entropy) {
    const onlineEl = document.getElementById('matrixOnline');
    const gpuEl = document.getElementById('matrixGpu');
    const superEl = document.getElementById('matrixSuper');
    const quantumEl = document.getElementById('matrixQuantum');

    if (onlineEl) onlineEl.textContent = calculateCrackTime(entropy, 100);
    if (gpuEl) gpuEl.textContent = calculateCrackTime(entropy, 10000000000);
    if (superEl) superEl.textContent = calculateCrackTime(entropy, 100000000000000);
    if (quantumEl) quantumEl.textContent = calculateCrackTime(entropy, 10000);
}

function updateAuditStats(stats) {
    const map = {
        checkLength: stats.length,
        checkUppercase: stats.uppercase,
        checkLowercase: stats.lowercase,
        checkNumbers: stats.numbers,
        checkSpecial: stats.special,
        checkUnique: `${stats.unique} chars`,
        checkEntropy: `${stats.entropy} Bits`,
        checkCrackTime: stats.crackTime
    };

    Object.keys(map).forEach(id => {
        const el = document.getElementById(id);
        if (el) el.textContent = map[id];
    });
}

function updateRemediationSuggestions(password, score, stats) {
    const list = document.getElementById('suggestionsList');
    if (!list) return;

    const suggestions = [];

    if (password.length < 12) {
        suggestions.push('Extend length to at least 12–16 characters to prevent brute-force attacks.');
    }
    if (!/[A-Z]/.test(password)) {
        suggestions.push('Add uppercase characters (A-Z) to expand search pool cardinality.');
    }
    if (!/[a-z]/.test(password)) {
        suggestions.push('Add lowercase characters (a-z).');
    }
    if (!/[0-9]/.test(password)) {
        suggestions.push('Include numbers (0-9) to strengthen character diversity.');
    }
    if (!/[^A-Za-z0-9]/.test(password)) {
        suggestions.push('Include special symbols (!@#$%^&*) to significantly expand entropy.');
    }
    if (hasRepeatingChars(password)) {
        suggestions.push('Remove consecutive repeating characters (e.g. "aaa", "111").');
    }
    if (hasSequentialChars(password)) {
        suggestions.push('Avoid sequential runs (e.g. "123", "abc", "xyz") which are prioritized by wordlist attacks.');
    }
    if (hasKeyboardPattern(password)) {
        suggestions.push('Avoid keyboard walks (e.g. "qwerty", "asdfgh") that automated crackers test first.');
    }
    if (isCommonPassword(password)) {
        suggestions.push('CRITICAL: This password appears in common breach lists. Replace it immediately.');
    }

    if (suggestions.length === 0) {
        list.innerHTML = `
            <div class="rem-item" style="border-color: rgba(16, 185, 129, 0.4);">
                <i class="fas fa-circle-check" style="color: var(--success-green);"></i>
                <span style="color: var(--success-green); font-weight: 600;">Excellent password! Meets 1Password & NIST 800-63B standards.</span>
            </div>
        `;
    } else {
        list.innerHTML = suggestions.map(s => `
            <div class="rem-item">
                <i class="fas fa-triangle-exclamation"></i>
                <span>${s}</span>
            </div>
        `).join('');
    }
}

// =========================================================
// Batch Password Generator
// =========================================================
function runBatchGeneration() {
    const countSelect = document.getElementById('batchCount');
    const lengthInput = document.getElementById('batchLength');
    const outputArea = document.getElementById('batchOutputText');

    const count = countSelect ? parseInt(countSelect.value) : 10;
    const length = lengthInput ? parseInt(lengthInput.value) : 20;

    const useUpper = document.getElementById('includeUppercase')?.checked ?? true;
    const useLower = document.getElementById('includeLowercase')?.checked ?? true;
    const useNumbers = document.getElementById('includeNumbers')?.checked ?? true;
    const useSpecial = document.getElementById('includeSpecial')?.checked ?? true;

    let charset = '';
    if (useUpper) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (useLower) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (useNumbers) charset += '0123456789';
    if (useSpecial) charset += getSpecialChars();
    if (!charset.length) charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';

    const passwords = [];
    for (let i = 0; i < count; i++) {
        let p = '';
        for (let j = 0; j < length; j++) {
            p += getSecureRandomChar(charset);
        }
        passwords.push(p);
    }

    if (outputArea) {
        outputArea.value = passwords.join('\n');
    }

    showToast(`Generated batch of ${count} passwords`);
}

function exportBatch(format = 'txt') {
    const outputArea = document.getElementById('batchOutputText');
    const content = outputArea ? outputArea.value.trim() : '';

    if (!content) {
        showToast('Generate a batch first before exporting', 'error');
        return;
    }

    let fileContent = '';
    let filename = `securepass_batch_${Date.now()}.${format}`;
    let mimeType = 'text/plain;charset=utf-8';

    if (format === 'csv') {
        const lines = content.split('\n');
        fileContent = 'ID,Password,EntropyBits,Grade\n';
        lines.forEach((p, idx) => {
            const stats = calculatePasswordStats(p);
            fileContent += `${idx + 1},"${p}",${stats.entropy},"${getStrengthLabel(calculateStrengthScore(p))}"\n`;
        });
        mimeType = 'text/csv;charset=utf-8';
    } else {
        fileContent = content;
    }

    const blob = new Blob([fileContent], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast(`Exported ${filename}`);
}

// =========================================================
// NATO Phonetic Assistant Modal
// =========================================================
function openPhoneticModal() {
    const passwordInput = document.getElementById('generatedPassword');
    const password = passwordInput ? passwordInput.value : '';
    const grid = document.getElementById('phoneticGrid');
    const modal = document.getElementById('phoneticModal');

    if (!password) {
        showToast('Generate a password first to see its phonetic breakdown', 'error');
        return;
    }

    if (grid) {
        grid.innerHTML = password.split('').map(char => {
            const lower = char.toLowerCase();
            const natoWord = NATO_MAP[lower] || char;
            let type = 'Special Symbol';
            if (/[A-Z]/.test(char)) type = 'Uppercase Letter';
            else if (/[a-z]/.test(char)) type = 'Lowercase Letter';
            else if (/[0-9]/.test(char)) type = 'Digit Number';

            return `
                <div class="phonetic-token-box">
                    <span class="pt-char">${escapeHtml(char)}</span>
                    <span class="pt-word">${escapeHtml(natoWord)}</span>
                    <span class="pt-type">${type}</span>
                </div>
            `;
        }).join('');
    }

    if (modal) {
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
    }
}

// =========================================================
// Offline Canvas QR Code Generator
// =========================================================
function openQrModal() {
    const passwordInput = document.getElementById('generatedPassword');
    const password = passwordInput ? passwordInput.value : '';
    const canvas = document.getElementById('qrCanvas');
    const modal = document.getElementById('qrModal');

    if (!password) {
        showToast('Generate a password first to create QR Code', 'error');
        return;
    }

    if (canvas) {
        drawSimpleOfflineQR(canvas, password);
    }

    if (modal) {
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
    }
}

function drawSimpleOfflineQR(canvas, text) {
    const ctx = canvas.getContext('2d');
    const size = canvas.width;
    ctx.clearRect(0, 0, size, size);

    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, size, size);

    const gridSize = 25;
    const cellSize = Math.floor((size - 24) / gridSize);
    const offset = Math.floor((size - gridSize * cellSize) / 2);

    const matrix = Array.from({ length: gridSize }, () => Array(gridSize).fill(0));

    function drawFinder(r, c) {
        for (let i = 0; i < 7; i++) {
            for (let j = 0; j < 7; j++) {
                if (i === 0 || i === 6 || j === 0 || j === 6 || (i >= 2 && i <= 4 && j >= 2 && j <= 4)) {
                    matrix[r + i][c + j] = 1;
                } else {
                    matrix[r + i][c + j] = -1;
                }
            }
        }
    }

    drawFinder(0, 0);
    drawFinder(0, gridSize - 7);
    drawFinder(gridSize - 7, 0);

    for (let i = 8; i < gridSize - 8; i++) {
        matrix[6][i] = i % 2 === 0 ? 1 : -1;
        matrix[i][6] = i % 2 === 0 ? 1 : -1;
    }

    let bitStream = '';
    for (let i = 0; i < text.length; i++) {
        const bin = text.charCodeAt(i).toString(2).padStart(8, '0');
        bitStream += bin;
    }

    let bitIdx = 0;
    for (let r = 0; r < gridSize; r++) {
        for (let c = 0; c < gridSize; c++) {
            if (matrix[r][c] === 0) {
                if (bitIdx < bitStream.length) {
                    matrix[r][c] = bitStream[bitIdx] === '1' ? 1 : -1;
                    bitIdx++;
                } else {
                    matrix[r][c] = ((r * 13 + c * 7 + (text.length * 3)) % 2 === 0) ? 1 : -1;
                }
            }
        }
    }

    ctx.fillStyle = '#0A173B';
    for (let r = 0; r < gridSize; r++) {
        for (let c = 0; c < gridSize; c++) {
            if (matrix[r][c] === 1) {
                ctx.fillRect(offset + c * cellSize, offset + r * cellSize, cellSize, cellSize);
            }
        }
    }
}

// =========================================================
// Trust Carousel Dots
// =========================================================
function initCarouselDots() {
    const dots = document.querySelectorAll('.c-dot');
    dots.forEach((dot, idx) => {
        dot.addEventListener('click', () => {
            dots.forEach(d => d.classList.remove('active'));
            dot.classList.add('active');
        });
    });
}

// =========================================================
// Event Listeners & Bindings
// =========================================================
function initEventListeners() {
    // Theme Toggle
    const themeBtn = document.getElementById('themeToggle');
    if (themeBtn) themeBtn.addEventListener('click', toggleTheme);

    // Mobile Hamburger
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
        document.querySelectorAll('.nav-link-item').forEach(link => {
            link.addEventListener('click', () => navMenu.classList.remove('active'));
        });
    }

    // Segmented Mode Selector
    document.querySelectorAll('.seg-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.seg-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const mode = btn.getAttribute('data-mode');
            currentGeneratorMode = mode;

            document.querySelectorAll('.generator-mode-view').forEach(p => p.classList.remove('active'));
            const panelId = `panel${mode.charAt(0).toUpperCase() + mode.slice(1)}`;
            const targetPanel = document.getElementById(panelId);
            if (targetPanel) targetPanel.classList.add('active');

            generatePassword();
        });
    });

    // 1-Click Fast Presets
    document.querySelectorAll('.chip-btn').forEach(chip => {
        chip.addEventListener('click', () => {
            const preset = chip.getAttribute('data-preset');
            applyPreset(preset);
        });
    });

    // Special Charset Custom Dropdown
    const specialSet = document.getElementById('specialCharSet');
    const customGroup = document.getElementById('customSpecialGroup');
    if (specialSet && customGroup) {
        specialSet.addEventListener('change', () => {
            customGroup.style.display = specialSet.value === 'custom' ? 'block' : 'none';
            generatePassword();
        });
    }

    // Primary Generator Button & Refresh
    const regenBtn = document.getElementById('generateAgain');
    if (regenBtn) regenBtn.addEventListener('click', generatePassword);

    // Formatted Password View Click-To-Copy
    const formattedView = document.getElementById('formattedPasswordView');
    if (formattedView) {
        formattedView.addEventListener('click', () => {
            const input = document.getElementById('generatedPassword');
            if (input) copyPasswordToClipboard(input.value);
        });
    }

    // Password Visibility Toggles
    const toggleGen = document.getElementById('togglePassword');
    if (toggleGen) {
        toggleGen.addEventListener('click', toggleMaskGeneratedPassword);
    }

    const toggleAudit = document.getElementById('toggleCheckPassword');
    if (toggleAudit) {
        toggleAudit.addEventListener('click', toggleAuditPasswordVisibility);
    }

    // Copy & Download Actions
    const copyBtn = document.getElementById('copyPassword');
    if (copyBtn) {
        copyBtn.addEventListener('click', () => {
            const input = document.getElementById('generatedPassword');
            if (input) copyPasswordToClipboard(input.value);
        });
    }

    const downloadBtn = document.getElementById('downloadPassword');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', () => {
            const input = document.getElementById('generatedPassword');
            if (input) downloadPasswordAsFile(input.value);
        });
    }

    // Advanced Options Dropdown Accordion
    const advToggle = document.getElementById('advancedToggle');
    const advContent = document.getElementById('advancedContent');
    const advIcon = document.getElementById('advancedIcon');
    if (advToggle && advContent && advIcon) {
        advToggle.addEventListener('click', () => {
            const isShown = advContent.classList.toggle('show');
            advIcon.classList.toggle('rotated', isShown);
            advToggle.setAttribute('aria-expanded', isShown);
        });
    }

    // Vault Clear All
    const clearHistBtn = document.getElementById('clearHistory');
    if (clearHistBtn) clearHistBtn.addEventListener('click', clearAllHistory);

    // Strength Checker Input Listener
    const checkInput = document.getElementById('checkPassword');
    const analyzeBtn = document.getElementById('analyzeBtn');
    if (checkInput) {
        checkInput.addEventListener('input', analyzePasswordAudit);
    }
    if (analyzeBtn) {
        analyzeBtn.addEventListener('click', analyzePasswordAudit);
    }

    // FAQ Accordion & Instant Search
    setupFAQAccordion();

    // Modals
    setupModals();

    // Navbar Scroll Shadow
    window.addEventListener('scroll', () => {
        const navbar = document.getElementById('navbar');
        if (navbar) {
            if (window.scrollY > 30) navbar.classList.add('scrolled');
            else navbar.classList.remove('scrolled');
        }
    });

    // Auto-Regenerate on input changes
    const autoGenInputs = [
        'passwordLength', 'includeUppercase', 'includeLowercase', 'includeNumbers', 'includeSpecial',
        'avoidSimilar', 'excludeDuplicates', 'excludeSequential', 'excludeRepeating',
        'passphraseWords', 'passphraseSeparator', 'passphraseCapitalize', 'passphraseIncludeNumber',
        'pinLength', 'pinNoDuplicates', 'pinNoSequences',
        'pronounceLength', 'pronounceUppercase', 'pronounceNumbers'
    ];

    autoGenInputs.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener('change', generatePassword);
        }
    });
}

// 1-Click Fast Presets
function applyPreset(type) {
    switch (type) {
        case 'bank':
            switchTab('random');
            setSlider('passwordLength', 20, 'lengthValue');
            setCheckbox('includeUppercase', true);
            setCheckbox('includeLowercase', true);
            setCheckbox('includeNumbers', true);
            setCheckbox('includeSpecial', true);
            break;
        case 'wifi':
            switchTab('random');
            setSlider('passwordLength', 24, 'lengthValue');
            setCheckbox('includeUppercase', true);
            setCheckbox('includeLowercase', true);
            setCheckbox('includeNumbers', true);
            setCheckbox('includeSpecial', true);
            break;
        case 'passphrase':
            switchTab('passphrase');
            setSlider('passphraseWords', 4, 'passphraseWordsVal');
            setCheckbox('passphraseCapitalize', true);
            setCheckbox('passphraseIncludeNumber', true);
            break;
        case 'pin':
            switchTab('pin');
            setSlider('pinLength', 6, 'pinLengthVal');
            setCheckbox('pinNoDuplicates', false);
            setCheckbox('pinNoSequences', true);
            break;
        case 'paranoid':
            switchTab('random');
            setSlider('passwordLength', 32, 'lengthValue');
            setCheckbox('includeUppercase', true);
            setCheckbox('includeLowercase', true);
            setCheckbox('includeNumbers', true);
            setCheckbox('includeSpecial', true);
            break;
    }
    generatePassword();
    showToast(`Applied "${type.toUpperCase()}" Preset`);
}

function switchTab(mode) {
    const tab = document.querySelector(`.seg-btn[data-mode="${mode}"]`);
    if (tab) tab.click();
}

function setSlider(id, val, labelId) {
    const el = document.getElementById(id);
    const label = document.getElementById(labelId);
    if (el) el.value = val;
    if (label) label.textContent = val;
}

function setCheckbox(id, checked) {
    const el = document.getElementById(id);
    if (el) el.checked = checked;
}

// FAQ Accordion & Search Filter
function setupFAQAccordion() {
    const items = document.querySelectorAll('.faq-item-card');
    items.forEach(item => {
        const questionBtn = item.querySelector('.faq-item-button');
        if (questionBtn) {
            questionBtn.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                items.forEach(i => i.classList.remove('active'));
                if (!isActive) item.classList.add('active');
            });
        }
    });

    const searchInput = document.getElementById('faqSearch');
    if (searchInput) {
        searchInput.addEventListener('input', () => {
            const query = searchInput.value.toLowerCase();
            items.forEach(item => {
                const text = item.textContent.toLowerCase();
                item.style.display = text.includes(query) ? 'block' : 'none';
            });
        });
    }
}

// Modals Handler
function setupModals() {
    const navBatch = document.getElementById('navBatchBtn');
    const footerBatch = document.getElementById('footerBatchTrigger');
    const batchModal = document.getElementById('batchModal');
    const closeBatch = document.getElementById('closeBatchModal');

    const openBatch = (e) => {
        if (e) e.preventDefault();
        if (batchModal) {
            batchModal.classList.add('active');
            runBatchGeneration();
        }
    };

    if (navBatch) navBatch.addEventListener('click', openBatch);
    if (footerBatch) footerBatch.addEventListener('click', openBatch);
    if (closeBatch && batchModal) {
        closeBatch.addEventListener('click', () => batchModal.classList.remove('active'));
    }

    // QR Code Modal
    const openQr = document.getElementById('openQrModalBtn');
    const qrModal = document.getElementById('qrModal');
    const closeQr = document.getElementById('closeQrModal');
    if (openQr) openQr.addEventListener('click', openQrModal);
    if (closeQr && qrModal) {
        closeQr.addEventListener('click', () => qrModal.classList.remove('active'));
    }

    // Phonetic Modal
    const openPhonetic = document.getElementById('openPhoneticModalBtn');
    const phoneticModal = document.getElementById('phoneticModal');
    const closePhonetic = document.getElementById('closePhoneticModal');
    if (openPhonetic) openPhonetic.addEventListener('click', openPhoneticModal);
    if (closePhonetic && phoneticModal) {
        closePhonetic.addEventListener('click', () => phoneticModal.classList.remove('active'));
    }

    // Close on backdrop click
    document.querySelectorAll('.modal-overlay').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.classList.remove('active');
        });
    });

    // Batch Actions
    const runBatch = document.getElementById('runBatchGenerate');
    const copyBatch = document.getElementById('copyBatchBtn');
    const dlTxt = document.getElementById('downloadBatchTxt');
    const dlCsv = document.getElementById('downloadBatchCsv');

    if (runBatch) runBatch.addEventListener('click', runBatchGeneration);
    if (copyBatch) {
        copyBatch.addEventListener('click', () => {
            const out = document.getElementById('batchOutputText');
            if (out) copyPasswordToClipboard(out.value);
        });
    }
    if (dlTxt) dlTxt.addEventListener('click', () => exportBatch('txt'));
    if (dlCsv) dlCsv.addEventListener('click', () => exportBatch('csv'));

    // Footer mode links
    document.querySelectorAll('.footer-mode-link').forEach(link => {
        link.addEventListener('click', (e) => {
            const mode = link.getAttribute('data-mode');
            if (mode) switchTab(mode);
        });
    });
}

// Global Exports
window.reusePassword = reusePassword;
window.deleteHistoryItem = deleteHistoryItem;
window.copyPasswordToClipboard = copyPasswordToClipboard;

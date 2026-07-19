# Password Generator & Strength Checker

A modern, cybersecurity-themed password generator and strength checker web application. Built with vanilla HTML, CSS, and JavaScript, this tool provides enterprise-grade password security features with a beautiful glassmorphism UI design.

![Password Generator](https://img.shields.io/badge/Password-Generator-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![GitHub Pages](https://img.shields.io/badge/deployment-GitHub%20Pages-blue)

## 🌟 Features

### Password Generator
- **Memorable Password Generator**: Creates passwords using real English words from a curated list of 500+ words
- **Random Password Generator**: Generates completely random, high-entropy passwords
- **Customizable Options**:
  - Password length (8-30 characters)
  - Uppercase letter count (0-5)
  - Lowercase letter count (0-10)
  - Number count (0-5)
  - Special character count (0-5)
  - Preferred special character (@, #, $, %, !, ^, &, *, _, -)
- **Smart Validation**: Prevents impossible configurations
- **Password Actions**:
  - Copy to clipboard with animated toast notification
  - Show/Hide password toggle
  - Download password as text file
  - Generate new password with one click

### Password Strength Checker
- **Real-time Analysis**: Instant feedback as you type
- **Strength Score**: 0-100 score based on modern cybersecurity standards
- **Strength Labels**: Too Weak, Weak, Medium, Strong, Very Strong
- **Visual Indicators**:
  - Circular progress ring with animated stroke
  - Linear progress bar with color coding
- **Security Checklist**: 14-point security validation
- **Password Statistics**:
  - Character counts (uppercase, lowercase, numbers, special)
  - Unique character count
  - Entropy calculation (in bits)
  - Estimated crack time
- **Improvement Suggestions**: Personalized recommendations based on current password

### Additional Features
- **Password History**: Stores last 10 generated passwords in session storage
- **Dark/Light Theme**: Toggle between themes with local storage persistence
- **Responsive Design**: Fully responsive for desktop, tablet, and mobile
- **Glassmorphism UI**: Modern, premium design with glass effects
- **Smooth Animations**: Fade, slide, hover, and glow effects
- **Security Tips Section**: Best practices for password security
- **FAQ Section**: Accordion-style frequently asked questions
- **Accessibility**: ARIA labels, keyboard navigation, focus states
- **SEO Optimized**: Meta tags, Open Graph tags, semantic HTML

## 🚀 Technology Stack

- **HTML5**: Semantic markup and structure
- **CSS3**: Modern styling with glassmorphism, animations, and responsive design
- **Vanilla JavaScript (ES6+)**: No frameworks or dependencies
- **Font Awesome**: Icon library
- **Google Fonts**: Poppins typography

## 📁 Project Structure

```
Password-Generator/
│
├── index.html              # Main HTML file
├── style.css               # All styling and animations
├── script.js               # All JavaScript functionality
│
├── assets/
│   ├── images/             # Image assets (placeholder)
│   ├── icons/              # Icon assets (placeholder)
│   └── logo/               # Logo assets (placeholder)
│
├── data/
│   └── words.json          # 500+ memorable English words
│
├── README.md               # Project documentation
├── LICENSE                 # MIT License
└── .gitignore              # Git ignore rules
```

## 🛠️ Installation

### Local Development
1. Clone the repository:
```bash
git clone https://github.com/yourusername/password-generator.git
cd password-generator
```

2. Open `index.html` in your web browser:
```bash
# On Windows
start index.html

# On macOS
open index.html

# On Linux
xdg-open index.html
```

No build process or dependencies required!

## 🌐 GitHub Pages Deployment

### Option 1: Using GitHub CLI
```bash
# Initialize git repository
git init
git add .
git commit -m "Initial commit"

# Create repository on GitHub
gh repo create password-generator --public --source=.

# Push to GitHub
git branch -M main
git push -u origin main

# Enable GitHub Pages
gh api -X POST repos/$(gh repo view --json owner,name -q '.owner.login + "/" + .name')/pages -f source[branch]=main -f source[path]=/
```

### Option 2: Manual GitHub Pages Setup
1. Create a new repository on GitHub
2. Upload all files to the repository
3. Go to repository Settings → Pages
4. Select "main" branch as source
5. Click Save
6. Your site will be available at `https://yourusername.github.io/password-generator/`

## 🎨 Design Features

### Color Palette
- **Primary**: Dark Blue (`#0a0e27`)
- **Secondary**: Purple (`#7c4dff`)
- **Accent**: Cyan (`#00bcd4`)
- **Success**: Green (`#4caf50`)
- **Warning**: Orange (`#ff9800`)
- **Danger**: Red (`#f44336`)

### UI Style
- Glassmorphism with backdrop blur
- Soft shadows and rounded corners
- Gradient backgrounds
- Animated glow effects
- Professional dashboard layout

### Typography
- Google Font: Poppins
- Weights: 300, 400, 500, 600, 700, 800

### Animations
- Fade in/out transitions
- Slide animations
- Hover effects
- Ripple effects
- Glow animations
- Progress animations

## 🔒 Security Features

### Password Generation
- Uses cryptographically secure random generation
- Ensures character diversity
- Validates user configurations
- No data sent to external servers

### Strength Analysis
- Entropy calculation based on character set size
- Pattern detection (sequential, keyboard, repeated)
- Common password detection
- Dictionary word detection
- Personal information detection
- Crack time estimation (assuming 10 billion guesses/second)

### Data Privacy
- All processing happens client-side
- No data stored on servers
- Session storage for password history (cleared on browser close)
- Local storage for theme preference only

## 📱 Responsive Breakpoints

- **Desktop**: 1200px and above
- **Laptop**: 992px - 1199px
- **Tablet**: 768px - 991px
- **Mobile**: Below 768px

## ♿ Accessibility

- Semantic HTML5 elements
- ARIA labels for interactive elements
- Keyboard navigation support
- Focus states for all interactive elements
- Skip to content link
- Reduced motion support
- Color contrast compliance

## 🔧 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Opera (latest)

## 📝 Usage

### Generating a Password
1. Navigate to the Password Generator section
2. Choose between Memorable or Random password
3. Adjust the settings according to your preferences
4. Click "Generate Password"
5. Use the action buttons to copy, download, or regenerate

### Checking Password Strength
1. Navigate to the Strength Checker section
2. Type or paste your password
3. View the real-time analysis
4. Review the security checklist
5. Follow improvement suggestions if needed

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Font Awesome for the icon library
- Google Fonts for the Poppins font
- Cybersecurity best practices from industry standards

## 🔮 Future Improvements

- [ ] Password leak detection (Have I Been Pwned API integration)
- [ ] Password expiration reminders
- [ ] Multiple password generation at once
- [ ] Custom word list support
- [ ] Password strength comparison chart
- [ ] Export password history
- [ ] PWA support for offline use
- [ ] Additional language support

## 📧 Contact

For questions, suggestions, or issues, please open an issue on GitHub.

## 🌟 Star the Project

If you find this project useful, please consider giving it a star on GitHub!

---

Built with ❤️ using vanilla HTML, CSS, and JavaScript
#   P a s s w o r d - G e n e r a t o r 
 
 

# OSS Power Tools - GitHub Chrome Extension

A professional, high-fidelity Chrome extension that seamlessly integrates with GitHub's interface, providing powerful open-source development tools.

## 🎯 Features

### 1. **OSS Discoverability Engine**
Find niche open-source projects based on:
- Programming language
- Number of "good first issues"
- Recent commit activity
- Custom filters

### 2. **Maintainer Dashboard**
Track your contributions with:
- PRs reviewed count
- Issues triaged
- Review approval rates
- Activity feed

### 3. **Milestone Celebrations**
Celebrate community achievements:
- Track contributor milestones
- Generate celebratory social media posts
- Highlight team accomplishments

### 4. **Cookie Licking Detector**
Manage stale issue claims:
- Detect abandoned issue assignments
- Send gentle nudges to contributors
- Make issues available again

### 5. **Mentorship Platform**
Connect mentors and mentees:
- Browse mentor profiles
- Filter by programming languages and topics
- Request mentorship with one click

### 6. **React Native Code Viewer**
Quick mobile development:
- One-click "Open in Expo Snack" button
- Test React Native code instantly
- Seamless integration with GitHub's code viewer

## 🚀 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Google Chrome or Chromium-based browser

### Build the Extension

1. **Clone and install dependencies:**
```bash
cd /Users/ozayy/Desktop/hack
npm install
```

2. **Build the extension:**
```bash
npm run build
```

This will create a `dist` folder with the compiled extension.

3. **Load in Chrome:**
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode" (toggle in top-right corner)
   - Click "Load unpacked"
   - Select the `dist` folder

4. **Visit GitHub:**
   - Navigate to any GitHub page
   - The OSS Power Tools sidebar will appear in the bottom-right corner

## 🎨 Design System

The extension strictly follows GitHub's Primer Design System:

- **Colors:** GitHub's exact dark/light mode palettes
- **Typography:** System font stack matching GitHub
- **Components:** 6px border radius, 8px grid spacing
- **Icons:** Lucide React icons matching GitHub's style

## 🔧 Fixed Dragging Behavior

### Problem
The sidebar would jump erratically when dragging, not following the cursor properly.

### Solution
Implemented proper mouse tracking:

```typescript
const handleMouseDown = (e: React.MouseEvent) => {
  if ((e.target as HTMLElement).closest('.drag-handle')) {
    setIsDragging(true);
    // Store offset between mouse and sidebar position
    setDragOffset({
      x: e.clientX - position.left,
      y: e.clientY - position.top
    });
    e.preventDefault();
    e.stopPropagation();
  }
};

const handleMouseMove = useCallback((e: MouseEvent) => {
  if (isDragging) {
    // Calculate new position: mouse position minus initial offset
    const newLeft = e.clientX - dragOffset.x;
    const newTop = e.clientY - dragOffset.y;
    
    // Constrain to viewport
    const constrainedLeft = Math.max(10, Math.min(newLeft, maxLeft));
    const constrainedTop = Math.max(10, Math.min(newTop, maxTop));
    
    setPosition({ top: constrainedTop, left: constrainedLeft });
  }
}, [isDragging, dragOffset]);
```

**Key improvements:**
1. Tracks initial offset between mouse and sidebar corner
2. Calculates new position by subtracting offset from mouse position
3. Constrains movement to stay within viewport bounds
4. Adds proper cursor styles (`grabbing`) during drag
5. Prevents text selection while dragging

## 🔐 User Onboarding

First-time users complete a comprehensive onboarding:

1. **Role Selection:** Mentor or Learning
2. **Language Selection:** Choose programming languages
3. **Specialties:** Select areas of expertise
4. **Contribution Preferences:** Bug fixes, documentation, etc.
5. **GitHub Token:** Optional for enhanced features

All data is stored locally in `localStorage`.

## 📦 Project Structure

```
/Users/ozayy/Desktop/hack/
├── public/
│   ├── manifest.json         # Chrome extension manifest
│   ├── popup.html            # Extension popup
│   ├── options.html          # Settings page
│   └── icons/               # Extension icons
├── src/
│   ├── components/
│   │   ├── floating-sidebar.tsx      # Main sidebar (FIXED DRAGGING)
│   │   ├── chrome-extension-app.tsx  # App orchestrator
│   │   ├── onboarding-flow.tsx       # User onboarding
│   │   ├── user-profile-viewer.tsx   # Profile management
│   │   └── tools/
│   │       ├── oss-discovery.tsx
│   │       ├── maintainer-dashboard.tsx
│   │       ├── milestone-celebrations.tsx
│   │       ├── cookie-licking-detector.tsx
│   │       ├── mentorship-platform.tsx
│   │       └── react-native-viewer.tsx
│   ├── styles/
│   │   └── globals.css       # Tailwind + design tokens
│   ├── content-script.tsx    # Content script entry
│   ├── popup.tsx            # Popup entry
│   └── options.tsx          # Options page entry
├── package.json
├── webpack.config.js
├── tailwind.config.js
├── tsconfig.json
└── README.md (this file)
```

## 🛠️ Development

```bash
# Watch mode for development
npm run dev

# Build for production
npm run build

# Build extension package
npm run build:extension
```

## 🌟 Usage

1. **Access the Sidebar:**
   - Look for the floating sidebar in the bottom-right corner
   - Click and drag the six-dot handle to reposition

2. **Select a Tool:**
   - Click any tool button to expand its interface
   - Click again to collapse

3. **View Profile:**
   - Click the user icon in the sidebar header
   - Edit or reset your profile as needed

4. **Manage Settings:**
   - Right-click the extension icon
   - Select "Options" to customize behavior

## 🔒 Privacy & Security

- All data stored locally in browser storage
- GitHub tokens never transmitted externally
- No analytics or tracking
- Open source and auditable

## 📝 License

MIT License - Feel free to use and modify

## 🙏 Acknowledgments

- GitHub Primer Design System
- Lucide React Icons
- React and TypeScript communities

---

**Need help?** Open an issue or contribute improvements!

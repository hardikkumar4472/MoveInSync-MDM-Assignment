# MoveInSync | MDM Control Center
A premium, high-performance Mobile Device Management (MDM) dashboard built for enterprise device fleet oversight. This application provides real-time monitoring of device health, automated rollout tracking, and compliance auditing with a focus on visual excellence and internationalization.

## Getting Started
### Installation
1. Navigate to the MoveInSync-MDM-Assignment directory:
   ```bash
   cd MoveInSync-MDM-Assignment
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
### Running Locally
Start the development server:
```bash
npm run dev
```
The app will be available at `http://localhost:5173`.

---

## Architecture
The project follows a highly modular and scalable architecture designed for maintainability:

### 1. Atomic Design System
Components are organized according to the Atomic Design methodology:
- **Atoms**: Fundamental building blocks (e.g., `Button`, `Typography`, `Badge`).
- **Molecules**: Groups of atoms working together (e.g., `Card`, `PageHeader`, `LanguageSwitcher`).
- **Organisms**: Complex UI sections (e.g., `Navbar`, `InventoryTable`, `RolloutMonitor`).
- **Templates**: Page-level layouts (e.g., `DashboardTemplate`).
- **Containers**: Logic-heavy wrappers that connect components to data sources.

### 2. State Management
A hybrid approach ensures optimal performance and separation of concerns:
- **Redux Toolkit**: Manages domain-specific data such as device inventories and rollout statuses, ensuring a predictable data flow across complex features.
- **Context API (UIContext)**: Handles global UI states like theme (Light/Dark mode), mobile menu visibility, and the global alert/notification system.

### 3. Localization (i18n)
Integrated using `react-i18next` to support a global workforce. 
- Fully localized in **English**, **Hindi** and **Kannada**.
- Script-specific optimizations for non-Latin fonts.

---

## 🎨 Design Decisions

### Indic Script Optimization
A significant effort was made to ensure perfect rendering of Hindi (Devanagari) script:
- **Vertical Clearance**: Increased line-height (`leading-relaxed`) and added vertical padding to prevent "matra" (diacritic) clipping common in Indic fonts.
- **Tracking Control**: Reset letter-spacing to `normal` for non-Latin scripts to maintain character integrity and word separation.
- **Contextual Spacing**: Added explicit semantic gaps in translations to improve readability in technical UI contexts.

### Premium Visual Identity
- **Glassmorphism**: Extensive use of `backdrop-blur`, semi-transparent layers, and subtle gradients to create a deep, layered UI.
- **Motion Design**: Powered by `Framer Motion` for smooth layout transitions, staggering entrance animations, and interactive feedback.
- **Custom Feedback System**: Replaced native browser `alert()` and `confirm()` with a custom, branded `AlertModal` for a cohesive user journey.

### Responsive & Accessible
- **Mobile-First**: Fully responsive navigation with a specialized mobile sidebar/menu.
- **Dark Mode**: Native dark mode support with tailored color palettes for reduced eye strain and high readability.

---

## Technology Stack
- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Charts**: Recharts
- **State**: Redux Toolkit & Context API

# 🎨 Visual Guide - Role-Based Layouts

## Overview
This guide shows the visual differences between the three role-based layouts.

---

## 1️⃣ Employee Layout (Blue Theme)

### Color Scheme
- **Primary Color**: `#4cd7f6` (Cyan/Turquoise)
- **Badge Background**: `bg-secondary/20`
- **Badge Text**: `text-secondary`
- **Badge Border**: `border-secondary/30`
- **Active Route**: Left border with secondary color

### User Profile Card
```
┌─────────────────────────────────┐
│  ┌──┐                           │
│  │JD│  John Doe                 │
│  └──┘  [EMPLOYEE] ← Blue badge  │
└─────────────────────────────────┘
```

### Navigation Menu
```
┌─────────────────────────────────┐
│  🏠  Dashboard                   │
│  🚩  My Goals                    │
│  📅  Quarterly Check-ins         │
│  📊  My Progress                 │
│  🔔  Notifications               │
└─────────────────────────────────┘
```

### Top Bar
```
┌──────────────────────────────────────────────────┐
│ ☰ Thryve          👤 John Doe [EMPLOYEE] 🚪     │
│                              ↑ Blue badge        │
└──────────────────────────────────────────────────┘
```

---

## 2️⃣ Manager Layout (Purple Theme)

### Color Scheme
- **Primary Color**: `#ddb7ff` (Lavender/Purple)
- **Badge Background**: `bg-tertiary/20`
- **Badge Text**: `text-tertiary`
- **Badge Border**: `border-tertiary/30`
- **Active Route**: Left border with tertiary color

### User Profile Card
```
┌─────────────────────────────────┐
│  ┌──┐                           │
│  │SC│  Sarah Chen               │
│  └──┘  [MANAGER] ← Purple badge │
└─────────────────────────────────┘
```

### Navigation Menu (with Badge)
```
┌─────────────────────────────────┐
│  🏠  Dashboard                   │
│  👥  My Team                     │
│  ✓   Pending Approvals      [5] │ ← Red badge!
│  📋  Team Check-ins              │
│  📊  Team Analytics              │
│  🔔  Notifications               │
└─────────────────────────────────┘
```

### Top Bar
```
┌──────────────────────────────────────────────────┐
│ ☰ Thryve        👤 Sarah Chen [MANAGER] 🚪      │
│                            ↑ Purple badge        │
└──────────────────────────────────────────────────┘
```

### Special Feature: Approval Badge
The "Pending Approvals" menu item has a **red notification badge** showing the count:
```
✓ Pending Approvals  [5]
                     ↑
                Red badge with glow effect
```

---

## 3️⃣ Admin Layout (Red Theme)

### Color Scheme
- **Primary Color**: `#ffb4ab` (Coral Red)
- **Badge Background**: `bg-error/20`
- **Badge Text**: `text-error`
- **Badge Border**: `border-error/30`
- **Active Route**: Left border with error color

### User Profile Card
```
┌─────────────────────────────────┐
│  ┌──┐                           │
│  │AD│  Admin User               │
│  └──┘  [ADMIN] ← Red badge      │
└─────────────────────────────────┘
```

### Navigation Menu
```
┌─────────────────────────────────┐
│  🏠  Dashboard                   │
│  👤  User Management             │
│  📅  Review Cycles               │
│  🛡️  Audit Logs                  │
│  📥  Reports & Export            │
│  ⚙️  Governance                  │
└─────────────────────────────────┘
```

### Top Bar
```
┌──────────────────────────────────────────────────┐
│ ☰ Thryve      🛡️ Admin User [ADMIN] 🚪          │
│                          ↑ Red badge             │
└──────────────────────────────────────────────────┘
```

---

## 📊 Admin Dashboard Layout

### Full Page Structure
```
┌────────────────────────────────────────────────────────────┐
│  ADMIN DASHBOARD                                           │
├────────────────────────────────────────────────────────────┤
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐            │
│  │ 156  │ │ 342  │ │ 23 🔴│ │ 87%  │ │Q3'24 │  ← Stats   │
│  │Empl. │ │Goals │ │Pend. │ │Compl.│ │Cycle │            │
│  └──────┘ └──────┘ └──────┘ └──────┘ └──────┘            │
├────────────────────────────────────────────────────────────┤
│  ┌─────────────────────┐  ┌──────────────────────┐        │
│  │ DEPT HEATMAP        │  │ AUDIT LOG            │        │
│  │                     │  │                      │        │
│  │ Dept    Q1  Q2  Q3  │  │ • Manager approved.. │        │
│  │ Eng    [92][88][85] │  │ • Admin created...   │        │
│  │ Prod   [95][91][89] │  │ • Manager rejected.. │        │
│  │ Mktg   [88][85][82] │  │ • Employee submit... │        │
│  │ Sales  [90][87][84] │  │ • Manager approved.. │        │
│  │ HR     [94][92][90] │  │ • Admin updated...   │        │
│  │ Fin    [96][94][91] │  │ • Manager comment... │        │
│  │                     │  │ • Employee updated.. │        │
│  │ 🟢≥90% 🟡75-89% 🔴<75%│  │ • Admin exported...  │        │
│  └─────────────────────┘  │ • Manager approved.. │        │
│                           └──────────────────────┘        │
├────────────────────────────────────────────────────────────┤
│  ORG-WIDE GOAL STATUS                                      │
│  ┌──────────────────┐  ┌────────────────────────┐         │
│  │                  │  │ ⚫ Draft        45 (10%)│         │
│  │    🍩 DONUT      │  │ 🔵 Submitted   78 (18%)│         │
│  │     CHART        │  │ 🟣 Approved   123 (28%)│         │
│  │                  │  │ 🟪 In Progress 89 (20%)│         │
│  │   Total: 442     │  │ 🟢 Completed  107 (24%)│         │
│  └──────────────────┘  └────────────────────────┘         │
└────────────────────────────────────────────────────────────┘
```

### Heatmap Color Legend
```
🟢 Green  (≥90%)  - Excellent completion
🟡 Yellow (75-89%) - Good completion
🔴 Red    (<75%)  - Needs attention
⚪ Gray   (0%)    - No data yet
```

---

## 🎯 Visual Distinctions at a Glance

### Quick Identification
When you see the layout, you can instantly tell the role by:

1. **Badge Color**
   - Blue = Employee
   - Purple = Manager
   - Red = Admin

2. **Navigation Items**
   - "My Goals" = Employee
   - "Pending Approvals" = Manager
   - "User Management" = Admin

3. **Active Route Accent**
   - Blue left border = Employee
   - Purple left border = Manager
   - Red left border = Admin

---

## 📱 Mobile View

### Collapsed Sidebar
```
┌──────────────────────┐
│ ☰ Thryve        🚪   │ ← Top bar only
└──────────────────────┘
│                      │
│   Main Content       │
│                      │
│                      │
```

### Expanded Sidebar (Overlay)
```
┌──────────────┐┌──────┐
│ Thryve     ✕ ││      │
│              ││      │
│ ┌──┐         ││      │
│ │JD│ John    ││ Main │
│ └──┘ [EMPL.] ││      │
│              ││      │
│ 🏠 Dashboard ││ Cont │
│ 🚩 My Goals  ││      │
│ 📅 Check-ins ││ ent  │
│ 📊 Progress  ││      │
│ 🔔 Notifs    ││      │
│              ││      │
│ [Logout]     ││      │
└──────────────┘└──────┘
   ↑ Sidebar      ↑ Dimmed
```

---

## 🎨 Color Palette Reference

### Employee (Blue)
```css
Primary: #4cd7f6
Background: rgba(76, 215, 246, 0.2)
Border: rgba(76, 215, 246, 0.3)
Text: #4cd7f6
```

### Manager (Purple)
```css
Primary: #ddb7ff
Background: rgba(221, 183, 255, 0.2)
Border: rgba(221, 183, 255, 0.3)
Text: #ddb7ff
```

### Admin (Red)
```css
Primary: #ffb4ab
Background: rgba(255, 180, 171, 0.2)
Border: rgba(255, 180, 171, 0.3)
Text: #ffb4ab
```

### Shared Colors
```css
Background: #0c1324
Surface: #0F172A
Text: #dce1fb
Text Muted: #c7c4d7
Border: rgba(255, 255, 255, 0.05)
```

---

## 🔍 Interactive Elements

### Hover States
- **Navigation Items**: Background changes to `surface-variant/50`
- **Buttons**: Slight scale and shadow increase
- **Cards**: Border color intensifies
- **Links**: Color brightens

### Active States
- **Current Route**: Left border accent + background tint
- **Pressed Buttons**: Scale down slightly (0.95)
- **Focus**: Ring outline in role color

### Transitions
- **Sidebar**: 300ms ease-in-out
- **Hover**: 200ms
- **Active**: 150ms
- **Colors**: 200ms

---

## 📐 Spacing & Layout

### Sidebar
- Width: 280px
- Padding: 24px (gutter)
- Item padding: 16px horizontal, 12px vertical
- Gap between items: 4px

### Top Bar
- Height: 64px (16 * 4)
- Padding: 16px mobile, 48px desktop
- Z-index: 40

### Content Area
- Padding top: 96px (24 * 4) - clears top bar
- Padding horizontal: 16px mobile, 48px desktop
- Max width: 1440px
- Centered with auto margins

### Cards
- Padding: 24px
- Border radius: 12px (xl)
- Gap between: 24px
- Border: 1px solid rgba(255,255,255,0.05)

---

## ✨ Special Effects

### Glassmorphism
```css
background: rgba(15, 23, 42, 0.4);
backdrop-filter: blur(16px);
border: 1px solid rgba(255, 255, 255, 0.05);
```

### Glow Effects
```css
/* Badge glow */
box-shadow: 0 0 10px rgba(255, 180, 171, 0.5);

/* Button glow */
box-shadow: 0 0 15px rgba(192, 193, 255, 0.2);
```

### Shadows
```css
/* Card shadow */
box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

/* Elevated shadow */
box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
```

---

**This visual guide helps you understand the design system and visual hierarchy of the three role-based layouts!**

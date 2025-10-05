# Dragging Fix Documentation

## Problem Description

The OSS Power Tools sidebar had a critical UX issue where dragging the sidebar would cause it to jump erratically and not follow the cursor properly. When users clicked the 6-dot drag handle, the sidebar would suddenly move to an unexpected position far from the cursor.

## Root Cause

The original implementation had a flawed approach to calculating the sidebar's new position during drag:

```typescript
// ❌ BROKEN CODE
const handleMouseMove = (e: MouseEvent) => {
  if (isDragging && dragStart) {
    const deltaX = dragStart.x - e.clientX;  // Wrong calculation
    const deltaY = e.clientY - dragStart.y;  // Inconsistent directions
    
    const newRight = dragStart.initialRight + deltaX;  // Adds delta to edge position
    const newBottom = dragStart.initialBottom + deltaY;
    
    setPosition({ bottom: newBottom, right: newRight });
  }
};
```

### Issues:
1. **No offset tracking:** The code didn't store where the user clicked relative to the sidebar's corner
2. **Arbitrary positioning:** It used `bottom` and `right` positioning, which is less intuitive
3. **Jumping behavior:** When dragging started, the sidebar would instantly reposition based on cursor location

## Solution

Implemented proper drag tracking with offset calculation:

### 1. Track Initial Offset

```typescript
const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

const handleMouseDown = (e: React.MouseEvent) => {
  if ((e.target as HTMLElement).closest('.drag-handle')) {
    setIsDragging(true);
    
    // ✅ Store the offset between mouse and sidebar corner
    setDragOffset({
      x: e.clientX - position.left,  // How far right of left edge
      y: e.clientY - position.top    // How far below top edge
    });
    
    e.preventDefault();
    e.stopPropagation();
  }
};
```

**Key insight:** We store where the user clicked relative to the sidebar's top-left corner. If they click 50px from the left edge and 20px from the top, those become our offsets.

### 2. Calculate New Position

```typescript
const handleMouseMove = useCallback((e: MouseEvent) => {
  if (isDragging) {
    e.preventDefault();
    
    // ✅ Calculate position: mouse position minus initial offset
    const newLeft = e.clientX - dragOffset.x;
    const newTop = e.clientY - dragOffset.y;
    
    // Sidebar stays at same relative position to cursor
    setPosition({ top: constrainedTop, left: constrainedLeft });
  }
}, [isDragging, dragOffset]);
```

**Key insight:** To maintain the grab point, we subtract the initial offset from the current mouse position. This ensures the sidebar moves exactly with the cursor.

### 3. Add Viewport Constraints

```typescript
// ✅ Keep sidebar within viewport bounds
const sidebarWidth = 400;
const sidebarHeight = 80; // minimum visible

const maxLeft = window.innerWidth - sidebarWidth;
const maxTop = window.innerHeight - sidebarHeight;

const constrainedLeft = Math.max(10, Math.min(newLeft, maxLeft));
const constrainedTop = Math.max(10, Math.min(newTop, maxTop));
```

**Key insight:** Constrain the sidebar so it never goes off-screen, with a 10px minimum margin.

### 4. Add Visual Feedback

```typescript
useEffect(() => {
  if (isDragging) {
    // ✅ Change cursor and prevent text selection
    document.body.style.cursor = 'grabbing';
    document.body.style.userSelect = 'none';
    
    return () => {
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }
}, [isDragging]);
```

**Key insight:** Provide clear visual feedback that dragging is active and prevent accidental text selection.

## Diagram: How It Works

```
Initial Click:
┌─────────────────────┐
│  OSS Power Tools    │
│  ┌──┐              │
│  │●●│ ← Click here (offset: x=50, y=20)
│  └──┘              │
│                     │
└─────────────────────┘
Position: { top: 100, left: 300 }

During Drag:
Mouse at: { clientX: 450, clientY: 180 }

Calculate new position:
newLeft = 450 - 50 = 400  // Mouse X minus offset X
newTop = 180 - 20 = 160   // Mouse Y minus offset Y

Result:
┌─────────────────────┐
│  OSS Power Tools    │
│  ┌──┐              │
│  │●●│ ← Still under cursor!
│  └──┘              │
│                     │
└─────────────────────┘
Position: { top: 160, left: 400 }
```

## Before vs. After

### Before (Broken)
- ❌ Sidebar jumps to random position on drag start
- ❌ Doesn't follow cursor smoothly
- ❌ Can go off-screen
- ❌ No visual feedback
- ❌ Uses bottom/right positioning (confusing)

### After (Fixed)
- ✅ Sidebar stays under cursor exactly where clicked
- ✅ Smooth, predictable movement
- ✅ Constrained to viewport
- ✅ Cursor changes to "grabbing"
- ✅ Uses top/left positioning (intuitive)

## Testing the Fix

To verify the fix works correctly:

1. **Grab Test:** Click anywhere on the drag handle - the sidebar should stay under your exact click point
2. **Edge Test:** Drag to screen edges - the sidebar should stop at boundaries
3. **Release Test:** Release the mouse - the sidebar should stay in place
4. **Re-grab Test:** Grab again from a different position - it should work consistently

## Implementation Checklist

- [x] Store initial mouse-to-sidebar offset
- [x] Calculate new position using offset
- [x] Constrain to viewport bounds
- [x] Add cursor visual feedback
- [x] Prevent text selection during drag
- [x] Stop event propagation
- [x] Clean up event listeners
- [x] Use top/left positioning
- [x] Add smooth transitions

## Related Files

- `/src/components/floating-sidebar.tsx` - Main implementation
- `/src/content-script.tsx` - Extension initialization
- `/README.md` - User-facing documentation

## Performance Notes

The fix uses `useCallback` and `useEffect` hooks properly to avoid unnecessary re-renders and memory leaks. Event listeners are added/removed only when dragging state changes.

---

**Result:** The sidebar now provides a professional, smooth dragging experience that feels native to the browser.

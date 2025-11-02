# Section 17: Frontend Dynamic Timing & Event Management - Implementation Guide

## 🎯 What Was Implemented

### 1. **Centralized Timing Infrastructure**

#### New Files Created:
- `lib/timing-constants.ts` - All timing constants (delays, intervals, thresholds)
- `lib/timing-manager.ts` - Centralized timing manager with priority queue
- `lib/hooks/useTiming.ts` - React hook for timing operations
- `lib/hooks/useAutoRefresh.ts` - Auto-refresh hook
- `lib/hooks/useInactivityDetection.ts` - Inactivity detection hook

### 2. **Enhanced Components**

The following components were updated to use centralized timing:

1. **Notification Center** (`components/orchestrator/unified-notifications-center.tsx`)
   - Uses centralized timing for polling fallback (15s interval)

2. **Dashboard Header** (`components/dashboard/dashboard-header.tsx`)
   - Uses centralized timing for unread count polling (5s interval)

3. **Analytics Dashboard** (`components/analytics/analytics-page.tsx`)
   - Added auto-refresh hook (5 minutes interval)
   - Will automatically refresh analytics data

4. **Smart Nudges** (`components/orchestrator/smart-nudges.tsx`)
   - Uses timing constants for nudge display (15s check, 8s hide)

5. **AI Performance Monitor** (`components/automation/ai-performance-monitor.tsx`)
   - Uses centralized timing for metrics refresh (5s interval)

6. **Portfolio Page** (`components/portfolio/portfolio-page.tsx`)
   - Added inactivity detection (10 minutes threshold)
   - Shows reminder toast when inactive

7. **Support AI Assistant** (`components/support/conversational-ai-help-assistant.tsx`)
   - Standardized AI response delay (1.5s)

---

## 🔍 How to Check/Test the New Features

### 1. **Check Timing Constants**

**Location:** `lib/timing-constants.ts`

**How to verify:**
```typescript
// Open the file and see all predefined timing values
DELAYS.AI_RESPONSE = 1500ms
DELAYS.POST_PREVIEW = 3000ms
DELAYS.TOAST_DISMISS = 4000ms
INTERVALS.NOTIFICATION_POLL = 15000ms
INTERVALS.ANALYTICS_REFRESH = 300000ms (5 minutes)
THRESHOLDS.PORTFOLIO_INACTIVITY = 600000ms (10 minutes)
```

### 2. **Test Notification Center Polling**

**Location:** `components/orchestrator/unified-notifications-center.tsx`

**How to test:**
1. Navigate to `/dashboard/orchestrator`
2. Open browser DevTools → Console
3. Look for: `"Checking for new notifications..."` every 15 seconds
4. This happens even when WebSocket is disconnected (polling fallback)

### 3. **Test Dashboard Header Unread Count**

**Location:** `components/dashboard/dashboard-header.tsx`

**How to test:**
1. Navigate to any dashboard page
2. Look at the bell icon in the header
3. Unread count badge updates every 5 seconds
4. Check browser console for activity

### 4. **Test Analytics Auto-Refresh**

**Location:** `components/analytics/analytics-page.tsx`

**How to test:**
1. Navigate to `/dashboard/analytics`
2. Open browser DevTools → Console
3. Look for: `"Analytics data refreshed"` every 5 minutes
4. First refresh happens immediately on page load

**Note:** The refresh happens automatically, but since it's a mock implementation, you'll see console logs. In production, this would fetch fresh data.

### 5. **Test Portfolio Inactivity Detection**

**Location:** `components/portfolio/portfolio-page.tsx`

**How to test:**
1. Navigate to `/dashboard/portfolio`
2. **Don't interact** with the page (don't move mouse, click, scroll, type)
3. Wait for 10 minutes (you can modify the threshold in `lib/timing-constants.ts` for testing)
4. You should see a toast notification:
   - **Title:** "Portfolio Reminder"
   - **Message:** "You've been inactive for a while. Consider updating your portfolio..."
   - Appears after 10 minutes of inactivity

**Quick Test (Modify for faster testing):**
1. Open `lib/timing-constants.ts`
2. Change `PORTFOLIO_INACTIVITY: 600000` to `PORTFOLIO_INACTIVITY: 60000` (1 minute)
3. Reload portfolio page
4. Wait 1 minute without interacting
5. Toast should appear

### 6. **Test Smart Nudges Timing**

**Location:** `components/orchestrator/smart-nudges.tsx`

**How to test:**
1. Navigate to `/dashboard/orchestrator`
2. Watch for nudges appearing
3. Nudges check for new ones every 15 seconds
4. Each nudge auto-hides after 8 seconds
5. This uses centralized timing manager

### 7. **Test AI Performance Monitor Refresh**

**Location:** `components/automation/ai-performance-monitor.tsx`

**How to test:**
1. Navigate to `/dashboard/automation`
2. Find the "AI Performance Monitor" section
3. Watch the metrics update every 5 seconds
4. Success rate and execution time will fluctuate slightly
5. This uses centralized timing

### 8. **Check Timing Manager Console**

**How to test:**
1. Open browser DevTools → Console
2. Type: `window.timingManager` (if exposed)
3. Or check React DevTools → Components
4. Look for components using `useTiming`, `useAutoRefresh`, `useInactivityDetection`

---

## 🧪 Manual Testing Steps

### Test 1: Auto-Refresh Hook
```typescript
// In any component, you can now use:
import { useAutoRefresh } from "@/lib/hooks/useAutoRefresh"
import { INTERVALS } from "@/lib/timing-constants"

const { isRefreshing, lastRefresh, refresh } = useAutoRefresh({
  interval: INTERVALS.ANALYTICS_REFRESH, // 5 minutes
  onRefresh: async () => {
    console.log("Refreshing data...")
    // Fetch fresh data
  }
})
```

### Test 2: Inactivity Detection Hook
```typescript
// In portfolio page:
import { useInactivityDetection } from "@/lib/hooks/useInactivityDetection"
import { THRESHOLDS } from "@/lib/timing-constants"

const { isInactive, updateActivity } = useInactivityDetection({
  threshold: THRESHOLDS.PORTFOLIO_INACTIVITY, // 10 minutes
  onInactive: () => {
    toast.info("You've been inactive!")
  }
})
```

### Test 3: General Timing Hook
```typescript
// In any component:
import { useTiming } from "@/lib/hooks/useTiming"
import { DELAYS, INTERVALS, TimingPriority } from "@/lib/timing-constants"

const { delay, interval, cancel } = useTiming()

// Delay a function
delay(() => console.log("After 3 seconds"), DELAYS.POST_PREVIEW)

// Set interval
const taskId = interval(() => console.log("Every 15s"), INTERVALS.NOTIFICATION_POLL)
```

---

## 📊 What Changed vs. Before

### Before Section 17:
- ❌ Scattered `setTimeout`/`setInterval` calls throughout components
- ❌ No standardized timing values
- ❌ Hard to manage or debug timing operations
- ❌ No centralized pause/resume functionality
- ❌ No inactivity detection
- ❌ Manual refresh only

### After Section 17:
- ✅ Centralized timing manager
- ✅ Standardized timing constants
- ✅ React hooks for easy integration
- ✅ Auto-refresh capabilities
- ✅ Inactivity detection
- ✅ Priority-based task scheduling
- ✅ Automatic pause/resume on user activity
- ✅ Easy to debug and manage

---

## 🎮 Quick Test Scenarios

### Scenario 1: Test Notification Polling (15s)
1. Go to `/dashboard/orchestrator`
2. Open Console (F12)
3. Wait 15 seconds
4. See: `"Checking for new notifications..."`

### Scenario 2: Test Unread Count Update (5s)
1. Go to any dashboard page
2. Mark a notification as read
3. Wait 5 seconds
4. Check header bell icon - badge should update

### Scenario 3: Test Portfolio Inactivity (1 min - modified)
1. Modify `lib/timing-constants.ts`: Change `PORTFOLIO_INACTIVITY` to `60000` (1 minute)
2. Go to `/dashboard/portfolio`
3. Don't interact for 1 minute
4. Toast should appear

### Scenario 4: Test Analytics Auto-Refresh (5 min)
1. Go to `/dashboard/analytics`
2. Open Console
3. See: `"Analytics data refreshed"` immediately
4. Wait 5 minutes (or modify interval for testing)
5. See another refresh log

### Scenario 5: Test AI Metrics Refresh (5s)
1. Go to `/dashboard/automation`
2. Watch AI Performance Monitor
3. Metrics update every 5 seconds
4. Success rate and execution time change slightly

---

## 🔧 Developer Tools

### Check Active Timers:
```typescript
// The timing manager keeps track of all active tasks
import { timingManager } from "@/lib/timing-manager"

console.log(timingManager.getActiveTasks())
console.log(timingManager.getTaskCount())
```

### Pause/Resume All Timers:
```typescript
// Pause all timers (useful for debugging)
timingManager.pauseAll()

// Resume all timers
timingManager.resumeAll()
```

---

## 📝 Files to Review

### Core Infrastructure:
1. `lib/timing-constants.ts` - All timing constants
2. `lib/timing-manager.ts` - Centralized timing manager
3. `lib/hooks/useTiming.ts` - General timing hook
4. `lib/hooks/useAutoRefresh.ts` - Auto-refresh hook
5. `lib/hooks/useInactivityDetection.ts` - Inactivity detection hook

### Enhanced Components:
1. `components/orchestrator/unified-notifications-center.tsx`
2. `components/dashboard/dashboard-header.tsx`
3. `components/analytics/analytics-page.tsx`
4. `components/orchestrator/smart-nudges.tsx`
5. `components/automation/ai-performance-monitor.tsx`
6. `components/portfolio/portfolio-page.tsx`
7. `components/support/conversational-ai-help-assistant.tsx`

---

## ✅ Verification Checklist

- [ ] Timing constants file exists (`lib/timing-constants.ts`)
- [ ] Timing manager file exists (`lib/timing-manager.ts`)
- [ ] All 3 hooks exist (`lib/hooks/useTiming.ts`, `useAutoRefresh.ts`, `useInactivityDetection.ts`)
- [ ] Notification Center uses centralized timing
- [ ] Dashboard Header uses centralized timing
- [ ] Analytics Dashboard has auto-refresh
- [ ] Portfolio page has inactivity detection
- [ ] Smart Nudges uses timing constants
- [ ] AI Performance Monitor uses centralized timing
- [ ] Build succeeds without errors

---

## 🚀 Next Steps

You can now use the timing system in any new component:

```typescript
// Example: Add auto-refresh to any dashboard
import { useAutoRefresh } from "@/lib/hooks/useAutoRefresh"
import { INTERVALS } from "@/lib/timing-constants"

const MyComponent = () => {
  const { isRefreshing, refresh } = useAutoRefresh({
    interval: INTERVALS.ANALYTICS_REFRESH,
    onRefresh: async () => {
      // Your refresh logic here
    }
  })
  
  return <div>...</div>
}
```

All timing operations are now centralized, standardized, and easy to manage! 🎉


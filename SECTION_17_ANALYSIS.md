# Section 17: Frontend Dynamic Timing & Event Management — REQUIREMENTS ANALYSIS

## 📊 Analysis Summary

### ✅ What Already Exists (Can Enhance/Reuse)

1. **Scattered Timing Mechanisms:**
   - ✅ `dashboard-header.tsx` - Unread count polling (5s interval)
   - ✅ `unified-notifications-center.tsx` - WebSocket polling fallback (30s)
   - ✅ `action-feed.tsx` - Real-time updates polling (30s)
   - ✅ `smart-nudges.tsx` - Nudge display with auto-hide (15s interval, 8s timeout)
   - ✅ `ai-performance-monitor.tsx` - Metrics refresh (5s interval)
   - ✅ `timeline-player.tsx` - Playback controls with interval
   - ✅ `ai-conversational-panel.tsx` - Message delays exist
   - ✅ `conversational-ai-help-assistant.tsx` - setTimeout for AI responses (1.5s)
   - ✅ `gamified-feedback.tsx` - Animation intervals
   - ✅ `privacy-health-gauge.tsx` - Health check intervals
   - ✅ `shared-canvas-area.tsx` - Collaboration polling

2. **Components That Need Timing Enhancements:**
   - ⚠️ Analytics Dashboard - No auto-refresh currently
   - ⚠️ Learning Dashboard - No periodic updates
   - ⚠️ Social Integration - No auto-queue delay
   - ⚠️ Portfolio - No inactivity detection
   - ⚠️ Feedback Portal - Toast auto-dismiss exists but could be enhanced

### ❌ What Needs to Be Created

1. **Centralized Timing Manager** (`lib/timing-manager.ts`)
   - Priority queue for timed events
   - Dynamic pausing when inactive
   - Smooth synchronization with backend
   - Timer lifecycle management

2. **Timing Constants** (`lib/timing-constants.ts`)
   - UX-aligned timing values
   - 1-2s delays (anticipation/attention)
   - 4-5s intervals (reflection)
   - 10s+ refresh (consistency)

3. **Portfolio Inactivity Detection** (`lib/hooks/useInactivityDetection.ts`)
   - Hook that detects user inactivity after 10 minutes
   - Returns callback to show reminder notification (used in existing portfolio page)

4. **Enhanced Analytics Auto-Refresh** (`lib/hooks/useAutoRefresh.ts`)
   - Hook for auto-refresh analytics every 5 minutes
   - Returns refresh function and manual refresh trigger (used in existing analytics page)

5. **Social Integration Auto-Queue** (`lib/hooks/useTiming.ts`)
   - Hook for delaying post preview by 3 seconds
   - Returns delayed callback (used in existing social components)

6. **Learning Dashboard Auto-Updates** (`lib/hooks/useAutoRefresh.ts`)
   - Hook for updating streak progress every 1 minute
   - Returns update function (used in existing learning components)

7. **Global Scheduler Panel** (Optional - Debug View)
   - Visual timeline of running timers
   - Debug panel for developers

---

## 🎯 Implementation Plan

### Phase 1: Core Timing Infrastructure
1. ✅ Create `lib/timing-manager.ts` - Centralized scheduler
2. ✅ Create `lib/timing-constants.ts` - UX timing constants
3. ✅ Create `lib/hooks/useTiming.ts` - React hook for timing operations
4. ✅ Create `lib/hooks/useAutoRefresh.ts` - Auto-refresh hook
5. ✅ Create `lib/hooks/useInactivityDetection.ts` - Inactivity detection hook

### Phase 2: Enhance Existing Components
1. ✅ Enhance Notification Center - Use centralized timing manager
2. ✅ Enhance Analytics Dashboard - Add auto-refresh
3. ✅ Enhance Learning Dashboard - Add periodic updates
4. ✅ Enhance Social Integration - Add auto-queue delays
5. ✅ Enhance AI Chat - Standardize message delays
6. ✅ Enhance Feedback Portal - Standardize toast dismiss timing

### Phase 3: Integrate Timing Features
1. ✅ Add Portfolio Inactivity Detection hook to existing portfolio page
2. ✅ Add Analytics Auto-Refresh hook to existing analytics page
3. ✅ Add Social Auto-Queue hook to existing social components
4. ✅ Add Learning Auto-Update hook to existing learning components

### Phase 4: Optional (Future-Ready)
1. ⚠️ Global Scheduler Panel (Debug View) - Optional
2. ⚠️ AI-Adaptive Timing - Optional
3. ⚠️ Decentralized Time Sync - Optional

---

## 🔍 Filtered Requirements

### ✅ Necessary & Achievable:
- Centralized Timing Manager
- Timing Constants
- Auto-refresh hooks
- Inactivity detection
- Enhanced existing timing
- Portfolio inactivity reminder
- Analytics auto-refresh
- Social auto-queue delay
- Learning dashboard updates

### ⚠️ Optional (Can Skip):
- Global Scheduler Panel (Debug View) - Nice to have, not critical
- AI-Adaptive Timing - Complex, can be future enhancement
- Decentralized Time Sync - Requires backend integration

---

## ✅ Execution Confidence: **HIGH**

All core requirements are achievable:
- ✅ Timing mechanisms already exist throughout codebase
- ✅ Need to centralize and standardize
- ✅ React hooks pattern is familiar
- ✅ Can enhance existing components without breaking changes
- ✅ No complex backend dependencies for core features

---

## 📝 Recommended TODO List

1. Create centralized timing manager and constants
2. Create timing hooks (useTiming, useAutoRefresh, useInactivityDetection)
3. Enhance Notification Center with centralized timing
4. Add auto-refresh to Analytics Dashboard
5. Add periodic updates to Learning Dashboard
6. Add auto-queue delay to Social Integration
7. Standardize AI Chat message delays
8. Create Portfolio Inactivity Detector
9. Enhance Feedback Portal toast timing
10. Test all timing integrations


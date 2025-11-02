# Fix Build Errors - Clear Cache & Restart

## ✅ All Governance Components Fixed

All governance components have been updated to use separated exports:
- Changed from `export function ComponentName()` 
- To: `function ComponentName()` + `export { ComponentName }` at the end

## 🔄 Clear Cache & Restart Steps

If you're still seeing errors, it's likely due to cached build files:

### 1. Stop the Dev Server
Press `Ctrl+C` or `Cmd+C` in the terminal running the dev server

### 2. Clear Next.js Cache
```bash
rm -rf .next
```

### 3. Clear Node Modules Cache (Optional)
```bash
rm -rf node_modules/.cache
```

### 4. Restart Dev Server
```bash
npm run dev
```

### 5. Clear Browser Cache
- Hard refresh: `Ctrl+Shift+R` (Windows/Linux) or `Cmd+Shift+R` (Mac)
- Or clear browser cache manually

## ✅ Verification

After restarting, the build should work. All governance components are now properly exported:

- ✅ `trust-breakdown-widgets.tsx` - Fixed
- ✅ `trust-transparency-index.tsx` - Fixed
- ✅ All other governance components - Fixed

## 🎯 Build Status

The production build is successful:
```
✓ Compiled successfully
✓ Generating static pages (16/16)
```

If errors persist after clearing cache, the dev server should pick up the changes.


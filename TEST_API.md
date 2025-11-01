# API Testing & Troubleshooting

## Issue Found
The app shows "0 markets" because of API filtering issues.

## Fixes Applied

### 1. Removed Strict Filtering
**Before**: API was filtering for `closed: false` and `active: true`
**After**: Fetches all markets, filters on client side

### 2. Better Error Handling
- Added proper array checks
- Safe property access with fallbacks
- Better null/undefined handling

### 3. Debug Component
Added DebugInfo component (development only) that shows:
- Total markets fetched
- Filtered markets count
- Current category filter
- Loading state
- First market sample

### 4. Improved Filter Logic
- Better category matching
- Safe property access
- Returns all markets by default

## Test the API

### Manual Test:
```bash
# Test if API returns data
curl -s "https://gamma-api.polymarket.com/markets?limit=5" | jq '.[0:2]'
```

### Check App Console:
1. Open browser DevTools (F12)
2. Look for console logs:
   - "Error fetching markets" = API issue
   - Check Network tab for failed requests

### Debug Info (in development mode):
- Look at bottom-right corner of app
- Shows real-time market count
- Shows filtering status

## Common Issues

### Issue: "0 markets" displayed
**Causes**:
1. CORS issues (check browser console)
2. API rate limiting
3. Network connectivity
4. Filter too strict

**Solutions**:
1. Check browser console for errors
2. Look at debug info component
3. Try clicking "All" category
4. Clear search if any

### Issue: Markets not updating
**Cause**: Cache or stale data

**Solution**:
1. Hard refresh: Ctrl+Shift+R (Windows/Linux) or Cmd+Shift+R (Mac)
2. Clear browser cache
3. Check auto-refresh is working (every 60s)

## Verification

Run the app:
```bash
npm run dev
```

Then check:
1. ? Debug panel shows market count > 0
2. ? Markets display on screen
3. ? No console errors
4. ? Statistics show values

## API Endpoints

### Gamma API (Primary):
- Base: `https://gamma-api.polymarket.com`
- Markets: `/markets?limit=100`
- Single: `/markets/{id}`

### Response Structure:
```json
[
  {
    "id": "12",
    "question": "Will...",
    "active": true,
    "closed": false,
    "category": "Politics",
    "volumeNum": 1000000,
    "outcomes": "[\"Yes\", \"No\"]",
    "outcomePrices": "[\"0.6\", \"0.4\"]"
  }
]
```

## Next Steps if Still Not Working

1. Check the debug component in bottom-right
2. Open browser DevTools console
3. Look for red error messages
4. Check Network tab for failed API calls
5. Try different browser
6. Check internet connection

## Contact
If issues persist, check:
- Browser console for errors
- Network tab for failed requests
- Debug info for market count

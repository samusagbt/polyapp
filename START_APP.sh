#!/bin/bash

echo "======================================"
echo "  Starting Polymarket Dashboard"
echo "======================================"
echo ""

# Check if in workspace
if [ ! -f "package.json" ]; then
    echo "❌ Error: Not in /workspace directory"
    echo "Run: cd /workspace"
    exit 1
fi

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo ""
fi

echo "🚀 Starting development server..."
echo ""
echo "The app will open at: http://localhost:3000"
echo ""
echo "✓ Check bottom-right for debug panel"
echo "✓ Press Ctrl+C to stop"
echo ""
echo "======================================"
echo ""

npm run dev

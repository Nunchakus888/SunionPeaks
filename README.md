# Next.js Chrome Extension

This is a Chrome extension built with Next.js 15 and Tailwind CSS.

## Features

- Modern Next.js App Router
- Tailwind CSS for styling
- Chrome Extension Manifest V3 support
- In-extension navigation without page reloads

## Development

To run the development server:

```bash
npm run dev
```

## Building the extension

To build the extension:

```bash
npm run build
```

This will:
1. Build the Next.js app with static export
2. Process the output directory to make it compatible with Chrome's extension format
3. Generate the final extension in the `out` directory

## Loading the extension in Chrome

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" in the top right corner
3. Click "Load unpacked" and select the `out` directory from this project
4. The extension should now be loaded and available in your browser

## Important: Before publishing

Make sure to replace the placeholder icon file:
- Replace `public/icon.png` with a real PNG image
- For production, consider adding multiple icon sizes (16px, 48px, 128px)

## Structure

- `app/` - Next.js App Router pages
- `components/` - React components
- `public/` - Static assets and manifest.json
- `styles/` - Global styles and Tailwind CSS
- `out.js` - Script to process the build output for Chrome extension compatibility

## Customization

1. Update the manifest.json file in the public directory to change the extension's metadata
2. Replace the icon files with your own icons
3. Modify the components to create your desired UI and functionality 
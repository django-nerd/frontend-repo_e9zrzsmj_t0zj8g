# Westside-Furs Frontend

This project is built with Vite + React + Tailwind CSS.

## Logo usage

- The header logo loads from a local SVG for crisp rendering and reliability.
- On very small screens the brand uses a compact mark-only version; from medium screens upward it shows the full logo and the site title.
- Image elements include responsive sizing and object-fit to avoid distortion.

## Manual season switching

- A manual season switch is available. The state is stored globally in the app and propagated to the header and background.
- The control is docked just beneath the header so the entire wheel is visible on all screen sizes.
- Seasons: winter, spring, summer, autumn.

## Accessibility

- Interactive elements include focus-visible rings and no outline suppression for keyboard users.

## Social sharing & favicons

We expose the same logo as favicon/app icon and set Open Graph/Twitter metadata for rich previews.

- Favicon: public/favicon.svg
- Open Graph image: public/westside-furs.svg

To adjust, replace the assets in `public/` and keep the same names, or update the tags in `index.html` accordingly.

# Rebuilding the CSS

The site uses a compiled Tailwind CSS file (`css/site.css`) instead of the Tailwind CDN.
After changing classes in `index.html`, rebuild it from this folder:

    npx tailwindcss@3 -c tailwind.config.js -i tailwind.in.css -o ../css/site.css --minify

Then raise the `?v=` number on the `css/site.css` link in `index.html` so browsers fetch the new file.

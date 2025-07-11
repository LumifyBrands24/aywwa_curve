# Aywwa Cafe Menu Website

## How to Edit the Menu

1. Open the `menu.json` file in a text editor.
2. The file is structured with sections, each containing an array of items:

```json
{
  "sections": [
    {
      "name": "Section Name",
      "items": [
        {
          "name": "Item Name",
          "price": 0.00,
          "details": "Description of the item."
        }
      ]
    }
  ]
}
```
3. To add a new section, add a new object to the `sections` array.
4. To add or edit menu items, modify the `items` array within each section.
5. Save the file. Refresh the website to see your changes.

## How to Run Locally

1. Make sure all files (`index.html`, `menu.json`, `menu.js`, and `styles/menu.css`) are in the same directory structure.
2. Open `index.html` in your web browser.
   - If you do not see the menu, you may need to serve the files with a local web server (due to browser security restrictions for local JSON fetches).
   - You can use Python's built-in server:
     - For Python 3: `python -m http.server 8000`
     - For Python 2: `python -m SimpleHTTPServer 8000`
   - Then visit `http://localhost:8000` in your browser.

## Customization
- Update the logo in `styles/img/aywwa curve.png` as needed.
- Edit `styles/menu.css` for custom styles. 
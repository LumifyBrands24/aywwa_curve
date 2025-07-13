const fs = require('fs');
const path = require('path');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }
  try {
    const menuData = req.body;
    // Save to menu.json in the project root
    const filePath = path.join(process.cwd(), 'menu.json');
    fs.writeFileSync(filePath, JSON.stringify(menuData, null, 2), 'utf8');
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save menu.json', details: err.message });
  }
}

export const config = {
  api: {
    bodyParser: true,
  },
}; 
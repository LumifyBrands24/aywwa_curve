// Menu Editor GUI Script

let menuData = null;

function createInput(value, placeholder, type = 'text') {
    const input = document.createElement('input');
    input.type = type;
    input.value = value || '';
    input.placeholder = placeholder;
    input.style.marginRight = '0.5em';
    input.style.marginBottom = '0.5em';
    input.style.fontSize = '1em';
    input.style.padding = '0.3em 0.7em';
    input.style.borderRadius = '6px';
    input.style.border = '1px solid #b77b2b';
    input.style.background = '#23180f';
    input.style.color = '#ffd700';
    return input;
}

function createCheckbox(checked, labelText) {
    const label = document.createElement('label');
    label.style.marginRight = '1em';
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = checked;
    label.appendChild(checkbox);
    label.appendChild(document.createTextNode(' ' + labelText));
    return label;
}

function renderMenuEditor(container, data) {
    container.innerHTML = '';
    const sectionsDiv = document.createElement('div');
    data.sections.forEach((section, sIdx) => {
        const sectionDiv = document.createElement('div');
        sectionDiv.className = 'menu-section';
        sectionDiv.style.position = 'relative';
        sectionDiv.style.marginBottom = '2em';
        // Section header
        const headerDiv = document.createElement('div');
        headerDiv.style.display = 'flex';
        headerDiv.style.alignItems = 'center';
        headerDiv.style.justifyContent = 'space-between';
        // Section name
        const nameInput = createInput(section.name, 'Section Name');
        nameInput.oninput = e => {
            section.name = nameInput.value;
            renderMenuEditor(container, data);
        };
        headerDiv.appendChild(nameInput);
        // Special flag
        const specialCheckbox = createCheckbox(!!section.special, 'Special');
        specialCheckbox.querySelector('input').onchange = e => {
            section.special = specialCheckbox.querySelector('input').checked;
            renderMenuEditor(container, data);
        };
        headerDiv.appendChild(specialCheckbox);
        // Hidden flag
        const hiddenCheckbox = createCheckbox(!!section.hidden, 'Hidden');
        hiddenCheckbox.querySelector('input').onchange = e => {
            section.hidden = hiddenCheckbox.querySelector('input').checked;
            renderMenuEditor(container, data);
        };
        headerDiv.appendChild(hiddenCheckbox);
        // Delete section
        const delBtn = document.createElement('button');
        delBtn.textContent = 'Delete Section';
        delBtn.style.background = '#b77b2b';
        delBtn.style.color = '#fff';
        delBtn.style.border = 'none';
        delBtn.style.borderRadius = '6px';
        delBtn.style.padding = '0.3em 1em';
        delBtn.style.marginLeft = '1em';
        delBtn.style.cursor = 'pointer';
        delBtn.onclick = () => {
            if (confirm('Delete this section?')) {
                data.sections.splice(sIdx, 1);
                renderMenuEditor(container, data);
            }
        };
        headerDiv.appendChild(delBtn);
        sectionDiv.appendChild(headerDiv);
        // Items
        const itemsDiv = document.createElement('div');
        itemsDiv.style.marginLeft = '1.5em';
        (section.items || []).forEach((item, iIdx) => {
            const itemDiv = document.createElement('div');
            itemDiv.style.display = 'flex';
            itemDiv.style.alignItems = 'center';
            itemDiv.style.marginBottom = '0.7em';
            // Name
            const itemName = createInput(item.name, 'Item Name');
            itemName.oninput = () => {
                item.name = itemName.value;
            };
            itemDiv.appendChild(itemName);
            // Price (if not Al-Faham variant)
            if (!item.variants) {
                const itemPrice = createInput(item.price, 'Price', 'number');
                itemPrice.style.width = '6em';
                itemPrice.oninput = () => {
                    item.price = parseFloat(itemPrice.value) || 0;
                };
                itemDiv.appendChild(itemPrice);
            }
            // Details
            const itemDetails = createInput(item.details, 'Details');
            itemDetails.oninput = () => {
                item.details = itemDetails.value;
            };
            itemDiv.appendChild(itemDetails);
            // Hidden
            const itemHidden = createCheckbox(!!item.hidden, 'Hidden');
            itemHidden.querySelector('input').onchange = () => {
                item.hidden = itemHidden.querySelector('input').checked;
            };
            itemDiv.appendChild(itemHidden);
            // Delete item
            const delItemBtn = document.createElement('button');
            delItemBtn.textContent = 'Delete';
            delItemBtn.style.background = '#b77b2b';
            delItemBtn.style.color = '#fff';
            delItemBtn.style.border = 'none';
            delItemBtn.style.borderRadius = '6px';
            delItemBtn.style.padding = '0.2em 0.8em';
            delItemBtn.style.marginLeft = '0.7em';
            delItemBtn.style.cursor = 'pointer';
            delItemBtn.onclick = () => {
                if (confirm('Delete this item?')) {
                    section.items.splice(iIdx, 1);
                    renderMenuEditor(container, data);
                }
            };
            itemDiv.appendChild(delItemBtn);
            itemsDiv.appendChild(itemDiv);
        });
        // Add item button
        const addItemBtn = document.createElement('button');
        addItemBtn.textContent = '+ Add Item';
        addItemBtn.style.background = '#ffd700';
        addItemBtn.style.color = '#23180f';
        addItemBtn.style.border = 'none';
        addItemBtn.style.borderRadius = '6px';
        addItemBtn.style.padding = '0.3em 1em';
        addItemBtn.style.marginTop = '0.5em';
        addItemBtn.style.cursor = 'pointer';
        addItemBtn.onclick = () => {
            section.items = section.items || [];
            section.items.push({ name: '', price: 0, details: '', hidden: false });
            renderMenuEditor(container, data);
        };
        itemsDiv.appendChild(addItemBtn);
        sectionDiv.appendChild(itemsDiv);
        sectionsDiv.appendChild(sectionDiv);
    });
    // Add section button
    const addSectionBtn = document.createElement('button');
    addSectionBtn.textContent = '+ Add Section';
    addSectionBtn.style.background = '#ffd700';
    addSectionBtn.style.color = '#23180f';
    addSectionBtn.style.border = 'none';
    addSectionBtn.style.borderRadius = '6px';
    addSectionBtn.style.padding = '0.5em 1.5em';
    addSectionBtn.style.margin = '2em 0 1em 0';
    addSectionBtn.style.cursor = 'pointer';
    addSectionBtn.onclick = () => {
        data.sections.push({ name: '', items: [], hidden: false });
        renderMenuEditor(container, data);
    };
    container.appendChild(sectionsDiv);
    container.appendChild(addSectionBtn);
    // Save button
    const saveBtn = document.createElement('button');
    saveBtn.textContent = 'Save Menu to Server';
    saveBtn.style.marginTop = '2em';
    saveBtn.style.marginLeft = '2em';
    saveBtn.style.padding = '0.7em 2em';
    saveBtn.style.fontSize = '1.1rem';
    saveBtn.style.background = '#ffd700';
    saveBtn.style.color = '#23180f';
    saveBtn.style.border = 'none';
    saveBtn.style.borderRadius = '8px';
    saveBtn.style.cursor = 'pointer';
    saveBtn.onclick = async function() {
        saveBtn.disabled = true;
        saveBtn.textContent = 'Saving...';
        try {
            const response = await fetch('/api/save-menu', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data, null, 2)
            });
            if (response.ok) {
                saveBtn.textContent = 'Saved!';
                setTimeout(() => { saveBtn.textContent = 'Save Menu to Server'; saveBtn.disabled = false; }, 2000);
            } else {
                const err = await response.json();
                alert('Failed to save: ' + (err.error || 'Unknown error'));
                saveBtn.textContent = 'Save Menu to Server';
                saveBtn.disabled = false;
            }
        } catch (e) {
            alert('Failed to save: ' + e.message);
            saveBtn.textContent = 'Save Menu to Server';
            saveBtn.disabled = false;
        }
    };
    container.appendChild(saveBtn);

    // Download button
    const downloadBtn = document.createElement('button');
    downloadBtn.textContent = 'Download Menu JSON';
    downloadBtn.style.marginTop = '2em';
    downloadBtn.style.marginLeft = '1em';
    downloadBtn.style.padding = '0.7em 2em';
    downloadBtn.style.fontSize = '1.1rem';
    downloadBtn.style.background = '#ffd700';
    downloadBtn.style.color = '#23180f';
    downloadBtn.style.border = 'none';
    downloadBtn.style.borderRadius = '8px';
    downloadBtn.style.cursor = 'pointer';
    downloadBtn.onclick = function() {
        const blob = new Blob([JSON.stringify(data, null, 2)], {type: 'application/json'});
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'menu.json';
        a.click();
        URL.revokeObjectURL(url);
    };
    container.appendChild(downloadBtn);
    // Info
    const info = document.createElement('div');
    info.style.marginTop = '1.5rem';
    info.style.color = '#b77b2b';
    info.innerHTML = '<b>Note:</b> After editing and downloading, you must manually replace the menu.json file on the server.';
    container.appendChild(info);
}

async function loadMenuForEdit() {
    const container = document.getElementById('editor-container');
    container.innerHTML = '<p>Loading menu...</p>';
    try {
        const response = await fetch('menu.json');
        if (!response.ok) throw new Error('Menu data not found');
        menuData = await response.json();
        renderMenuEditor(container, menuData);
    } catch (err) {
        container.innerHTML = '<p style="color:red;">Failed to load menu. Please try again later.</p>';
        console.error(err);
    }
}

document.addEventListener('DOMContentLoaded', loadMenuForEdit); 
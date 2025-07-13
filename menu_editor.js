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
    // Responsive container
    const responsiveStyle = document.createElement('style');
    responsiveStyle.textContent = `
    .editor-section {
      margin-bottom: 2em;
      padding: 1.2em 1em 1em 1em;
      border-radius: 16px;
      background: #23180f;
      box-shadow: 0 2px 12px rgba(0,0,0,0.10);
    }
    .editor-section-header {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 0.7em;
      margin-bottom: 0.7em;
      padding-bottom: 0.5em;
      border-bottom: 1.5px solid #b77b2b;
    }
    .editor-item {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 0.7em;
      margin-bottom: 1em;
      background: #18120c;
      border-radius: 8px;
      padding: 0.9em 0.7em 0.7em 0.7em;
      margin-top: 0.7em;
      box-shadow: 0 1px 6px rgba(255,215,0,0.05);
    }
    .editor-variants-header, .editor-variants-row {
      display: grid;
      grid-template-columns: 1fr 1fr 2.2em;
      align-items: center;
      gap: 0.5em;
      width: 100%;
    }
    .editor-variants-header {
      font-weight: bold;
      margin-bottom: 0.2em;
      padding-bottom: 0.2em;
      border-bottom: 1px solid #b77b2b;
    }
    .editor-variants-row {
      margin-bottom: 0.3em;
      padding-top: 0.2em;
    }
    .editor-variants-row input {
      width: 100%;
      box-sizing: border-box;
    }
    .editor-variants-row button {
      width: 2.2em;
      height: 2.2em;
      margin: 0;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .editor-variants .add-variant-btn {
      margin-top: 0.7em;
      width: 100%;
      font-size: 1em;
      padding: 0.5em 0;
      box-sizing: border-box;
    }
    .editor-btn-group {
      display: flex;
      flex-wrap: wrap;
      gap: 1em;
      margin-top: 2em;
      margin-bottom: 1em;
    }
    .editor-section-header button,
    .editor-item button,
    .editor-btn-group button {
      min-width: 2.2em;
      min-height: 2.2em;
      font-size: 1em;
      margin: 0;
    }
    @media (max-width: 700px) {
      .editor-section, .editor-item, .editor-variants-row, .editor-variants-header {
        flex-direction: column !important;
        align-items: flex-start !important;
        gap: 0.5em !important;
      }
      .editor-section-header, .editor-item {
        flex-direction: column !important;
        align-items: flex-start !important;
        gap: 0.5em !important;
      }
      .editor-section-header > *, .editor-item > * {
        margin-bottom: 0.5em !important;
        margin-right: 0 !important;
      }
      .editor-variants-row > * {
        margin-bottom: 0.3em !important;
        margin-right: 0 !important;
      }
      .editor-variants {
        max-width: 100%;
        width: 100%;
        margin-left: 0;
        padding: 0.7em 0.5em;
      }
      .editor-btn-group {
        flex-direction: column;
        gap: 0.7em;
        align-items: stretch;
      }
      .editor-variants-header, .editor-variants-row {
        grid-template-columns: 1fr 1fr 2.2em;
      }
    }
    `;
    container.appendChild(responsiveStyle);
    const sectionsDiv = document.createElement('div');
    data.sections.forEach((section, sIdx) => {
        // Collapsible section
        const sectionDiv = document.createElement('div');
        sectionDiv.className = 'menu-section editor-section';
        sectionDiv.style.position = 'relative';
        sectionDiv.style.marginBottom = '2em';
        sectionDiv.style.boxShadow = '0 2px 12px rgba(0,0,0,0.10)';
        // Section header (collapsible)
        const headerDiv = document.createElement('div');
        headerDiv.className = 'editor-section-header';
        headerDiv.style.display = 'flex';
        headerDiv.style.alignItems = 'center';
        headerDiv.style.justifyContent = 'space-between';
        headerDiv.style.flexWrap = 'wrap';
        headerDiv.style.gap = '0.5em';
        // Collapsible toggle
        const collapseBtn = document.createElement('button');
        collapseBtn.textContent = section._collapsed ? '▶' : '▼';
        collapseBtn.title = section._collapsed ? 'Expand section' : 'Collapse section';
        collapseBtn.style.background = '#ffd700';
        collapseBtn.style.color = '#23180f';
        collapseBtn.style.border = 'none';
        collapseBtn.style.borderRadius = '6px';
        collapseBtn.style.padding = '0.2em 0.7em';
        collapseBtn.style.cursor = 'pointer';
        collapseBtn.onclick = () => {
            section._collapsed = !section._collapsed;
            renderMenuEditor(container, data);
        };
        headerDiv.appendChild(collapseBtn);
        // Section name
        const nameInput = createInput(section.name, 'Section Name');
        nameInput.style.fontWeight = 'bold';
        nameInput.style.fontSize = '1.1em';
        nameInput.oninput = e => {
            section.name = nameInput.value;
        };
        headerDiv.appendChild(nameInput);
        // Move section up
        const upBtn = document.createElement('button');
        upBtn.textContent = '↑';
        upBtn.title = 'Move section up';
        upBtn.style.background = '#ffd700';
        upBtn.style.color = '#23180f';
        upBtn.style.border = 'none';
        upBtn.style.borderRadius = '6px';
        upBtn.style.padding = '0.2em 0.7em';
        upBtn.style.cursor = 'pointer';
        upBtn.disabled = sIdx === 0;
        upBtn.onclick = () => {
            if (sIdx > 0) {
                const temp = data.sections[sIdx - 1];
                data.sections[sIdx - 1] = data.sections[sIdx];
                data.sections[sIdx] = temp;
                renderMenuEditor(container, data);
            }
        };
        headerDiv.appendChild(upBtn);
        // Move section down
        const downBtn = document.createElement('button');
        downBtn.textContent = '↓';
        downBtn.title = 'Move section down';
        downBtn.style.background = '#ffd700';
        downBtn.style.color = '#23180f';
        downBtn.style.border = 'none';
        downBtn.style.borderRadius = '6px';
        downBtn.style.padding = '0.2em 0.7em';
        downBtn.style.cursor = 'pointer';
        downBtn.disabled = sIdx === data.sections.length - 1;
        downBtn.onclick = () => {
            if (sIdx < data.sections.length - 1) {
                const temp = data.sections[sIdx + 1];
                data.sections[sIdx + 1] = data.sections[sIdx];
                data.sections[sIdx] = temp;
                renderMenuEditor(container, data);
            }
        };
        headerDiv.appendChild(downBtn);
        // Special flag
        const specialCheckbox = createCheckbox(!!section.special, 'Special');
        specialCheckbox.querySelector('input').onchange = e => {
            section.special = specialCheckbox.querySelector('input').checked;
        };
        headerDiv.appendChild(specialCheckbox);
        // Hidden flag
        const hiddenCheckbox = createCheckbox(!!section.hidden, 'Hidden');
        hiddenCheckbox.querySelector('input').onchange = e => {
            section.hidden = hiddenCheckbox.querySelector('input').checked;
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
        if (!section._collapsed) {
            const itemsDiv = document.createElement('div');
            itemsDiv.style.marginLeft = '0.5em';
            (section.items || []).forEach((item, iIdx) => {
                const itemDiv = document.createElement('div');
                itemDiv.className = 'editor-item';
                itemDiv.style.display = 'flex';
                itemDiv.style.alignItems = 'center';
                itemDiv.style.flexWrap = 'wrap';
                itemDiv.style.marginBottom = '0.7em';
                itemDiv.style.background = '#18120c';
                itemDiv.style.borderRadius = '8px';
                itemDiv.style.padding = '0.7em 0.7em 0.7em 0.7em';
                itemDiv.style.marginTop = '0.7em';
                itemDiv.style.boxShadow = '0 1px 6px rgba(255,215,0,0.05)';
                // Item index
                const idxLabel = document.createElement('span');
                idxLabel.textContent = (iIdx + 1) + '.';
                idxLabel.style.marginRight = '0.7em';
                idxLabel.style.color = '#ffd700';
                itemDiv.appendChild(idxLabel);
                // Move item up
                const itemUpBtn = document.createElement('button');
                itemUpBtn.textContent = '↑';
                itemUpBtn.title = 'Move item up';
                itemUpBtn.style.background = '#ffd700';
                itemUpBtn.style.color = '#23180f';
                itemUpBtn.style.border = 'none';
                itemUpBtn.style.borderRadius = '6px';
                itemUpBtn.style.padding = '0.2em 0.7em';
                itemUpBtn.style.cursor = 'pointer';
                itemUpBtn.disabled = iIdx === 0;
                itemUpBtn.onclick = () => {
                    if (iIdx > 0) {
                        const temp = section.items[iIdx - 1];
                        section.items[iIdx - 1] = section.items[iIdx];
                        section.items[iIdx] = temp;
                        renderMenuEditor(container, data);
                    }
                };
                itemDiv.appendChild(itemUpBtn);
                // Move item down
                const itemDownBtn = document.createElement('button');
                itemDownBtn.textContent = '↓';
                itemDownBtn.title = 'Move item down';
                itemDownBtn.style.background = '#ffd700';
                itemDownBtn.style.color = '#23180f';
                itemDownBtn.style.border = 'none';
                itemDownBtn.style.borderRadius = '6px';
                itemDownBtn.style.padding = '0.2em 0.7em';
                itemDownBtn.style.cursor = 'pointer';
                itemDownBtn.disabled = iIdx === section.items.length - 1;
                itemDownBtn.onclick = () => {
                    if (iIdx < section.items.length - 1) {
                        const temp = section.items[iIdx + 1];
                        section.items[iIdx + 1] = section.items[iIdx];
                        section.items[iIdx] = temp;
                        renderMenuEditor(container, data);
                    }
                };
                itemDiv.appendChild(itemDownBtn);
                // Name
                const itemName = createInput(item.name, 'Item Name');
                itemName.oninput = () => {
                    item.name = itemName.value;
                };
                itemDiv.appendChild(itemName);
                // Variants toggle
                const variantsToggleBtn = document.createElement('button');
                variantsToggleBtn.textContent = item.variants ? 'Remove Variants' : 'Add Variants';
                variantsToggleBtn.title = item.variants ? 'Convert to single price item' : 'Convert to variants item';
                variantsToggleBtn.style.background = '#ffd700';
                variantsToggleBtn.style.color = '#23180f';
                variantsToggleBtn.style.border = 'none';
                variantsToggleBtn.style.borderRadius = '6px';
                variantsToggleBtn.style.padding = '0.2em 0.7em';
                variantsToggleBtn.style.marginLeft = '0.7em';
                variantsToggleBtn.style.cursor = 'pointer';
                variantsToggleBtn.onclick = () => {
                    if (item.variants) {
                        // Convert to single price item
                        delete item.variants;
                        item.price = 0;
                    } else {
                        // Convert to variants item
                        item.variants = [{ portion: '', price: 0 }];
                        delete item.price;
                    }
                    renderMenuEditor(container, data);
                };
                itemDiv.appendChild(variantsToggleBtn);
                // Variants UI (for all items)
                if (item.variants && Array.isArray(item.variants)) {
                    // Details
                    const itemDetails = createInput(item.details, 'Details');
                    itemDetails.oninput = () => {
                        item.details = itemDetails.value;
                    };
                    itemDiv.appendChild(itemDetails);
                    // Variants table
                    const variantsDiv = document.createElement('div');
                    variantsDiv.className = 'editor-variants';
                    // Table header
                    const headerRow = document.createElement('div');
                    headerRow.className = 'editor-variants-header';
                    ['Portion', 'Price', ''].forEach(h => {
                        const cell = document.createElement('div');
                        cell.textContent = h;
                    headerRow.appendChild(cell);
                    });
                    variantsDiv.appendChild(headerRow);
                    // Each variant
                    item.variants.forEach((variant, vIdx) => {
                        const row = document.createElement('div');
                        row.className = 'editor-variants-row';
                        // Portion
                        const portionInput = createInput(variant.portion, 'Portion');
                        portionInput.oninput = () => {
                            variant.portion = portionInput.value;
                        };
                        row.appendChild(portionInput);
                        // Price
                        const priceInput = createInput(variant.price, 'Price', 'number');
                        priceInput.oninput = () => {
                            variant.price = parseFloat(priceInput.value) || 0;
                        };
                        row.appendChild(priceInput);
                        // Delete variant
                        const delVarBtn = document.createElement('button');
                        delVarBtn.textContent = '✕';
                        delVarBtn.style.background = '#b77b2b';
                        delVarBtn.style.color = '#fff';
                        delVarBtn.style.border = 'none';
                        delVarBtn.style.borderRadius = '6px';
                        delVarBtn.style.cursor = 'pointer';
                        delVarBtn.onclick = () => {
                            item.variants.splice(vIdx, 1);
                            renderMenuEditor(container, data);
                        };
                        row.appendChild(delVarBtn);
                        variantsDiv.appendChild(row);
                    });
                    // Add variant button
                    const addVarBtn = document.createElement('button');
                    addVarBtn.textContent = '+ Add Variant';
                    addVarBtn.className = 'add-variant-btn';
                    addVarBtn.style.background = '#ffd700';
                    addVarBtn.style.color = '#23180f';
                    addVarBtn.style.border = 'none';
                    addVarBtn.style.borderRadius = '6px';
                    addVarBtn.style.cursor = 'pointer';
                    addVarBtn.onclick = () => {
                        item.variants.push({ portion: '', price: 0 });
                        renderMenuEditor(container, data);
                    };
                    variantsDiv.appendChild(addVarBtn);
                    itemDiv.appendChild(variantsDiv);
                } else {
                    // Price (if not variants)
                    const itemPrice = createInput(item.price, 'Price', 'number');
                    itemPrice.style.width = '6em';
                    itemPrice.oninput = () => {
                        item.price = parseFloat(itemPrice.value) || 0;
                    };
                    itemDiv.appendChild(itemPrice);
                    // Details
                    const itemDetails = createInput(item.details, 'Details');
                    itemDetails.oninput = () => {
                        item.details = itemDetails.value;
                    };
                    itemDiv.appendChild(itemDetails);
                }
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
        }
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
    // Save and Download buttons (grouped)
    const btnGroup = document.createElement('div');
    btnGroup.className = 'editor-btn-group';
    // Save button
    const saveBtn = document.createElement('button');
    saveBtn.textContent = 'Save Menu to Server';
    saveBtn.style.padding = '0.7em 2em';
    saveBtn.style.fontSize = '1.1rem';
    saveBtn.style.background = '#ffd700';
    saveBtn.style.color = '#23180f';
    saveBtn.style.border = 'none';
    saveBtn.style.borderRadius = '8px';
    saveBtn.style.cursor = 'pointer';
    saveBtn.style.marginRight = '1em';
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
    btnGroup.appendChild(saveBtn);
    // Download button
    const downloadBtn = document.createElement('button');
    downloadBtn.textContent = 'Download Menu JSON';
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
    btnGroup.appendChild(downloadBtn);
    container.appendChild(btnGroup);
    // Info
    const info = document.createElement('div');
    info.style.marginTop = '1.5rem';
    info.style.color = '#b77b2b';
    info.innerHTML = '<b>Note:</b> After editing and saving, your menu is updated on the server. You can also download a backup.';
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
async function loadMenu() {
    const container = document.getElementById('menu-container');
    const navLabelsDiv = document.querySelector('.nav-labels');
    try {
        const response = await fetch('menu.json');
        if (!response.ok) throw new Error('Menu data not found');
        const data = await response.json();
        container.innerHTML = '';
        navLabelsDiv.innerHTML = '';
        // Create nav labels and sections
        data.sections.forEach((section, idx) => {
            // Create section id from name
            const sectionId = section.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
            // Nav label
            const label = document.createElement('button');
            label.className = 'nav-label';
            label.textContent = section.name;
            label.setAttribute('data-section', sectionId);
            label.onclick = () => {
                document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth', block: 'start' });
            };
            navLabelsDiv.appendChild(label);
            // Section
            if (section.special) {
                const comboSection = document.createElement('section');
                comboSection.className = 'combo-offer-section';
                comboSection.id = sectionId;
                const comboTitle = document.createElement('h2');
                comboTitle.textContent = section.name;
                comboSection.appendChild(comboTitle);
                const comboCardsDiv = document.createElement('div');
                comboCardsDiv.className = 'combo-offer-cards';
                section.items.forEach(item => {
                    const card = document.createElement('div');
                    card.className = 'combo-offer-card';
                    const title = document.createElement('h3');
                    title.textContent = item.name;
                    const price = document.createElement('div');
                    price.className = 'price';
                    price.textContent = `₹${item.price}`;
                    const details = document.createElement('div');
                    details.className = 'details';
                    details.textContent = item.details;
                    card.appendChild(title);
                    card.appendChild(price);
                    card.appendChild(details);
                    comboCardsDiv.appendChild(card);
                });
                comboSection.appendChild(comboCardsDiv);
                container.appendChild(comboSection);
            } else if (section.name.toLowerCase() === 'al-faham') {
                // Special rendering for Al-Faham
                const fahamSection = document.createElement('section');
                fahamSection.className = 'menu-section';
                fahamSection.id = sectionId;
                const fahamTitle = document.createElement('h2');
                fahamTitle.textContent = section.name;
                fahamSection.appendChild(fahamTitle);
                section.items.forEach(item => {
                    const groupDiv = document.createElement('div');
                    groupDiv.className = 'faham-group';
                    const groupTitle = document.createElement('h3');
                    groupTitle.textContent = item.name;
                    groupDiv.appendChild(groupTitle);
                    if (item.details) {
                        const groupDetails = document.createElement('div');
                        groupDetails.className = 'details';
                        groupDetails.textContent = item.details;
                        groupDiv.appendChild(groupDetails);
                    }
                    if (item.variants && Array.isArray(item.variants)) {
                        const table = document.createElement('table');
                        table.className = 'faham-table';
                        const tr = document.createElement('tr');
                        item.variants.forEach(variant => {
                            const th = document.createElement('th');
                            th.textContent = variant.portion;
                            tr.appendChild(th);
                        });
                        table.appendChild(tr);
                        const tr2 = document.createElement('tr');
                        item.variants.forEach(variant => {
                            const td = document.createElement('td');
                            td.textContent = `₹${variant.price}`;
                            tr2.appendChild(td);
                        });
                        table.appendChild(tr2);
                        groupDiv.appendChild(table);
                    }
                    fahamSection.appendChild(groupDiv);
                });
                container.appendChild(fahamSection);
            } else {
                const sectionDiv = document.createElement('section');
                sectionDiv.className = 'menu-section';
                sectionDiv.id = sectionId;
                const sectionTitle = document.createElement('h2');
                sectionTitle.textContent = section.name;
                sectionDiv.appendChild(sectionTitle);
                const cardsDiv = document.createElement('div');
                cardsDiv.className = 'menu-cards';
                section.items.forEach(item => {
                    const card = document.createElement('div');
                    card.className = 'menu-card';
                    const title = document.createElement('h3');
                    title.textContent = item.name;
                    card.appendChild(title);
                    if (item.details) {
                        const details = document.createElement('div');
                        details.className = 'details';
                        details.textContent = item.details;
                        card.appendChild(details);
                    }
                    if (item.variants && Array.isArray(item.variants)) {
                        // Render variants as a table
                        const table = document.createElement('table');
                        table.className = 'variants-table';
                        const tr = document.createElement('tr');
                        item.variants.forEach(variant => {
                            const th = document.createElement('th');
                            th.textContent = variant.portion;
                            tr.appendChild(th);
                        });
                        table.appendChild(tr);
                        const tr2 = document.createElement('tr');
                        item.variants.forEach(variant => {
                            const td = document.createElement('td');
                            td.textContent = `₹${variant.price}`;
                            tr2.appendChild(td);
                        });
                        table.appendChild(tr2);
                        card.appendChild(table);
                    } else if (typeof item.price !== 'undefined') {
                        // Render single price
                        const price = document.createElement('div');
                        price.className = 'price';
                        price.textContent = `₹${item.price}`;
                        card.appendChild(price);
                    }
                    cardsDiv.appendChild(card);
                });
                sectionDiv.appendChild(cardsDiv);
                container.appendChild(sectionDiv);
            }
        });
        // Highlight active label on scroll
        const sectionIds = data.sections.map(s => s.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'));
        window.addEventListener('scroll', () => {
            let activeIdx = 0;
            for (let i = 0; i < sectionIds.length; i++) {
                const sec = document.getElementById(sectionIds[i]);
                if (sec && sec.getBoundingClientRect().top - 120 < 0) {
                    activeIdx = i;
                }
            }
            document.querySelectorAll('.nav-label').forEach((el, idx) => {
                if (idx === activeIdx) el.classList.add('active');
                else el.classList.remove('active');
            });
        });
    } catch (err) {
        container.innerHTML = '<p style="color:red;">Failed to load menu. Please try again later.</p>';
        navLabelsDiv.innerHTML = '';
        console.error(err);
    }
}

document.addEventListener('DOMContentLoaded', loadMenu); 
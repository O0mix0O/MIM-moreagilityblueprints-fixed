export function setup(ctx) {
    ctx.patch(Agility, 'setupBlueprints').before(() => {
        // Number of blueprints we want to support
        const maxBlueprints = 30;

        // Check if our custom blueprint storage exists; if not, initialize it
        if (!game.agility.customBlueprints) {
            game.agility.customBlueprints = new Map();
        }

        // Generate HTML for Load and Save menus
        let loadInnerHtml = '';
        let saveInnerHtml = '';
        for (let i = 0; i < maxBlueprints; i++) {
            const blueprintName = game.agility.customBlueprints.get(i)?.name || 'Empty Slot';
            loadInnerHtml += `
                <a class="dropdown-item pointer-enabled" id="agility-load-blueprint-button-${i}">
                    Load: <span class="text-warning" id="agility-blueprint-name-${i}">${blueprintName}</span>
                </a>`;
            saveInnerHtml += `
                <a class="dropdown-item pointer-enabled" id="agility-save-blueprint-button-${i}">
                    Save to Slot ${i + 1}: <span class="text-warning" id="agility-blueprint-name-${i}">${blueprintName}</span>
                </a>`;
        }

        // Find the relevant DOM elements for Load and Save menus
        const loadElement = document.getElementById('agility-container').getElementsByClassName('dropdown-menu')[0];
        const saveElement = document.getElementById('agility-container').getElementsByClassName('dropdown-menu')[1];

        // Update their innerHTML and add scrolling styles
        loadElement.innerHTML = loadInnerHtml;
        saveElement.innerHTML = saveInnerHtml;
        loadElement.style['overflow-y'] = 'scroll';
        loadElement.style['max-height'] = '40vh';
        saveElement.style['overflow-y'] = 'scroll';
        saveElement.style['max-height'] = '40vh';

        // Set the maximum number of blueprints for use in the game
        game.agility.maxBlueprints = maxBlueprints;

        // Add event listeners for Load and Save buttons
        for (let i = 0; i < maxBlueprints; i++) {
            // Load Button Event
            document.getElementById(`agility-load-blueprint-button-${i}`).addEventListener('click', () => {
                const blueprint = game.agility.customBlueprints.get(i);
                if (blueprint) {
                    // Apply the blueprint logic here (e.g., set obstacles, pillars, etc.)
                    console.log(`Loaded blueprint: ${JSON.stringify(blueprint)}`);
                } else {
                    console.log('No blueprint to load in this slot.');
                }
            });

            // Save Button Event
            document.getElementById(`agility-save-blueprint-button-${i}`).addEventListener('click', () => {
                // Gather current agility course configuration
                const currentBlueprint = {
                    name: `Blueprint ${i + 1}`, // Replace with user input for custom names if desired
                    data: {
                        obstacles: [...game.agility.obstacleBuildCount.entries()], // Example of saving obstacle counts
                        // Add other data points to save as needed
                    },
                };
                game.agility.customBlueprints.set(i, currentBlueprint);
                document.getElementById(`agility-blueprint-name-${i}`).textContent = currentBlueprint.name;
                console.log(`Saved blueprint: ${JSON.stringify(currentBlueprint)}`);
            });
        }
    });
}

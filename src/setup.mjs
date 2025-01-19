export function setup(ctx) {
    ctx.settings.section('Blueprint Settings').add({
        type: 'number',
        name: 'max-blueprints',
        label: 'Maximum Blueprints',
        hint: 'Set the maximum number of blueprints you want to allow. - Then restart',
        default: 30,
        min: 5,
        max: 500,
    });

    ctx.patch(Agility, 'setupBlueprints').before(() => {
        const maxBlueprints = ctx.settings.section('Blueprint Settings').get('max-blueprints');

        if (!game.agility.customBlueprints) {
            game.agility.customBlueprints = new Map();
        }

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

        const loadElement = document.getElementById('agility-container').getElementsByClassName('dropdown-menu')[0];
        const saveElement = document.getElementById('agility-container').getElementsByClassName('dropdown-menu')[1];

        loadElement.innerHTML = loadInnerHtml;
        saveElement.innerHTML = saveInnerHtml;
        loadElement.style['overflow-y'] = 'scroll';
        loadElement.style['max-height'] = '40vh';
        saveElement.style['overflow-y'] = 'scroll';
        saveElement.style['max-height'] = '40vh';

        game.agility.maxBlueprints = maxBlueprints;

        for (let i = 0; i < maxBlueprints; i++) {
            document.getElementById(`agility-load-blueprint-button-${i}`).addEventListener('click', () => {
                const blueprint = game.agility.customBlueprints.get(i);
                if (blueprint) {
                    console.log(`Loaded blueprint: ${JSON.stringify(blueprint)}`);
                } else {
                    console.log('No blueprint to load in this slot.');
                }
            });

            document.getElementById(`agility-save-blueprint-button-${i}`).addEventListener('click', () => {
                const currentBlueprint = {
                    name: `Blueprint ${i + 1}`,
                    data: {
                        obstacles: [...game.agility.obstacleBuildCount.entries()],
                    },
                };
                game.agility.customBlueprints.set(i, currentBlueprint);
                document.getElementById(`agility-blueprint-name-${i}`).textContent = currentBlueprint.name;
                console.log(`Saved blueprint: ${JSON.stringify(currentBlueprint)}`);
            });
        }
    });
}

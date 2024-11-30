// Dati di esempio per le telecamere
const cameras = [
    { 
        id: 'CAM001', 
        name: 'Campo de\'fiori', 
        area: 'Centro Storico',
        location: { lat: 41.8956, lng: 12.4722 },
        active: true
    },
    { 
        id: 'CAM002', 
        name: 'Via Frattina', 
        area: 'Centro Storico',
        location: { lat: 41.9045, lng: 12.4800 },
        active: true
    },
    { 
        id: 'CAM003', 
        name: 'Via del Corso', 
        area: 'Centro Storico',
        location: { lat: 41.9023, lng: 12.4800 },
        active: true
    },
    { 
        id: 'CAM004', 
        name: 'Piazza di Spagna', 
        area: 'Centro Storico',
        location: { lat: 41.9058, lng: 12.4823 },
        active: true
    },
    {
        id: 'CAM011',
        name: 'Trastevere - Piazza Santa Maria',
        area: 'Trastevere',
        location: { lat: 41.8892, lng: 12.4694 },
        active: true
    },
    {
        id: 'CAM012',
        name: 'Trastevere - Via della Lungaretta',
        area: 'Trastevere',
        location: { lat: 41.8895, lng: 12.4710 },
        active: true
    }
];

window.generateCameraRows = function() {
    return cameras.map(camera => `
        <tr data-camera-id="${camera.id}" class="hover:bg-blue-50 transition-all duration-200">
            <td class="px-8 py-5">
                <div class="flex items-center gap-4">
                    <div class="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <i class="fas fa-video text-blue-600 text-lg"></i>
                    </div>
                    <div class="font-medium text-gray-900">${camera.name}</div>
                </div>
            </td>
            <td class="px-8 py-5 text-center">
                <div class="font-medium text-gray-900">${camera.area}</div>
            </td>
        </tr>
    `).join('');
};

window.generateCamerasSection = function() {
    return `
        <div class="space-y-8 p-6">
            <div class="flex items-center justify-between">
                <h2 class="text-2xl font-bold text-gray-800">Gestione Telecamere</h2>
                <div class="relative">
                    <button 
                        onclick="toggleExportDropdown()"
                        class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2"
                    >
                        <i class="fas fa-download"></i>
                        Esporta report per quartiere
                    </button>
                    <div id="exportDropdown" class="hidden absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                        <div class="p-4">
                            <div class="mb-3">
                                <label class="flex items-center">
                                    <input type="checkbox" id="selectAllNeighborhoods" onchange="toggleAllNeighborhoods()" class="mr-2">
                                    <span class="text-sm">Seleziona tutti</span>
                                </label>
                            </div>
                            <div class="space-y-2" id="neighborhoodsList">
                                ${[...new Set(cameras.map(camera => camera.area))].map(area => `
                                    <label class="flex items-center">
                                        <input type="checkbox" name="neighborhood" value="${area}" class="mr-2 neighborhood-checkbox">
                                        <span class="text-sm">${area}</span>
                                    </label>
                                `).join('')}
                            </div>
                            <button 
                                onclick="exportData()"
                                class="mt-4 w-full px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                Conferma
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
                <table class="min-w-full">
                    <thead>
                        <tr class="bg-gradient-to-r from-blue-600 to-blue-700">
                            <th class="px-8 py-5 text-left text-sm font-semibold text-white tracking-wider">Nome Telecamera</th>
                            <th class="px-8 py-5 text-center text-sm font-semibold text-white tracking-wider">Area</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-100" id="cameras-table-body">
                        ${generateCameraRows()}
                    </tbody>
                </table>
            </div>
        </div>
    `;
};

window.initializeCameraHandlers = function() {
    document.querySelectorAll('.camera-toggle').forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {
            const cameraId = e.target.closest('tr').dataset.cameraId;
            const camera = cameras.find(c => c.id === cameraId);
            if (camera) {
                camera.active = e.target.checked;
            }
        });
    });

    document.querySelectorAll('.neighborhood-select').forEach(select => {
        select.addEventListener('change', (e) => {
            const cameraId = e.target.dataset.cameraId;
            const camera = cameras.find(c => c.id === cameraId);
            if (camera) {
                camera.area = e.target.value;
            }
        });
    });
};

window.toggleExportDropdown = function() {
    const dropdown = document.getElementById('exportDropdown');
    dropdown.classList.toggle('hidden');
};

window.toggleAllNeighborhoods = function() {
    const selectAllCheckbox = document.getElementById('selectAllNeighborhoods');
    const neighborhoodCheckboxes = document.querySelectorAll('.neighborhood-checkbox');
    neighborhoodCheckboxes.forEach(checkbox => {
        checkbox.checked = selectAllCheckbox.checked;
    });
};

window.exportData = function() {
    const selectedNeighborhoods = Array.from(document.querySelectorAll('.neighborhood-checkbox:checked'))
        .map(checkbox => checkbox.value);
    
    if (selectedNeighborhoods.length === 0) {
        alert('Seleziona almeno un quartiere');
        return;
    }

    const neighborhoodsString = selectedNeighborhoods.join(',');
    const webhookUrl = 'YOUR_MAKE_WEBHOOK_URL';

    fetch(webhookUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            neighborhoods: neighborhoodsString
        })
    })
    .then(response => {
        if (response.ok) {
            alert('Report richiesto con successo');
        } else {
            throw new Error('Errore nella richiesta del report');
        }
    })
    .catch(error => {
        console.error('Errore:', error);
        alert('Si è verificato un errore durante la richiesta del report');
    });
    
    document.getElementById('exportDropdown').classList.add('hidden');
};

document.addEventListener('click', function(event) {
    const dropdown = document.getElementById('exportDropdown');
    const exportButton = event.target.closest('button');
    
    if (!dropdown?.contains(event.target) && !exportButton?.contains(event.target)) {
        dropdown?.classList.add('hidden');
    }
});
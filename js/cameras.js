// Dati di esempio per le telecamere
const cameras = [
    { 
        id: 'CAM001', 
        name: 'Campo de\' fiori', 
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
        <tr data-camera-id="${camera.id}" class="hover:bg-slate-50/70 transition-all duration-300">
            <td class="px-8 py-6">
                <div class="flex items-center gap-5">
                    <div class="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-b from-blue-800/20 to-blue-900/30 
                                flex items-center justify-center shadow-sm relative overflow-hidden group
                                hover:shadow-md transition-shadow duration-300
                                before:absolute before:inset-0 before:bg-gradient-to-b before:from-transparent before:to-blue-900/30">
                        <i class="fas fa-video text-blue-600 text-xl relative z-10 group-hover:scale-110 transition-transform duration-300"></i>
                    </div>
                    <div>
                        <div class="font-medium text-slate-800 text-lg">${camera.name}</div>
                        <div class="text-sm text-slate-500 mt-1">${camera.id}</div>
                    </div>
                </div>
            </td>
            <td class="px-8 py-6 text-center">
                <span class="px-5 py-2.5 rounded-xl bg-gradient-to-r from-slate-100 to-slate-200 
                           text-slate-700 font-medium shadow-sm border border-slate-200/50
                           hover:shadow-md hover:border-slate-200 transition-all duration-300">
                    ${camera.area}
                </span>
            </td>
        </tr>
    `).join('');
};
window.generateCamerasSection = function() {
    return `
        <div class="max-w-7xl mx-auto space-y-10 p-8">
            <div class="flex justify-between items-center">
                <div class="relative">
                    <div class="absolute inset-0 bg-gradient-to-r from-slate-200/50 via-blue-100/50 to-slate-200/50 
                               blur-3xl transform -skew-y-6 scale-150 -z-10"></div>
                    <h2 class="text-3xl font-bold text-slate-800 relative flex items-center gap-4">
                        <span class="bg-gradient-to-r from-slate-700 to-slate-800 text-white p-2 rounded-lg">
                            <i class="fas fa-video-camera"></i>
                        </span>
                        Gestione Telecamere
                    </h2>
                </div>
                
                <div class="relative inline-block">
                    <button 
                        onclick="toggleExportDropdown()"
                        class="group px-6 py-3 bg-gradient-to-r from-slate-700 to-slate-800 text-white rounded-xl 
                               hover:from-slate-800 hover:to-slate-900 transition-all duration-300 
                               flex items-center gap-3 shadow-lg hover:shadow-slate-200 text-lg font-medium
                               relative overflow-hidden"
                    >
                        <div class="absolute inset-0 bg-gradient-to-b from-transparent via-blue-400/10 to-blue-400/5 
                                  group-hover:opacity-80 transition-opacity duration-300"></div>
                        <i class="fas fa-download relative z-10"></i>
                        <span class="relative z-10">Esporta report per quartiere</span>
                    </button>
                    
                    <div id="exportDropdown" class="hidden absolute right-0 mt-3 w-72 
                                                   bg-white rounded-xl shadow-xl border border-slate-100 z-50">
                        <div class="p-5">
                            <div class="mb-4">
                                <label class="flex items-center hover:bg-slate-50 p-2 rounded-lg transition-colors duration-200">
                                    <input type="checkbox" id="selectAllNeighborhoods" onchange="toggleAllNeighborhoods()" 
                                           class="w-4 h-4 text-slate-600 rounded-full border-slate-300 focus:ring-slate-500">
                                    <span class="ml-3 text-slate-700 font-medium">Seleziona tutti</span>
                                </label>
                            </div>
                            <div class="space-y-2" id="neighborhoodsList">
                                ${[...new Set(cameras.map(camera => camera.area))].map(area => `
                                    <label class="flex items-center hover:bg-slate-50 p-2 rounded-lg transition-colors duration-200">
                                        <input type="checkbox" name="neighborhood" value="${area}" 
                                               class="w-4 h-4 text-slate-600 rounded-full border-slate-300 focus:ring-slate-500 neighborhood-checkbox">
                                        <span class="ml-3 text-slate-700">${area}</span>
                                    </label>
                                `).join('')}
                            </div>
                            <button 
                                onclick="exportData()"
                                class="mt-5 w-full px-4 py-3 bg-gradient-to-r from-slate-700 to-slate-800 text-white 
                                       rounded-lg hover:from-slate-800 hover:to-slate-900 transition-all duration-300 
                                       font-medium shadow-md hover:shadow-lg relative overflow-hidden group"
                            >
                                <div class="absolute inset-0 bg-gradient-to-b from-transparent via-blue-400/10 to-blue-400/5 
                                          group-hover:opacity-80 transition-opacity duration-300"></div>
                                <span class="relative z-10">Conferma</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100 relative">
                <div class="absolute inset-0 bg-gradient-to-b from-transparent via-slate-100/5 to-slate-100/10"></div>
                <table class="min-w-full relative z-10">
                    <thead>
                        <tr class="bg-gradient-to-r from-slate-700 to-slate-800">
                            <th class="px-8 py-5 text-left text-sm font-semibold text-white tracking-wider uppercase relative overflow-hidden
                                     before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/10 before:to-transparent">
                                Nome Telecamera
                            </th>
                            <th class="px-8 py-5 text-center text-sm font-semibold text-white tracking-wider uppercase relative overflow-hidden
                                     before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/10 before:to-transparent">
                                Area
                            </th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-100" id="cameras-table-body">
                        ${generateCameraRows()}
                    </tbody>
                </table>
            </div>
        </div>
    `;
};
window.initializeCameraHandlers = function() {
    // Camera status toggle handler
    document.querySelectorAll('.camera-toggle').forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {
            const cameraId = e.target.closest('tr').dataset.cameraId;
            const camera = cameras.find(c => c.id === cameraId);
            if (camera) {
                camera.active = e.target.checked;
            }
        });
    });

    // Neighborhood selection handler
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

// Aggiungo le nuove funzioni per la gestione dell'export
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

window.exportData = async function() {
    const selectedNeighborhoods = Array.from(document.querySelectorAll('.neighborhood-checkbox:checked'))
        .map(checkbox => checkbox.value);
    
    if (selectedNeighborhoods.length === 0) {
        alert('Seleziona almeno un quartiere');
        return;
    }

    document.getElementById('exportDropdown').classList.add('hidden');
    showLoadingModal();

    try {
        let webhookUrl;
        
        if (selectedNeighborhoods.length === document.querySelectorAll('.neighborhood-checkbox').length) {
            webhookUrl = 'https://hook.eu2.make.com/exz8olk7auje6qqmlna1bi0h7nkecv7m';
        } else if (selectedNeighborhoods.includes('Centro Storico') && selectedNeighborhoods.length === 1) {
            webhookUrl = 'https://hook.eu2.make.com/effucgfihwh1wmdtezry1kd54knqrhf6';
        } else if (selectedNeighborhoods.includes('Trastevere') && selectedNeighborhoods.length === 1) {
            webhookUrl = 'https://hook.eu2.make.com/nkwvwrha98gnrojmrdo2wjhbecwlysk6';
        } else {
            throw new Error('Seleziona un singolo quartiere o tutti i quartieri');
        }

        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                neighborhoods: selectedNeighborhoods.join(',')
            })
        });

        if (!response.ok) {
            throw new Error('Errore nella richiesta del report');
        }

        const pdfBlob = await response.blob();
        const pdfUrl = URL.createObjectURL(pdfBlob);

        // Fermiamo l'intervallo della simulazione
        clearInterval(window.progressInterval);

        // Completiamo la barra al 100% con una transizione fluida
        const progressBar = document.getElementById('progress-bar');
        const progressText = document.getElementById('progress-text');
        const progressPercentage = document.getElementById('progress-percentage');

        progressBar.style.transition = 'width 0.5s ease-out';
        progressBar.style.width = '100%';
        progressPercentage.textContent = '100%';
        progressText.textContent = 'Report completato!';

        // Aspettiamo che la transizione della barra finisca
        await new Promise(resolve => setTimeout(resolve, 500));
        
        showSuccessModal(pdfUrl);

    } catch (error) {
        console.error('Errore:', error);
        clearInterval(window.progressInterval);
        showErrorModal(error.message);
    }
};

// Funzioni per gestire il modal
function showLoadingModal() {
    const modalHtml = `
        <div id="reportModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div class="bg-white rounded-lg p-8 max-w-md w-full mx-4">
                <div class="flex flex-col items-center">
                    <!-- Animazione di caricamento personalizzata -->
                    <div class="relative">
                        <div class="w-16 h-16">
                            <div class="absolute top-0 left-0 right-0 bottom-0">
                                <div class="absolute w-16 h-16 border-4 border-blue-200 rounded-full"></div>
                                <div class="absolute w-16 h-16 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
                            </div>
                            <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                <i class="fas fa-file-alt text-blue-600 text-xl animate-pulse"></i>
                            </div>
                        </div>
                    </div>
                    
                    <h3 class="mt-6 text-xl font-semibold text-gray-900">Generazione Report in corso...</h3>
                    <p class="mt-2 text-gray-600 text-center">Stiamo elaborando i dati delle telecamere</p>
                    
                    <!-- Barra di progresso -->
                    <div class="w-full mt-6">
                        <div class="relative pt-1">
                            <div class="overflow-hidden h-2 text-xs flex rounded-full bg-blue-100">
                                <div id="progress-bar" 
                                     class="progress-bar-animate shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600"
                                     style="width: 0%">
                                </div>
                            </div>
                        </div>
                        <div class="flex justify-between mt-1">
                            <span id="progress-text" class="text-sm text-slate-600 font-medium">Preparazione dati...</span>
                            <span id="progress-percentage" class="text-sm text-slate-600 font-medium">0%</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHtml);

    // Animazione della barra di progresso
    simulateProgress();
}

// Funzione per simulare il progresso
function simulateProgress() {
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');
    const progressPercentage = document.getElementById('progress-percentage');
    let progress = 0;
    
    const messages = [
        'Preparazione dati...',
        'Connessione al server...',
        'Analisi delle telecamere...',
        'Elaborazione statistiche...',
        'Generazione report...',
        'Finalizzazione...'
    ];

    // Calcoliamo l'incremento per raggiungere il 95% in circa 18 secondi
    // Lasciando l'ultimo 5% per la fase finale
    const totalSteps = 36; // Un update ogni 500ms per 18 secondi
    const incrementPerStep = 95 / totalSteps;
    let currentStep = 0;

    const interval = setInterval(() => {
        if (currentStep >= totalSteps) {
            clearInterval(interval);
            return;
        }

        currentStep++;
        // Aggiungiamo una piccola variazione casuale all'incremento
        progress += incrementPerStep * (0.8 + Math.random() * 0.4);
        
        // Ci assicuriamo di non superare il 95% durante la simulazione
        progress = Math.min(progress, 95);

        progressBar.style.width = `${progress}%`;
        progressPercentage.textContent = `${Math.round(progress)}%`;

        // Aggiorna il messaggio in base al progresso
        const messageIndex = Math.floor((progress / 95) * (messages.length - 1));
        progressText.textContent = messages[Math.min(messageIndex, messages.length - 1)];
    }, 500);

    // Salviamo l'interval ID in una variabile globale per poterlo fermare se necessario
    window.progressInterval = interval;
}

// Aggiungi questo stile al tuo CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes gradientMove {
        0% {
            background-position: 0% 50%;
        }
        50% {
            background-position: 100% 50%;
        }
        100% {
            background-position: 0% 50%;
        }
    }

    .progress-bar-animate {
        background: linear-gradient(
            270deg,
            #2563eb,
            #3b82f6,
            #60a5fa,
            #3b82f6,
            #2563eb
        );
        background-size: 200% 200%;
        animation: gradientMove 2s ease infinite;
    }
`;
document.head.appendChild(style);

function showSuccessModal(pdfUrl) {
    const modal = document.getElementById('reportModal');
    if (modal) {
        modal.innerHTML = `
            <div class="bg-white rounded-lg p-8 max-w-md w-full mx-4">
                <div class="flex flex-col items-center">
                    <div class="rounded-full h-12 w-12 bg-green-100 flex items-center justify-center">
                        <i class="fas fa-check text-green-600 text-xl"></i>
                    </div>
                    <h3 class="mt-4 text-lg font-semibold text-gray-900">Report Generato con Successo!</h3>
                    <p class="mt-2 text-gray-600">Il tuo report è pronto per il download.</p>
                    <div class="mt-6 flex gap-4">
                        <button onclick="closeModal()" 
                                class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                            Chiudi
                        </button>
                        <a href="${pdfUrl}" 
                           download="report_telecamere.pdf"
                           class="px-4 py-2 bg-gradient-to-r from-slate-700 to-slate-800 text-white rounded-lg hover:from-slate-800 hover:to-slate-900 transition-colors duration-200 flex items-center gap-2">
                            <i class="fas fa-file-pdf"></i>
                            Scarica PDF
                        </a>
                    </div>
                </div>
            </div>
        `;
    }
}

function showErrorModal(errorMessage) {
    const modal = document.getElementById('reportModal');
    if (modal) {
        modal.innerHTML = `
            <div class="bg-white rounded-lg p-8 max-w-md w-full mx-4">
                <div class="flex flex-col items-center">
                    <div class="rounded-full h-12 w-12 bg-red-100 flex items-center justify-center">
                        <i class="fas fa-exclamation-triangle text-red-600 text-xl"></i>
                    </div>
                    <h3 class="mt-4 text-lg font-semibold text-gray-900">Si è verificato un errore</h3>
                    <p class="mt-2 text-gray-600">${errorMessage}</p>
                    <button onclick="closeModal()" 
                            class="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                        Chiudi
                    </button>
                </div>
            </div>
        `;
    }
}

function closeModal() {
    const modal = document.getElementById('reportModal');
    if (modal) {
        modal.remove();
    }
}

// Close dropdown when clicking outside
document.addEventListener('click', function(event) {
    const dropdown = document.getElementById('exportDropdown');
    const exportButton = event.target.closest('button');
    
    if (!dropdown?.contains(event.target) && !exportButton?.contains(event.target)) {
        dropdown?.classList.add('hidden');
    }
});


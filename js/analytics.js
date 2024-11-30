// Dati di esempio per analytics
window.analyticsData = {
    waste: {
        neighborhoods: [
            "Centro Storico",
            "San Lorenzo",
            "Prati",
            "Trastevere",
            "Testaccio"
        ],
        reports: [45, 38, 32, 41, 28]
    },
    potholes: {
        neighborhoods: [
            "Centro Storico",
            "San Lorenzo",
            "Prati",
            "Trastevere",
            "Testaccio"
        ],
        reports: [35, 42, 28, 37, 31]
    },
    criticalAreas: [
        { neighborhood: "Centro Storico", reports: 156, mainIssue: "Rifiuti" },
        { neighborhood: "San Lorenzo", reports: 134, mainIssue: "Buche" },
        { neighborhood: "Prati", reports: 98, mainIssue: "Rifiuti" },
        { neighborhood: "Trastevere", reports: 87, mainIssue: "Buche" },
        { neighborhood: "Testaccio", reports: 76, mainIssue: "Rifiuti" }
    ],
    bestAreas: [
        { neighborhood: "EUR", reports: 12, mainStrength: "Pulizia" },
        { neighborhood: "Flaminio", reports: 15, mainStrength: "Manutenzione" },
        { neighborhood: "Monteverde", reports: 18, mainStrength: "Pulizia" },
        { neighborhood: "Trieste", reports: 20, mainStrength: "Manutenzione" },
        { neighborhood: "Garbatella", reports: 23, mainStrength: "Pulizia" }
    ]
};

// Aggiungi i dati per le heatmap
window.heatmapData = {
    waste: {
        max: 10,
        data: [
            {lat: 41.8956, lng: 12.4722, count: 9},
            {lat: 41.8958, lng: 12.4724, count: 8},
            {lat: 41.8954, lng: 12.4720, count: 7},
            {lat: 41.9045, lng: 12.4800, count: 8},
            {lat: 41.9047, lng: 12.4802, count: 7},
            {lat: 41.9043, lng: 12.4798, count: 6},
            {lat: 41.9023, lng: 12.4800, count: 9},
            {lat: 41.9025, lng: 12.4802, count: 8},
            {lat: 41.9021, lng: 12.4798, count: 7},
            {lat: 41.9058, lng: 12.4823, count: 7},
            {lat: 41.9060, lng: 12.4825, count: 6},
            {lat: 41.9056, lng: 12.4821, count: 5},
            {lat: 41.8892, lng: 12.4694, count: 8},
            {lat: 41.8894, lng: 12.4696, count: 7},
            {lat: 41.8890, lng: 12.4692, count: 6},
            {lat: 41.8895, lng: 12.4710, count: 7},
            {lat: 41.8897, lng: 12.4712, count: 6},
            {lat: 41.8893, lng: 12.4708, count: 5}
        ]
    },
    potholes: {
        max: 10,
        data: [
            {lat: 41.8956, lng: 12.4722, count: 8},
            {lat: 41.8958, lng: 12.4724, count: 7},
            {lat: 41.8954, lng: 12.4720, count: 6},
            {lat: 41.9045, lng: 12.4800, count: 7},
            {lat: 41.9047, lng: 12.4802, count: 6},
            {lat: 41.9043, lng: 12.4798, count: 5},
            {lat: 41.9023, lng: 12.4800, count: 8},
            {lat: 41.9025, lng: 12.4802, count: 7},
            {lat: 41.9021, lng: 12.4798, count: 6},
            {lat: 41.9058, lng: 12.4823, count: 6},
            {lat: 41.9060, lng: 12.4825, count: 5},
            {lat: 41.9056, lng: 12.4821, count: 4},
            {lat: 41.8892, lng: 12.4694, count: 9},
            {lat: 41.8894, lng: 12.4696, count: 8},
            {lat: 41.8890, lng: 12.4692, count: 7},
            {lat: 41.8895, lng: 12.4710, count: 8},
            {lat: 41.8897, lng: 12.4712, count: 7},
            {lat: 41.8893, lng: 12.4708, count: 6}
        ]
    }
};

// Funzione per generare la sezione analytics
window.generateAnalyticsSection = function() {
    return `
        <div class="p-6 space-y-6">
            <div class="flex items-center justify-between">
                <h2 class="text-2xl font-bold">Analytics</h2>
                <div class="flex gap-4">
                    <select class="px-4 py-2 text-sm bg-white border rounded-lg">
                        <option>Ultimo mese</option>
                        <option>Ultima settimana</option>
                        <option>Ultimo giorno</option>
                    </select>
                </div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <!-- Zone Critiche e altri grafici -->
                <!-- Il resto del codice HTML per i grafici -->
            </div>
        </div>
    `;
};

// Funzioni per aggiornare i trend
window.updateWasteTrendChart = function() {
    const neighborhood = document.getElementById('wasteTrendNeighborhood').value;
    const chart = Chart.getChart('wasteTrendChart');
    if (chart) {
        chart.data.datasets[0].data = Array.from({length: 30}, () => 
            Math.floor(Math.random() * (neighborhood === 'all' ? 100 : 50)));
        chart.update();
    }
};

window.updatePotholesTrendChart = function() {
    const neighborhood = document.getElementById('potholesTrendNeighborhood').value;
    const chart = Chart.getChart('potholesTrendChart');
    if (chart) {
        chart.data.datasets[0].data = Array.from({length: 30}, () => 
            Math.floor(Math.random() * (neighborhood === 'all' ? 100 : 50)));
        chart.update();
    }
};

// Funzioni per il toggle delle visualizzazioni
window.toggleWasteView = function() {
    const toggle = document.getElementById('wasteViewToggle');
    const chartCanvas = document.getElementById('wasteChart');
    const heatmapDiv = document.getElementById('wasteHeatmap');
    
    if (toggle.checked) {
        chartCanvas.style.display = 'none';
        heatmapDiv.style.display = 'block';
        if (!window.wasteMap) {
            initWasteHeatmap();
        }
        setTimeout(() => {
            if (window.wasteMap) {
                window.wasteMap.invalidateSize();
            }
        }, 100);
    } else {
        chartCanvas.style.display = 'block';
        heatmapDiv.style.display = 'none';
    }
};

window.togglePotholesView = function() {
    const toggle = document.getElementById('potholesViewToggle');
    const chartCanvas = document.getElementById('potholesChart');
    const heatmapDiv = document.getElementById('potholesHeatmap');
    
    if (toggle.checked) {
        chartCanvas.style.display = 'none';
        heatmapDiv.style.display = 'block';
        if (!window.potholesMap) {
            initPotholesHeatmap();
        }
        setTimeout(() => {
            if (window.potholesMap) {
                window.potholesMap.invalidateSize();
            }
        }, 100);
    } else {
        chartCanvas.style.display = 'block';
        heatmapDiv.style.display = 'none';
    }
};

// Inizializzazione dei grafici e delle mappe
window.initCharts = function() {
    try {
        // Inizializzazione di tutti i grafici
        // Implementazione dei vari grafici Chart.js
        console.log('Charts initialized');
    } catch (error) {
        console.error('Error initializing charts:', error);
    }
};

window.initWasteHeatmap = function() {
    try {
        const wasteHeatmapContainer = document.getElementById('wasteHeatmap');
        if (wasteHeatmapContainer) {
            window.wasteMap = L.map('wasteHeatmap').setView([41.9028, 12.4964], 13);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors'
            }).addTo(window.wasteMap);

            window.wasteHeatmapLayer = new HeatmapOverlay({
                radius: 0.003,
                maxOpacity: 0.7,
                scaleRadius: true,
                useLocalExtrema: true,
                blur: 0.85
            });

            window.wasteHeatmapLayer.setData(window.heatmapData.waste);
            window.wasteMap.addLayer(window.wasteHeatmapLayer);
        }
    } catch (error) {
        console.error('Error initializing waste heatmap:', error);
    }
};

window.initPotholesHeatmap = function() {
    try {
        const potholesHeatmapContainer = document.getElementById('potholesHeatmap');
        if (potholesHeatmapContainer) {
            window.potholesMap = L.map('potholesHeatmap').setView([41.9028, 12.4964], 13);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors'
            }).addTo(window.potholesMap);

            window.potholesHeatmapLayer = new HeatmapOverlay({
                radius: 0.003,
                maxOpacity: 0.7,
                scaleRadius: true,
                useLocalExtrema: true,
                blur: 0.85
            });

            window.potholesHeatmapLayer.setData(window.heatmapData.potholes);
            window.potholesMap.addLayer(window.potholesHeatmapLayer);
        }
    } catch (error) {
        console.error('Error initializing potholes heatmap:', error);
    }
};

// Inizializzazione al caricamento della pagina
document.addEventListener('DOMContentLoaded', () => {
    initCharts();
});
// Dati di esempio per analytics
window.analyticsData = {
    waste: {
        neighborhoods: [
            "Centro Storico",
            "Trastevere", 
            "Testaccio",
            "San Lorenzo",
            "Prati"
        ],
        reports: [78, 65, 42, 38, 25] // Centro ha più problemi, Prati meno
    },
    potholes: {
        neighborhoods: [
            "San Lorenzo",
            "Testaccio",
            "Trastevere",
            "Centro Storico",
            "Prati"
        ],
        reports: [82, 61, 45, 33, 28] // San Lorenzo ha più problemi di buche
    },
    criticalAreas: [
        { neighborhood: "Centro Storico", reports: 198, mainIssue: "Rifiuti" },
        { neighborhood: "San Lorenzo", reports: 176, mainIssue: "Buche" },
        { neighborhood: "Trastevere", reports: 145, mainIssue: "Rifiuti" },
        { neighborhood: "Testaccio", reports: 132, mainIssue: "Buche" },
        { neighborhood: "Prati", reports: 89, mainIssue: "Traffico" }
    ],
    bestAreas: [
        { neighborhood: "EUR", reports: 8, mainStrength: "Pulizia" },
        { neighborhood: "Flaminio", reports: 12, mainStrength: "Verde pubblico" },
        { neighborhood: "Monteverde", reports: 15, mainStrength: "Manutenzione" },
        { neighborhood: "Trieste", reports: 18, mainStrength: "Verde pubblico" },
        { neighborhood: "Garbatella", reports: 21, mainStrength: "Comunità attiva" }
    ]
};

// Dati per le heatmap - completamente diversi tra rifiuti e buche
window.heatmapData = {
    waste: {
        max: 10,
        data: [
            // Cluster principale nel Centro Storico
            {lat: 41.8956, lng: 12.4722, count: 9}, // Campo de' Fiori
            {lat: 41.8958, lng: 12.4724, count: 8},
            {lat: 41.8954, lng: 12.4720, count: 9},
            {lat: 41.8952, lng: 12.4718, count: 8},
            
            // Cluster Trastevere
            {lat: 41.8892, lng: 12.4694, count: 8}, // Piazza Santa Maria
            {lat: 41.8894, lng: 12.4696, count: 7},
            {lat: 41.8890, lng: 12.4692, count: 8},
            {lat: 41.8895, lng: 12.4698, count: 7},

            // Zona Testaccio - problemi moderati
            {lat: 41.8785, lng: 12.4747, count: 6},
            {lat: 41.8787, lng: 12.4749, count: 5},
            {lat: 41.8783, lng: 12.4745, count: 6},

            // Piccoli cluster sparsi
            {lat: 41.9023, lng: 12.4800, count: 4}, // Via del Corso
            {lat: 41.9025, lng: 12.4802, count: 3},
            {lat: 41.9058, lng: 12.4823, count: 3}, // Piazza di Spagna
            {lat: 41.9060, lng: 12.4825, count: 2}
        ]
    },
    potholes: {
        max: 10,
        data: [
            // Cluster principale San Lorenzo
            {lat: 41.9018, lng: 12.5150, count: 9},
            {lat: 41.9020, lng: 12.5152, count: 9},
            {lat: 41.9016, lng: 12.5148, count: 8},
            {lat: 41.9022, lng: 12.5154, count: 8},
            {lat: 41.9014, lng: 12.5146, count: 7},

            // Testaccio - problemi diffusi
            {lat: 41.8785, lng: 12.4747, count: 7},
            {lat: 41.8787, lng: 12.4749, count: 6},
            {lat: 41.8783, lng: 12.4745, count: 7},
            {lat: 41.8789, lng: 12.4751, count: 6},

            // Trastevere - problemi localizzati
            {lat: 41.8892, lng: 12.4694, count: 5},
            {lat: 41.8894, lng: 12.4696, count: 4},
            {lat: 41.8890, lng: 12.4692, count: 5},

            // Centro Storico - problemi minori
            {lat: 41.8956, lng: 12.4722, count: 3},
            {lat: 41.8958, lng: 12.4724, count: 2},
            {lat: 41.9023, lng: 12.4800, count: 2}
        ]
    }
};

// Funzione per generare la sezione analytics
window.generateAnalyticsSection = function() {
    return `
        <div class="max-w-7xl mx-auto space-y-10 p-8">
            <div class="flex justify-between items-center">
                <div class="relative">
                    <div class="absolute inset-0 bg-gradient-to-r from-slate-200/50 via-blue-100/50 to-slate-200/50 
                               blur-3xl transform -skew-y-6 scale-150 -z-10"></div>
                    <h2 class="text-3xl font-bold text-slate-800 relative flex items-center gap-4">
                        <span class="bg-gradient-to-r from-slate-700 to-slate-800 text-white p-2 rounded-lg">
                            <i class="fas fa-chart-line"></i>
                        </span>
                        Analytics
                    </h2>
                </div>
                
                <div class="relative">
                    <select class="px-6 py-3 bg-gradient-to-r from-slate-100 to-slate-200 
                                 text-slate-700 rounded-xl border border-slate-200 
                                 shadow-sm hover:shadow-md transition-all duration-300
                                 font-medium focus:ring-2 focus:ring-slate-500">
                        <option>Ultimo mese</option>
                        <option>Ultima settimana</option>
                        <option>Ultimo giorno</option>
                    </select>
                </div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <!-- Zone Critiche -->
                <div class="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100 relative group
                            hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-300">
                    <div class="absolute inset-0 bg-gradient-to-b from-transparent via-slate-100/5 to-slate-100/10"></div>
                    <div class="p-8 relative z-10">
                        <h3 class="text-xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                            <span class="bg-red-100 text-red-600 p-2 rounded-lg">
                                <i class="fas fa-exclamation-triangle"></i>
                            </span>
                            Zone Critiche per numero di segnalazioni
                        </h3>
                        <div class="h-[300px]">
                            <canvas id="criticalAreasChart"></canvas>
                        </div>
                    </div>
                </div>

                <!-- Zone Migliori -->
                <div class="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100 relative group
                            hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-300">
                    <div class="absolute inset-0 bg-gradient-to-b from-transparent via-slate-100/5 to-slate-100/10"></div>
                    <div class="p-8 relative z-10">
                        <h3 class="text-xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                            <span class="bg-green-100 text-green-600 p-2 rounded-lg">
                                <i class="fas fa-check-circle"></i>
                            </span>
                            Zone Migliori
                        </h3>
                        <div class="h-[300px]">
                            <canvas id="bestAreasChart"></canvas>
                        </div>
                    </div>
                </div>

                <!-- Grafico Segnalazioni Rifiuti -->
                <div class="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100 relative group
                            hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-300">
                    <div class="absolute inset-0 bg-gradient-to-b from-transparent via-slate-100/5 to-slate-100/10"></div>
                    <div class="p-8 relative z-10">
                        <div class="flex justify-between items-center mb-6">
                            <h3 class="text-xl font-bold text-slate-800 flex items-center gap-3">
                                <span class="bg-amber-100 text-amber-600 p-2 rounded-lg">
                                    <i class="fas fa-trash"></i>
                                </span>
                                Segnalazioni Rifiuti per Quartiere
                            </h3>
                            <div class="flex items-center space-x-3">
                                <span class="text-sm font-medium text-slate-600">Grafico</span>
                                <label class="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" id="wasteViewToggle" class="sr-only peer" onchange="toggleWasteView()">
                                    <div class="w-11 h-6 bg-slate-200 rounded-full peer 
                                                peer-checked:after:translate-x-full after:content-[''] 
                                                after:absolute after:top-[2px] after:left-[2px] 
                                                after:bg-white after:rounded-full after:h-5 after:w-5 
                                                after:transition-all peer-checked:bg-slate-600
                                                peer-checked:after:border-white after:border-slate-300
                                                after:border"></div>
                                </label>
                                <span class="text-sm font-medium text-slate-600">Heatmap</span>
                            </div>
                        </div>
                        <div class="h-[300px] relative">
                            <canvas id="wasteChart"></canvas>
                            <div id="wasteHeatmap" class="h-[300px] w-full hidden absolute top-0 left-0"></div>
                        </div>
                    </div>
                </div>

                <!-- Grafico Segnalazioni Buche -->
                <div class="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100 relative group
                            hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-300">
                    <div class="absolute inset-0 bg-gradient-to-b from-transparent via-slate-100/5 to-slate-100/10"></div>
                    <div class="p-8 relative z-10">
                        <div class="flex justify-between items-center mb-6">
                            <h3 class="text-xl font-bold text-slate-800 flex items-center gap-3">
                                <span class="bg-orange-100 text-orange-600 p-2 rounded-lg">
                                    <i class="fas fa-road"></i>
                                </span>
                                Segnalazioni Buche per Quartiere
                            </h3>
                            <div class="flex items-center space-x-3">
                                <span class="text-sm font-medium text-slate-600">Grafico</span>
                                <label class="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" id="potholesViewToggle" class="sr-only peer" onchange="togglePotholesView()">
                                    <div class="w-11 h-6 bg-slate-200 rounded-full peer 
                                                peer-checked:after:translate-x-full after:content-[''] 
                                                after:absolute after:top-[2px] after:left-[2px] 
                                                after:bg-white after:rounded-full after:h-5 after:w-5 
                                                after:transition-all peer-checked:bg-slate-600
                                                peer-checked:after:border-white after:border-slate-300
                                                after:border"></div>
                                </label>
                                <span class="text-sm font-medium text-slate-600">Heatmap</span>
                            </div>
                        </div>
                        <div class="h-[300px] relative">
                            <canvas id="potholesChart"></canvas>
                            <div id="potholesHeatmap" class="h-[300px] w-full hidden absolute top-0 left-0"></div>
                        </div>
                    </div>
                </div>

                <!-- Trend Rifiuti -->
                <div class="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100 relative group
                            hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-300">
                    <div class="absolute inset-0 bg-gradient-to-b from-transparent via-slate-100/5 to-slate-100/10"></div>
                    <div class="p-8 relative z-10">
                        <div class="flex justify-between items-center mb-6">
                            <h3 class="text-xl font-bold text-slate-800 flex items-center gap-3">
                                <span class="bg-amber-100 text-amber-600 p-2 rounded-lg">
                                    <i class="fas fa-chart-area"></i>
                                </span>
                                Trend Rifiuti - Ultimi 30 Giorni
                            </h3>
                            <select id="wasteTrendNeighborhood" 
                                    class="px-4 py-2 bg-gradient-to-r from-slate-100 to-slate-200 
                                           text-slate-700 rounded-xl border border-slate-200 
                                           shadow-sm hover:shadow-md transition-all duration-300
                                           font-medium focus:ring-2 focus:ring-slate-500"
                                    onchange="updateWasteTrendChart()">
                                <option value="all">Tutti i quartieri</option>
                                ${window.analyticsData.waste.neighborhoods.map(n => 
                                    `<option value="${n}">${n}</option>`
                                ).join('')}
                            </select>
                        </div>
                        <div class="h-[300px]">
                            <canvas id="wasteTrendChart"></canvas>
                        </div>
                    </div>
                </div>

                <!-- Trend Buche -->
                <div class="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100 relative group
                            hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-300">
                    <div class="absolute inset-0 bg-gradient-to-b from-transparent via-slate-100/5 to-slate-100/10"></div>
                    <div class="p-8 relative z-10">
                        <div class="flex justify-between items-center mb-6">
                            <h3 class="text-xl font-bold text-slate-800 flex items-center gap-3">
                                <span class="bg-orange-100 text-orange-600 p-2 rounded-lg">
                                    <i class="fas fa-chart-area"></i>
                                </span>
                                Trend Buche - Ultimi 30 Giorni
                            </h3>
                            <select id="potholesTrendNeighborhood" 
                                    class="px-4 py-2 bg-gradient-to-r from-slate-100 to-slate-200 
                                           text-slate-700 rounded-xl border border-slate-200 
                                           shadow-sm hover:shadow-md transition-all duration-300
                                           font-medium focus:ring-2 focus:ring-slate-500"
                                    onchange="updatePotholesTrendChart()">
                                <option value="all">Tutti i quartieri</option>
                                ${window.analyticsData.potholes.neighborhoods.map(n => 
                                    `<option value="${n}">${n}</option>`
                                ).join('')}
                            </select>
                        </div>
                        <div class="h-[300px]">
                            <canvas id="potholesTrendChart"></canvas>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
};

// Funzioni per aggiornare i trend in base al quartiere selezionato
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

// Aggiungi le funzioni per il toggle delle visualizzazioni
window.toggleWasteView = function() {
    const toggle = document.getElementById('wasteViewToggle');
    const chartCanvas = document.getElementById('wasteChart');
    const heatmapDiv = document.getElementById('wasteHeatmap');
    
    if (toggle.checked) {
        // Mostra heatmap
        chartCanvas.style.display = 'none';
        heatmapDiv.style.display = 'block';
        
        // Se la mappa non è stata ancora inizializzata, inizializzala
        if (!window.wasteMap) {
            initWasteHeatmap();
        }
        
        // Forza il ridimensionamento della mappa
        setTimeout(() => {
            if (window.wasteMap) {
                window.wasteMap.invalidateSize();
            }
        }, 100);
    } else {
        // Mostra grafico a barre
        chartCanvas.style.display = 'block';
        heatmapDiv.style.display = 'none';
    }
};

window.togglePotholesView = function() {
    const toggle = document.getElementById('potholesViewToggle');
    const chartCanvas = document.getElementById('potholesChart');
    const heatmapDiv = document.getElementById('potholesHeatmap');
    
    if (toggle.checked) {
        // Mostra heatmap
        chartCanvas.style.display = 'none';
        heatmapDiv.style.display = 'block';
        
        // Se la mappa non è stata ancora inizializzata, inizializzala
        if (!window.potholesMap) {
            initPotholesHeatmap();
        }
        
        // Forza il ridimensionamento della mappa
        setTimeout(() => {
            if (window.potholesMap) {
                window.potholesMap.invalidateSize();
            }
        }, 100);
    } else {
        // Mostra grafico a barre
        chartCanvas.style.display = 'block';
        heatmapDiv.style.display = 'none';
    }
};

// Inizializzazione dei grafici
window.initCharts = function() {
    try {
        // Inizializza grafico zone critiche
        const criticalAreasChart = document.getElementById('criticalAreasChart');
        if (criticalAreasChart) {
            new Chart(criticalAreasChart, {
                type: 'bar',
                data: {
                    labels: window.analyticsData.criticalAreas.map(a => a.neighborhood),
                    datasets: [{
                        label: 'Numero segnalazioni',
                        data: window.analyticsData.criticalAreas.map(a => a.reports),
                        backgroundColor: '#EF4444',
                        borderRadius: 4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    indexAxis: 'y',
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        x: {
                            grid: {
                                display: false
                            },
                            ticks: {
                                font: {
                                    size: 12
                                }
                            }
                        },
                        y: {
                            grid: {
                                display: false
                            },
                            ticks: {
                                font: {
                                    size: 12
                                }
                            }
                        }
                    }
                }
            });
        }

        // Inizializza grafico zone migliori
        const bestAreasChart = document.getElementById('bestAreasChart');
        if (bestAreasChart) {
            new Chart(bestAreasChart, {
                type: 'bar',
                data: {
                    labels: window.analyticsData.bestAreas.map(a => a.neighborhood),
                    datasets: [{
                        label: 'Numero segnalazioni',
                        data: window.analyticsData.bestAreas.map(a => a.reports),
                        backgroundColor: '#10B981',
                        borderRadius: 4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    indexAxis: 'y',
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        x: {
                            grid: {
                                display: false
                            },
                            ticks: {
                                font: {
                                    size: 12
                                }
                            }
                        },
                        y: {
                            grid: {
                                display: false
                            },
                            ticks: {
                                font: {
                                    size: 12
                                }
                            }
                        }
                    }
                }
            });
        }

        // Inizializza trend rifiuti
        const wasteTrendChart = document.getElementById('wasteTrendChart');
        if (wasteTrendChart) {
            new Chart(wasteTrendChart, {
                type: 'line',
                data: {
                    labels: Array.from({length: 30}, (_, i) => `Giorno ${i + 1}`),
                    datasets: [{
                        label: 'Segnalazioni',
                        data: Array.from({length: 30}, () => Math.floor(Math.random() * 100)),
                        borderColor: '#4F46E5',
                        backgroundColor: '#4F46E520',
                        tension: 0.4,
                        fill: true
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            grid: {
                                drawBorder: false,
                                color: '#f0f0f0'
                            },
                            ticks: {
                                font: {
                                    size: 12
                                }
                            }
                        },
                        x: {
                            grid: {
                                display: false
                            },
                            ticks: {
                                maxRotation: 45,
                                minRotation: 45,
                                font: {
                                    size: 10
                                },
                                callback: function(value, index) {
                                    return index % 5 === 0 ? `Giorno ${index + 1}` : '';
                                }
                            }
                        }
                    }
                }
            });
        }

        // Inizializza trend buche
        const potholesTrendChart = document.getElementById('potholesTrendChart');
        if (potholesTrendChart) {
            new Chart(potholesTrendChart, {
                type: 'line',
                data: {
                    labels: Array.from({length: 30}, (_, i) => `Giorno ${i + 1}`),
                    datasets: [{
                        label: 'Segnalazioni',
                        data: Array.from({length: 30}, () => Math.floor(Math.random() * 100)),
                        borderColor: '#EF4444',
                        backgroundColor: '#EF444420',
                        tension: 0.4,
                        fill: true
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            grid: {
                                drawBorder: false,
                                color: '#f0f0f0'
                            },
                            ticks: {
                                font: {
                                    size: 12
                                }
                            }
                        },
                        x: {
                            grid: {
                                display: false
                            },
                            ticks: {
                                maxRotation: 45,
                                minRotation: 45,
                                font: {
                                    size: 10
                                },
                                callback: function(value, index) {
                                    return index % 5 === 0 ? `Giorno ${index + 1}` : '';
                                }
                            }
                        }
                    }
                }
            });
        }

        // Inizializza il grafico a barre per la spazzatura
        const wasteChart = document.getElementById('wasteChart');
        if (wasteChart) {
            const wasteCtx = wasteChart.getContext('2d');
            new Chart(wasteCtx, {
                type: 'bar',
                data: {
                    labels: window.analyticsData.waste.neighborhoods,
                    datasets: [{
                        label: 'Report immondizia',
                        data: window.analyticsData.waste.reports,
                        backgroundColor: '#4F46E5',
                        borderRadius: 4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'top',
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            grid: {
                                drawBorder: false
                            }
                        },
                        x: {
                            grid: {
                                display: false
                            }
                        }
                    }
                }
            });
        }

        // Inizializza il grafico a barre per le buche
        const potholesChart = document.getElementById('potholesChart');
        if (potholesChart) {
            const potholesCtx = potholesChart.getContext('2d');
            new Chart(potholesCtx, {
                type: 'bar',
                data: {
                    labels: window.analyticsData.potholes.neighborhoods,
                    datasets: [{
                        label: 'Report buche',
                        data: window.analyticsData.potholes.reports,
                        backgroundColor: '#EF4444',
                        borderRadius: 4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'top',
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            grid: {
                                drawBorder: false
                            }
                        },
                        x: {
                            grid: {
                                display: false
                            }
                        }
                    }
                }
            });
        }

        // Inizializza il grafico temporale
        const trendChart = document.getElementById('trendChart');
        if (trendChart) {
            const trendCtx = trendChart.getContext('2d');
            new Chart(trendCtx, {
                type: 'line',
                data: {
                    labels: Array.from({length: 30}, (_, i) => `Giorno ${i + 1}`),
                    datasets: [
                        {
                            label: 'Spazzatura',
                            data: Array.from({length: 30}, () => Math.floor(Math.random() * 100)),
                            borderColor: '#4F46E5',
                            backgroundColor: '#4F46E520',
                            tension: 0.4,
                            fill: true
                        },
                        {
                            label: 'Buche',
                            data: Array.from({length: 30}, () => Math.floor(Math.random() * 100)),
                            borderColor: '#EF4444',
                            backgroundColor: '#EF444420',
                            tension: 0.4,
                            fill: true
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'top',
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            grid: {
                                drawBorder: false
                            }
                        },
                        x: {
                            grid: {
                                display: false
                            },
                            ticks: {
                                maxRotation: 45,
                                minRotation: 45
                            }
                        }
                    }
                }
            });
        }
    } catch (error) {
        console.error('Error initializing charts:', error);
    }
};

// Funzione per inizializzare la heatmap dei rifiuti
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

            setTimeout(() => {
                window.wasteMap.invalidateSize();
            }, 100);
        }
    } catch (error) {
        console.error('Error initializing waste heatmap:', error);
    }
};

// Funzione per inizializzare la heatmap delle buche
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

            setTimeout(() => {
                window.potholesMap.invalidateSize();
            }, 100);
        }
    } catch (error) {
        console.error('Error initializing potholes heatmap:', error);
    }
};

// Inizializzazione al caricamento della pagina
document.addEventListener('DOMContentLoaded', () => {
    initCharts();
});

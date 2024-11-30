// Funzione di inizializzazione
function initializeUploadPage() {
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
        mainContent.innerHTML = generateUploadForm();
        
        // Aggiungi event listener per il form
        const form = document.getElementById('uploadForm');
        const fileUpload = document.getElementById('file-upload');
        const dropZone = fileUpload.closest('.border-dashed');

        // Funzione per aggiornare l'interfaccia dopo la selezione del file
        function updateFileInterface(file) {
            const uploadBox = dropZone.querySelector('.space-y-1');
            uploadBox.innerHTML = `
                <svg class="mx-auto h-12 w-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <div class="text-sm text-gray-600">
                    <p class="font-medium">File caricato:</p>
                    <p class="text-blue-600">${file.name}</p>
                </div>
                <p class="text-xs text-gray-500">
                    Clicca qui per cambiare file
                </p>
            `;
        }

        // Gestione del drag and drop
        dropZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropZone.classList.add('border-blue-500', 'bg-blue-50', 'border-4', 'scale-105', 'transform', 'transition-all');
            dropZone.style.boxShadow = '0 0 10px rgba(59, 130, 246, 0.5)';
        });

        dropZone.addEventListener('dragleave', (e) => {
            e.preventDefault();
            dropZone.classList.remove('border-blue-500', 'bg-blue-50', 'border-4', 'scale-105', 'transform');
            dropZone.style.boxShadow = '';
        });

        dropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            dropZone.classList.remove('border-blue-500', 'bg-blue-50', 'border-4', 'scale-105', 'transform');
            dropZone.style.boxShadow = '';
            
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                fileUpload.files = files;
                updateFileInterface(files[0]);
            }
        });

        // Gestione del cambiamento del file tramite input
        fileUpload.addEventListener('change', (e) => {
            if (fileUpload.files.length > 0) {
                updateFileInterface(fileUpload.files[0]);
            }
        });

        if (form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                const formData = new FormData();
                formData.append('data_estrazione', document.getElementById('data-estrazione').value);
                formData.append('telecamera', document.getElementById('telecamera').value);
                formData.append('file', fileUpload.files[0]);

                fetch('https://hook.eu2.make.com/f4sumxu9s8cir4rasbpucituzs66mrpi', {
                    method: 'POST',
                    body: formData
                })
                .then(response => {
                    if (response.ok) {
                        // Creo un div per il popup personalizzato
                        const popup = document.createElement('div');
                        popup.style.cssText = `
                            position: fixed;
                            top: 50%;
                            left: 50%;
                            transform: translate(-50%, -50%);
                            background: white;
                            padding: 2rem;
                            border-radius: 1rem;
                            box-shadow: 0 10px 25px rgba(0,0,0,0.1);
                            z-index: 1000;
                            text-align: center;
                            min-width: 300px;
                        `;
                        
                        // Aggiungo l'icona di successo
                        const icon = document.createElement('div');
                        icon.innerHTML = '<i class="fas fa-check-circle" style="color: #10B981; font-size: 3rem; margin-bottom: 1rem;"></i>';
                        popup.appendChild(icon);
                        
                        // Aggiungo il messaggio
                        const message = document.createElement('p');
                        message.textContent = 'Immagine caricata con successo!';
                        message.style.cssText = `
                            color: #1F2937;
                            font-size: 1.25rem;
                            font-weight: 500;
                            margin-bottom: 1.5rem;
                        `;
                        popup.appendChild(message);
                        
                        // Aggiungo il pulsante OK
                        const button = document.createElement('button');
                        button.textContent = 'OK';
                        button.style.cssText = `
                            background: #4F46E5;
                            color: white;
                            border: none;
                            padding: 0.75rem 2rem;
                            border-radius: 0.5rem;
                            font-weight: 500;
                            cursor: pointer;
                            transition: background 0.2s;
                        `;
                        button.onmouseover = () => button.style.background = '#4338CA';
                        button.onmouseout = () => button.style.background = '#4F46E5';
                        button.onclick = () => {
                            popup.remove();
                            form.reset();
                            updateFileInterface();
                        };
                        popup.appendChild(button);
                        
                        // Aggiungo un overlay semi-trasparente
                        const overlay = document.createElement('div');
                        overlay.style.cssText = `
                            position: fixed;
                            top: 0;
                            left: 0;
                            right: 0;
                            bottom: 0;
                            background: rgba(0,0,0,0.5);
                            z-index: 999;
                        `;
                        document.body.appendChild(overlay);
                        document.body.appendChild(popup);
                        
                        overlay.onclick = () => {
                            overlay.remove();
                            popup.remove();
                            form.reset();
                        };
                    } else {
                        alert('Errore durante il caricamento dell\'immagine');
                    }
                })
                .catch(error => {
                    console.error('Errore:', error);
                    alert('Errore durante il caricamento dell\'immagine');
                });
            });
        }
    }
}

// Funzione per aggiornare automaticamente il quartiere
function updateQuartiere() {
    const telecamera = document.getElementById('telecamera');
    const quartiere = document.getElementById('quartiere');
    
    const quartieriMap = {
        'CAM001': 'Centro Storico',
        'CAM002': 'Centro Storico',
        'CAM003': 'Centro Storico',
        'CAM004': 'Centro Storico',
        'CAM011': 'Trastevere',
        'CAM012': 'Trastevere'
    };

    quartiere.value = telecamera.value ? quartieriMap[telecamera.value] : '';
}

// Esegui l'inizializzazione quando il documento è pronto
document.addEventListener('DOMContentLoaded', () => {
    initializeUploadPage();

    // Aggiungi event listener per i pulsanti del menu
    document.querySelectorAll('.menu-item').forEach(button => {
        button.addEventListener('click', () => {
            document.querySelectorAll('.menu-item').forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const section = button.dataset.section;
            const mainContent = document.getElementById('main-content');

            try {
                switch(section) {
                    case 'upload':
                        initializeUploadPage();
                        break;
                    case 'cameras':
                        if (typeof generateCamerasSection === 'function') {
                            mainContent.innerHTML = generateCamerasSection();
                            if (typeof initializeCameraHandlers === 'function') {
                                initializeCameraHandlers();
                            }
                        } else {
                            console.error('Camera section functions not found');
                            mainContent.innerHTML = '<div class="p-6"><h2 class="text-2xl font-bold">Gestione Telecamere</h2><p>Errore nel caricamento della sezione</p></div>';
                        }
                        break;
                    case 'analytics':
                        if (typeof generateAnalyticsSection === 'function') {
                            mainContent.innerHTML = generateAnalyticsSection();
                            if (typeof initCharts === 'function') {
                                initCharts();
                            }
                            if (typeof initHeatmap === 'function') {
                                initHeatmap();
                            }
                        } else {
                            console.error('Analytics section functions not found');
                            mainContent.innerHTML = '<div class="p-6"><h2 class="text-2xl font-bold">Analytics</h2><p>Errore nel caricamento della sezione</p></div>';
                        }
                        break;
                    default:
                        console.error('Unknown section:', section);
                        mainContent.innerHTML = '<div class="p-6"><h2 class="text-2xl font-bold">Errore</h2><p>Sezione non trovata</p></div>';
                }
            } catch (error) {
                console.error('Error loading section:', error);
                mainContent.innerHTML = '<div class="p-6"><h2 class="text-2xl font-bold">Errore</h2><p>Errore nel caricamento della sezione</p></div>';
            }
        });
    });
});
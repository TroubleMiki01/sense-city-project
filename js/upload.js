function generateUploadForm() {
    return `
        <div class="max-w-7xl mx-auto space-y-10 p-8">
            <div class="flex justify-between items-center">
                <div class="relative">
                    <div class="absolute inset-0 bg-gradient-to-r from-slate-200/50 via-blue-100/50 to-slate-200/50 
                               blur-3xl transform -skew-y-6 scale-150 -z-10"></div>
                    <h2 class="text-3xl font-bold text-slate-800 relative flex items-center gap-4">
                        <span class="bg-gradient-to-r from-slate-700 to-slate-800 text-white p-2 rounded-lg">
                            <i class="fas fa-upload"></i>
                        </span>
                        Caricamento Immagini Telecamere
                    </h2>
                </div>
            </div>

            <div class="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100 relative">
                <div class="absolute inset-0 bg-gradient-to-b from-transparent via-slate-100/5 to-slate-100/10"></div>
                <form id="uploadForm" class="max-w-4xl mx-auto p-8 space-y-8 relative z-10">
                    <!-- Gruppo campi principali -->
                    <div class="grid grid-cols-3 gap-6">
                        <!-- Data Acquisizione -->
                        <div class="form-group">
                            <label for="data-estrazione" class="block text-sm font-medium text-slate-700 mb-2">
                                Data di Acquisizione <span class="text-red-500">*</span>
                            </label>
                            <div class="relative">
                                <div class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                                    <i class="fas fa-calendar-alt"></i>
                                </div>
                                <input type="date" 
                                       id="data-estrazione" 
                                       class="w-full h-11 pl-10 pr-4 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                                       required>
                            </div>
                        </div>

                        <!-- Selezione Telecamera -->
                        <div class="form-group">
                            <label for="telecamera" class="block text-sm font-medium text-slate-700 mb-2">
                                Telecamera <span class="text-red-500">*</span>
                            </label>
                            <div class="relative">
                                <div class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                                    <i class="fas fa-video"></i>
                                </div>
                                <select id="telecamera" 
                                        class="w-full h-11 pl-10 pr-4 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white appearance-none"
                                        onchange="updateQuartiere()"
                                        required>
                                    <option value="">Seleziona...</option>
                                    <option value="Campo de' fiori">Campo de' fiori</option>
                                    <option value="Via Frattina">Via Frattina</option>
                                    <option value="Via del Corso">Via del Corso</option>
                                    <option value="Piazza di Spagna">Piazza di Spagna</option>
                                    <option value="Trastevere - P.zza S. Maria">Trastevere - P.zza S. Maria</option>
                                    <option value="Trastevere - Via Lungaretta">Trastevere - Via Lungaretta</option>
                                </select>
                                <div class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                                    <i class="fas fa-chevron-down"></i>
                                </div>
                            </div>
                        </div>

                        <!-- Quartiere -->
                        <div class="form-group">
                            <label for="quartiere" class="block text-sm font-medium text-slate-700 mb-2">
                                Quartiere
                            </label>
                            <div class="relative">
                                <div class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                                    <i class="fas fa-map-marker-alt"></i>
                                </div>
                                <input type="text" 
                                       id="quartiere" 
                                       class="w-full h-11 pl-10 pr-4 bg-slate-50 border border-slate-200 rounded-lg text-slate-600"
                                       readonly>
                            </div>
                        </div>
                    </div>

                    <!-- Area Upload File -->
                    <div class="mt-8">
                        <label class="block text-sm font-medium text-slate-700 mb-2">
                            Carica Immagine <span class="text-red-500">*</span>
                        </label>
                        
                        <!-- Drop Zone migliorata -->
                        <div id="dropZone" class="relative border-2 border-dashed border-slate-200 rounded-lg 
                                                 bg-white transition-all duration-200 min-h-[200px]">
                            <!-- Area Contenuto Upload -->
                            <div id="uploadContent" class="absolute inset-0 flex flex-col items-center justify-center p-6">
                                <div class="w-16 h-16 mb-4 rounded-full bg-blue-50 flex items-center justify-center">
                                    <i class="fas fa-cloud-upload-alt text-2xl text-blue-500"></i>
                                </div>
                                <p class="text-sm text-slate-600 text-center mb-2">
                                    Trascina qui i tuoi file o
                                    <label class="text-blue-500 cursor-pointer">
                                        sfoglia
                                        <input id="file-upload" type="file" class="hidden" accept="image/*" required>
                                    </label>
                                </p>
                                <p class="text-xs text-slate-500">
                                    PNG, JPG, GIF fino a 10MB
                                </p>
                            </div>
                            
                            <!-- Anteprima Immagine -->
                            <div id="imagePreview" class="hidden absolute inset-0 flex items-center justify-center p-4">
                                <img id="previewImg" src="" alt="Anteprima" class="max-h-[180px] rounded shadow-lg">
                                <button type="button" 
                                        onclick="removeImage()"
                                        class="absolute top-2 right-2 w-8 h-8 bg-white border border-slate-200 rounded-full 
                                               flex items-center justify-center text-slate-400 hover:text-red-500">
                                    <i class="fas fa-times"></i>
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Pulsante Submit -->
                    <div class="flex justify-center">
                        <button type="submit" 
                                class="px-6 py-2.5 bg-gradient-to-r from-slate-700 to-slate-800 text-white rounded-lg shadow-sm 
                                       hover:from-slate-800 hover:to-slate-900 transition-all duration-300">
                            Carica Immagine
                        </button>
                    </div>
                </form>
            </div>
        </div>
    `;
}

// Funzione per aggiornare automaticamente il quartiere
function updateQuartiere() {
    const telecamera = document.getElementById('telecamera');
    const quartiere = document.getElementById('quartiere');
    
    const quartieriMap = {
        'Campo de\' fiori': 'Centro Storico',
        'Via Frattina': 'Centro Storico',
        'Via del Corso': 'Centro Storico',
        'Piazza di Spagna': 'Centro Storico',
        'Trastevere - P.zza S. Maria': 'Trastevere',
        'Trastevere - Via Lungaretta': 'Trastevere'
    };

    quartiere.value = telecamera.value ? quartieriMap[telecamera.value] : '';
}

// Funzione di inizializzazione
function initializeUploadPage() {
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
        mainContent.innerHTML = generateUploadForm();
        
        // Aggiungi event listener per il form
        const form = document.getElementById('uploadForm');
        const fileUpload = document.getElementById('file-upload');
        const dropZone = document.getElementById('dropZone');

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
        dropZone.addEventListener('dragenter', (e) => {
            e.preventDefault();
            dropZone.classList.add('border-blue-500', 'bg-blue-50');
        });

        dropZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            if (!dropZone.classList.contains('border-blue-500')) {
                dropZone.classList.add('border-blue-500', 'bg-blue-50');
            }
        });

        dropZone.addEventListener('dragleave', (e) => {
            e.preventDefault();
            if (!dropZone.contains(e.relatedTarget)) {
                dropZone.classList.remove('border-blue-500', 'bg-blue-50');
            }
        });

        dropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            dropZone.classList.remove('border-blue-500', 'bg-blue-50');
            
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                const file = files[0];
                if (file.type.startsWith('image/')) {
                    const fileInput = document.getElementById('file-upload');
                    fileInput.files = files;
                    handleFileSelect({ target: fileInput });
                }
            }
        });

        if (form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                const formData = new FormData();
                formData.append('data_estrazione', document.getElementById('data-estrazione').value);
                formData.append('telecamera', document.getElementById('telecamera').value);
                formData.append('file', fileUpload.files[0]);

                uploadFile(formData)
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
                            // Reset the upload interface
                            const uploadBox = dropZone.querySelector('.space-y-1');
                            uploadBox.innerHTML = `
                                <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                                <div class="flex text-sm text-gray-600">
                                    <label for="file-upload" class="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                                        <span>Carica un file</span>
                                    </label>
                                    <p class="pl-1">o trascina e rilascia</p>
                                </div>
                                <p class="text-xs text-gray-500">
                                    PNG, JPG, GIF fino a 10MB
                                </p>
                            `;
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
                        
                        // Rimuovo overlay e popup quando si clicca fuori
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

        // Aggiungi validazione in tempo reale
        const inputs = form.querySelectorAll('input[required], select[required]');
        inputs.forEach(input => {
            input.addEventListener('blur', validateField);
            input.addEventListener('input', validateField);
        });

        // Gestione del file upload con anteprima
        fileUpload.addEventListener('change', handleFileSelect);
        
        // Aggiungi scorciatoie da tastiera
        document.addEventListener('keydown', handleShortcuts);
    }
}

// Esegui l'inizializzazione quando il documento è pronto
document.addEventListener('DOMContentLoaded', () => {
    // Inizializza la pagina di upload come default
    initializeUploadPage();

    // Aggiungi event listener per i pulsanti del menu
    document.querySelectorAll('.menu-item').forEach(button => {
        button.addEventListener('click', () => {
            // Rimuovi la classe active da tutti i pulsanti
            document.querySelectorAll('.menu-item').forEach(btn => btn.classList.remove('active'));
            // Aggiungi la classe active al pulsante cliccato
            button.classList.add('active');

            // Gestisci il cambio di sezione
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

// Nuove funzioni di supporto

function validateField(e) {
    const field = e.target;
    const validationMessage = field.nextElementSibling;
    
    if (!field.value) {
        validationMessage.classList.remove('hidden');
        field.classList.add('border-red-500');
    } else {
        validationMessage.classList.add('hidden');
        field.classList.remove('border-red-500');
    }
}

function handleFileSelect(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const previewImg = document.getElementById('previewImg');
            previewImg.src = e.target.result;
            
            document.getElementById('uploadContent').classList.add('hidden');
            document.getElementById('imagePreview').classList.remove('hidden');
        }
        reader.readAsDataURL(file);
    }
}

function handleShortcuts(e) {
    // Ctrl/Cmd + U per upload
    if ((e.ctrlKey || e.metaKey) && e.key === 'u') {
        e.preventDefault();
        document.getElementById('file-upload').click();
    }
}

// Aggiorna la funzione di upload per includere la barra di progresso
function uploadFile(formData) {
    return fetch('https://hook.eu2.make.com/f4sumxu9s8cir4rasbpucituzs66mrpi', {
        method: 'POST',
        body: formData
    });
}

function removeImage() {
    const fileUpload = document.getElementById('file-upload');
    const uploadContent = document.getElementById('uploadContent');
    const imagePreview = document.getElementById('imagePreview');
    
    // Reset del campo file
    fileUpload.value = '';
    
    // Nascondi preview e mostra l'area di upload
    imagePreview.classList.add('hidden');
    uploadContent.classList.remove('hidden');
}

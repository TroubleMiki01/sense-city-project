// Global app state
const appState = {
    currentSection: 'dashboard',
    searchQuery: '',
    productAssistanceEnabled: true,
    stylistEnabled: true,
    stylistPrompt: '',
    assistancePrompt: '',
    chatbotEnabled: true
};

// Initialize chatbot handlers
function initializeChatbotHandlers() {
    // Product Assistance Toggle
    const productAssistanceToggle = document.getElementById('product-assistance-toggle');
    if (productAssistanceToggle) {
        productAssistanceToggle.addEventListener('change', (e) => {
            appState.productAssistanceEnabled = e.target.checked;
            // Add API call here to save state
        });
    }

    // Stylist Toggle
    const stylistToggle = document.getElementById('stylist-toggle');
    if (stylistToggle) {
        stylistToggle.addEventListener('change', (e) => {
            appState.stylistEnabled = e.target.checked;
            // Add API call here to save state
        });
    }

    // Upload PDF handler
    const uploadPdfBtn = document.getElementById('upload-pdf');
    if (uploadPdfBtn) {
        uploadPdfBtn.addEventListener('click', () => {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = '.pdf';
            input.onchange = (e) => {
                const file = e.target.files[0];
                if (file) {
                    alert(`Selected file: ${file.name}`);
                    // Add upload logic here
                }
            };
            input.click();
        });
    }
}

// Load section content
function loadSection(sectionId) {
    const mainContent = document.getElementById('main-content');
    
    // Clear previous content
    mainContent.innerHTML = '';
    
    // Update active state in menu
    updateMenuActiveState(sectionId);
    
    // Load appropriate section
    switch(sectionId) {
        case 'dashboard':
            mainContent.innerHTML = generateGeneralSection();
            initializeChatbotHandlers();
            break;
        case 'products':
            mainContent.innerHTML = generateProductsSection();
            initializeProductHandlers();
            break;
        case 'analytics':
            mainContent.innerHTML = generateAnalyticsSection();
            break;
        default:
            mainContent.innerHTML = '<p>Section not found</p>';
    }
}

// Update menu active state
function updateMenuActiveState(sectionId) {
    document.querySelectorAll('.menu-item').forEach(item => {
        if (item.dataset.section === sectionId) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

// Handle navigation
function initializeNavigation() {
    document.getElementById('sidebar-menu').addEventListener('click', (e) => {
        const menuItem = e.target.closest('.menu-item');
        if (menuItem) {
            const sectionId = menuItem.dataset.section;
            appState.currentSection = sectionId;
            loadSection(sectionId);
        }
    });
}

// Initialize app
function initializeApp() {
    initializeNavigation();
    loadSection('dashboard');
}

// Wait for DOM to be fully loaded before initializing
document.addEventListener('DOMContentLoaded', initializeApp);

// Make necessary functions and state available globally
window.loadSection = loadSection;
window.appState = appState;

function toggleChatbot(type) {
    if (type === 'stylist') {
        appState.stylistEnabled = !appState.stylistEnabled;
        // You could add visual feedback here if needed
        console.log('Stylist chatbot:', appState.stylistEnabled ? 'enabled' : 'disabled');
    } else if (type === 'support') {
        appState.productAssistanceEnabled = !appState.productAssistanceEnabled;
        console.log('Support chatbot:', appState.productAssistanceEnabled ? 'enabled' : 'disabled');
    }
    // You can add API calls here to persist the state
}
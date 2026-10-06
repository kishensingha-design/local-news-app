// ==========================================
// CONNECTHUB CORE APPLICATION LOGIC (js/app.js)
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    console.log("ConnectHub Engine Initialized successfully.");
    
    // Check current active page and initialize features
    const path = window.location.pathname;
    
    if (path.includes('dashboard.html')) {
        initDashboard();
    } else if (path.includes('marketplace.html')) {
        initMarketplace();
    } else if (path.includes('chat.html')) {
        initChat();
    }
});

// --- Dashboard Logic ---
function initDashboard() {
    // Add dynamic welcome or notifications if needed
    const userSession = localStorage.getItem('connecthub_user') || 'Guest User';
    console.log("Logged in as:", userSession);
}

// --- Marketplace Logic ---
function initMarketplace() {
    // Search filter simulation
    const searchInput = document.querySelector('input[placeholder*="Find cars"]');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase();
            const cards = document.querySelectorAll('.grid-cols-1 > div, .md\\:grid-cols-3 > div');
            
            cards.forEach(card => {
                const text = card.innerText.toLowerCase();
                if (text.includes(term)) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
}

// --- Chat & Call Logic ---
function initChat() {
    // Simulate live messaging sending
    window.sendMessage = function() {
        const input = document.querySelector('input[placeholder="Type a message..."]');
        const chatWindow = document.querySelector('.overflow-y-auto.space-y-3');
        
        if (input && input.value.trim() !== '') {
            const messageText = input.value;
            const bubble = document.createElement('div');
            bubble.className = "flex items-end justify-end gap-2";
            bubble.innerHTML = `<div class="bg-[#1877f2] text-white p-3 rounded-2xl rounded-br-none shadow-sm max-w-xs text-sm">${escapeHTML(messageText)}</div>`;
            
            chatWindow.appendChild(bubble);
            input.value = '';
            chatWindow.scrollTop = chatWindow.scrollHeight;
        }
    };
}

// Security helper to prevent script injection in chat
function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
        tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
}

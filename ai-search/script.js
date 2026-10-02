// Grab the elements from your page
const searchForm = document.getElementById('searchForm');
const queryInput = document.getElementById('queryInput');
const resultContainer = document.getElementById('resultContainer');

// Listen for when the user clicks search or presses enter
searchForm.addEventListener('submit', function(e) {
    e.preventDefault(); // Stops the page from refreshing
    
    const userQuery = queryInput.value.trim();
    
    if (!userQuery) return;

    // Show a loading box on the screen
    resultContainer.innerHTML = `
        <div class="p-4 bg-blue-50 rounded-xl border border-blue-200 text-center text-blue-700 animate-pulse">
            Thinking about: "<strong>${userQuery}</strong>"...
        </div>
    `;
});

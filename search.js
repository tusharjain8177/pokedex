// pokemon.js
document.addEventListener('DOMContentLoaded', () => {
    const sortIcon = document.getElementById('sort-icon');
    const filterWrapper = document.querySelector('.filter-wrapper');
    const searchInput = document.getElementById('search-input');
    const searchCloseIcon = document.getElementById('search-close-icon');

    // Toggle sort options visibility
    sortIcon.addEventListener('click', () => {
        if (filterWrapper.classList.contains('filter-wrapper-open')) {
            filterWrapper.classList.remove('filter-wrapper-open');
        } else {
            filterWrapper.classList.add('filter-wrapper-open');
        }
    });

    // Show/hide search close icon based on input value
    searchInput.addEventListener('input', () => {
        if (searchInput.value) {
            searchCloseIcon.classList.add('search-close-icon-visible');
        } else {
            searchCloseIcon.classList.remove('search-close-icon-visible');
        }
    });

    // Clear search input when close icon is clicked
    searchCloseIcon.addEventListener('click', () => {
        searchInput.value = '';
        searchCloseIcon.classList.remove('search-close-icon-visible');
        searchInput.focus(); // Optionally focus the input after clearing
    });
});

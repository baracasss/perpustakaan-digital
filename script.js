// ===== GLOBAL VARIABLES =====
let currentSlide = 0;
let currentPage = 1;
let booksPerPage = 12;
let currentView = 'grid';
let currentSort = 'relevance';
let allBooks = [];
let filteredBooks = [];
let currentFilters = {};

// ===== SAMPLE DATA =====
const sampleBooks = [
    {
        id: 1,
        title: "Artificial Intelligence: A Modern Approach",
        author: "Stuart Russell, Peter Norvig",
        year: "2020",
        category: "teknologi",
        subject: "teknologi",
        type: "ebook",
        rating: 4.8,
        abstract: "Comprehensive introduction to the theory and practice of artificial intelligence.",
        publisher: "Pearson",
        pages: 1152,
        language: "English",
        isbn: "978-0134610993",
        thumbnail: "https://via.placeholder.com/200x300/4F46E5/FFFFFF?text=AI+Book",
        downloadUrl: "#",
        popularity: 95
    },
    {
        id: 2,
        title: "Sejarah Nusantara",
        author: "Prof. Dr. Sartono Kartodirdjo",
        year: "2019",
        category: "sejarah",
        subject: "sejarah",
        type: "ebook",
        rating: 4.6,
        abstract: "Kajian mendalam tentang sejarah kepulauan Indonesia dari masa prasejarah hingga modern.",
        publisher: "Gramedia",
        pages: 856,
        language: "Indonesia",
        isbn: "978-6020633176",
        thumbnail: "https://via.placeholder.com/200x300/059669/FFFFFF?text=Sejarah+Nusantara",
        downloadUrl: "#",
        popularity: 78
    },
    {
        id: 3,
        title: "Data Science untuk Pemula",
        author: "Dr. Andi Susilo",
        year: "2023",
        category: "teknologi",
        subject: "teknologi",
        type: "ebook",
        rating: 4.5,
        abstract: "Panduan praktis untuk memulai perjalanan dalam ilmu data dan analitik.",
        publisher: "Informatika",
        pages: 420,
        language: "Indonesia",
        isbn: "978-6025734892",
        thumbnail: "https://via.placeholder.com/200x300/DC2626/FFFFFF?text=Data+Science",
        downloadUrl: "#",
        popularity: 89
    },
    {
        id: 4,
        title: "Laskar Pelangi",
        author: "Andrea Hirata",
        year: "2005",
        category: "sastra",
        subject: "sastra",
        type: "ebook",
        rating: 4.7,
        abstract: "Novel tentang perjuangan anak-anak miskin untuk mendapatkan pendidikan.",
        publisher: "Bentang",
        pages: 529,
        language: "Indonesia",
        isbn: "978-9799731240",
        thumbnail: "https://via.placeholder.com/200x300/7C3AED/FFFFFF?text=Laskar+Pelangi",
        downloadUrl: "#",
        popularity: 92
    },
    {
        id: 5,
        title: "Quantum Physics: Concepts and Applications",
        author: "Dr. Michael Chen",
        year: "2022",
        category: "sains",
        subject: "sains",
        type: "ebook",
        rating: 4.4,
        abstract: "Exploration of quantum mechanics principles and their real-world applications.",
        publisher: "Academic Press",
        pages: 678,
        language: "English",
        isbn: "978-0128145982",
        thumbnail: "https://via.placeholder.com/200x300/F59E0B/FFFFFF?text=Quantum+Physics",
        downloadUrl: "#",
        popularity: 67
    },
    {
        id: 6,
        title: "Digital Marketing Strategy",
        author: "Sarah Johnson",
        year: "2024",
        category: "bisnis",
        subject: "bisnis",
        type: "ebook",
        rating: 4.6,
        abstract: "Comprehensive guide to modern digital marketing techniques and strategies.",
        publisher: "Business Books",
        pages: 345,
        language: "English",
        isbn: "978-1234567890",
        thumbnail: "https://via.placeholder.com/200x300/10B981/FFFFFF?text=Digital+Marketing",
        downloadUrl: "#",
        popularity: 83
    },
    {
        id: 7,
        title: "Machine Learning Fundamentals",
        author: "Dr. Lisa Wang",
        year: "2023",
        category: "teknologi",
        subject: "teknologi",
        type: "audiobook",
        rating: 4.7,
        abstract: "Introduction to machine learning algorithms and practical implementation.",
        publisher: "Tech Publications",
        pages: 512,
        language: "English",
        isbn: "978-9876543210",
        thumbnail: "https://via.placeholder.com/200x300/8B5CF6/FFFFFF?text=ML+Fundamentals",
        downloadUrl: "#",
        popularity: 91
    },
    {
        id: 8,
        title: "Ekonomi Indonesia Modern",
        author: "Prof. Budi Santoso",
        year: "2021",
        category: "bisnis",
        subject: "bisnis",
        type: "journal",
        rating: 4.3,
        abstract: "Analisis perkembangan ekonomi Indonesia dalam era globalisasi.",
        publisher: "Universitas Indonesia",
        pages: 290,
        language: "Indonesia",
        isbn: "978-6021234567",
        thumbnail: "https://via.placeholder.com/200x300/EF4444/FFFFFF?text=Ekonomi+Indonesia",
        downloadUrl: "#",
        popularity: 76
    }
];

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    allBooks = [...sampleBooks];
    filteredBooks = [...allBooks];
    
    initializeCarousel();
    displayFeaturedBooks();
    displayBooks();
    showSection('home');
    showNotification('Selamat datang! Koleksi baru telah ditambahkan.', 'success');
});

// ===== ACCESSIBILITY FUNCTIONS =====
function increaseFontSize() {
    document.body.classList.remove('font-small', 'font-large', 'font-xl');
    if (document.body.classList.contains('font-large')) {
        document.body.classList.add('font-xl');
    } else {
        document.body.classList.add('font-large');
    }
    showNotification('Ukuran font diperbesar', 'info');
}

function decreaseFontSize() {
    document.body.classList.remove('font-large', 'font-xl');
    if (!document.body.classList.contains('font-small')) {
        document.body.classList.add('font-small');
    } else {
        document.body.classList.remove('font-small');
    }
    showNotification('Ukuran font diperkecil', 'info');
}

function toggleHighContrast() {
    document.body.classList.toggle('high-contrast');
    const isActive = document.body.classList.contains('high-contrast');
    showNotification(isActive ? 'Mode kontras tinggi diaktifkan' : 'Mode kontras tinggi dinonaktifkan', 'info');
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isActive = document.body.classList.contains('dark-mode');
    showNotification(isActive ? 'Mode gelap diaktifkan' : 'Mode terang diaktifkan', 'info');
}

// ===== NAVIGATION FUNCTIONS =====
function showSection(sectionName) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show selected section
    const targetSection = document.getElementById(sectionName + 'Section');
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    // Update URL hash
    window.location.hash = sectionName;
}

function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.classList.toggle('show');
}

// ===== SEARCH FUNCTIONS =====
function toggleAdvancedSearch() {
    const panel = document.getElementById('advancedSearchPanel');
    panel.classList.toggle('show');
}

function performQuickSearch() {
    const query = document.getElementById('searchInput').value.toLowerCase().trim();
    
    if (query === '') {
        filteredBooks = [...allBooks];
    } else {
        filteredBooks = allBooks.filter(book => 
            book.title.toLowerCase().includes(query) ||
            book.author.toLowerCase().includes(query) ||
            book.abstract.toLowerCase().includes(query)
        );
    }
    
    currentPage = 1;
    displayBooks();
    showSection('browse');
}

function performSearch() {
    performQuickSearch();
}

function applyAdvancedFilters() {
    const yearFilter = document.getElementById('yearFilter').value;
    const subjectFilter = document.getElementById('subjectFilter').value;
    const typeFilters = Array.from(document.querySelectorAll('.checkbox-group input:checked')).map(cb => cb.value);
    
    currentFilters = {
        year: yearFilter,
        subject: subjectFilter,
        types: typeFilters
    };
    
    filteredBooks = allBooks.filter(book => {
        let matches = true;
        
        if (yearFilter && book.year !== yearFilter) {
            matches = false;
        }
        
        if (subjectFilter && book.subject !== subjectFilter) {
            matches = false;
        }
        
        if (typeFilters.length > 0 && !typeFilters.includes(book.type)) {
            matches = false;
        }
        
        return matches;
    });
    
    currentPage = 1;
    displayBooks();
    showSection('browse');
    toggleAdvancedSearch();
    showNotification(`Filter diterapkan. Ditemukan ${filteredBooks.length} hasil.`, 'success');
}

function filterByCategory(category) {
    filteredBooks = allBooks.filter(book => book.category === category);
    currentPage = 1;
    displayBooks();
    showSection('browse');
    showNotification(`Menampilkan kategori: ${category}`, 'info');
}

// ===== CAROUSEL FUNCTIONS =====
function initializeCarousel() {
    const slides = document.querySelectorAll('.carousel-slide');
    const indicatorsContainer = document.getElementById('carouselIndicators');
    
    // Create indicators
    slides.forEach((_, index) => {
        const indicator = document.createElement('div');
        indicator.className = `carousel-indicator ${index === 0 ? 'active' : ''}`;
        indicator.onclick = () => goToSlide(index);
        indicatorsContainer.appendChild(indicator);
    });
    
    // Auto-play carousel
    setInterval(nextSlide, 5000);
}

function nextSlide() {
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.carousel-indicator');
    
    slides[currentSlide].classList.remove('active');
    indicators[currentSlide].classList.remove('active');
    
    currentSlide = (currentSlide + 1) % slides.length;
    
    slides[currentSlide].classList.add('active');
    indicators[currentSlide].classList.add('active');
}

function prevSlide() {
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.carousel-indicator');
    
    slides[currentSlide].classList.remove('active');
    indicators[currentSlide].classList.remove('active');
    
    currentSlide = currentSlide === 0 ? slides.length - 1 : currentSlide - 1;
    
    slides[currentSlide].classList.add('active');
    indicators[currentSlide].classList.add('active');
}

function goToSlide(index) {
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.carousel-indicator');
    
    slides[currentSlide].classList.remove('active');
    indicators[currentSlide].classList.remove('active');
    
    currentSlide = index;
    
    slides[currentSlide].classList.add('active');
    indicators[currentSlide].classList.add('active');
}

// ===== BOOK DISPLAY FUNCTIONS =====
function displayFeaturedBooks() {
    const popularBooks = [...allBooks]
        .sort((a, b) => b.popularity - a.popularity)
        .slice(0, 4);
        
    const newBooks = [...allBooks]
        .sort((a, b) => new Date(b.year) - new Date(a.year))
        .slice(0, 4);
    
    document.getElementById('popularBooks').innerHTML = popularBooks.map(createBookCard).join('');
    document.getElementById('newBooks').innerHTML = newBooks.map(createBookCard).join('');
}

function displayBooks() {
    const startIndex = (currentPage - 1) * booksPerPage;
    const endIndex = startIndex + booksPerPage;
    const booksToShow = filteredBooks.slice(startIndex, endIndex);
    
    const container = document.getElementById('bookContainer');
    container.innerHTML = booksToShow.map(createBookCard).join('');
    
    updatePagination();
}

function createBookCard(book) {
    return `
        <div class="book-card" onclick="showBookDetail(${book.id})">
            <div class="book-thumbnail">
                <img src="${book.thumbnail}" alt="${book.title}" loading="lazy">
            </div>
            <div class="book-info">
                <h4>${book.title}</h4>
                <p class="author">oleh ${book.author}</p>
                <p class="year">${book.year} • ${book.type.toUpperCase()}</p>
            </div>
        </div>
    `;
}

function showBookDetail(bookId) {
    const book = allBooks.find(b => b.id === bookId);
    if (!book) return;
    
    const modal = document.getElementById('bookModal');
    const detailContainer = document.getElementById('bookDetail');
    
    detailContainer.innerHTML = `
        <div class="book-detail-header">
            <div class="book-detail-thumbnail">
                <img src="${book.thumbnail}" alt="${book.title}">
            </div>
            <div class="book-detail-info">
                <h2>${book.title}</h2>
                <div class="book-detail-meta">
                    <div class="meta-item">
                        <span class="meta-label">Pengarang:</span>
                        <span class="meta-value">${book.author}</span>
                    </div>
                    <div class="meta-item">
                        <span class="meta-label">Penerbit:</span>
                        <span class="meta-value">${book.publisher}</span>
                    </div>
                    <div class="meta-item">
                        <span class="meta-label">Tahun:</span>
                        <span class="meta-value">${book.year}</span>
                    </div>
                    <div class="meta-item">
                        <span class="meta-label">Halaman:</span>
                        <span class="meta-value">${book.pages}</span>
                    </div>
                    <div class="meta-item">
                        <span class="meta-label">Bahasa:</span>
                        <span class="meta-value">${book.language}</span>
                    </div>
                    <div class="meta-item">
                        <span class="meta-label">ISBN:</span>
                        <span class="meta-value">${book.isbn}</span>
                    </div>
                    <div class="meta-item">
                        <span class="meta-label">Rating:</span>
                        <span class="meta-value">${'⭐'.repeat(Math.floor(book.rating))} (${book.rating}/5)</span>
                    </div>
                </div>
                <div class="action-buttons">
                    <a href="${book.downloadUrl}" class="action-btn">📥 Unduh</a>
                    <button class="action-btn secondary" onclick="citeBook(${book.id})">📋 Sitasi</button>
                    <button class="action-btn secondary" onclick="shareBook(${book.id})">📤 Bagikan</button>
                    <button class="action-btn secondary" onclick="addToList(${book.id})">❤️ Tambah ke Daftar</button>
                </div>
            </div>
        </div>
        
        <div class="book-detail-tabs">
            <div class="tab-buttons">
                <button class="tab-btn active" onclick="showTab('abstract')">Abstrak</button>
                <button class="tab-btn" onclick="showTab('toc')">Daftar Isi</button>
                <button class="tab-btn" onclick="showTab('reviews')">Ulasan</button>
            </div>
            
            <div class="tab-content active" id="abstract-tab">
                <h4>Abstrak</h4>
                <p>${book.abstract}</p>
            </div>
            
            <div class="tab-content" id="toc-tab">
                <h4>Daftar Isi</h4>
                <p>Daftar isi akan tersedia setelah buku diunduh.</p>
            </div>
            
            <div class="tab-content" id="reviews-tab">
                <h4>Ulasan Pembaca</h4>
                <p>Belum ada ulasan untuk buku ini. Jadilah yang pertama memberikan ulasan!</p>
                <button class="action-btn" onclick="writeReview(${book.id})">✍️ Tulis Ulasan</button>
            </div>
        </div>
    `;
    
    modal.classList.add('show');
}

function closeModal() {
    const modal = document.getElementById('bookModal');
    modal.classList.remove('show');
}

function showTab(tabName) {
    // Remove active class from all tabs
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    
    // Add active class to selected tab
    event.target.classList.add('active');
    document.getElementById(tabName + '-tab').classList.add('active');
}

// ===== VIEW CONTROLS =====
function toggleView(view) {
    currentView = view;
    const container = document.getElementById('bookContainer');
    const viewButtons = document.querySelectorAll('.view-btn');
    
    // Update button states
    viewButtons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.view === view);
    });
    
    // Update container class
    container.className = `book-container ${view}-view`;
}

function sortBooks() {
    const sortSelect = document.getElementById('sortSelect');
    currentSort = sortSelect.value;
    
    switch (currentSort) {
        case 'date':
            filteredBooks.sort((a, b) => new Date(b.year) - new Date(a.year));
            break;
        case 'popularity':
            filteredBooks.sort((a, b) => b.popularity - a.popularity);
            break;
        case 'title':
            filteredBooks.sort((a, b) => a.title.localeCompare(b.title));
            break;
        default: // relevance
            break;
    }
    
    currentPage = 1;
    displayBooks();
}

// ===== PAGINATION =====
function updatePagination() {
    const totalPages = Math.ceil(filteredBooks.length / booksPerPage);
    const pageNumbers = document.getElementById('pageNumbers');
    
    pageNumbers.innerHTML = '';
    
    for (let i = 1; i <= totalPages; i++) {
        const pageBtn = document.createElement('button');
        pageBtn.className = `page-number ${i === currentPage ? 'active' : ''}`;
        pageBtn.textContent = i;
        pageBtn.onclick = () => goToPage(i);
        pageNumbers.appendChild(pageBtn);
    }
    
    // Update navigation buttons
    const prevBtn = document.querySelector('.pagination button:first-child');
    const nextBtn = document.querySelector('.pagination button:last-child');
    
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;
}

function changePage(direction) {
    const totalPages = Math.ceil(filteredBooks.length / booksPerPage);
    const newPage = currentPage + direction;
    
    if (newPage >= 1 && newPage <= totalPages) {
        goToPage(newPage);
    }
}

function goToPage(page) {
    currentPage = page;
    displayBooks();
    
    // Scroll to top of book container
    document.getElementById('bookContainer').scrollIntoView({ behavior: 'smooth' });
}

// ===== ACTION FUNCTIONS =====
function citeBook(bookId) {
    const book = allBooks.find(b => b.id === bookId);
    if (!book) return;
    
    const citation = `${book.author}. (${book.year}). ${book.title}. ${book.publisher}.`;
    
    navigator.clipboard.writeText(citation).then(() => {
        showNotification('Sitasi berhasil disalin ke clipboard!', 'success');
    }).catch(() => {
        showNotification('Gagal menyalin sitasi', 'error');
    });
}

function shareBook(bookId) {
    const book = allBooks.find(b => b.id === bookId);
    if (!book) return;
    
    const shareText = `Lihat buku ini: "${book.title}" oleh ${book.author}`;
    const shareUrl = `${window.location.origin}${window.location.pathname}#book-${bookId}`;
    
    if (navigator.share) {
        navigator.share({
            title: book.title,
            text: shareText,
            url: shareUrl
        });
    } else {
        navigator.clipboard.writeText(`${shareText} - ${shareUrl}`).then(() => {
            showNotification('Link buku berhasil disalin!', 'success');
        }).catch(() => {
            showNotification('Gagal membagikan buku', 'error');
        });
    }
}

function addToList(bookId) {
    const book = allBooks.find(b => b.id === bookId);
    if (!book) return;
    
    // Simulate adding to user's reading list
    showNotification(`"${book.title}" berhasil ditambahkan ke daftar baca!`, 'success');
}

function writeReview(bookId) {
    const book = allBooks.find(b => b.id === bookId);
    if (!book) return;
    
    showNotification('Fitur ulasan akan segera tersedia!', 'info');
}

// ===== NOTIFICATION SYSTEM =====
function showNotification(message, type = 'info') {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.className = `notification ${type} show`;
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 4000);
}

// ===== USER ACCOUNT FUNCTIONS =====
function showLogin() {
    showNotification('Fitur login akan segera tersedia!', 'info');
}

function showRegister() {
    showNotification('Fitur registrasi akan segera tersedia!', 'info');
}

function showProfile() {
    showNotification('Fitur profil akan segera tersedia!', 'info');
}

// ===== EVENT LISTENERS =====
document.addEventListener('keydown', function(e) {
    // Escape key closes modal
    if (e.key === 'Escape') {
        closeModal();
        const advancedPanel = document.getElementById('advancedSearchPanel');
        if (advancedPanel.classList.contains('show')) {
            toggleAdvancedSearch();
        }
    }
    
    // Arrow keys for carousel
    if (e.key === 'ArrowLeft') {
        prevSlide();
    } else if (e.key === 'ArrowRight') {
        nextSlide();
    }
});

// Close modal when clicking outside
document.getElementById('bookModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeModal();
    }
});

// Handle hash changes for navigation
window.addEventListener('hashchange', function() {
    const hash = window.location.hash.substring(1);
    if (hash && document.getElementById(hash + 'Section')) {
        showSection(hash);
    }
});

// Initialize on page load
window.addEventListener('load', function() {
    const hash = window.location.hash.substring(1);
    if (hash && document.getElementById(hash + 'Section')) {
        showSection(hash);
    }
});
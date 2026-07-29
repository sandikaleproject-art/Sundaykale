/* =========================================================
   SANDIKALE PROJECT - RESPONSIVE LAYOUT
   Desktop Windows + Android/iPhone
   Sidebar dapat dibuka/tutup di semua ukuran layar.
   ========================================================= */

* {
    -webkit-tap-highlight-color: transparent;
    box-sizing: border-box;
}

html,
body {
    width: 100%;
    max-width: 100%;
}

body.app-shell {
    min-width: 0;
    touch-action: pan-y;
}

/* =========================
   TOMBOL SIDEBAR
   ========================= */
.mobile-menu-button {
    display: flex !important;
    position: fixed;
    top: 12px;
    left: 12px;
    z-index: 100;
    width: 44px;
    height: 44px;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}

.mobile-sidebar-close {
    display: none;
}

/* =========================
   SIDEBAR DESKTOP
   ========================= */
.sidebar-responsive {
    position: relative;
    flex: 0 0 16rem;
    width: 16rem;
    min-width: 16rem;
    transform: translateX(0);
    transition: transform 0.25s ease, margin-left 0.25s ease, box-shadow 0.25s ease;
    overflow: hidden;
}

/* Saat ditutup di desktop, sidebar benar-benar keluar dari layout */
@media (min-width: 768px) {
    .sidebar-responsive.sidebar-collapsed {
        margin-left: -16rem;
    }

    .sidebar-overlay {
        display: none !important;
    }
}

.sidebar-overlay {
    transition: opacity 0.25s ease;
}

.sidebar-overlay-visible {
    opacity: 1;
    pointer-events: auto !important;
}

/* Prevent horizontal overflow */
.main-content {
    overflow-x: hidden;
}

.main-content > * {
    max-width: 100%;
}

.main-content table {
    min-width: 640px;
}

/* =========================
   MOBILE / ANDROID
   ========================= */
@media (max-width: 767px) {
    body.app-shell {
        display: block;
        overflow: hidden;
    }

    .mobile-sidebar-close {
        display: flex;
    }

    .sidebar-responsive {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        z-index: 40;
        width: min(82vw, 290px);
        min-width: 0;
        max-width: 290px;
        flex: none;
        margin-left: 0;
        transform: translateX(-105%);
        overflow-y: auto;
        overflow-x: hidden;
        box-shadow: 14px 0 35px rgba(0, 0, 0, 0.45);
        -webkit-overflow-scrolling: touch;
    }

    .sidebar-responsive.sidebar-open {
        transform: translateX(0);
    }

    .sidebar-responsive.sidebar-collapsed {
        margin-left: 0;
        transform: translateX(-105%);
    }

    .main-content {
        width: 100%;
        height: 100vh;
        min-height: 100vh;
        padding-bottom: 24px;
        padding-top: 64px !important;
    }

    #menu-kasir > .grid {
        height: auto !important;
    }

    #menu-kasir .lg\:col-span-2 {
        min-width: 0;
    }

    #menu-kasir .grid-cols-2 {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    #menu-kasir #product-list {
        max-height: none !important;
        overflow-y: visible;
    }

    #menu-kasir > .grid > div:last-child {
        height: auto !important;
        min-height: 0;
    }

    #menu-kasir #cart-list {
        max-height: 280px !important;
    }

    #menu-kasir .flex.justify-between.items-center {
        align-items: flex-start;
        flex-direction: column;
        gap: 10px;
    }

    #menu-kasir #search-product {
        width: 100%;
        max-width: none;
    }

    .main-content h2.text-2xl {
        font-size: 1.35rem;
        line-height: 1.25;
    }

    #sidebar-nav .menu-btn {
        min-height: 46px;
    }

    .main-content input,
    .main-content select,
    .main-content textarea {
        max-width: 100%;
    }

    .main-content .overflow-x-auto {
        max-width: 100%;
        -webkit-overflow-scrolling: touch;
    }
}

@media (max-width: 380px) {
    .sidebar-responsive {
        width: 86vw;
    }

    #menu-kasir #product-list {
        grid-template-columns: 1fr;
    }

    .main-content {
        padding-left: 12px;
        padding-right: 12px;
    }
}

<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SANDIKALE PROJECT - POS System</title>
    <link rel="stylesheet" href="css/style.css">
    <!-- Tailwind CSS CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- FontAwesome Icon -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <!-- Cloud user/authentication. Tetap kompatibel dengan mode lokal bila config belum diisi. -->
    <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
    <script src="css/js/supabase-config.js"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        brandDark: '#121212',
                        brandRed: '#DC2626',
                        brandCream: '#F5F5EC',
                        brandGray: '#1E1E1E'
                    }
                }
            }
        }
    </script>
</head>
<body class="app-shell bg-brandDark text-brandCream font-sans flex h-screen overflow-hidden">
    <!-- LOGIN SCREEN -->
    <div id="login-screen" class="fixed inset-0 z-[200] bg-brandDark flex items-center justify-center p-4">
        <div class="w-full max-w-md bg-brandGray border border-neutral-800 rounded-2xl p-7 shadow-2xl">
            <div class="text-center mb-7">
                <div class="mx-auto w-14 h-14 bg-brandRed rounded-xl flex items-center justify-center font-bold text-2xl text-white mb-4">S</div>
                <h1 class="text-xl font-bold tracking-wider text-white">SANDIKALE PROJECT</h1>
                <p class="text-xs text-gray-500 mt-1">POS Management System</p>
            </div>
            <form id="login-form" onsubmit="loginUser(event)" class="space-y-4">
                <div>
                    <label class="block text-xs text-gray-400 mb-1">Username</label>
                    <input id="login-username" required autocomplete="username" type="text"
                        class="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-3 text-sm text-white outline-none focus:border-brandRed"
                        placeholder="Masukkan username">
                </div>
                <div>
                    <label class="block text-xs text-gray-400 mb-1">Password</label>
                    <input id="login-password" required autocomplete="current-password" type="password"
                        class="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-3 text-sm text-white outline-none focus:border-brandRed"
                        placeholder="Masukkan password">
                </div>
                <p id="login-error" class="hidden text-xs text-red-400 bg-red-950/30 border border-red-900 rounded-lg px-3 py-2"></p>
                <button type="submit" class="w-full bg-brandRed hover:bg-red-700 text-white font-bold py-3 rounded-lg transition">
                    <i class="fa-solid fa-right-to-bracket mr-2"></i>Masuk
                </button>
            </form>
            <p class="text-[10px] text-gray-600 text-center mt-5">Akun awal: <b>admin</b> / <b>admin123</b></p>
        </div>
    </div>


    <!-- MOBILE NAVIGATION -->
    <button
        id="mobile-menu-button"
        type="button"
        onclick="toggleSidebar()"
        aria-label="Buka menu"
        aria-controls="app-sidebar"
        aria-expanded="false"
        class="mobile-menu-button fixed top-3 left-3 z-[60] w-11 h-11 rounded-xl bg-brandRed text-white shadow-lg items-center justify-center"
    >
        <i class="fa-solid fa-bars"></i>
    </button>

    <div
        id="sidebar-overlay"
        class="sidebar-overlay fixed inset-0 z-[35] bg-black/70 opacity-0 pointer-events-none"
        onclick="closeSidebar()"
        aria-hidden="true"
    ></div>

    <!-- SIDEBAR NAVIGASI -->
    <aside id="app-sidebar" class="sidebar-responsive w-64 bg-brandGray border-r border-neutral-800 flex flex-col justify-between p-4 flex-shrink-0 z-40 relative">
        <div>
            <!-- Logo Header -->
            <div class="flex items-center gap-3 px-2 py-4 border-b border-neutral-800 mb-6">
                <div class="w-10 h-10 bg-brandRed rounded flex items-center justify-center font-bold text-xl text-white">
                    S
                </div>
                <div>
                    <h1 class="font-bold text-lg leading-tight tracking-wider">SANDIKALE</h1>
                    <p class="text-xs text-red-500 font-semibold tracking-widest">- PROJECT -</p>
                </div>
                <button
                    type="button"
                    onclick="closeSidebar()"
                    aria-label="Tutup menu"
                    class="mobile-sidebar-close w-9 h-9 rounded-lg text-gray-400 hover:text-white hover:bg-neutral-800 items-center justify-center"
                >
                    <i class="fa-solid fa-xmark"></i>
                </button>
            </div>

            <!-- Navigasi Sub-Menu -->
            <nav class="space-y-1" id="sidebar-nav">
                <button type="button" onclick="switchMenu('dashboard', this)" class="menu-btn w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-brandRed transition text-left text-sm font-medium bg-brandRed text-white cursor-pointer">
                    <i class="fa-solid fa-chart-line w-5 pointer-events-none"></i> <span class="pointer-events-none">Dashboard</span>
                </button>
                <button type="button" onclick="switchMenu('kasir', this)" class="menu-btn w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-brandRed transition text-left text-sm font-medium text-gray-300 cursor-pointer">
                    <i class="fa-solid fa-cash-register w-5 pointer-events-none"></i> <span class="pointer-events-none">Kasir</span>
                </button>
                <button type="button" onclick="switchMenu('produk', this)" class="menu-btn w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-brandRed transition text-left text-sm font-medium text-gray-300 cursor-pointer">
                    <i class="fa-solid fa-box w-5 pointer-events-none"></i> <span class="pointer-events-none">Produk</span>
                </button>
                <button type="button" onclick="switchMenu('kategori', this)" class="menu-btn w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-brandRed transition text-left text-sm font-medium text-gray-300 cursor-pointer">
                    <i class="fa-solid fa-tags w-5 pointer-events-none"></i> <span class="pointer-events-none">Kategori</span>
                </button>
                <button type="button" onclick="switchMenu('customer', this)" data-menu="customer" class="menu-btn w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-brandRed transition text-left text-sm font-medium text-gray-300 cursor-pointer">
                    <i class="fa-solid fa-users w-5 pointer-events-none"></i> <span class="pointer-events-none">Customer</span>
                </button>
                <button type="button" onclick="switchMenu('laporan', this)" class="menu-btn w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-brandRed transition text-left text-sm font-medium text-gray-300 cursor-pointer">
                    <i class="fa-solid fa-file-invoice-dollar w-5 pointer-events-none"></i> <span class="pointer-events-none">Laporan</span>
                </button>
                <button type="button" onclick="switchMenu('user', this)" class="menu-btn w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-brandRed transition text-left text-sm font-medium text-gray-300 cursor-pointer">
                    <i class="fa-solid fa-user-gear w-5 pointer-events-none"></i> <span class="pointer-events-none">Manajemen User</span>
                </button>
            </nav>
        </div>

        <!-- User Profile Bottom -->
        <div class="border-t border-neutral-800 pt-4 flex items-center justify-between px-2 gap-2">
            <div class="flex items-center gap-2 min-w-0">
                <div id="current-user-avatar" class="w-8 h-8 rounded-full bg-neutral-700 flex items-center justify-center text-xs flex-shrink-0">A</div>
                <div class="min-w-0">
                    <p id="current-user-name" class="text-sm font-medium truncate">Administrator</p>
                    <p id="current-user-role" class="text-[10px] text-gray-500 truncate">Admin</p>
                </div>
            </div>
            <button type="button" onclick="logoutUser()" title="Keluar / Ganti User" class="w-8 h-8 rounded-lg text-gray-400 hover:text-brandRed hover:bg-neutral-800 flex items-center justify-center flex-shrink-0">
                <i class="fa-solid fa-right-from-bracket"></i>
            </button>
        </div>
    </aside>

    <!-- AREA KONTEN UTAMA -->
    <main class="main-content flex-1 min-w-0 overflow-y-auto p-4 pt-16 md:p-6 md:pt-6 bg-brandDark relative z-0">

        <!-- 1. DASHBOARD OVERVIEW -->
        <section id="menu-dashboard" class="menu-content">
            <h2 class="text-2xl font-bold mb-4 text-white">Dashboard Overview</h2>
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div class="bg-brandGray p-4 rounded-xl border border-neutral-800">
                    <p class="text-xs text-gray-400">Penjualan Hari Ini</p>
                    <h3 class="text-xl font-bold text-brandCream">Rp 0</h3>
                </div>
                <div class="bg-brandGray p-4 rounded-xl border border-neutral-800">
                    <p class="text-xs text-gray-400">Total Transaksi</p>
                    <h3 class="text-xl font-bold text-brandCream">0</h3>
                </div>
                <div class="bg-brandGray p-4 rounded-xl border border-neutral-800">
                    <p class="text-xs text-gray-400">Total Produk</p>
                    <h3 class="text-xl font-bold text-brandCream">0</h3>
                </div>
                <div class="bg-brandGray p-4 rounded-xl border border-neutral-800">
                    <p class="text-xs text-gray-400">Stok Menipis</p>
                    <h3 class="text-xl font-bold text-brandRed">0</h3>
                </div>
            </div>
        </section>

        <!-- 2. KASIR (POS) -->
        <section id="menu-kasir" class="menu-content hidden h-full">
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
                <div class="lg:col-span-2 flex flex-col h-full">
                    <div class="flex justify-between items-center mb-4">
                        <h2 class="text-2xl font-bold">Kasir Penjualan</h2>
                        <input type="text" id="search-product" onkeyup="renderProducts()" placeholder="Cari merchandise..." class="bg-brandGray border border-neutral-700 px-4 py-2 rounded-lg text-sm text-brandCream focus:outline-none focus:border-brandRed w-64">
                    </div>

                    <div class="flex gap-2 mb-4 overflow-x-auto pb-2" id="category-filter"></div>

                    <div id="product-list" class="grid grid-cols-2 md:grid-cols-3 gap-4 overflow-y-auto pr-2 flex-1 max-h-[calc(100vh-200px)]">
                    </div>
                </div>

                <div class="bg-brandGray rounded-xl p-4 border border-neutral-800 flex flex-col justify-between h-[calc(100vh-100px)]">
                    <div>
                        <div class="bg-neutral-900 border border-neutral-800 rounded-lg p-3 mb-4">
                            <div class="flex items-center justify-between mb-2">
                                <div>
                                    <p class="text-[11px] text-gray-500 uppercase tracking-wider">Customer</p>
                                    <p class="text-xs text-gray-400">Pilih customer untuk transaksi ini.</p>
                                </div>
                                <button type="button" onclick="openCustomerFromKasir()" class="text-[11px] text-brandRed hover:text-white font-semibold">+ Baru</button>
                            </div>
                            <select id="kasir-customer" onchange="selectKasirCustomer()" class="w-full bg-brandGray border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-brandRed">
                                <option value="">Customer Umum</option>
                            </select>
                            <div id="kasir-customer-info" class="hidden mt-2 text-[10px] text-gray-500"></div>
                        </div>
                        <div class="flex justify-between items-center border-b border-neutral-800 pb-3 mb-4">
                            <h3 class="font-bold text-lg"><i class="fa-solid fa-cart-shopping text-brandRed mr-2"></i>Keranjang</h3>
                            <button type="button" onclick="clearCart()" class="text-xs text-red-500 hover:underline">Kosongkan</button>
                        </div>
                        <div id="cart-list" class="space-y-3 overflow-y-auto max-h-[320px] pr-1">
                            <p class="text-xs text-gray-500 text-center py-8">Keranjang belanja masih kosong.</p>
                        </div>
                    </div>

                    <div class="border-t border-neutral-800 pt-4 mt-auto">
                        <div class="grid grid-cols-2 gap-2 mb-3">
                            <div>
                                <label class="block text-[10px] text-gray-500 mb-1">Tipe Harga</label>
                                <select id="kasir-price-type" onchange="toggleResellerDiscount()" class="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-2.5 py-2 text-xs text-white focus:outline-none focus:border-brandRed">
                                    <option value="Retail">Retail</option>
                                    <option value="Reseller">Reseller</option>
                                </select>
                            </div>
                            <div>
                                <label class="block text-[10px] text-gray-500 mb-1">Diskon Reseller (%)</label>
                                <input id="reseller-discount" type="number" min="0" max="100" step="0.5" value="0" disabled oninput="updateCartUI()"
                                    class="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-2.5 py-2 text-xs text-white disabled:opacity-40 focus:outline-none focus:border-brandRed">
                            </div>
                        </div>
                        <div class="flex justify-between text-sm mb-2">
                            <span class="text-gray-400">Subtotal</span>
                            <span id="subtotal-val" class="font-semibold">Rp 0</span>
                        </div>
                        <div class="flex justify-between text-sm mb-2">
                            <span class="text-gray-400">Diskon Reseller</span>
                            <span id="discount-val" class="font-semibold text-green-400">Rp 0</span>
                        </div>
                        <div class="flex justify-between text-base font-bold text-white mb-4 border-t border-neutral-800 pt-2">
                            <span>Total</span>
                            <span id="total-val" class="text-brandRed">Rp 0</span>
                        </div>
                        <div class="grid grid-cols-2 gap-2">
                            <button type="button" onclick="processPayment()" class="bg-brandRed hover:bg-red-700 text-white font-bold py-3 rounded-lg transition text-sm flex justify-center items-center gap-2">
                                <i class="fa-solid fa-money-bill-wave"></i> Proses Bayar
                            </button>
                            <button type="button" onclick="printLastReceipt()" class="bg-neutral-800 hover:bg-neutral-700 text-white font-bold py-3 rounded-lg transition text-sm flex justify-center items-center gap-2">
                                <i class="fa-solid fa-print"></i> Cetak Nota
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- 3. MANAJEMEN PRODUK -->
        <section id="menu-produk" class="menu-content hidden">
            <div class="flex justify-between items-center mb-6">
                <div>
                    <h2 class="text-2xl font-bold text-white">Manajemen Produk Merchandise</h2>
                    <p class="text-xs text-gray-400">Kelola stok, harga, dan item merchandise SANDIKALE PROJECT</p>
                </div>
                
                <button type="button" onclick="openProductModal()" class="bg-brandRed hover:bg-red-700 text-white text-sm font-semibold px-4 py-2.5 rounded-lg flex items-center gap-2 transition cursor-pointer shadow-lg">
                    <i class="fa-solid fa-plus"></i> Tambah Produk
                </button>
            </div>

            <!-- Tabel Produk -->
            <div class="bg-brandGray rounded-xl border border-neutral-800 overflow-hidden">
                <table class="w-full text-left text-sm text-gray-300">
                    <thead class="bg-neutral-900 text-xs text-gray-400 uppercase border-b border-neutral-800">
                        <tr>
                            <th class="px-6 py-4">Produk</th>
                            <th class="px-6 py-4">Kategori</th>
                            <th class="px-6 py-4">Harga</th>
                            <th class="px-6 py-4">Stok</th>
                            <th class="px-6 py-4 text-center">Aksi</th>
                        </tr>
                    </thead>
                    <tbody id="product-table-body" class="divide-y divide-neutral-800">
                    </tbody>
                </table>
            </div>
        </section>

        <!-- 4. SUB MENU LAINNYA -->
        <section id="menu-kategori" class="menu-content hidden">
            <div class="flex justify-between items-center mb-6">
                <div>
                    <h2 class="text-2xl font-bold text-white">Kategori Produk</h2>
                    <p class="text-xs text-gray-400">Tambah, ubah, dan hapus kategori produk SANDIKALE PROJECT.</p>
                </div>
                <button type="button" onclick="openCategoryModal()" class="bg-brandRed hover:bg-red-700 text-white text-sm font-semibold px-4 py-2.5 rounded-lg flex items-center gap-2 transition cursor-pointer shadow-lg">
                    <i class="fa-solid fa-plus"></i> Tambah Kategori
                </button>
            </div>

            <div class="bg-brandGray rounded-xl border border-neutral-800 overflow-hidden">
                <div class="px-5 py-4 border-b border-neutral-800 flex items-center justify-between">
                    <div>
                        <h3 class="font-bold text-white">Daftar Kategori</h3>
                        <p id="category-count" class="text-xs text-gray-500 mt-1">0 kategori</p>
                    </div>
                    <div class="relative">
                        <i class="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-xs"></i>
                        <input id="search-category" oninput="renderCategoryManagement()" type="text" placeholder="Cari kategori..." class="bg-neutral-900 border border-neutral-700 rounded-lg pl-8 pr-3 py-2 text-xs text-white focus:outline-none focus:border-brandRed w-56">
                    </div>
                </div>
                <div class="overflow-x-auto">
                    <table class="w-full text-left text-sm text-gray-300">
                        <thead class="bg-neutral-900 text-xs text-gray-400 uppercase border-b border-neutral-800">
                            <tr>
                                <th class="px-6 py-4">No</th>
                                <th class="px-6 py-4">Kategori</th>
                                <th class="px-6 py-4">Jumlah Produk</th>
                                <th class="px-6 py-4">Status</th>
                                <th class="px-6 py-4 text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody id="category-table-body" class="divide-y divide-neutral-800"></tbody>
                    </table>
                </div>
            </div>
        </section>
        <section id="menu-customer" class="menu-content hidden">
    <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
            <h2 class="text-2xl font-bold text-white">Data Customer</h2>
            <p class="text-xs text-gray-400">Kelola data pelanggan SANDIKALE PROJECT dengan mudah.</p>
        </div>
        <button type="button" onclick="openCustomerModal()" class="bg-brandRed hover:bg-red-700 text-white text-sm font-semibold px-4 py-2.5 rounded-lg flex items-center gap-2 transition cursor-pointer shadow-lg">
            <i class="fa-solid fa-user-plus"></i> Tambah Customer
        </button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div class="bg-brandGray p-4 rounded-xl border border-neutral-800">
            <p class="text-xs text-gray-400">Total Customer</p>
            <h3 id="customer-total" class="text-xl font-bold text-white">0</h3>
        </div>
        <div class="bg-brandGray p-4 rounded-xl border border-neutral-800">
            <p class="text-xs text-gray-400">Customer Aktif</p>
            <h3 id="customer-active" class="text-xl font-bold text-green-400">0</h3>
        </div>
        <div class="bg-brandGray p-4 rounded-xl border border-neutral-800">
            <p class="text-xs text-gray-400">Customer Nonaktif</p>
            <h3 id="customer-inactive" class="text-xl font-bold text-red-400">0</h3>
        </div>
    </div>

    <div class="bg-brandGray rounded-xl border border-neutral-800 overflow-hidden">
        <div class="p-4 border-b border-neutral-800 flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
            <div>
                <h3 class="font-bold text-white">Daftar Customer</h3>
                <p class="text-xs text-gray-500 mt-1">Data tersimpan di browser perangkat ini.</p>
            </div>
            <div class="relative w-full md:w-72">
                <i class="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-xs"></i>
                <input id="search-customer" type="text" oninput="renderCustomers()" placeholder="Cari nama / WhatsApp..." class="w-full bg-neutral-900 border border-neutral-700 rounded-lg pl-9 pr-3 py-2 text-sm text-white focus:outline-none focus:border-brandRed">
            </div>
        </div>
        <div class="overflow-x-auto">
            <table class="w-full text-left text-sm text-gray-300 min-w-[850px]">
                <thead class="bg-neutral-900 text-xs text-gray-400 uppercase border-b border-neutral-800">
                    <tr>
                        <th class="px-5 py-4">Customer</th>
                        <th class="px-5 py-4">WhatsApp</th>
                        <th class="px-5 py-4">Email</th>
                        <th class="px-5 py-4">Alamat</th>
                        <th class="px-5 py-4">Status</th>
                        <th class="px-5 py-4 text-center">Aksi</th>
                    </tr>
                </thead>
                <tbody id="customer-table-body" class="divide-y divide-neutral-800"></tbody>
            </table>
        </div>
        <div id="customer-empty" class="hidden text-center py-12 text-gray-500 text-sm">
            Belum ada data customer.
        </div>
    </div>
</section>
        <section id="menu-laporan" class="menu-content hidden">
    <div class="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4 mb-5">
        <div>
            <h2 class="text-2xl font-bold text-white">Laporan Penjualan</h2>
            <p class="text-xs text-gray-500 mt-1">Laporan otomatis mengambil data transaksi dari Kasir.</p>
        </div>
        <div class="flex flex-wrap gap-2">
            <button type="button" onclick="setReportPreset('today')" class="report-preset px-3 py-2 rounded-lg bg-brandRed text-white text-xs font-semibold">Hari Ini</button>
            <button type="button" onclick="setReportPreset('week')" class="report-preset px-3 py-2 rounded-lg bg-neutral-800 text-gray-300 text-xs font-semibold hover:bg-neutral-700">Minggu Ini</button>
            <button type="button" onclick="setReportPreset('month')" class="report-preset px-3 py-2 rounded-lg bg-neutral-800 text-gray-300 text-xs font-semibold hover:bg-neutral-700">Bulan Ini</button>
            <button type="button" onclick="setReportPreset('all')" class="report-preset px-3 py-2 rounded-lg bg-neutral-800 text-gray-300 text-xs font-semibold hover:bg-neutral-700">Semua</button>
        </div>
    </div>

    <div class="bg-brandGray border border-neutral-800 rounded-xl p-4 mb-5">
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-3 items-end">
            <div>
                <label class="block text-[11px] text-gray-500 mb-1">Dari Tanggal</label>
                <input id="report-start" type="date" onchange="renderReport()" class="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-brandRed">
            </div>
            <div>
                <label class="block text-[11px] text-gray-500 mb-1">Sampai Tanggal</label>
                <input id="report-end" type="date" onchange="renderReport()" class="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-brandRed">
            </div>
            <div>
                <label class="block text-[11px] text-gray-500 mb-1">Pembayaran</label>
                <select id="report-payment" onchange="renderReport()" class="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-brandRed">
                    <option value="all">Semua Metode</option>
                    <option value="Cash">Cash</option>
                    <option value="Transfer">Transfer</option>
                    <option value="QRIS">QRIS</option>
                </select>
            </div>
            <div>
                <label class="block text-[11px] text-gray-500 mb-1">Cari Transaksi</label>
                <input id="report-search" type="text" oninput="renderReport()" placeholder="No. transaksi / customer..." class="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-brandRed">
            </div>
            <div class="flex gap-2">
                <button type="button" onclick="printReport()" class="flex-1 px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-xs font-semibold text-white hover:bg-neutral-700"><i class="fa-solid fa-print mr-1"></i>Cetak</button>
                <button type="button" onclick="exportReportCSV()" class="flex-1 px-3 py-2 bg-brandRed rounded-lg text-xs font-semibold text-white hover:bg-red-700"><i class="fa-solid fa-file-csv mr-1"></i>CSV</button>
            </div>
        </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-5">
        <div class="bg-brandGray border border-neutral-800 rounded-xl p-4">
            <p class="text-[11px] text-gray-500 uppercase">Total Transaksi</p>
            <p id="report-total-transactions" class="text-2xl font-bold text-white mt-1">0</p>
        </div>
        <div class="bg-brandGray border border-neutral-800 rounded-xl p-4">
            <p class="text-[11px] text-gray-500 uppercase">Total Penjualan</p>
            <p id="report-total-sales" class="text-2xl font-bold text-brandRed mt-1">Rp 0</p>
        </div>
        <div class="bg-brandGray border border-neutral-800 rounded-xl p-4">
            <p class="text-[11px] text-gray-500 uppercase">Produk Terjual</p>
            <p id="report-total-items" class="text-2xl font-bold text-white mt-1">0 pcs</p>
        </div>
        <div class="bg-brandGray border border-neutral-800 rounded-xl p-4">
            <p class="text-[11px] text-gray-500 uppercase">Rata-rata Transaksi</p>
            <p id="report-average" class="text-2xl font-bold text-white mt-1">Rp 0</p>
        </div>
    </div>

    <div class="grid grid-cols-1 xl:grid-cols-3 gap-5">
        <div class="xl:col-span-2 bg-brandGray border border-neutral-800 rounded-xl overflow-hidden">
            <div class="p-4 border-b border-neutral-800 flex items-center justify-between">
                <div>
                    <h3 class="font-bold text-white">Daftar Transaksi</h3>
                    <p id="report-period-label" class="text-[11px] text-gray-500 mt-1">Semua transaksi</p>
                </div>
            </div>
            <div class="overflow-x-auto">
                <table class="w-full text-left text-xs text-gray-300 min-w-[850px]">
                    <thead class="bg-neutral-900 text-[10px] text-gray-500 uppercase border-b border-neutral-800">
                        <tr>
                            <th class="px-4 py-3">No. Transaksi</th>
                            <th class="px-4 py-3">Tanggal</th>
                            <th class="px-4 py-3">Customer</th>
                            <th class="px-4 py-3">Item</th>
                            <th class="px-4 py-3">Pembayaran</th>
                            <th class="px-4 py-3 text-right">Total</th>
                        </tr>
                    </thead>
                    <tbody id="report-table-body" class="divide-y divide-neutral-800"></tbody>
                </table>
            </div>
            <div id="report-empty" class="hidden text-center py-12 text-gray-500 text-sm">Belum ada transaksi pada periode/filter ini.</div>
        </div>

        <div class="bg-brandGray border border-neutral-800 rounded-xl overflow-hidden h-fit">
            <div class="p-4 border-b border-neutral-800">
                <h3 class="font-bold text-white">Produk Terlaris</h3>
                <p class="text-[11px] text-gray-500 mt-1">Berdasarkan jumlah terjual.</p>
            </div>
            <div id="report-best-products" class="p-4 space-y-3"></div>
        </div>
    </div>
</section>
        
<section id="menu-user" class="menu-content hidden">
    <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
            <h2 class="text-2xl font-bold text-white">Manajemen User</h2>
            <p class="text-xs text-gray-500 mt-1">Kelola akun pengguna internal SANDIKALE PROJECT.</p>
        </div>
        <button type="button" onclick="openUserModal()" class="bg-brandRed hover:bg-red-700 text-white px-4 py-2.5 rounded-lg text-sm font-semibold">
            <i class="fa-solid fa-plus mr-2"></i>Tambah User
        </button>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
        <div class="bg-brandGray border border-neutral-800 rounded-xl p-4">
            <p class="text-xs text-gray-500">Total User</p>
            <p id="user-stat-total" class="text-2xl font-bold text-white mt-1">0</p>
        </div>
        <div class="bg-brandGray border border-neutral-800 rounded-xl p-4">
            <p class="text-xs text-gray-500">User Aktif</p>
            <p id="user-stat-active" class="text-2xl font-bold text-green-400 mt-1">0</p>
        </div>
        <div class="bg-brandGray border border-neutral-800 rounded-xl p-4">
            <p class="text-xs text-gray-500">Admin</p>
            <p id="user-stat-admin" class="text-2xl font-bold text-brandRed mt-1">0</p>
        </div>
    </div>

    <div class="bg-brandGray border border-neutral-800 rounded-xl overflow-hidden">
        <div class="p-4 border-b border-neutral-800 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div>
                <h3 class="font-bold text-white">Daftar User</h3>
                <p class="text-[11px] text-gray-500 mt-1">Akun internal yang dapat digunakan untuk pengelolaan POS.</p>
            </div>
            <div class="relative w-full md:w-72">
                <i class="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 text-xs"></i>
                <input id="user-search" oninput="renderUsers()" type="text" placeholder="Cari nama / username..."
                    class="w-full bg-neutral-900 border border-neutral-800 rounded-lg pl-9 pr-3 py-2.5 text-xs text-white outline-none focus:border-brandRed">
            </div>
        </div>

        <div class="overflow-x-auto">
            <table class="w-full text-left">
                <thead class="bg-neutral-900 text-[11px] text-gray-500 uppercase">
                    <tr>
                        <th class="px-4 py-3">User</th>
                        <th class="px-4 py-3">Username</th>
                        <th class="px-4 py-3">Role</th>
                        <th class="px-4 py-3">Status</th>
                        <th class="px-4 py-3">Dibuat</th>
                        <th class="px-4 py-3 text-right">Aksi</th>
                    </tr>
                </thead>
                <tbody id="user-table-body" class="divide-y divide-neutral-800"></tbody>
            </table>
        </div>
        <div id="user-empty" class="hidden text-center py-12 text-gray-500 text-sm">Belum ada user yang sesuai.</div>
    </div>
</section>


    </main>


    <!-- MODAL KATEGORI -->
        <div id="category-modal" style="display: none;" class="fixed inset-0 bg-black/80 items-center justify-center z-50">
            <div class="bg-brandGray border border-neutral-800 p-6 rounded-xl w-full max-w-md shadow-2xl relative">
                <div class="flex justify-between items-center mb-4 border-b border-neutral-800 pb-3">
                    <div>
                        <h3 id="category-modal-title" class="font-bold text-lg text-white">Tambah Kategori</h3>
                        <p class="text-xs text-gray-500 mt-1">Kategori akan langsung tersedia saat menambah produk.</p>
                    </div>
                    <button type="button" onclick="closeCategoryModal()" class="text-gray-400 hover:text-white"><i class="fa-solid fa-xmark text-lg"></i></button>
                </div>

                <form id="category-form" onsubmit="saveCategory(event)" class="space-y-4">
                    <input type="hidden" id="category-edit-id">
                    <div>
                        <label class="block text-xs text-gray-400 mb-1">Nama Kategori</label>
                        <input type="text" id="category-name" required maxlength="50" placeholder="Contoh: Apparel" class="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-brandRed">
                    </div>
                    <div>
                        <label class="block text-xs text-gray-400 mb-1">Ikon</label>
                        <select id="category-icon" class="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-brandRed">
                            <option value="fa-box">Kotak</option>
                            <option value="fa-shirt">Kaos / Apparel</option>
                            <option value="fa-bag-shopping">Tas</option>
                            <option value="fa-tags">Tag</option>
                            <option value="fa-star">Aksesoris</option>
                            <option value="fa-print">Printing</option>
                            <option value="fa-mug-hot">Mug</option>
                        </select>
                    </div>
                    <div class="pt-2 flex justify-end gap-2">
                        <button type="button" onclick="closeCategoryModal()" class="px-4 py-2 bg-neutral-800 text-xs font-semibold text-gray-300 rounded-lg hover:bg-neutral-700">Batal</button>
                        <button type="submit" class="px-4 py-2 bg-brandRed text-xs font-semibold text-white rounded-lg hover:bg-red-700"><i class="fa-solid fa-floppy-disk mr-1"></i> Simpan Kategori</button>
                    </div>
                </form>
            </div>
        </div>

    <!-- MODAL USER -->
    <div id="user-modal" style="display:none;" class="fixed inset-0 bg-black/80 items-center justify-center z-50 p-4">
        <div class="bg-brandGray border border-neutral-800 p-6 rounded-xl w-full max-w-lg shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div class="flex justify-between items-center mb-5 border-b border-neutral-800 pb-3">
                <div>
                    <h3 id="user-modal-title" class="font-bold text-lg text-white">Tambah User</h3>
                    <p class="text-xs text-gray-500 mt-1">Buat atau ubah akun internal SANDIKALE.</p>
                </div>
                <button type="button" onclick="closeUserModal()" class="text-gray-400 hover:text-white">
                    <i class="fa-solid fa-xmark text-lg"></i>
                </button>
            </div>

            <form id="user-form" onsubmit="saveUser(event)" class="space-y-4">
                <input type="hidden" id="user-id">

                <div>
                    <label class="block text-xs text-gray-400 mb-1">Nama Lengkap <span class="text-brandRed">*</span></label>
                    <input id="user-name" required type="text" placeholder="Contoh: Sandi"
                        class="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2.5 text-sm text-white outline-none focus:border-brandRed">
                </div>

                <div>
                    <label class="block text-xs text-gray-400 mb-1">Username <span class="text-brandRed">*</span></label>
                    <input id="user-username" required type="text" placeholder="Contoh: admin"
                        class="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2.5 text-sm text-white outline-none focus:border-brandRed">
                </div>

                <div>
                    <label class="block text-xs text-gray-400 mb-1">Password <span id="user-password-required" class="text-brandRed">*</span></label>
                    <input id="user-password" type="password" placeholder="Minimal 6 karakter"
                        class="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2.5 text-sm text-white outline-none focus:border-brandRed">
                    <p id="user-password-help" class="text-[10px] text-gray-600 mt-1">Untuk keamanan, password tidak ditampilkan saat diedit.</p>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-xs text-gray-400 mb-1">Role</label>
                        <select id="user-role" class="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2.5 text-sm text-white outline-none focus:border-brandRed">
                            <option value="Admin">Admin</option>
                            <option value="Kasir">Kasir</option>
                            <option value="Produksi">Produksi</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-xs text-gray-400 mb-1">Status</label>
                        <select id="user-status" class="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2.5 text-sm text-white outline-none focus:border-brandRed">
                            <option value="Aktif">Aktif</option>
                            <option value="Nonaktif">Nonaktif</option>
                        </select>
                    </div>
                </div>

                <div class="pt-2 flex justify-end gap-2">
                    <button type="button" onclick="closeUserModal()" class="px-4 py-2.5 bg-neutral-800 text-xs font-semibold text-gray-300 rounded-lg hover:bg-neutral-700">Batal</button>
                    <button type="submit" class="px-4 py-2.5 bg-brandRed text-xs font-semibold text-white rounded-lg hover:bg-red-700">Simpan User</button>
                </div>
            </form>
        </div>
    </div>

    <!-- MODAL CUSTOMER -->
    <div id="customer-modal" style="display: none;" class="fixed inset-0 bg-black/80 items-center justify-center z-50 p-4">
        <div class="bg-brandGray border border-neutral-800 p-6 rounded-xl w-full max-w-lg shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div class="flex justify-between items-center mb-5 border-b border-neutral-800 pb-3">
                <div>
                    <h3 id="customer-modal-title" class="font-bold text-lg text-white">Tambah Customer</h3>
                    <p class="text-xs text-gray-500 mt-1">Simpan informasi pelanggan untuk transaksi berikutnya.</p>
                </div>
                <button type="button" onclick="closeCustomerModal()" class="text-gray-400 hover:text-white"><i class="fa-solid fa-xmark text-lg"></i></button>
            </div>

            <form id="customer-form" onsubmit="saveCustomer(event)" class="space-y-4">
                <input type="hidden" id="customer-id">
                <div>
                    <label class="block text-xs text-gray-400 mb-1">Nama Lengkap <span class="text-red-500">*</span></label>
                    <input type="text" id="customer-name" required placeholder="Contoh: Hairi Habibullah" class="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-brandRed">
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-xs text-gray-400 mb-1">Nomor WhatsApp <span class="text-red-500">*</span></label>
                        <input type="tel" id="customer-phone" required placeholder="08xxxxxxxxxx" class="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-brandRed">
                    </div>
                    <div>
                        <label class="block text-xs text-gray-400 mb-1">Email</label>
                        <input type="email" id="customer-email" placeholder="customer@email.com" class="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-brandRed">
                    </div>
                </div>
                <div>
                    <label class="block text-xs text-gray-400 mb-1">Alamat</label>
                    <textarea id="customer-address" rows="3" placeholder="Alamat lengkap customer" class="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-brandRed"></textarea>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-xs text-gray-400 mb-1">Status</label>
                        <select id="customer-status" class="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-brandRed">
                            <option value="Aktif">Aktif</option>
                            <option value="Nonaktif">Nonaktif</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-xs text-gray-400 mb-1">Catatan</label>
                        <input type="text" id="customer-note" placeholder="Contoh: pelanggan tetap" class="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-brandRed">
                    </div>
                </div>
                <div class="pt-2 flex justify-end gap-2">
                    <button type="button" onclick="closeCustomerModal()" class="px-4 py-2 bg-neutral-800 text-xs font-semibold text-gray-300 rounded-lg hover:bg-neutral-700">Batal</button>
                    <button type="submit" class="px-4 py-2 bg-brandRed text-xs font-semibold text-white rounded-lg hover:bg-red-700"><i class="fa-solid fa-floppy-disk mr-1"></i> Simpan Customer</button>
                </div>
            </form>
        </div>
    </div>

    <!-- POP-UP MODAL -->
    <!-- MODAL PEMBAYARAN KASIR -->
    <div id="payment-modal" style="display: none;" class="fixed inset-0 bg-black/80 items-center justify-center z-[60] p-4">
        <div class="bg-brandGray border border-neutral-800 rounded-xl w-full max-w-md shadow-2xl">
            <div class="flex justify-between items-center p-5 border-b border-neutral-800">
                <div>
                    <h3 class="font-bold text-lg text-white">Proses Pembayaran</h3>
                    <p id="payment-order-number" class="text-[10px] text-gray-500 mt-1"></p>
                </div>
                <button type="button" onclick="closePaymentModal()" class="text-gray-400 hover:text-white"><i class="fa-solid fa-xmark text-lg"></i></button>
            </div>
            <form id="payment-form" onsubmit="completePayment(event)" class="p-5 space-y-4">
                <div class="bg-neutral-900 rounded-lg p-4">
                    <div class="flex justify-between text-sm"><span class="text-gray-400">Customer</span><span id="payment-customer-name" class="text-white font-semibold">Customer Umum</span></div>
                    <div class="flex justify-between text-xs mt-3"><span class="text-gray-500">Subtotal</span><span id="payment-subtotal" class="text-gray-300">Rp 0</span></div>
                    <div class="flex justify-between text-xs mt-1"><span class="text-gray-500">Diskon Reseller</span><span id="payment-discount" class="text-green-400">Rp 0</span></div>
                    <div class="flex justify-between text-lg font-bold mt-2"><span>Total</span><span id="payment-total" class="text-brandRed">Rp 0</span></div>
                </div>
                <div>
                    <label class="block text-xs text-gray-400 mb-1">Metode Pembayaran</label>
                    <select id="payment-method" onchange="toggleCashPayment()" class="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-brandRed">
                        <option value="Cash">Cash</option>
                        <option value="Transfer">Transfer</option>
                        <option value="QRIS">QRIS</option>
                    </select>
                </div>
                <div id="cash-payment-fields">
                    <label class="block text-xs text-gray-400 mb-1">Uang Diterima</label>
                    <input id="cash-received" type="number" min="0" placeholder="0" oninput="calculateChange()" class="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-brandRed">
                    <div class="flex justify-between mt-2 text-xs"><span class="text-gray-500">Kembalian</span><span id="cash-change" class="font-bold text-green-400">Rp 0</span></div>
                </div>
                <div class="flex gap-2 pt-2">
                    <button type="button" onclick="closePaymentModal()" class="flex-1 px-4 py-2.5 bg-neutral-800 text-xs font-semibold text-gray-300 rounded-lg hover:bg-neutral-700">Batal</button>
                    <button type="submit" class="flex-1 px-4 py-2.5 bg-brandRed text-xs font-semibold text-white rounded-lg hover:bg-red-700"><i class="fa-solid fa-check mr-1"></i> Selesaikan Transaksi</button>
                </div>
            </form>
        </div>
    </div>

    <div id="product-modal" style="display: none;" class="fixed inset-0 bg-black/80 items-center justify-center z-50">
        <div class="bg-brandGray border border-neutral-800 p-6 rounded-xl w-full max-w-md shadow-2xl relative">
            <div class="flex justify-between items-center mb-4 border-b border-neutral-800 pb-3">
                <h3 class="font-bold text-lg text-white">Tambah Produk Baru</h3>
                <button type="button" onclick="closeProductModal()" class="text-gray-400 hover:text-white"><i class="fa-solid fa-xmark text-lg"></i></button>
            </div>
            
            <form id="add-product-form" onsubmit="saveProduct(event)" class="space-y-4">
                <div>
                    <label class="block text-xs text-gray-400 mb-1">Nama Produk</label>
                    <input type="text" id="p-name" required placeholder="Contoh: Totebag Canvas Black" class="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-brandRed">
                </div>
                <div>
                    <label class="block text-xs text-gray-400 mb-1">Kategori</label>
                    <select id="p-category" class="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-brandRed">
                        <option value="Apparel">Apparel</option>
                        <option value="Bag">Bag</option>
                        <option value="Accessories">Accessories</option>
                    </select>
                </div>
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block text-xs text-gray-400 mb-1">Harga (Rp)</label>
                        <input type="number" id="p-price" required placeholder="50000" class="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-brandRed">
                    </div>
                    <div>
                        <label class="block text-xs text-gray-400 mb-1">Stok Awal</label>
                        <input type="number" id="p-stock" required placeholder="10" class="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-brandRed">
                    </div>
                </div>
                <div class="pt-2 flex justify-end gap-2">
                    <button type="button" onclick="closeProductModal()" class="px-4 py-2 bg-neutral-800 text-xs font-semibold text-gray-300 rounded-lg hover:bg-neutral-700">Batal</button>
                    <button type="submit" class="px-4 py-2 bg-brandRed text-xs font-semibold text-white rounded-lg hover:bg-red-700">Simpan Produk</button>
                </div>
            </form>
        </div>
    </div>

    <!-- SCRIPT UTAMA LANGSUNG DI DALAM HTML (MENGHINDARI PROBLEM PATH FILE) -->
    <script>
        const defaultProducts = [
            { id: 1, name: "T-Shirt Oversize Sandikale", category: "Apparel", price: 135000, stock: 25, icon: "fa-shirt" },
            { id: 2, name: "Totebag Canvas Black", category: "Bag", price: 65000, stock: 40, icon: "fa-bag-shopping" },
            { id: 3, name: "Keychain Akrilik Event", category: "Accessories", price: 15000, stock: 100, icon: "fa-key" },
            { id: 4, name: "Lanyard Custom Printed", category: "Accessories", price: 25000, stock: 60, icon: "fa-id-badge" },
            { id: 5, name: "Mug Keramik Sandikale", category: "Accessories", price: 45000, stock: 18, icon: "fa-mug-hot" },
            { id: 6, name: "Sticker Pack Vinyl (Isi 5)", category: "Accessories", price: 20000, stock: 80, icon: "fa-note-sticky" }
        ];
        let products = JSON.parse(localStorage.getItem('sandikale_products')) || defaultProducts;

        const CATEGORY_STORAGE_KEY = 'sandikale_kategori';
        const defaultCategories = [
            { id: 1, name: 'Apparel', icon: 'fa-shirt', active: true },
            { id: 2, name: 'Bag', icon: 'fa-bag-shopping', active: true },
            { id: 3, name: 'Accessories', icon: 'fa-star', active: true }
        ];
        let categories = loadCategories();
        let categoryEditId = null;


        let customers = JSON.parse(localStorage.getItem('sandikale_customers')) || [
            {
                id: 1,
                name: "Customer Umum",
                phone: "080000000000",
                email: "",
                address: "",
                status: "Aktif",
                note: "Data contoh - boleh diubah atau dihapus"
            }
        ];
        let editingCustomerId = null;
        let cart = [];
        let activeCategory = 'All';
        let selectedKasirCustomerId = null;
        let pendingPaymentTotal = 0;

        // USER / AUTH: cloud Supabase jika konfigurasi tersedia, localStorage sebagai fallback.
        let users = JSON.parse(localStorage.getItem('sandikale_users')) || [
            {
                id: 1,
                name: "Administrator",
                username: "admin",
                password: "admin123",
                role: "Admin",
                status: "Aktif",
                createdAt: new Date().toISOString()
            }
        ];
        let editingUserId = null;

        const SANDIKALE_CLOUD_ENABLED = Boolean(
            window.SANDIKALE_SUPABASE_URL && window.SANDIKALE_SUPABASE_KEY && window.supabase?.createClient
        );
        const supabaseClient = SANDIKALE_CLOUD_ENABLED
            ? window.supabase.createClient(window.SANDIKALE_SUPABASE_URL, window.SANDIKALE_SUPABASE_KEY, {
                auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true }
            })
            : null;
        const SANDIKALE_USER_EMAIL_SUFFIX = '@users.sandikale.local';

        let currentUser = null;
        let lastCompletedTransaction = null;
        let resellerDiscountPercent = 0;

        function userToLocalShape(row) {
            return {
                id: row.id,
                name: row.name || '',
                username: row.username || '',
                role: row.role || 'Kasir',
                status: row.status || 'Aktif',
                createdAt: row.created_at || row.createdAt || new Date().toISOString()
            };
        }

        function getUserEmail(username) {
            return `${String(username).trim().toLowerCase()}${SANDIKALE_USER_EMAIL_SUFFIX}`;
        }

        async function callUserAdmin(action, payload = {}) {
            if (!supabaseClient) throw new Error('Cloud user belum dikonfigurasi.');
            const { data, error } = await supabaseClient.functions.invoke('user-admin', {
                body: { action, ...payload }
            });
            if (error) throw error;
            if (!data?.ok) throw new Error(data?.error || 'Operasi user gagal.');
            return data;
        }

        async function loadCurrentCloudUser() {
            if (!supabaseClient) return null;
            const { data: { session } } = await supabaseClient.auth.getSession();
            if (!session?.user) return null;
            const { data, error } = await supabaseClient
                .from('sandikale_users')
                .select('id,name,username,role,status,created_at')
                .eq('id', session.user.id)
                .single();
            if (error || !data || data.status !== 'Aktif') {
                await supabaseClient.auth.signOut();
                return null;
            }
            return userToLocalShape(data);
        }

        async function refreshUsersFromCloud() {
            if (!supabaseClient || currentUser?.role !== 'Admin') return;
            try {
                const data = await callUserAdmin('list');
                users = (data.users || []).map(userToLocalShape);
                renderUsers();
            } catch (error) {
                console.error(error);
                alert(error.message || 'Gagal memuat user cloud.');
            }
        }

        // =========================
        // LOGIN / LOGOUT / SWITCH USER
        // =========================
        function getActiveSession() {
            if (SANDIKALE_CLOUD_ENABLED) return null;
            try {
                const saved = JSON.parse(sessionStorage.getItem('sandikale_session') || 'null');
                if (!saved || !saved.userId) return null;
                return users.find(u => String(u.id) === String(saved.userId) && u.status === 'Aktif') || null;
            } catch (error) {
                return null;
            }
        }

        function updateCurrentUserUI() {
            const nameEl = document.getElementById('current-user-name');
            const roleEl = document.getElementById('current-user-role');
            const avatarEl = document.getElementById('current-user-avatar');
            if (!currentUser) return;
            if (nameEl) nameEl.textContent = currentUser.name;
            if (roleEl) roleEl.textContent = currentUser.role;
            if (avatarEl) avatarEl.textContent = (currentUser.name || 'U').charAt(0).toUpperCase();
            applyRoleAccess();
        }

        function showLoginScreen() {
            const screen = document.getElementById('login-screen');
            if (screen) screen.style.display = 'flex';
            const username = document.getElementById('login-username');
            const password = document.getElementById('login-password');
            if (username) setTimeout(() => username.focus(), 100);
            if (password) password.value = '';
        }

        function hideLoginScreen() {
            const screen = document.getElementById('login-screen');
            if (screen) screen.style.display = 'none';
        }

        async function loginUser(event) {
            event.preventDefault();
            const username = document.getElementById('login-username').value.trim().toLowerCase();
            const password = document.getElementById('login-password').value;
            const error = document.getElementById('login-error');
            if (error) error.classList.add('hidden');

            try {
                if (SANDIKALE_CLOUD_ENABLED) {
                    const { data, error: authError } = await supabaseClient.auth.signInWithPassword({
                        email: getUserEmail(username),
                        password
                    });
                    if (authError) throw new Error('Username atau password salah, atau user sedang nonaktif.');
                    const { data: profile, error: profileError } = await supabaseClient
                        .from('sandikale_users')
                        .select('id,name,username,role,status,created_at')
                        .eq('id', data.user.id)
                        .single();
                    if (profileError || !profile || profile.status !== 'Aktif') {
                        await supabaseClient.auth.signOut();
                        throw new Error('User tidak aktif atau profil belum tersedia.');
                    }
                    currentUser = userToLocalShape(profile);
                    if (currentUser.role === 'Admin') await refreshUsersFromCloud();
                } else {
                    const user = users.find(u =>
                        String(u.username).toLowerCase() === username &&
                        u.password === password &&
                        u.status === 'Aktif'
                    );
                    if (!user) throw new Error('Username atau password salah, atau user sedang nonaktif.');
                    currentUser = user;
                    sessionStorage.setItem('sandikale_session', JSON.stringify({ userId: user.id, loginAt: new Date().toISOString() }));
                }
                updateCurrentUserUI();
                hideLoginScreen();
            } catch (err) {
                if (error) {
                    error.textContent = err.message || 'Login gagal.';
                    error.classList.remove('hidden');
                }
            }
        }

        async function logoutUser() {
            if (!confirm('Keluar dari akun sekarang dan kembali ke halaman login?')) return;
            if (SANDIKALE_CLOUD_ENABLED) await supabaseClient.auth.signOut();
            sessionStorage.removeItem('sandikale_session');
            currentUser = null;
            document.getElementById('login-form')?.reset();
            applyRoleAccess();
            showLoginScreen();
        }

        async function requireLogin() {
            if (SANDIKALE_CLOUD_ENABLED) {
                currentUser = await loadCurrentCloudUser();
                if (currentUser?.role === 'Admin') await refreshUsersFromCloud();
            } else {
                currentUser = getActiveSession();
            }

            if (currentUser) {
                updateCurrentUserUI();
                hideLoginScreen();
            } else {
                applyRoleAccess();
                showLoginScreen();
            }
        }

        // =========================
        // HAK AKSES ROLE
        // =========================
        const ADMIN_ONLY_MENUS = ['produk', 'kategori', 'customer', 'laporan', 'user'];
        const CASHIER_ALLOWED_MENUS = ['dashboard', 'kasir'];

        function isAdmin() {
            return currentUser?.role === 'Admin';
        }

        function canAccessMenu(menuName) {
            if (!currentUser) return false;
            if (currentUser.role === 'Admin') return true;
            if (currentUser.role === 'Kasir') return CASHIER_ALLOWED_MENUS.includes(menuName);
            return menuName === 'dashboard' || menuName === 'kasir';
        }

        function requireAdmin(message = 'Fitur ini hanya dapat diakses oleh Admin.') {
            if (isAdmin()) return true;
            alert(message);
            return false;
        }

        function applyRoleAccess() {
            const buttons = document.querySelectorAll('#sidebar-nav .menu-btn');
            buttons.forEach(button => {
                const match = (button.getAttribute('onclick') || '').match(/switchMenu\('([^']+)'/);
                const menuName = match?.[1];
                const allowed = canAccessMenu(menuName);
                button.classList.toggle('hidden', !allowed);
                button.setAttribute('aria-hidden', allowed ? 'false' : 'true');
            });

            const quickCustomerButton = document.querySelector('button[onclick="openCustomerFromKasir()"]');
            if (quickCustomerButton) quickCustomerButton.classList.toggle('hidden', !isAdmin());

            const currentMenu = document.querySelector('.menu-content:not(.hidden)')?.id?.replace('menu-', '');
            if (currentUser && currentMenu && !canAccessMenu(currentMenu)) {
                const dashboardButton = document.querySelector('#sidebar-nav .menu-btn[onclick*="switchMenu(\'dashboard\'"]');
                switchMenu('dashboard', dashboardButton);
            }
        }

        // RESPONSIVE SIDEBAR: bisa dibuka/tutup di desktop maupun Android/iPhone.
        const mobileBreakpoint = 768;

        function isMobileView() {
            return window.innerWidth < mobileBreakpoint;
        }

        function openSidebar() {
            const sidebar = document.getElementById('app-sidebar');
            const overlay = document.getElementById('sidebar-overlay');
            const button = document.getElementById('mobile-menu-button');
            if (!sidebar) return;

            if (isMobileView()) {
                sidebar.classList.remove('sidebar-collapsed');
                sidebar.classList.add('sidebar-open');
                if (overlay) {
                    overlay.classList.add('sidebar-overlay-visible');
                    overlay.classList.remove('pointer-events-none');
                }
            } else {
                sidebar.classList.remove('sidebar-collapsed');
                sidebar.classList.remove('sidebar-open');
            }

            if (button) {
                button.setAttribute('aria-expanded', 'true');
                button.setAttribute('aria-label', 'Tutup menu');
                button.innerHTML = '<i class="fa-solid fa-xmark"></i>';
            }
            document.body.classList.add('sidebar-is-open');
        }

        function closeSidebar() {
            const sidebar = document.getElementById('app-sidebar');
            const overlay = document.getElementById('sidebar-overlay');
            const button = document.getElementById('mobile-menu-button');
            if (!sidebar) return;

            if (isMobileView()) {
                sidebar.classList.remove('sidebar-open');
                sidebar.classList.add('sidebar-collapsed');
                if (overlay) {
                    overlay.classList.remove('sidebar-overlay-visible');
                    overlay.classList.add('pointer-events-none');
                }
            } else {
                sidebar.classList.remove('sidebar-open');
                sidebar.classList.add('sidebar-collapsed');
            }

            if (button) {
                button.setAttribute('aria-expanded', 'false');
                button.setAttribute('aria-label', 'Buka menu');
                button.innerHTML = '<i class="fa-solid fa-bars"></i>';
            }
            document.body.classList.remove('sidebar-is-open');
        }

        function toggleSidebar() {
            const sidebar = document.getElementById('app-sidebar');
            if (!sidebar) return;

            const isOpen = isMobileView()
                ? sidebar.classList.contains('sidebar-open')
                : !sidebar.classList.contains('sidebar-collapsed');

            if (isOpen) {
                closeSidebar();
            } else {
                openSidebar();
            }
        }

        // Swipe dari kiri untuk membuka, swipe ke kiri untuk menutup di HP.
        let touchStartX = null;
        document.addEventListener('touchstart', (event) => {
            if (!isMobileView()) return;
            touchStartX = event.changedTouches[0].clientX;
        }, { passive: true });

        document.addEventListener('touchend', (event) => {
            if (!isMobileView() || touchStartX === null) return;
            const endX = event.changedTouches[0].clientX;
            const deltaX = endX - touchStartX;
            const sidebar = document.getElementById('app-sidebar');
            if (!sidebar) return;

            if (!sidebar.classList.contains('sidebar-open') && touchStartX < 30 && deltaX > 70) {
                openSidebar();
            } else if (sidebar.classList.contains('sidebar-open') && deltaX < -70) {
                closeSidebar();
            }

            touchStartX = null;
        }, { passive: true });

        window.addEventListener('resize', () => {
            const sidebar = document.getElementById('app-sidebar');
            if (!sidebar) return;

            // Saat berpindah dari HP ke desktop, buka sidebar otomatis.
            if (!isMobileView()) {
                sidebar.classList.remove('sidebar-open', 'sidebar-collapsed');
                const overlay = document.getElementById('sidebar-overlay');
                if (overlay) {
                    overlay.classList.remove('sidebar-overlay-visible');
                    overlay.classList.add('pointer-events-none');
                }
            }
        });

        // Tombol ESC menutup sidebar.
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                const sidebar = document.getElementById('app-sidebar');
                if (!sidebar) return;
                const isOpen = isMobileView()
                    ? sidebar.classList.contains('sidebar-open')
                    : !sidebar.classList.contains('sidebar-collapsed');
                if (isOpen) closeSidebar();
            }
        });

        // FUNGSI UTAMA PERPINDAHAN MENU + PENGAMANAN ROLE
        function switchMenu(menuName, element) {
            if (!canAccessMenu(menuName)) {
                if (currentUser) alert('Menu ini hanya dapat diakses oleh Admin.');
                return;
            }

            const allMenus = document.querySelectorAll('.menu-content');
            allMenus.forEach(menu => menu.classList.add('hidden'));

            const targetMenu = document.getElementById('menu-' + menuName);
            if (targetMenu) targetMenu.classList.remove('hidden');

            const allButtons = document.querySelectorAll('.menu-btn');
            allButtons.forEach(btn => {
                btn.classList.remove('bg-brandRed', 'text-white');
                btn.classList.add('text-gray-300');
            });

            if (element) {
                element.classList.add('bg-brandRed', 'text-white');
                element.classList.remove('text-gray-300');
            }

            if (menuName === 'produk') renderProductTable();
            if (menuName === 'kasir') { renderCategoryFilters(); renderProducts(); renderKasirCustomers(); }
            if (menuName === 'customer') renderCustomers();
            if (menuName === 'laporan') { setReportPreset('today', false); renderReport(); }
            if (menuName === 'kategori') { renderCategoryManagement(); renderCategoryOptions(); }
            if (menuName === 'user') renderUsers();

            if (isMobileView()) closeSidebar();
        }

        function renderCategoryFilters() {
            const container = document.getElementById('category-filter');
            if (!container) return;

            const activeCategories = categories.filter(c => c.active !== false);
            const all = ['All', ...activeCategories.map(c => c.name)];
            container.innerHTML = all.map(category => {
                const active = activeCategory === category;
                const label = category === 'All' ? 'Semua' : category;
                return `<button type="button" onclick="filterCategory(${JSON.stringify(category)})"
                    class="px-4 py-1.5 ${active ? 'bg-brandRed text-white' : 'bg-brandGray text-gray-400 hover:bg-neutral-800'} text-xs rounded-full font-medium whitespace-nowrap">
                    ${escapeHtml(label)}
                </button>`;
            }).join('');
        }

        function renderCategoryFilter() {
            renderCategoryFilters();
        }

        function saveProductsToStorage() {
            localStorage.setItem('sandikale_products', JSON.stringify(products));
        }

        function renderProducts() {
            const listContainer = document.getElementById('product-list');
            if (!listContainer) return;

            const searchElem = document.getElementById('search-product');
            const searchInput = searchElem ? searchElem.value.toLowerCase() : '';

            listContainer.innerHTML = '';

            const filtered = products.filter(p => {
                const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
                const matchesSearch = p.name.toLowerCase().includes(searchInput);
                return matchesCategory && matchesSearch;
            });

            if (filtered.length === 0) {
                listContainer.innerHTML = `<p class="text-xs text-gray-500 col-span-3 py-8 text-center">Produk tidak ditemukan.</p>`;
                return;
            }

            filtered.forEach(product => {
                listContainer.innerHTML += `
                    <div onclick="addToCart(${product.id})" class="bg-brandGray border border-neutral-800 p-4 rounded-xl cursor-pointer hover:border-brandRed transition flex flex-col justify-between">
                        <div>
                            <div class="w-10 h-10 bg-neutral-800 text-brandRed rounded-lg flex items-center justify-center mb-3 text-lg">
                                <i class="fa-solid ${product.icon}"></i>
                            </div>
                            <h4 class="font-bold text-sm text-white mb-1 line-clamp-1">${product.name}</h4>
                            <p class="text-xs text-gray-400 mb-2">Stok: ${product.stock}</p>
                        </div>
                        <div class="text-brandRed font-bold text-sm">
                            Rp ${product.price.toLocaleString('id-ID')}
                        </div>
                    </div>
                `;
            });
        }

        function filterCategory(category) {
            activeCategory = category;
            renderCategoryFilters();
            renderProducts();
        }

        function addToCart(productId) {
            const product = products.find(p => p.id === productId);
            const cartItem = cart.find(item => item.id === productId);

            if (cartItem) {
                if (cartItem.qty < product.stock) {
                    cartItem.qty += 1;
                } else {
                    alert("Stok tidak mencukupi!");
                }
            } else {
                cart.push({ ...product, qty: 1 });
            }
            updateCartUI();
        }

        function updateQty(productId, amount) {
            const cartItem = cart.find(item => item.id === productId);
            if (cartItem) {
                const product = products.find(p => p.id === productId);
                const nextQty = cartItem.qty + amount;
                if (nextQty <= 0) {
                    cart = cart.filter(item => item.id !== productId);
                } else if (product && nextQty <= product.stock) {
                    cartItem.qty = nextQty;
                } else {
                    alert('Jumlah melebihi stok yang tersedia.');
                }
            }
            updateCartUI();
        }

        function clearCart() {
            cart = [];
            const type = document.getElementById('kasir-price-type');
            const discount = document.getElementById('reseller-discount');
            if (type) type.value = 'Retail';
            if (discount) {
                discount.value = 0;
                discount.disabled = true;
            }
            resellerDiscountPercent = 0;
            updateCartUI();
        }

        function getCartSubtotal() {
            return cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
        }

        function getResellerDiscountPercent() {
            const type = document.getElementById('kasir-price-type')?.value || 'Retail';
            if (type !== 'Reseller') return 0;
            const input = parseFloat(document.getElementById('reseller-discount')?.value || 0);
            return Math.min(Math.max(input, 0), 100);
        }

        function getCartDiscountAmount() {
            return Math.round(getCartSubtotal() * getResellerDiscountPercent() / 100);
        }

        function toggleResellerDiscount() {
            const type = document.getElementById('kasir-price-type')?.value || 'Retail';
            const input = document.getElementById('reseller-discount');
            if (!input) return;
            input.disabled = type !== 'Reseller';
            if (type !== 'Reseller') input.value = 0;
            resellerDiscountPercent = getResellerDiscountPercent();
            updateCartUI();
        }

        function updateCartUI() {
            const cartContainer = document.getElementById('cart-list');
            if (!cartContainer) return;

            cartContainer.innerHTML = '';

            const subtotal = getCartSubtotal();
            const discountPercent = getResellerDiscountPercent();
            const discountAmount = Math.round(subtotal * discountPercent / 100);
            const total = Math.max(subtotal - discountAmount, 0);
            resellerDiscountPercent = discountPercent;

            if (cart.length === 0) {
                cartContainer.innerHTML = `<p class="text-xs text-gray-500 text-center py-8">Keranjang belanja masih kosong.</p>`;
            } else {
                cart.forEach(item => {
                    const itemTotal = item.price * item.qty;
                    cartContainer.innerHTML += `
                        <div class="flex items-center justify-between bg-neutral-900 p-2.5 rounded-lg border border-neutral-800">
                            <div class="flex-1">
                                <h5 class="text-xs font-bold text-white">${escapeHtml(item.name)}</h5>
                                <p class="text-[11px] text-gray-400">Rp ${item.price.toLocaleString('id-ID')} × ${item.qty} = Rp ${itemTotal.toLocaleString('id-ID')}</p>
                            </div>
                            <div class="flex items-center gap-2">
                                <button onclick="updateQty(${item.id}, -1)" class="w-6 h-6 bg-neutral-800 text-xs text-white rounded hover:bg-brandRed">-</button>
                                <span class="text-xs font-bold px-1">${item.qty}</span>
                                <button onclick="updateQty(${item.id}, 1)" class="w-6 h-6 bg-neutral-800 text-xs text-white rounded hover:bg-brandRed">+</button>
                            </div>
                        </div>
                    `;
                });
            }

            document.getElementById('subtotal-val').innerText = `Rp ${subtotal.toLocaleString('id-ID')}`;
            document.getElementById('discount-val').innerText = discountAmount > 0
                ? `- Rp ${discountAmount.toLocaleString('id-ID')} (${discountPercent}%)`
                : 'Rp 0';
            document.getElementById('total-val').innerText = `Rp ${total.toLocaleString('id-ID')}`;
        }


        function processPayment() {
            if (cart.length === 0) {
                alert("Keranjang masih kosong!");
                return;
            }

            const customer = customers.find(c => c.id === selectedKasirCustomerId);
            const subtotal = getCartSubtotal();
            const discountPercent = getResellerDiscountPercent();
            const discountAmount = Math.round(subtotal * discountPercent / 100);
            pendingPaymentTotal = Math.max(subtotal - discountAmount, 0);

            document.getElementById('payment-subtotal').innerText = `Rp ${subtotal.toLocaleString('id-ID')}`;
            document.getElementById('payment-discount').innerText = discountAmount > 0
                ? `- Rp ${discountAmount.toLocaleString('id-ID')} (${discountPercent}%)`
                : 'Rp 0';
            document.getElementById('payment-total').innerText = `Rp ${pendingPaymentTotal.toLocaleString('id-ID')}`;
            document.getElementById('payment-customer-name').innerText = customer ? customer.name : 'Customer Umum';
            document.getElementById('payment-order-number').innerText = `Order: ${generateOrderNumber()}`;
            document.getElementById('payment-form').reset();
            document.getElementById('payment-method').value = 'Cash';
            toggleCashPayment();
            document.getElementById('payment-modal').style.display = 'flex';
            setTimeout(() => document.getElementById('cash-received').focus(), 50);
        }


        function generateOrderNumber() {
            const d = new Date();
            const date = `${d.getFullYear()}${String(d.getMonth()+1).padStart(2,'0')}${String(d.getDate()).padStart(2,'0')}`;
            const seq = JSON.parse(localStorage.getItem('sandikale_transactions') || '[]').length + 1;
            return `SDK-${date}-${String(seq).padStart(4,'0')}`;
        }

        function closePaymentModal() {
            document.getElementById('payment-modal').style.display = 'none';
        }

        function toggleCashPayment() {
            const method = document.getElementById('payment-method').value;
            const fields = document.getElementById('cash-payment-fields');
            fields.style.display = method === 'Cash' ? 'block' : 'none';
            if (method !== 'Cash') document.getElementById('cash-received').value = '';
            calculateChange();
        }

        function calculateChange() {
            const received = parseInt(document.getElementById('cash-received').value || 0);
            const change = Math.max(received - pendingPaymentTotal, 0);
            document.getElementById('cash-change').innerText = `Rp ${change.toLocaleString('id-ID')}`;
        }

        function completePayment(event) {
            event.preventDefault();

            const method = document.getElementById('payment-method').value;
            const received = parseInt(document.getElementById('cash-received').value || 0);
            if (method === 'Cash' && received < pendingPaymentTotal) {
                alert('Uang diterima masih kurang dari total transaksi.');
                return;
            }

            const orderNumber = document.getElementById('payment-order-number').innerText.replace('Order: ', '');
            const customer = customers.find(c => c.id === selectedKasirCustomerId);
            const subtotal = getCartSubtotal();
            const discountPercent = getResellerDiscountPercent();
            const discountAmount = Math.round(subtotal * discountPercent / 100);

            const transaction = {
                id: Date.now(),
                orderNumber,
                date: new Date().toISOString(),
                cashierId: currentUser ? currentUser.id : null,
                cashierName: currentUser ? currentUser.name : 'Administrator',
                customerId: customer ? customer.id : null,
                customerName: customer ? customer.name : 'Customer Umum',
                customerPhone: customer ? customer.phone : '',
                priceType: discountPercent > 0 ? 'Reseller' : 'Retail',
                discountPercent,
                discountAmount,
                subtotal,
                items: cart.map(item => ({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    qty: item.qty,
                    subtotal: item.price * item.qty
                })),
                total: pendingPaymentTotal,
                paymentMethod: method,
                cashReceived: method === 'Cash' ? received : pendingPaymentTotal,
                change: method === 'Cash' ? received - pendingPaymentTotal : 0
            };

            products = products.map(product => {
                const sold = cart.find(item => item.id === product.id);
                return sold ? { ...product, stock: product.stock - sold.qty } : product;
            });
            saveProductsToStorage();

            const transactions = JSON.parse(localStorage.getItem('sandikale_transactions') || '[]');
            transactions.push(transaction);
            localStorage.setItem('sandikale_transactions', JSON.stringify(transactions));
            lastCompletedTransaction = transaction;

            closePaymentModal();
            clearCart();
            renderProducts();
            renderProductTable();

            printReceipt(transaction);
            alert(`Transaksi ${orderNumber} berhasil disimpan.\n\nCustomer: ${transaction.customerName}\nTotal: Rp ${transaction.total.toLocaleString('id-ID')}`);
        }

        function printLastReceipt() {
            if (!lastCompletedTransaction) {
                const transactions = JSON.parse(localStorage.getItem('sandikale_transactions') || '[]');
                lastCompletedTransaction = transactions.length ? transactions[transactions.length - 1] : null;
            }

            if (!lastCompletedTransaction) {
                alert('Belum ada transaksi yang bisa dicetak.');
                return;
            }
            printReceipt(lastCompletedTransaction);
        }

        function printReceipt(transaction) {
            const popup = window.open('', '_blank', 'width=420,height=700');
            if (!popup) {
                alert('Popup cetak diblokir browser. Izinkan pop-up untuk website SANDIKALE lalu klik Cetak Nota lagi.');
                return;
            }

            const itemsHtml = (transaction.items || []).map(item => `
                <tr>
                    <td style="padding:5px 0;">${escapeHtml(item.name)}</td>
                    <td style="padding:5px 0;text-align:center;">${item.qty}</td>
                    <td style="padding:5px 0;text-align:right;">Rp ${(item.subtotal || 0).toLocaleString('id-ID')}</td>
                </tr>
            `).join('');

            const discountHtml = transaction.discountAmount > 0
                ? `<div class="row"><span>Diskon Reseller (${transaction.discountPercent}%)</span><span>- Rp ${transaction.discountAmount.toLocaleString('id-ID')}</span></div>`
                : '';

            popup.document.write(`
                <!doctype html>
                <html>
                <head>
                    <meta charset="UTF-8">
                    <title>Nota ${escapeHtml(transaction.orderNumber)}</title>
                    <style>
                        *{box-sizing:border-box}
                        body{font-family:Arial,sans-serif;width:80mm;margin:0 auto;padding:8mm 5mm;color:#111;font-size:12px}
                        .center{text-align:center}.title{font-size:18px;font-weight:700;letter-spacing:1px}
                        .muted{color:#666;font-size:10px}.line{border-top:1px dashed #999;margin:10px 0}
                        table{width:100%;border-collapse:collapse;font-size:11px}
                        .row{display:flex;justify-content:space-between;margin:5px 0}
                        .grand{font-size:15px;font-weight:700;border-top:1px solid #111;padding-top:7px;margin-top:7px}
                        .footer{text-align:center;margin-top:15px;font-size:10px;color:#666}
                        @media print{body{width:80mm}.no-print{display:none}}
                    </style>
                </head>
                <body>
                    <div class="center">
                        <div class="title">SANDIKALE PROJECT</div>
                        <div class="muted">CUSTOM MERCHANDISE</div>
                    </div>
                    <div class="line"></div>
                    <div class="row"><span>No.</span><span>${escapeHtml(transaction.orderNumber)}</span></div>
                    <div class="row"><span>Tanggal</span><span>${new Date(transaction.date).toLocaleString('id-ID')}</span></div>
                    <div class="row"><span>Kasir</span><span>${escapeHtml(transaction.cashierName || '-')}</span></div>
                    <div class="row"><span>Customer</span><span>${escapeHtml(transaction.customerName || 'Customer Umum')}</span></div>
                    <div class="line"></div>
                    <table>
                        <thead><tr><th style="text-align:left">Item</th><th>Qty</th><th style="text-align:right">Jumlah</th></tr></thead>
                        <tbody>${itemsHtml}</tbody>
                    </table>
                    <div class="line"></div>
                    <div class="row"><span>Subtotal</span><span>Rp ${(transaction.subtotal || transaction.total || 0).toLocaleString('id-ID')}</span></div>
                    ${discountHtml}
                    <div class="row grand"><span>TOTAL</span><span>Rp ${(transaction.total || 0).toLocaleString('id-ID')}</span></div>
                    <div class="row"><span>Pembayaran</span><span>${escapeHtml(transaction.paymentMethod)}</span></div>
                    ${transaction.paymentMethod === 'Cash' ? `<div class="row"><span>Diterima</span><span>Rp ${(transaction.cashReceived || 0).toLocaleString('id-ID')}</span></div><div class="row"><span>Kembalian</span><span>Rp ${(transaction.change || 0).toLocaleString('id-ID')}</span></div>` : ''}
                    <div class="footer">Terima kasih telah berbelanja di SANDIKALE PROJECT.</div>
                    <button class="no-print" onclick="window.print()" style="width:100%;margin-top:18px;padding:10px;border:0;background:#111;color:#fff;border-radius:6px;font-weight:bold;">CETAK NOTA</button>
 
                </body>
                </html>
            `);
            popup.document.close();
        }


        function renderKasirCustomers() {
            const select = document.getElementById('kasir-customer');
            if (!select) return;
            const activeCustomers = customers.filter(c => c.status === 'Aktif');
            select.innerHTML = '<option value="">Customer Umum</option>';
            activeCustomers.forEach(customer => {
                select.innerHTML += `<option value="${customer.id}">${escapeHtml(customer.name)} - ${escapeHtml(customer.phone)}</option>`;
            });
            select.value = selectedKasirCustomerId || '';
            selectKasirCustomer();
        }

        function selectKasirCustomer() {
            const select = document.getElementById('kasir-customer');
            if (!select) return;
            selectedKasirCustomerId = select.value ? Number(select.value) : null;
            const customer = customers.find(c => c.id === selectedKasirCustomerId);
            const info = document.getElementById('kasir-customer-info');
            if (!customer) {
                info.classList.add('hidden');
                info.innerText = '';
                return;
            }
            info.classList.remove('hidden');
            info.innerText = `${customer.phone}${customer.address ? ' • ' + customer.address : ''}`;
        }

        function openCustomerFromKasir() {
            if (!requireAdmin('Kasir hanya dapat memilih customer yang sudah tersedia.')) return;
            switchMenu('customer', document.querySelector('[data-menu="customer"]'));
            openCustomerModal();
        }

        function saveCustomersToStorage() {
            localStorage.setItem('sandikale_customers', JSON.stringify(customers));
        }

        function renderCustomers() {
            const tableBody = document.getElementById('customer-table-body');
            if (!tableBody) return;

            const searchInput = document.getElementById('search-customer');
            const keyword = searchInput ? searchInput.value.trim().toLowerCase() : '';
            const filtered = customers.filter(customer => {
                return customer.name.toLowerCase().includes(keyword) ||
                    customer.phone.toLowerCase().includes(keyword) ||
                    (customer.email || '').toLowerCase().includes(keyword);
            });

            const total = customers.length;
            const active = customers.filter(c => c.status === 'Aktif').length;
            const inactive = customers.filter(c => c.status === 'Nonaktif').length;
            document.getElementById('customer-total').innerText = total;
            document.getElementById('customer-active').innerText = active;
            document.getElementById('customer-inactive').innerText = inactive;

            tableBody.innerHTML = '';
            const empty = document.getElementById('customer-empty');

            if (filtered.length === 0) {
                empty.classList.remove('hidden');
                return;
            }
            empty.classList.add('hidden');

            filtered.forEach(customer => {
                const statusClass = customer.status === 'Aktif'
                    ? 'bg-green-950/40 text-green-400 border-green-900'
                    : 'bg-red-950/40 text-red-400 border-red-900';
                const address = customer.address ? customer.address : '-';
                const email = customer.email ? customer.email : '-';
                const note = customer.note ? `<p class="text-[10px] text-gray-500 mt-1">${escapeHtml(customer.note)}</p>` : '';

                tableBody.innerHTML += `
                    <tr class="hover:bg-neutral-800/50 transition align-top">
                        <td class="px-5 py-4">
                            <div class="flex items-start gap-3">
                                <div class="w-9 h-9 rounded-full bg-neutral-800 text-brandRed flex items-center justify-center flex-shrink-0">
                                    <i class="fa-solid fa-user text-xs"></i>
                                </div>
                                <div>
                                    <p class="font-semibold text-white">${escapeHtml(customer.name)}</p>
                                    ${note}
                                </div>
                            </div>
                        </td>
                        <td class="px-5 py-4 whitespace-nowrap">${escapeHtml(customer.phone)}</td>
                        <td class="px-5 py-4">${escapeHtml(email)}</td>
                        <td class="px-5 py-4 max-w-[240px]">${escapeHtml(address)}</td>
                        <td class="px-5 py-4"><span class="text-[11px] px-2.5 py-1 rounded-full border ${statusClass}">${escapeHtml(customer.status)}</span></td>
                        <td class="px-5 py-4 text-center whitespace-nowrap">
                            <button type="button" onclick="editCustomer(${customer.id})" class="text-xs font-semibold bg-neutral-800 text-gray-200 px-3 py-1.5 rounded border border-neutral-700 hover:border-brandRed hover:text-white mr-1">
                                <i class="fa-solid fa-pen mr-1"></i>Edit
                            </button>
                            <button type="button" onclick="deleteCustomer(${customer.id})" class="text-xs font-semibold bg-red-950/30 text-red-400 px-3 py-1.5 rounded border border-red-900 hover:bg-red-900/40">
                                <i class="fa-solid fa-trash mr-1"></i>Hapus
                            </button>
                        </td>
                    </tr>
                `;
            });
        }

        function getTransactions() {
            try {
                const data = JSON.parse(localStorage.getItem('sandikale_transactions') || '[]');
                return Array.isArray(data) ? data : [];
            } catch (error) {
                console.error('Gagal membaca transaksi:', error);
                return [];
            }
        }

        function getLocalDateKey(value) {
            const d = value instanceof Date ? value : new Date(value);
            if (Number.isNaN(d.getTime())) return '';
            return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
        }



        // =========================
        // MASTER KATEGORI
        // =========================
        function loadCategories() {
            try {
                const saved = JSON.parse(localStorage.getItem(CATEGORY_STORAGE_KEY));
                if (Array.isArray(saved) && saved.length) return saved;
            } catch (error) {
                console.warn('Data kategori tidak dapat dibaca:', error);
            }
            localStorage.setItem(CATEGORY_STORAGE_KEY, JSON.stringify(defaultCategories));
            return [...defaultCategories];
        }

        function saveCategories() {
            localStorage.setItem(CATEGORY_STORAGE_KEY, JSON.stringify(categories));
        }

        function renderCategoryOptions(selectedValue = '') {
            const select = document.getElementById('p-category');
            if (!select) return;

            const activeCategories = categories.filter(c => c.active !== false);
            if (!activeCategories.length) {
                select.innerHTML = '<option value="">Belum ada kategori</option>';
                return;
            }

            select.innerHTML = '<option value="">Pilih kategori</option>' + activeCategories.map(category => `
                <option value="${escapeAttribute(category.name)}" ${category.name === selectedValue ? 'selected' : ''}>
                    ${escapeHtml(category.name)}
                </option>
            `).join('');
        }

        function renderCategoryManagement() {
            const tbody = document.getElementById('category-table-body');
            const count = document.getElementById('category-count');
            if (!tbody) return;

            const search = (document.getElementById('search-category')?.value || '').trim().toLowerCase();
            const filtered = categories.filter(category => category.name.toLowerCase().includes(search));

            if (count) count.textContent = `${categories.length} kategori`;

            if (!filtered.length) {
                tbody.innerHTML = `<tr><td colspan="5" class="px-6 py-10 text-center text-gray-500 text-sm">Kategori belum ada atau tidak ditemukan.</td></tr>`;
                return;
            }

            tbody.innerHTML = filtered.map((category, index) => {
                const productCount = products.filter(product => product.category === category.name).length;
                const statusClass = category.active !== false
                    ? 'bg-green-950/40 text-green-400 border-green-900'
                    : 'bg-neutral-800 text-gray-500 border-neutral-700';
                const statusText = category.active !== false ? 'Aktif' : 'Nonaktif';

                return `
                    <tr class="hover:bg-neutral-800/50 transition">
                        <td class="px-6 py-4 text-gray-500">${index + 1}</td>
                        <td class="px-6 py-4">
                            <div class="flex items-center gap-3">
                                <div class="w-9 h-9 bg-neutral-800 text-brandRed rounded-lg flex items-center justify-center">
                                    <i class="fa-solid ${escapeAttribute(category.icon || 'fa-box')}"></i>
                                </div>
                                <span class="font-semibold text-white">${escapeHtml(category.name)}</span>
                            </div>
                        </td>
                        <td class="px-6 py-4">${productCount} produk</td>
                        <td class="px-6 py-4"><span class="px-2.5 py-1 rounded-full border text-[11px] ${statusClass}">${statusText}</span></td>
                        <td class="px-6 py-4">
                            <div class="flex justify-center gap-2">
                                <button type="button" onclick="editCategory(${category.id})" class="px-3 py-1.5 rounded-lg bg-neutral-800 text-gray-300 hover:text-white hover:bg-neutral-700 text-xs">
                                    <i class="fa-solid fa-pen mr-1"></i> Edit
                                </button>
                                <button type="button" onclick="deleteCategory(${category.id})" class="px-3 py-1.5 rounded-lg bg-red-950/30 text-red-400 hover:bg-red-950/60 text-xs border border-red-900">
                                    <i class="fa-solid fa-trash mr-1"></i> Hapus
                                </button>
                            </div>
                        </td>
                    </tr>
                `;
            }).join('');
        }

        function openCategoryModal(id = null) {
            if (!requireAdmin()) return;
            categoryEditId = id;
            const modal = document.getElementById('category-modal');
            const title = document.getElementById('category-modal-title');
            const nameInput = document.getElementById('category-name');
            const iconInput = document.getElementById('category-icon');
            const hiddenId = document.getElementById('category-edit-id');

            if (!modal) return;

            if (id !== null) {
                const category = categories.find(item => Number(item.id) === Number(id));
                if (!category) return;
                title.textContent = 'Edit Kategori';
                nameInput.value = category.name;
                iconInput.value = category.icon || 'fa-box';
                hiddenId.value = id;
            } else {
                title.textContent = 'Tambah Kategori';
                nameInput.value = '';
                iconInput.value = 'fa-box';
                hiddenId.value = '';
            }

            modal.style.display = 'flex';
            setTimeout(() => nameInput.focus(), 50);
        }

        function closeCategoryModal() {
            const modal = document.getElementById('category-modal');
            const form = document.getElementById('category-form');
            if (modal) modal.style.display = 'none';
            if (form) form.reset();
            categoryEditId = null;
        }

        function saveCategory(event) {
            event.preventDefault();
            if (!requireAdmin()) return;

            const name = document.getElementById('category-name').value.trim();
            const icon = document.getElementById('category-icon').value || 'fa-box';

            if (!name) {
                alert('Nama kategori wajib diisi.');
                return;
            }

            const duplicate = categories.find(category =>
                category.name.toLowerCase() === name.toLowerCase() &&
                Number(category.id) !== Number(categoryEditId)
            );

            if (duplicate) {
                alert('Kategori tersebut sudah ada. Gunakan nama lain.');
                return;
            }

            if (categoryEditId !== null) {
                const category = categories.find(item => Number(item.id) === Number(categoryEditId));
                if (!category) return;

                const oldName = category.name;
                category.name = name;
                category.icon = icon;

                products.forEach(product => {
                    if (product.category === oldName) product.category = name;
                });

                saveProductsToStorage();
                alert('Kategori berhasil diperbarui.');
            } else {
                categories.push({ id: Date.now(), name, icon, active: true });
                alert('Kategori berhasil ditambahkan.');
            }

            saveCategories();
            renderCategoryManagement();
            renderCategoryOptions();
            renderCategoryFilters();
            renderProducts();
            renderProductTable();
            closeCategoryModal();
        }

        function editCategory(id) {
            if (!requireAdmin()) return;
            openCategoryModal(id);
        }

        function deleteCategory(id) {
            if (!requireAdmin()) return;
            const category = categories.find(item => Number(item.id) === Number(id));
            if (!category) return;

            const usedByProducts = products.filter(product => product.category === category.name);
            if (usedByProducts.length > 0) {
                alert(`Kategori "${category.name}" tidak bisa dihapus karena masih digunakan oleh ${usedByProducts.length} produk. Edit produk tersebut ke kategori lain terlebih dahulu.`);
                return;
            }

            if (!confirm(`Hapus kategori "${category.name}"?`)) return;

            categories = categories.filter(item => Number(item.id) !== Number(id));
            if (activeCategory === category.name) activeCategory = 'All';

            saveCategories();
            renderCategoryManagement();
            renderCategoryOptions();
            renderCategoryFilters();
            renderProducts();
            renderProductTable();
            alert('Kategori berhasil dihapus.');
        }

        // =========================
        // MANAJEMEN USER
        // =========================
        function saveUsersToStorage() {
            localStorage.setItem('sandikale_users', JSON.stringify(users));
        }

        function formatUserDate(value) {
            if (!value) return '-';
            const date = new Date(value);
            if (Number.isNaN(date.getTime())) return '-';
            return date.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });
        }

        function escapeUserHtml(value) {
            return escapeHtml(String(value ?? ''));
        }

        function getUserRoleBadge(role) {
            const classes = {
                Admin: 'bg-red-500/10 text-red-400 border-red-500/20',
                Kasir: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
                Produksi: 'bg-amber-500/10 text-amber-400 border-amber-500/20'
            };
            return `<span class="inline-flex px-2 py-1 rounded-md border text-[10px] font-semibold ${classes[role] || 'bg-neutral-800 text-gray-300 border-neutral-700'}">${escapeUserHtml(role)}</span>`;
        }

        function getUserStatusBadge(status) {
            return status === 'Aktif'
                ? '<span class="inline-flex items-center gap-1 text-[10px] font-semibold text-green-400"><span class="w-1.5 h-1.5 rounded-full bg-green-400"></span>Aktif</span>'
                : '<span class="inline-flex items-center gap-1 text-[10px] font-semibold text-gray-500"><span class="w-1.5 h-1.5 rounded-full bg-gray-600"></span>Nonaktif</span>';
        }

        function renderUsers() {
            const tbody = document.getElementById('user-table-body');
            if (!tbody) return;
            const searchInput = document.getElementById('user-search');
            const keyword = (searchInput?.value || '').trim().toLowerCase();
            const filtered = users.filter(user => `${user.name} ${user.username} ${user.role} ${user.status}`.toLowerCase().includes(keyword));

            document.getElementById('user-stat-total')?.replaceChildren(document.createTextNode(users.length));
            document.getElementById('user-stat-active')?.replaceChildren(document.createTextNode(users.filter(u => u.status === 'Aktif').length));
            document.getElementById('user-stat-admin')?.replaceChildren(document.createTextNode(users.filter(u => u.role === 'Admin').length));
            tbody.innerHTML = '';
            document.getElementById('user-empty')?.classList.toggle('hidden', filtered.length > 0);

            filtered.forEach(user => {
                const idArg = JSON.stringify(String(user.id));
                const tr = document.createElement('tr');
                tr.className = 'hover:bg-neutral-900/60 transition';
                tr.innerHTML = `
                    <td class="px-4 py-3"><div class="flex items-center gap-3"><div class="w-9 h-9 rounded-full bg-brandRed/10 border border-brandRed/20 text-brandRed flex items-center justify-center font-bold text-xs">${escapeUserHtml((user.name || '?').charAt(0).toUpperCase())}</div><div><p class="text-sm font-semibold text-white">${escapeUserHtml(user.name)}</p><p class="text-[10px] text-gray-600">ID #${escapeUserHtml(user.id)}</p></div></div></td>
                    <td class="px-4 py-3 text-xs text-gray-300">${escapeUserHtml(user.username)}</td>
                    <td class="px-4 py-3">${getUserRoleBadge(user.role)}</td>
                    <td class="px-4 py-3">${getUserStatusBadge(user.status)}</td>
                    <td class="px-4 py-3 text-xs text-gray-500">${formatUserDate(user.createdAt)}</td>
                    <td class="px-4 py-3"><div class="flex justify-end gap-2">
                        <button type="button" onclick="editUser(${idArg})" class="w-8 h-8 rounded-lg bg-neutral-800 text-gray-300 hover:bg-neutral-700 hover:text-white" title="Edit"><i class="fa-solid fa-pen text-xs"></i></button>
                        <button type="button" onclick="toggleUserStatus(${idArg})" class="w-8 h-8 rounded-lg bg-neutral-800 text-gray-300 hover:bg-neutral-700 hover:text-white" title="${user.status === 'Aktif' ? 'Nonaktifkan' : 'Aktifkan'}"><i class="fa-solid ${user.status === 'Aktif' ? 'fa-user-slash' : 'fa-user-check'} text-xs"></i></button>
                        <button type="button" onclick="deleteUser(${idArg})" class="w-8 h-8 rounded-lg bg-neutral-800 text-gray-400 hover:bg-red-500/10 hover:text-red-400" title="Hapus"><i class="fa-solid fa-trash text-xs"></i></button>
                    </div></td>`;
                tbody.appendChild(tr);
            });
        }

        function openUserModal(id = null) {
            if (!requireAdmin()) return;
            editingUserId = id;
            const modal = document.getElementById('user-modal');
            const title = document.getElementById('user-modal-title');
            const form = document.getElementById('user-form');
            if (!modal || !form) return;
            form.reset();
            document.getElementById('user-id').value = id ?? '';
            document.getElementById('user-role').value = 'Kasir';
            document.getElementById('user-status').value = 'Aktif';
            document.getElementById('user-password').required = !id;
            document.getElementById('user-password-required').textContent = id ? '' : '*';
            if (id !== null) {
                const user = users.find(u => String(u.id) === String(id));
                if (!user) return;
                title.textContent = 'Edit User';
                document.getElementById('user-name').value = user.name || '';
                document.getElementById('user-username').value = user.username || '';
                document.getElementById('user-role').value = user.role || 'Kasir';
                document.getElementById('user-status').value = user.status || 'Aktif';
            } else {
                title.textContent = 'Tambah User';
            }
            modal.style.display = 'flex';
        }

        function closeUserModal() {
            document.getElementById('user-modal')?.style && (document.getElementById('user-modal').style.display = 'none');
            editingUserId = null;
        }

        async function saveUser(event) {
            event.preventDefault();
            if (!requireAdmin()) return;
            const name = document.getElementById('user-name').value.trim();
            const username = document.getElementById('user-username').value.trim().toLowerCase();
            const password = document.getElementById('user-password').value;
            const role = document.getElementById('user-role').value;
            const status = document.getElementById('user-status').value;
            if (!name || !username) return alert('Nama dan username wajib diisi.');
            if (!editingUserId && password.length < 6) return alert('Password minimal 6 karakter.');
            try {
                if (SANDIKALE_CLOUD_ENABLED) {
                    if (editingUserId) {
                        await callUserAdmin('update', { id: String(editingUserId), name, username, password, role, status });
                    } else {
                        await callUserAdmin('create', { name, username, password, role, status });
                    }
                    await refreshUsersFromCloud();
                } else {
                    const duplicate = users.find(u => u.username.toLowerCase() === username && String(u.id) !== String(editingUserId));
                    if (duplicate) return alert('Username sudah digunakan. Silakan pilih username lain.');
                    if (editingUserId) {
                        const user = users.find(u => String(u.id) === String(editingUserId));
                        if (!user) return;
                        Object.assign(user, { name, username, role, status });
                        if (password) { if (password.length < 6) return alert('Password baru minimal 6 karakter.'); user.password = password; }
                    } else {
                        users.push({ id: Date.now(), name, username, password, role, status, createdAt: new Date().toISOString() });
                    }
                    saveUsersToStorage();
                    renderUsers();
                }
                closeUserModal();
                alert(editingUserId ? 'User berhasil diperbarui.' : 'User berhasil ditambahkan.');
            } catch (error) {
                alert(error.message || 'Gagal menyimpan user.');
            }
        }

        function editUser(id) { openUserModal(id); }

        async function toggleUserStatus(id) {
            if (!requireAdmin()) return;
            try {
                if (SANDIKALE_CLOUD_ENABLED) {
                    await callUserAdmin('toggle', { id: String(id) });
                    await refreshUsersFromCloud();
                } else {
                    const user = users.find(u => String(u.id) === String(id));
                    if (!user) return;
                    if (user.role === 'Admin' && user.status === 'Aktif' && users.filter(u => u.role === 'Admin' && u.status === 'Aktif').length === 1) return alert('Minimal harus ada satu Admin aktif.');
                    user.status = user.status === 'Aktif' ? 'Nonaktif' : 'Aktif';
                    saveUsersToStorage(); renderUsers();
                }
            } catch (error) { alert(error.message || 'Gagal mengubah status user.'); }
        }

        async function deleteUser(id) {
            if (!requireAdmin()) return;
            const user = users.find(u => String(u.id) === String(id));
            if (!user) return;
            if (!confirm(`Hapus user "${user.name}"?`)) return;
            try {
                if (SANDIKALE_CLOUD_ENABLED) {
                    await callUserAdmin('delete', { id: String(id) });
                    await refreshUsersFromCloud();
                } else {
                    if (users.length === 1) return alert('User terakhir tidak dapat dihapus.');
                    if (user.role === 'Admin' && user.status === 'Aktif' && users.filter(u => u.role === 'Admin' && u.status === 'Aktif').length === 1) return alert('Minimal harus ada satu Admin aktif.');
                    users = users.filter(u => String(u.id) !== String(id));
                    saveUsersToStorage(); renderUsers();
                }
            } catch (error) { alert(error.message || 'Gagal menghapus user.'); }
        }

        function getTodayKey() {
            return getLocalDateKey(new Date());
        }

        function getWeekStartKey() {
            const d = new Date();
            const day = d.getDay();
            const diff = day === 0 ? -6 : 1 - day;
            d.setDate(d.getDate() + diff);
            return getLocalDateKey(d);
        }

        function getMonthStartKey() {
            const d = new Date();
            d.setDate(1);
            return getLocalDateKey(d);
        }

        function setReportPreset(preset, shouldRender = true) {
            if (currentUser && !requireAdmin()) return;
            const start = document.getElementById('report-start');
            const end = document.getElementById('report-end');
            if (!start || !end) return;

            const today = getTodayKey();
            if (preset === 'today') {
                start.value = today;
                end.value = today;
            } else if (preset === 'week') {
                start.value = getWeekStartKey();
                end.value = today;
            } else if (preset === 'month') {
                start.value = getMonthStartKey();
                end.value = today;
            } else {
                start.value = '';
                end.value = '';
            }

            document.querySelectorAll('.report-preset').forEach(btn => {
                btn.classList.remove('bg-brandRed', 'text-white');
                btn.classList.add('bg-neutral-800', 'text-gray-300');
            });
            const buttons = Array.from(document.querySelectorAll('.report-preset'));
            const index = { today: 0, week: 1, month: 2, all: 3 }[preset];
            if (buttons[index]) {
                buttons[index].classList.add('bg-brandRed', 'text-white');
                buttons[index].classList.remove('bg-neutral-800', 'text-gray-300');
            }
            if (shouldRender) renderReport();
        }

        function getFilteredReportTransactions() {
            const transactions = getTransactions();
            const start = document.getElementById('report-start')?.value || '';
            const end = document.getElementById('report-end')?.value || '';
            const payment = document.getElementById('report-payment')?.value || 'all';
            const keyword = (document.getElementById('report-search')?.value || '').trim().toLowerCase();

            return transactions.filter(transaction => {
                const dateKey = getLocalDateKey(transaction.date);
                if (start && (!dateKey || dateKey < start)) return false;
                if (end && (!dateKey || dateKey > end)) return false;
                if (payment !== 'all' && transaction.paymentMethod !== payment) return false;
                if (keyword) {
                    const haystack = [transaction.orderNumber, transaction.customerName, transaction.customerPhone]
                        .join(' ').toLowerCase();
                    if (!haystack.includes(keyword)) return false;
                }
                return true;
            }).sort((a, b) => new Date(b.date) - new Date(a.date));
        }

        function formatReportDate(value) {
            const d = new Date(value);
            if (Number.isNaN(d.getTime())) return '-';
            return d.toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' });
        }

        function renderReport() {
            const transactions = getFilteredReportTransactions();
            const tableBody = document.getElementById('report-table-body');
            const empty = document.getElementById('report-empty');
            if (!tableBody || !empty) return;

            const totalSales = transactions.reduce((sum, t) => sum + Number(t.total || 0), 0);
            const totalItems = transactions.reduce((sum, t) => sum + (Array.isArray(t.items) ? t.items.reduce((n, item) => n + Number(item.qty || 0), 0) : 0), 0);
            const average = transactions.length ? totalSales / transactions.length : 0;

            document.getElementById('report-total-transactions').innerText = transactions.length.toLocaleString('id-ID');
            document.getElementById('report-total-sales').innerText = `Rp ${totalSales.toLocaleString('id-ID')}`;
            document.getElementById('report-total-items').innerText = `${totalItems.toLocaleString('id-ID')} pcs`;
            document.getElementById('report-average').innerText = `Rp ${Math.round(average).toLocaleString('id-ID')}`;

            const start = document.getElementById('report-start')?.value || '';
            const end = document.getElementById('report-end')?.value || '';
            const periodLabel = document.getElementById('report-period-label');
            if (periodLabel) {
                periodLabel.innerText = start && end ? `${start === end ? start : `${start} s/d ${end}`} • ${transactions.length} transaksi` : `Semua transaksi • ${transactions.length} transaksi`;
            }

            tableBody.innerHTML = '';
            if (!transactions.length) {
                empty.classList.remove('hidden');
            } else {
                empty.classList.add('hidden');
                transactions.forEach(t => {
                    const paymentClass = t.paymentMethod === 'Cash'
                        ? 'bg-green-950/40 text-green-400 border-green-900'
                        : t.paymentMethod === 'QRIS'
                            ? 'bg-blue-950/40 text-blue-400 border-blue-900'
                            : 'bg-purple-950/40 text-purple-400 border-purple-900';
                    const itemCount = Array.isArray(t.items) ? t.items.reduce((n, item) => n + Number(item.qty || 0), 0) : 0;
                    tableBody.innerHTML += `
                        <tr class="hover:bg-neutral-800/50 transition">
                            <td class="px-4 py-3 font-semibold text-white whitespace-nowrap">${escapeHtml(t.orderNumber || '-')}</td>
                            <td class="px-4 py-3 text-gray-400 whitespace-nowrap">${escapeHtml(formatReportDate(t.date))}</td>
                            <td class="px-4 py-3">${escapeHtml(t.customerName || 'Customer Umum')}</td>
                            <td class="px-4 py-3">${itemCount} pcs</td>
                            <td class="px-4 py-3"><span class="px-2 py-1 rounded-full border text-[10px] ${paymentClass}">${escapeHtml(t.paymentMethod || '-')}</span></td>
                            <td class="px-4 py-3 text-right font-bold text-brandRed whitespace-nowrap">Rp ${Number(t.total || 0).toLocaleString('id-ID')}</td>
                        </tr>`;
                });
            }

            renderBestProducts(transactions);
        }

        function renderBestProducts(transactions) {
            const container = document.getElementById('report-best-products');
            if (!container) return;
            const map = {};
            transactions.forEach(t => {
                (Array.isArray(t.items) ? t.items : []).forEach(item => {
                    const key = item.name || `Produk #${item.id}`;
                    if (!map[key]) map[key] = { name: key, qty: 0, sales: 0 };
                    map[key].qty += Number(item.qty || 0);
                    map[key].sales += Number(item.subtotal || (Number(item.price || 0) * Number(item.qty || 0)));
                });
            });
            const top = Object.values(map).sort((a, b) => b.qty - a.qty || b.sales - a.sales).slice(0, 5);
            container.innerHTML = '';
            if (!top.length) {
                container.innerHTML = '<p class="text-xs text-gray-500 text-center py-6">Belum ada data produk terjual.</p>';
                return;
            }
            top.forEach((item, index) => {
                container.innerHTML += `
                    <div class="flex items-center gap-3">
                        <div class="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-xs font-bold text-brandRed">${index + 1}</div>
                        <div class="min-w-0 flex-1">
                            <p class="text-xs font-semibold text-white truncate">${escapeHtml(item.name)}</p>
                            <p class="text-[10px] text-gray-500">${item.qty} pcs • Rp ${item.sales.toLocaleString('id-ID')}</p>
                        </div>
                    </div>`;
            });
        }

        function exportReportCSV() {
            if (!requireAdmin()) return;
            const transactions = getFilteredReportTransactions();
            if (!transactions.length) {
                alert('Tidak ada data laporan untuk diekspor.');
                return;
            }
            const rows = [['No Transaksi', 'Tanggal', 'Customer', 'WhatsApp', 'Item', 'Pembayaran', 'Total']];
            transactions.forEach(t => {
                const itemCount = Array.isArray(t.items) ? t.items.reduce((n, item) => n + Number(item.qty || 0), 0) : 0;
                rows.push([t.orderNumber || '', formatReportDate(t.date), t.customerName || 'Customer Umum', t.customerPhone || '', itemCount, t.paymentMethod || '', Number(t.total || 0)]);
            });
            const csv = rows.map(row => row.map(value => `"${String(value).replace(/"/g, '""')}"`).join(',')).join('\n');
            const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `laporan-sandikale-${getTodayKey()}.csv`;
            document.body.appendChild(link);
            link.click();
            link.remove();
            URL.revokeObjectURL(url);
        }

        function printReport() {
            if (!requireAdmin()) return;
            const transactions = getFilteredReportTransactions();
            if (!transactions.length) {
                alert('Tidak ada data laporan untuk dicetak.');
                return;
            }
            const totalSales = transactions.reduce((sum, t) => sum + Number(t.total || 0), 0);
            const totalItems = transactions.reduce((sum, t) => sum + (Array.isArray(t.items) ? t.items.reduce((n, item) => n + Number(item.qty || 0), 0) : 0), 0);
            const rows = transactions.map(t => {
                const itemCount = Array.isArray(t.items) ? t.items.reduce((n, item) => n + Number(item.qty || 0), 0) : 0;
                return `<tr><td>${escapeHtml(t.orderNumber || '-')}</td><td>${escapeHtml(formatReportDate(t.date))}</td><td>${escapeHtml(t.customerName || 'Customer Umum')}</td><td>${itemCount}</td><td>${escapeHtml(t.paymentMethod || '-')}</td><td>Rp ${Number(t.total || 0).toLocaleString('id-ID')}</td></tr>`;
            }).join('');
            const printWindow = window.open('', '_blank', 'width=1100,height=750');
            if (!printWindow) {
                alert('Popup diblokir browser. Izinkan popup untuk mencetak laporan.');
                return;
            }
            printWindow.document.write(`<!DOCTYPE html><html lang="id"><head><meta charset="UTF-8"><title>Laporan Penjualan SANDIKALE</title><style>body{font-family:Arial,sans-serif;color:#111;padding:30px}h1{margin:0 0 4px}p{color:#555;font-size:12px}.summary{display:flex;gap:30px;margin:20px 0}.summary strong{display:block;font-size:18px}table{width:100%;border-collapse:collapse;font-size:11px}th,td{border:1px solid #ddd;padding:8px;text-align:left}th{background:#f3f3f3}td:last-child,th:last-child{text-align:right}@media print{body{padding:0}}</style></head><body><h1>SANDIKALE PROJECT</h1><p>Laporan Penjualan</p><div class="summary"><div><span>Total Transaksi</span><strong>${transactions.length}</strong></div><div><span>Total Produk</span><strong>${totalItems} pcs</strong></div><div><span>Total Penjualan</span><strong>Rp ${totalSales.toLocaleString('id-ID')}</strong></div></div><table><thead><tr><th>No Transaksi</th><th>Tanggal</th><th>Customer</th><th>Item</th><th>Pembayaran</th><th>Total</th></tr></thead><tbody>${rows}</tbody></table><p style="margin-top:20px;color:#777">Dicetak dari SANDIKALE PROJECT</p></body></html>`);
            printWindow.document.close();
            setTimeout(() => printWindow.print(), 300);
        }

        function escapeHtml(value) {
            return String(value ?? '')
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#039;');
        }

        function openCustomerModal() {
            if (!requireAdmin()) return;
            editingCustomerId = null;
            document.getElementById('customer-modal-title').innerText = 'Tambah Customer';
            document.getElementById('customer-form').reset();
            document.getElementById('customer-id').value = '';
            document.getElementById('customer-status').value = 'Aktif';
            document.getElementById('customer-modal').style.display = 'flex';
            setTimeout(() => document.getElementById('customer-name').focus(), 50);
        }

        function closeCustomerModal() {
            document.getElementById('customer-modal').style.display = 'none';
            document.getElementById('customer-form').reset();
            editingCustomerId = null;
        }

        function editCustomer(id) {
            if (!requireAdmin()) return;
            const customer = customers.find(c => c.id === id);
            if (!customer) return;

            editingCustomerId = id;
            document.getElementById('customer-modal-title').innerText = 'Edit Customer';
            document.getElementById('customer-id').value = id;
            document.getElementById('customer-name').value = customer.name || '';
            document.getElementById('customer-phone').value = customer.phone || '';
            document.getElementById('customer-email').value = customer.email || '';
            document.getElementById('customer-address').value = customer.address || '';
            document.getElementById('customer-status').value = customer.status || 'Aktif';
            document.getElementById('customer-note').value = customer.note || '';
            document.getElementById('customer-modal').style.display = 'flex';
        }

        function saveCustomer(event) {
            event.preventDefault();
            if (!requireAdmin()) return;

            const name = document.getElementById('customer-name').value.trim();
            const phone = document.getElementById('customer-phone').value.trim();
            const email = document.getElementById('customer-email').value.trim();
            const address = document.getElementById('customer-address').value.trim();
            const status = document.getElementById('customer-status').value;
            const note = document.getElementById('customer-note').value.trim();

            if (!name || !phone) {
                alert('Nama dan nomor WhatsApp wajib diisi.');
                return;
            }

            const duplicate = customers.find(c => c.phone === phone && c.id !== editingCustomerId);
            if (duplicate) {
                alert('Nomor WhatsApp tersebut sudah terdaftar. Silakan gunakan data customer yang sudah ada atau gunakan nomor lain.');
                return;
            }

            if (editingCustomerId !== null) {
                const index = customers.findIndex(c => c.id === editingCustomerId);
                if (index !== -1) {
                    customers[index] = { ...customers[index], name, phone, email, address, status, note };
                }
                alert('Data customer berhasil diperbarui.');
            } else {
                customers.push({
                    id: Date.now(),
                    name,
                    phone,
                    email,
                    address,
                    status,
                    note
                });
                alert('Customer berhasil ditambahkan.');
            }

            saveCustomersToStorage();
            renderCustomers();
            renderKasirCustomers();
            closeCustomerModal();
        }

        function deleteCustomer(id) {
            if (!requireAdmin()) return;
            const customer = customers.find(c => c.id === id);
            if (!customer) return;

            if (confirm(`Hapus customer "${customer.name}"?`)) {
                customers = customers.filter(c => c.id !== id);
                saveCustomersToStorage();
                renderCustomers();
                renderKasirCustomers();
            }
        }

        function renderProductTable() {
            const tableBody = document.getElementById('product-table-body');
            if (!tableBody) return;

            tableBody.innerHTML = '';
            products.forEach(p => {
                tableBody.innerHTML += `
                    <tr class="hover:bg-neutral-800/50 transition">
                        <td class="px-6 py-4 font-semibold text-white flex items-center gap-3">
                            <div class="w-8 h-8 bg-neutral-800 text-brandRed rounded flex items-center justify-center text-xs">
                                <i class="fa-solid ${p.icon}"></i>
                            </div>
                            ${p.name}
                        </td>
                        <td class="px-6 py-4"><span class="bg-neutral-800 text-xs px-2.5 py-1 rounded-full text-gray-300">${p.category}</span></td>
                        <td class="px-6 py-4 text-brandRed font-semibold">Rp ${p.price.toLocaleString('id-ID')}</td>
                        <td class="px-6 py-4">${p.stock} pcs</td>
                        <td class="px-6 py-4 text-center">
                            <button onclick="deleteProduct(${p.id})" class="text-red-500 hover:text-red-400 text-xs font-semibold bg-red-950/30 px-3 py-1.5 rounded border border-red-900">
                                <i class="fa-solid fa-trash mr-1"></i> Hapus
                            </button>
                        </td>
                    </tr>
                `;
            });
        }

        function openProductModal() {
            if (!requireAdmin()) return;
            const modal = document.getElementById('product-modal');
            if (modal) modal.style.display = 'flex';
        }

        function closeProductModal() {
            const modal = document.getElementById('product-modal');
            if (modal) {
                modal.style.display = 'none';
                const form = document.getElementById('add-product-form');
                if (form) form.reset();
            }
        }

        function saveProduct(event) {
            event.preventDefault();
            if (!requireAdmin()) return;

            const name = document.getElementById('p-name').value;
            const category = document.getElementById('p-category').value;
            const price = parseInt(document.getElementById('p-price').value);
            const stock = parseInt(document.getElementById('p-stock').value);

            const selectedCategory = categories.find(c => c.name === category);
            const icon = selectedCategory?.icon || "fa-box";

            products.push({ id: Date.now(), name, category, price, stock, icon });
            saveProductsToStorage();

            renderCategoryFilters();
            renderProducts();
            renderProductTable();
            closeProductModal();
            alert("Produk berhasil ditambahkan!");
        }

        function deleteProduct(id) {
            if (!requireAdmin()) return;
            if (confirm("Yakin ingin menghapus produk ini?")) {
                products = products.filter(p => p.id !== id);
                saveProductsToStorage();
                renderCategoryFilters();
                renderProducts();
                renderProductTable();
            }
        }

        document.addEventListener("DOMContentLoaded", () => {
            renderCategoryManagement();
            renderCategoryOptions();
            renderCategoryFilters();
            renderProducts();
            renderCustomers();
            renderKasirCustomers();
            renderUsers();
            setReportPreset('today', false);
            renderReport();
            applyRoleAccess();
            requireLogin();
        });
    </script>
</body>
</html>

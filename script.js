const whatsappNumber = "6282160845317"; 

function pesanProduk(nama, harga) {
    const waktu = new Date().toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' });
    const pesananBaru = { nama, harga, waktu };

    // 1. Simpan ke Riwayat Browser (LocalStorage)
    let riwayat = JSON.parse(localStorage.getItem('riwayatAndaliman')) || [];
    riwayat.unshift(pesananBaru); // Pesanan terbaru diletakkan di paling atas
    localStorage.setItem('riwayatAndaliman', JSON.stringify(riwayat));

    // 2. Format Pesan WhatsApp (Menggunakan Bold dengan tanda bintang *)
    const pesan = `Halo Andaliman Ruth, saya ingin memesan produk berikut:
    
Produk: *${nama}*
Total: *Rp ${harga.toLocaleString('id-ID')}*
Waktu Pesan: ${waktu}

Mohon informasi selanjutnya untuk proses pembayaran dan pengiriman. Terima kasih.`;

    // 3. Gunakan api.whatsapp.com (Lebih stabil untuk menghindari ERR_ADDRESS_INVALID)
    const urlWA = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(pesan)}`;

    // 4. Buka di tab baru
    window.open(urlWA, '_blank');
}

function showHistory() {
    const modal = document.getElementById("historyModal");
    const list = document.getElementById("historyList");
    let riwayat = JSON.parse(localStorage.getItem('riwayatAndaliman')) || [];

    modal.style.display = "block";
    
    if(riwayat.length === 0) {
        list.innerHTML = "<p class='text-center text-muted'>Belum ada riwayat pesanan.</p>";
    } else {
        list.innerHTML = riwayat.map(item => `
            <div class="p-3 mb-2" style="background: #f9f9f9; border-left: 4px solid #b58d3d; border-radius: 5px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                <div class="d-flex justify-content-between align-items-center">
                    <strong style="color: #4a5d4a;">${item.nama}</strong>
                    <span class="badge bg-success">Rp ${item.harga.toLocaleString('id-ID')}</span>
                </div>
                <small class="text-muted d-block mt-1">📅 ${item.waktu}</small>
            </div>
        `).join('');
    }
}

function closeHistory() {
    document.getElementById("historyModal").style.display = "none";
}

// Menutup modal jika user klik di luar kotak modal
window.onclick = function(event) {
    const modal = document.getElementById("historyModal");
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
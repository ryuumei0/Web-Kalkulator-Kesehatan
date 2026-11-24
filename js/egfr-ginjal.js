document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("form-ginjal");
    const hasilBox = document.getElementById("hasil-ginjal");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const usia = parseFloat(document.getElementById("usia").value);
        const gender = document.getElementById("gender").value;
        const kreatinin = parseFloat(document.getElementById("kreatinin").value);
        const riwayat = document.getElementById("riwayat").value;

        if (isNaN(usia) || usia < 18 || isNaN(kreatinin) || kreatinin <= 0 || !gender || !riwayat) {
            hasilBox.innerHTML = "<p>Mohon lengkapi seluruh data dengan benar (usia minimal 18 tahun).</p>";
            hasilBox.style.display = "block";
            return;
        }

        // Rumus CKD-EPI 2021 (tanpa faktor ras)
        const isPerempuan = gender === "perempuan";
        const kappa = isPerempuan ? 0.7 : 0.9;
        const alpha = isPerempuan ? -0.241 : -0.302;
        const faktorGender = isPerempuan ? 1.012 : 1.0;

        const rasio = kreatinin / kappa;
        const minRasio = Math.min(rasio, 1);
        const maxRasio = Math.max(rasio, 1);

        const egfr =
            142 *
            Math.pow(minRasio, alpha) *
            Math.pow(maxRasio, -1.2) *
            Math.pow(0.9938, usia) *
            faktorGender;

        const egfrBulat = egfr.toFixed(1);

        // Penentuan kategori stadium GFR sesuai artikel di halaman
        let kategori = "";
        let penjelasan = "";

        if (egfr >= 90) {
            kategori = "G1 — Normal atau Tinggi (≥ 90 mL/min/1,73 m²)";
            penjelasan = "Laju filtrasi tergolong normal atau tinggi. Tetap pertahankan pola hidup sehat dan pantau kondisi pendukung bila ada faktor risiko.";
        } else if (egfr >= 60) {
            kategori = "G2 — Penurunan Ringan (60 – 89 mL/min/1,73 m²)";
            penjelasan = "Terdapat penurunan ringan laju filtrasi. Perlu dicermati terutama jika disertai riwayat hipertensi, diabetes, atau keluhan ginjal.";
        } else if (egfr >= 45) {
            kategori = "G3a — Penurunan Ringan-Sedang (45 – 59 mL/min/1,73 m²)";
            penjelasan = "Fungsi penyaringan berada pada kategori penurunan ringan-sedang. Disarankan berkonsultasi dengan dokter untuk pemantauan rutin.";
        } else if (egfr >= 30) {
            kategori = "G3b — Penurunan Sedang-Berat (30 – 44 mL/min/1,73 m²)";
            penjelasan = "Fungsi penyaringan berada pada kategori penurunan sedang-berat. Sebaiknya segera periksakan diri ke dokter untuk evaluasi dan tata laksana.";
        } else if (egfr >= 15) {
            kategori = "G4 — Penurunan Berat (15 – 29 mL/min/1,73 m²)";
            penjelasan = "Fungsi ginjal mengalami penurunan berat. Memerlukan penanganan dan pemantauan intensif oleh tenaga medis/dokter spesialis.";
        } else {
            kategori = "G5 — Gagal Ginjal (< 15 mL/min/1,73 m²)";
            penjelasan = "Laju filtrasi berada di bawah 15 mL/min/1,73 m². Segera konsultasikan ke dokter spesialis untuk penanganan lebih lanjut.";
        }

        const catatanRiwayat =
            riwayat === "ya"
                ? `<p><strong>Faktor Risiko (Hipertensi/Diabetes):</strong> Karena Anda memiliki riwayat hipertensi atau diabetes, pengendalian tekanan darah, gula darah, serta pemeriksaan lanjutan sangat penting untuk melindungi fungsi ginjal.</p>`
                : `<p><strong>Faktor Risiko (Hipertensi/Diabetes):</strong> Tidak tercatat riwayat hipertensi atau diabetes pada isian ini. Tetap jaga gaya hidup sehat secara konsisten.</p>`;

        // Render hasil ke #hasil-ginjal sesuai class CSS yang sudah Anda buat
        hasilBox.innerHTML = `
            <h3>Hasil Estimasi eGFR</h3>
            <p>Perkiraan laju filtrasi glomerulus Anda:</p>
            <div class="nilai-egfr">${egfrBulat} mL/min/1,73 m²</div>
            <div class="kategori-egfr">${kategori}</div>
            <p>${penjelasan}</p>
            <hr>
            ${catatanRiwayat}
        `;

        hasilBox.style.display = "block";
    });

    // Sembunyikan kembali kotak hasil saat tombol Reset ditekan
    form.addEventListener("reset", function () {
        hasilBox.style.display = "none";
        hasilBox.innerHTML = "";
    });
});
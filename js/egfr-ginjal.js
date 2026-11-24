(function () {
    function init() {
        var form = document.getElementById("form-ginjal");
        var hasilBox = document.getElementById("hasil-ginjal");
        if (!form || !hasilBox) {
            console.error("[eGFR] form-ginjal / hasil-ginjal tidak ditemukan");
            return;
        }

        function ambil(id) {
            var e = document.getElementById(id);
            return e ? String(e.value).trim() : "";
        }

        function tampilkan(html) {
            hasilBox.innerHTML = html;
            hasilBox.hidden = false;
            hasilBox.style.setProperty("display", "block", "important");
            hasilBox.style.setProperty("visibility", "visible", "important");
            hasilBox.style.setProperty("opacity", "1", "important");
            hasilBox.style.setProperty("height", "auto", "important");
            hasilBox.style.setProperty("max-height", "none", "important");
            hasilBox.style.setProperty("overflow", "visible", "important");
            try { hasilBox.scrollIntoView({ behavior: "smooth", block: "center" }); } catch (e) {}

            // Cadangan: jika kotak tetap tidak terlihat, tampilkan lewat alert
            setTimeout(function () {
                var r = hasilBox.getBoundingClientRect();
                if (r.width === 0 || r.height === 0) {
                    alert(hasilBox.innerText || hasilBox.textContent);
                }
            }, 150);
        }

        function hitung(event) {
            if (event) event.preventDefault();
            try {
                var usia = parseFloat(ambil("usia").replace(",", "."));
                var kreatinin = parseFloat(ambil("kreatinin").replace(",", "."));
                var genderRaw = ambil("gender").toLowerCase();
                var riwayatRaw = ambil("riwayat").toLowerCase();

                if (isNaN(usia) || usia < 18 || usia > 120 || isNaN(kreatinin) || kreatinin <= 0 || !genderRaw || !riwayatRaw) {
                    tampilkan("<p>Mohon lengkapi seluruh data dengan benar (usia 18–120 tahun, kreatinin lebih dari 0).</p>");
                    return;
                }

                var isPerempuan = ["perempuan", "wanita", "female", "p", "w", "f"].indexOf(genderRaw) !== -1;
                var punyaRiwayat = ["ya", "yes", "y", "true", "1"].indexOf(riwayatRaw) !== -1;

                // Rumus CKD-EPI 2021 (tanpa faktor ras)
                var kappa = isPerempuan ? 0.7 : 0.9;
                var alpha = isPerempuan ? -0.241 : -0.302;
                var faktorGender = isPerempuan ? 1.012 : 1.0;

                var rasio = kreatinin / kappa;
                var egfr =
                    142 *
                    Math.pow(Math.min(rasio, 1), alpha) *
                    Math.pow(Math.max(rasio, 1), -1.2) *
                    Math.pow(0.9938, usia) *
                    faktorGender;

                var egfrBulat = egfr.toFixed(1).replace(".", ",");

                var kategori, penjelasan;
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
                    kategori = "G5 — Gagal Ginjal (&lt; 15 mL/min/1,73 m²)";
                    penjelasan = "Laju filtrasi berada di bawah 15 mL/min/1,73 m². Segera konsultasikan ke dokter spesialis untuk penanganan lebih lanjut.";
                }

                var catatanRiwayat = punyaRiwayat
                    ? "<p><strong>Faktor Risiko (Hipertensi/Diabetes):</strong> Karena Anda memiliki riwayat hipertensi atau diabetes, pengendalian tekanan darah, gula darah, serta pemeriksaan lanjutan sangat penting untuk melindungi fungsi ginjal.</p>"
                    : "<p><strong>Faktor Risiko (Hipertensi/Diabetes):</strong> Tidak tercatat riwayat hipertensi atau diabetes pada isian ini. Tetap jaga gaya hidup sehat secara konsisten.</p>";

                tampilkan(
                    "<h3>Hasil Estimasi eGFR</h3>" +
                    "<p>Perkiraan laju filtrasi glomerulus Anda:</p>" +
                    '<div class="nilai-egfr">' + egfrBulat + " mL/min/1,73 m²</div>" +
                    '<div class="kategori-egfr">' + kategori + "</div>" +
                    "<p>" + penjelasan + "</p><hr>" + catatanRiwayat
                );
            } catch (err) {
                console.error("[eGFR] Error:", err);
                tampilkan("<p><strong>Terjadi error:</strong> " + err.message + "</p>");
            }
        }

        form.addEventListener("submit", hitung);

        var tombol = form.querySelector(".btn-hitung");
        if (tombol) tombol.addEventListener("click", hitung);

        form.addEventListener("reset", function () {
            hasilBox.style.display = "none";
            hasilBox.innerHTML = "";
        });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();
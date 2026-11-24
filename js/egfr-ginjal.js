document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("form-ginjal");
    const hasil = document.getElementById("hasil-ginjal");
    const tombolReset = document.querySelector(".btn-reset");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        // Ambil data dari form
        const usia = parseFloat(document.getElementById("usia").value);
        const gender = document.getElementById("gender").value;
        const kreatinin = parseFloat(document.getElementById("kreatinin").value);
        const riwayat = document.getElementById("riwayat").value;

        // Validasi
        if (
            isNaN(usia) ||
            isNaN(kreatinin) ||
            gender === "" ||
            riwayat === ""
        ) {
            hasil.style.display = "block";
            hasil.innerHTML = `
                <h3>Data Belum Lengkap</h3>
                <p>Silakan isi semua data terlebih dahulu.</p>
            `;
            return;
        }

        if (usia < 18 || usia > 120) {
            hasil.style.display = "block";
            hasil.innerHTML = `
                <h3>Usia Tidak Valid</h3>
                <p>Kalkulator ini digunakan untuk orang dewasa usia 18 tahun ke atas.</p>
            `;
            return;
        }

        if (kreatinin <= 0) {
            hasil.style.display = "block";
            hasil.innerHTML = `
                <h3>Nilai Kreatinin Tidak Valid</h3>
                <p>Masukkan nilai kreatinin yang benar.</p>
            `;
            return;
        }

        /*
         * CKD-EPI 2021 berdasarkan kreatinin
         *
         * eGFR = 142 × min(Scr/k,1)^α × max(Scr/k,1)^-1.200 × 0.9938^Age × 1.012 jika perempuan
         *
         * Scr = kreatinin serum (mg/dL)
         * k = 0.7 perempuan, 0.9 laki-laki
         * α = -0.241 perempuan, -0.302 laki-laki
         */

        let k;
        let alpha;

        if (gender === "perempuan") {
            k = 0.7;
            alpha = -0.241;
        } else {
            k = 0.9;
            alpha = -0.302;
        }

        const rasio = kreatinin / k;

        const minRasio = Math.min(rasio, 1);
        const maxRasio = Math.max(rasio, 1);

        let egfr =
            142 *
            Math.pow(minRasio, alpha) *
            Math.pow(maxRasio, -1.200) *
            Math.pow(0.9938, usia);

        // Faktor perempuan
        if (gender === "perempuan") {
            egfr = egfr * 1.012;
        }

        // Bulatkan 1 angka di belakang koma
        egfr = egfr.toFixed(1);

        // Tentukan kategori
        let kategori;
        let keterangan;

        if (egfr >= 90) {
            kategori = "G1 — Normal atau Tinggi";
            keterangan =
                "Nilai eGFR tergolong normal atau tinggi. Namun, penilaian fungsi ginjal juga perlu mempertimbangkan pemeriksaan lain seperti urine dan albuminuria.";
        } 
        else if (egfr >= 60) {
            kategori = "G2 — Penurunan Ringan";
            keterangan =
                "Nilai eGFR menunjukkan penurunan ringan. Hasil perlu dilihat bersama faktor risiko dan pemeriksaan kesehatan lainnya.";
        } 
        else if (egfr >= 45) {
            kategori = "G3a — Penurunan Ringan sampai Sedang";
            keterangan =
                "Nilai eGFR berada pada kategori G3a. Disarankan melakukan pemantauan fungsi ginjal dan berkonsultasi dengan tenaga kesehatan.";
        } 
        else if (egfr >= 30) {
            kategori = "G3b — Penurunan Sedang sampai Berat";
            keterangan =
                "Nilai eGFR berada pada kategori G3b. Sebaiknya dilakukan evaluasi dan pemantauan medis lebih lanjut.";
        } 
        else if (egfr >= 15) {
            kategori = "G4 — Penurunan Berat";
            keterangan =
                "Nilai eGFR menunjukkan penurunan fungsi ginjal yang berat dan memerlukan evaluasi medis lebih lanjut.";
        } 
        else {
            kategori = "G5 — Gagal Ginjal";
            keterangan =
                "Nilai eGFR berada pada kategori G5. Diperlukan penanganan dan evaluasi medis lebih lanjut.";
        }

        // Informasi riwayat
        let infoRiwayat;

        if (riwayat === "ya") {
            infoRiwayat =
                "Anda memilih memiliki riwayat hipertensi atau diabetes. Kondisi tersebut merupakan faktor risiko gangguan ginjal.";
        } else {
            infoRiwayat =
                "Anda memilih tidak memiliki riwayat hipertensi atau diabetes.";
        }

        // Tampilkan hasil
        hasil.style.display = "block";

        hasil.innerHTML = `
            <h3>Hasil Perhitungan eGFR</h3>

            <p>
                <strong>Nilai eGFR:</strong>
                <span style="font-size: 24px;">
                    ${egfr} mL/min/1,73 m²
                </span>
            </p>

            <p>
                <strong>Kategori:</strong><br>
                ${kategori}
            </p>

            <p>
                <strong>Keterangan:</strong><br>
                ${keterangan}
            </p>

            <p>
                <strong>Riwayat hipertensi/diabetes:</strong><br>
                ${infoRiwayat}
            </p>

            <hr>

            <p>
                <strong>Catatan:</strong><br>
                Hasil ini merupakan estimasi berdasarkan data yang dimasukkan
                dan bukan diagnosis medis. Untuk mengetahui kondisi ginjal
                secara menyeluruh, konsultasikan hasil dengan dokter dan
                pertimbangkan pemeriksaan laboratorium lainnya.
            </p>
        `;

        // Scroll otomatis ke hasil
        hasil.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    });


    // Tombol Reset
    tombolReset.addEventListener("click", function () {

        hasil.style.display = "none";
        hasil.innerHTML = "";

    });

});
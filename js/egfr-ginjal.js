document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("form-ginjal");

    const usiaInput = document.getElementById("usia");
    const genderInput = document.getElementById("gender");
    const kreatininInput = document.getElementById("kreatinin");
    const riwayatInput = document.getElementById("riwayat");

    const hasil = document.getElementById("hasil-ginjal");


    /* =========================
       FORM SUBMIT
    ========================= */

    form.addEventListener("submit", function (event) {

        event.preventDefault();

        const usia = parseFloat(usiaInput.value);
        const gender = genderInput.value;
        const kreatinin = parseFloat(kreatininInput.value);
        const riwayat = riwayatInput.value;


        /* =========================
           VALIDASI
        ========================= */

        if (
            isNaN(usia) ||
            isNaN(kreatinin) ||
            gender === "" ||
            riwayat === ""
        ) {

            hasil.style.display = "block";

            hasil.innerHTML = `
                <h3>Data belum lengkap</h3>

                <p>
                    Silakan isi semua data terlebih dahulu
                    sebelum menghitung eGFR.
                </p>
            `;

            return;
        }


        if (usia < 18 || usia > 120) {

            hasil.style.display = "block";

            hasil.innerHTML = `
                <h3>Usia tidak valid</h3>

                <p>
                    Kalkulator ini digunakan untuk orang dewasa
                    dengan usia minimal 18 tahun.
                </p>
            `;

            return;
        }


        if (kreatinin <= 0) {

            hasil.style.display = "block";

            hasil.innerHTML = `
                <h3>Kreatinin tidak valid</h3>

                <p>
                    Masukkan nilai kreatinin yang lebih dari 0 mg/dL.
                </p>
            `;

            return;
        }


        /* =========================
           CKD-EPI 2021
           BERBASIS KREATININ
        ========================= */

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


        /* Faktor perempuan */

        if (gender === "perempuan") {
            egfr = egfr * 1.012;
        }


        /* Pembulatan */

        egfr = Math.round(egfr * 10) / 10;


        /* =========================
           KATEGORI eGFR
        ========================= */

        let kategori;
        let keterangan;


        if (egfr >= 90) {

            kategori = "G1";
            keterangan =
                "Fungsi ginjal normal atau tinggi.";

        } else if (egfr >= 60) {

            kategori = "G2";
            keterangan =
                "Penurunan ringan fungsi ginjal.";

        } else if (egfr >= 45) {

            kategori = "G3a";
            keterangan =
                "Penurunan ringan hingga sedang fungsi ginjal.";

        } else if (egfr >= 30) {

            kategori = "G3b";
            keterangan =
                "Penurunan sedang hingga berat fungsi ginjal.";

        } else if (egfr >= 15) {

            kategori = "G4";
            keterangan =
                "Penurunan berat fungsi ginjal.";

        } else {

            kategori = "G5";
            keterangan =
                "Gagal ginjal atau fungsi ginjal sangat rendah.";

        }


        /* =========================
           HASIL
        ========================= */

        hasil.style.display = "block";

        hasil.innerHTML = `

            <h3>
                Hasil Perhitungan eGFR
            </h3>

            <p>
                <strong>Nilai eGFR:</strong>
                ${egfr} mL/min/1,73 m²
            </p>

            <p>
                <strong>Kategori:</strong>
                ${kategori}
            </p>

            <p>
                ${keterangan}
            </p>

            <p>
                <strong>Riwayat hipertensi/diabetes:</strong>
                ${riwayat === "ya" ? "Ya" : "Tidak"}
            </p>

        `;

    });


    /* =========================
       RESET
    ========================= */

    form.addEventListener("reset", function () {

        setTimeout(function () {

            hasil.innerHTML = "";

            hasil.style.display = "none";

        }, 10);

    });

});
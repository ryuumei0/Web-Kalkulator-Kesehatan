document.addEventListener("DOMContentLoaded", function () {

    // Ambil elemen HTML
    const form = document.getElementById("form-ginjal");
    const hasil = document.getElementById("hasil-ginjal");


    // =========================================
    // KETIKA TOMBOL "HITUNG eGFR" DITEKAN
    // =========================================

    form.addEventListener("submit", function (event) {

        // Mencegah halaman refresh
        event.preventDefault();


        // =====================================
        // AMBIL DATA DARI FORM
        // =====================================

        const usia =
            parseFloat(document.getElementById("usia").value);

        const gender =
            document.getElementById("gender").value;

        const kreatinin =
            parseFloat(document.getElementById("kreatinin").value);

        const riwayat =
            document.getElementById("riwayat").value;



        // =====================================
        // VALIDASI
        // =====================================

        if (
            isNaN(usia) ||
            isNaN(kreatinin) ||
            gender === "" ||
            riwayat === ""
        ) {

            hasil.style.display = "block";

            hasil.innerHTML = `
                <h3>Data Belum Lengkap</h3>

                <p>
                    Silakan isi seluruh data terlebih dahulu
                    sebelum menghitung eGFR.
                </p>
            `;

            return;
        }



        // =====================================
        // VALIDASI USIA
        // =====================================

        if (usia < 18 || usia > 120) {

            hasil.style.display = "block";

            hasil.innerHTML = `
                <h3>Usia Tidak Valid</h3>

                <p>
                    Kalkulator ini digunakan untuk orang dewasa
                    dengan usia 18 tahun ke atas.
                </p>
            `;

            return;
        }



        // =====================================
        // PARAMETER CKD-EPI 2021
        // =====================================

        let k;
        let alpha;


        if (gender === "perempuan") {

            k = 0.7;
            alpha = -0.241;

        } else {

            k = 0.9;
            alpha = -0.302;

        }



        // =====================================
        // PERHITUNGAN eGFR
        // =====================================

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


        // Bulatkan menjadi 1 angka
        // di belakang koma
        egfr = egfr.toFixed(1);



        // =====================================
        // TENTUKAN KATEGORI
        // =====================================

        let kategori;
        let keterangan;


        if (egfr >= 90) {

            kategori =
                "G1 — Normal atau Tinggi";

            keterangan =
                "Nilai eGFR tergolong normal atau tinggi. " +
                "Namun, penilaian fungsi ginjal juga perlu " +
                "mempertimbangkan pemeriksaan penunjang lainnya.";

        }

        else if (egfr >= 60) {

            kategori =
                "G2 — Penurunan Ringan";

            keterangan =
                "Nilai eGFR menunjukkan penurunan ringan. " +
                "Hasil perlu dilihat bersama faktor risiko " +
                "dan pemeriksaan kesehatan lainnya.";

        }

        else if (egfr >= 45) {

            kategori =
                "G3a — Penurunan Ringan sampai Sedang";

            keterangan =
                "Nilai eGFR berada pada kategori G3a. " +
                "Disarankan melakukan pemantauan fungsi ginjal " +
                "dan berkonsultasi dengan tenaga kesehatan.";

        }

        else if (egfr >= 30) {

            kategori =
                "G3b — Penurunan Sedang sampai Berat";

            keterangan =
                "Nilai eGFR berada pada kategori G3b. " +
                "Sebaiknya dilakukan evaluasi dan pemantauan medis " +
                "lebih lanjut.";

        }

        else if (egfr >= 15) {

            kategori =
                "G4 — Penurunan Berat";

            keterangan =
                "Nilai eGFR menunjukkan penurunan fungsi ginjal " +
                "yang berat dan memerlukan evaluasi medis lebih lanjut.";

        }

        else {

            kategori =
                "G5 — Gagal Ginjal";

            keterangan =
                "Nilai eGFR berada pada kategori G5 dan " +
                "memerlukan evaluasi serta penanganan medis lebih lanjut.";

        }



        // =====================================
        // INFORMASI RIWAYAT
        // =====================================

        let infoRiwayat;


        if (riwayat === "ya") {

            infoRiwayat =
                "Ya. Riwayat hipertensi atau diabetes " +
                "merupakan salah satu faktor risiko gangguan ginjal.";

        }

        else {

            infoRiwayat =
                "Tidak memiliki riwayat hipertensi atau diabetes " +
                "berdasarkan data yang dimasukkan.";

        }



        // =====================================
        // TAMPILKAN HASIL
        // =====================================

        hasil.style.display = "block";


        hasil.innerHTML = `

            <h3>
                Hasil Perhitungan eGFR
            </h3>


            <p>
                <strong>
                    Nilai eGFR:
                </strong>
            </p>


            <div class="nilai-egfr">

                ${egfr}
                mL/min/1,73 m²

            </div>


            <p>
                <strong>
                    Kategori:
                </strong>
            </p>


            <div class="kategori-egfr">

                ${kategori}

            </div>


            <p>

                <strong>
                    Keterangan:
                </strong>

                <br>

                ${keterangan}

            </p>


            <hr>


            <p>

                <strong>
                    Riwayat hipertensi/diabetes:
                </strong>

                <br>

                ${infoRiwayat}

            </p>


            <p>

                <strong>
                    Catatan:
                </strong>

                <br>

                Hasil eGFR merupakan nilai estimasi
                berdasarkan data yang dimasukkan dan
                bukan merupakan diagnosis medis.

                Konsultasikan hasil pemeriksaan
                dengan dokter untuk penilaian klinis
                yang lebih tepat.

            </p>

        `;


        // =====================================
        // SCROLL KE HASIL
        // =====================================

        hasil.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    });



    // =========================================
    // TOMBOL RESET
    // =========================================

    form.addEventListener("reset", function () {

        hasil.style.display = "none";

        hasil.innerHTML = "";

    });

});
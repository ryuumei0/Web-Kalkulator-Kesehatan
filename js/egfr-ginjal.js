<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Kalkulator Kesehatan Ginjal - SehatKu.</title>

    <link rel="stylesheet" href="../css/style.css">

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800&display=swap" rel="stylesheet">
</head>

<body>

<!-- HEADER -->
<header class="topbar">
    <div class="topbar-in">

        <a href="../index.html" class="brand">
            SehatKu.
        </a>

        <nav class="menu">
            <a href="../index.html">Beranda</a>
            <a href="egfr-ginjal.html" class="active">Kalkulator</a>
        </nav>

    </div>
</header>


<!-- HERO -->
<section class="hero hero-kecil">

    <div class="wrap">

        <!-- Breadcrumb -->
        <div class="crumb">
            <a href="../index.html">Beranda</a>
            /
            <a href="#">Kalkulator Kesehatan</a>
            /
            <span>Ginjal</span>
        </div>


        <!-- JUDUL -->
        <div class="hero-content">

            <div class="hero-icon">
                <span>♥</span>
            </div>

            <div>

                <h1 class="judul-hero">
                    Kalkulator Kesehatan Ginjal
                </h1>

                <p class="lead">
                    Hitung perkiraan laju filtrasi glomerulus (eGFR) untuk
                    membantu mengetahui gambaran fungsi ginjal berdasarkan
                    data kesehatan yang Anda masukkan.
                </p>

            </div>

        </div>

    </div>

</section>


<!-- KONTEN UTAMA -->
<main class="konten-utama">

    <div class="wrap">

        <div class="content-grid">


            <!-- ================= KALKULATOR ================= -->
            <section class="kalkulator">

                <div class="kalkulator-header">

                    <h2>
                        Masukkan data Anda
                    </h2>

                    <p>
                        Masukkan data sesuai hasil pemeriksaan terakhir
                        untuk mendapatkan perkiraan nilai eGFR.
                    </p>

                </div>


                <form id="egfrForm" class="kalkulator-form">


                    <!-- USIA -->
                    <div class="field">

                        <label for="usia">
                            <span class="field-icon">◉</span>
                            Usia (tahun)
                        </label>

                        <input
                            type="number"
                            id="usia"
                            name="usia"
                            placeholder="Contoh: 35"
                            min="1"
                            max="120"
                            required
                        >

                    </div>


                    <!-- JENIS KELAMIN -->
                    <div class="field">

                        <label for="jenisKelamin">
                            <span class="field-icon">◉</span>
                            Jenis kelamin
                        </label>

                        <select
                            id="jenisKelamin"
                            name="jenisKelamin"
                            required
                        >

                            <option value="">
                                Pilih jenis kelamin
                            </option>

                            <option value="pria">
                                Laki-laki
                            </option>

                            <option value="wanita">
                                Perempuan
                            </option>

                        </select>

                    </div>


                    <!-- KREATININ -->
                    <div class="field">

                        <label for="kreatinin">
                            <span class="field-icon">◉</span>
                            Kreatinin serum (mg/dL)
                        </label>

                        <input
                            type="number"
                            id="kreatinin"
                            name="kreatinin"
                            placeholder="Contoh: 1.0"
                            min="0.1"
                            step="0.01"
                            required
                        >

                    </div>


                    <!-- TOMBOL -->
                    <button
                        type="submit"
                        class="btn-hitung"
                    >
                        <span>▣</span>
                        Hitung eGFR
                    </button>

                </form>


                <!-- ERROR -->
                <div
                    id="errorMessage"
                    class="error"
                    style="display: none;"
                ></div>


                <!-- ================= HASIL ================= -->
                <div
                    id="hasil"
                    class="hasil"
                    style="display: none;"
                >

                    <div class="hasil-atas">

                        <div>

                            <span class="hasil-label">
                                Perkiraan eGFR
                            </span>

                            <div class="hasil-angka">

                                <span id="nilaiEgfr">
                                    0
                                </span>

                                <small>
                                    mL/min/1,73 m²
                                </small>

                            </div>

                        </div>


                        <div
                            id="kategoriEgfr"
                            class="badge-kategori"
                        >
                            -
                        </div>

                    </div>


                    <!-- DATA -->
                    <div class="hasil-baris">

                        <span>
                            Usia
                        </span>

                        <strong id="hasilUsia">
                            -
                        </strong>

                    </div>


                    <div class="hasil-baris">

                        <span>
                            Jenis kelamin
                        </span>

                        <strong id="hasilJenisKelamin">
                            -
                        </strong>

                    </div>


                    <div class="hasil-baris">

                        <span>
                            Kreatinin
                        </span>

                        <strong id="hasilKreatinin">
                            -
                        </strong>

                    </div>


                    <!-- SARAN -->
                    <div class="saran">

                        <h3>
                            Informasi
                        </h3>

                        <p id="pesanEgfr">
                            Hasil perhitungan akan ditampilkan di sini.
                        </p>

                    </div>

                </div>

            </section>



            <!-- ================= ARTIKEL ================= -->
            <aside class="artikel">

                <h2>
                    Artikel terkait
                </h2>


                <div class="artikel-tag">
                    Bacaan seputar kesehatan ginjal
                </div>


                <!-- CARD ARTIKEL -->
                <article class="artikel-card">

                    <div class="artikel-image">

                        <img
                            src="../assets/img/ginjal.jpg"
                            alt="Ilustrasi kesehatan ginjal"
                        >

                    </div>


                    <div class="artikel-body">

                        <span class="artikel-kategori">
                            Ginjal
                        </span>


                        <h3>
                            Mengenal Kesehatan Ginjal
                        </h3>


                        <p>
                            Mengenal fungsi ginjal, pentingnya menjaga kesehatan
                            ginjal, serta cara mengetahui gambaran fungsi ginjal.
                        </p>

                    </div>

                </article>

            </aside>

        </div>

    </div>

</main>


<!-- FOOTER -->
<footer class="foot">

    <div class="wrap">

        <p>
            © 2026 SehatKu. Semua hak dilindungi.
        </p>

    </div>

</footer>


<!-- JAVASCRIPT -->
<script src="../js/egfr.js"></script>

</body>
</html>
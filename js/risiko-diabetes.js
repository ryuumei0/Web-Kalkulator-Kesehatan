const formDiabetes = document.getElementById("form-diabetes");
const hasilDiabetes = document.getElementById("hasil-diabetes");

formDiabetes.addEventListener("submit", function(event) {
    event.preventDefault();

    // Mengambil data pengguna
    const usia = Number(document.getElementById("usia").value);
    const berat = Number(document.getElementById("berat").value);
    const tinggi = Number(document.getElementById("tinggi").value);
    const gender = document.getElementById("gender").value;
    const lingkar = Number(document.getElementById("lingkar").value);

    const keluarga = document.getElementById("keluarga").value;
    const aktivitas = document.getElementById("aktivitas").value;
    const tekanan = document.getElementById("tekanan").value;

    // Validasi input
    if (
        !Number.isFinite(usia) || usia <= 0 || usia > 120 ||
        !Number.isFinite(berat) || berat <= 0 ||
        !Number.isFinite(tinggi) || tinggi <= 0 ||
        !Number.isFinite(lingkar) || lingkar <= 0 ||
        !gender || !keluarga || !aktivitas || !tekanan
    ) {
        alert("Mohon isi semua data dengan benar!");
        return;
    }

    // Menghitung IMT
    const tinggiMeter = tinggi / 100;
    const imt = berat / (tinggiMeter * tinggiMeter);

    if (!Number.isFinite(imt)) {
        alert("Data tinggi atau berat badan tidak valid!");
        return;
    }

    // Menghitung skor simulasi
    let skor = 0;

    if (usia >= 40) skor += 2;
    if (usia >= 60) skor += 1;

    if (imt >= 25) skor += 2;
    if (imt >= 30) skor += 1;

    // Lingkar perut
    if (gender === "pria" && lingkar >= 90) {
        skor += 2;
    }

    if (gender === "wanita" && lingkar >= 80) {
        skor += 2;
    }

    // Riwayat keluarga
    if (keluarga === "ya") skor += 2;

    // Aktivitas fisik
    if (aktivitas === "tidak") skor += 1;

    // Tekanan darah tinggi
    if (tekanan === "ya") skor += 2;

    // Menentukan kategori
    let kategori;
    let saran;

    if (skor <= 2) {
        kategori = "Risiko relatif rendah";
        saran = "Pertahankan pola hidup sehat dan aktivitas fisik.";
    } else if (skor <= 5) {
        kategori = "Risiko perlu diperhatikan";
        saran = "Perbaiki pola makan, olahraga, dan pantau kesehatan.";
    } else {
        kategori = "Faktor risiko lebih banyak ditemukan";
        saran = "Konsultasikan kondisi kesehatan dan pertimbangkan pemeriksaan gula darah.";
    }

    // Menampilkan hasil
    hasilDiabetes.style.display = "block";

    hasilDiabetes.innerHTML = `
        <h2>Hasil Perhitungan</h2>
        <h3>IMT: ${imt.toFixed(2)}</h3>
        <h3>Skor Simulasi: ${skor}</h3>
        <h3>${kategori}</h3>
        <p>${saran}</p>
        <p>
            Hasil ini hanya menunjukkan faktor risiko
            berdasarkan data yang dimasukkan.
        </p>
    `;

    hasilDiabetes.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
});

// Reset hasil perhitungan
formDiabetes.addEventListener("reset", function() {
    hasilDiabetes.style.display = "none";
    hasilDiabetes.innerHTML = "";
});
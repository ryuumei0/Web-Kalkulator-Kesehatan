const formAsma = document.getElementById("form-asma");
const hasilAsma = document.getElementById("hasil-asma");

formAsma.addEventListener("submit", function(event) {
    event.preventDefault();

    let total = 0;

    // Mengambil nilai dari 5 pertanyaan
    for (let i = 1; i <= 5; i++) {
        const jawaban = document.querySelector(
            'input[name="q' + i + '"]:checked'
        );

        if (!jawaban) {
            alert("Silakan jawab semua pertanyaan terlebih dahulu!");
            return;
        }

        total += Number(jawaban.value);
    }

    let kategori;
    let saran;

    // Menentukan kategori berdasarkan skor
    if (total <= 19) {
        kategori = "Kendali asma belum baik";
        saran = "Sebaiknya konsultasikan kondisi asma kepada dokter.";
    } 
    else if (total <= 24) {
        kategori = "Kendali asma cukup baik";
        saran = "Tetap ikuti pengobatan dan pantau gejala asma.";
    } 
    else {
        kategori = "Kendali asma sangat baik";
        saran = "Pertahankan pengelolaan asma sesuai anjuran dokter.";
    }

    // Menampilkan hasil
    hasilAsma.style.display = "block";

    hasilAsma.innerHTML = `
        <h2>Hasil Penilaian Asma</h2>
        <h1>${total} / 25</h1>
        <h3>${kategori}</h3>
        <p>${saran}</p>
    `;

    hasilAsma.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
});

// Menghapus hasil ketika tombol reset ditekan
formAsma.addEventListener("reset", function() {
    hasilAsma.style.display = "none";
    hasilAsma.innerHTML = "";
});
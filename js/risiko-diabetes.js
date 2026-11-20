const form = document.getElementById("form-diabetes");
const hasil = document.getElementById("hasil-diabetes");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const usia = Number(document.getElementById("usia").value);
  const berat = Number(document.getElementById("berat").value);
  const tinggi = Number(document.getElementById("tinggi").value);
  const gender = document.getElementById("gender").value;
  const keluarga = document.getElementById("keluarga").value;
  const aktivitas = document.getElementById("aktivitas").value;
  const tekanan = document.getElementById("tekanan").value;

  if (
    !Number.isFinite(usia) ||
    !Number.isFinite(berat) ||
    !Number.isFinite(tinggi) ||
    usia < 1 || usia > 120 ||
    berat <= 0 || berat > 500 ||
    tinggi < 50 || tinggi > 250 ||
    !gender || !keluarga || !aktivitas || !tekanan
  ) {
    alert("Periksa kembali data yang kamu masukkan!");
    return;
  }

  const tinggiMeter = tinggi / 100;
  const bmi = berat / (tinggiMeter * tinggiMeter);

  let skor = 0;

  if (usia >= 60) {
    skor += 3;
  } else if (usia >= 50) {
    skor += 2;
  } else if (usia >= 40) {
    skor += 1;
  }

  if (bmi >= 30) {
    skor += 2;
  } else if (bmi >= 25) {
    skor += 1;
  }

  if (keluarga === "ya") skor += 2;
  if (aktivitas === "ya") skor += 1;
  if (tekanan === "ya") skor += 1;

  let kategori = "";
  let keterangan = "";

  if (skor <= 2) {
    kategori = "Risiko Rendah";
    keterangan = "Faktor risiko yang terhitung relatif sedikit. Tetap jaga pola hidup sehat.";
  } else if (skor <= 5) {
    kategori = "Risiko Sedang";
    keterangan = "Terdapat beberapa faktor risiko. Perhatikan pola makan dan aktivitas fisik.";
  } else {
    kategori = "Risiko Tinggi";
    keterangan = "Terdapat beberapa faktor risiko. Sebaiknya konsultasikan kondisi kesehatan dan lakukan pemeriksaan gula darah.";
  }

  hasil.style.display = "block";
  hasil.innerHTML = `
    <h3>Hasil Perhitungan Risiko Diabetes</h3>
    <p><strong>Usia:</strong> ${usia} tahun</p>
    <p><strong>Berat badan:</strong> ${berat} kg</p>
    <p><strong>Tinggi badan:</strong> ${tinggi} cm</p>
    <p><strong>Jenis kelamin:</strong> ${gender}</p>
    <hr>
    <p><strong>Indeks Massa Tubuh (BMI):</strong> ${bmi.toFixed(1)}</p>
    <p><strong>Skor risiko:</strong> ${skor} dari 9</p>
    <h3>${kategori}</h3>
    <p>${keterangan}</p>
    <p><strong>Perhatian:</strong> Hasil ini hanya simulasi edukasi, bukan diagnosis medis. Untuk mengetahui kondisi sebenarnya, lakukan pemeriksaan gula darah di fasilitas kesehatan.</p>
  `;

  hasil.scrollIntoView({ behavior: "smooth", block: "nearest" });
});

form.addEventListener("reset", function () {
  hasil.style.display = "none";
  hasil.innerHTML = "";
});
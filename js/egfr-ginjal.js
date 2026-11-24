document.addEventListener("DOMContentLoaded", function () {
  const formGinjal = document.getElementById("form-ginjal");
  const hasilGinjal = document.getElementById("hasil-ginjal");

  if (!formGinjal || !hasilGinjal) return;

  formGinjal.addEventListener("submit", function (event) {
    event.preventDefault();

    const usia = parseInt(document.getElementById("usia").value, 10);
    const gender = document.getElementById("gender").value;
    const kreatinin = parseFloat(document.getElementById("kreatinin").value);
    const riwayat = document.getElementById("riwayat").value;

    if (isNaN(usia) || usia < 18 || usia > 120) {
      tampilkanHasil("<p><strong>Perhatian:</strong> Persamaan dewasa berlaku untuk usia 18 – 120 tahun.</p>");
      return;
    }

    if (!gender) {
      tampilkanHasil("<p><strong>Perhatian:</strong> Silakan pilih jenis kelamin terlebih dahulu.</p>");
      return;
    }

    if (isNaN(kreatinin) || kreatinin <= 0 || kreatinin > 25) {
      tampilkanHasil("<p><strong>Perhatian:</strong> Masukkan nilai kreatinin serum yang valid (0,1 – 25 mg/dL).</p>");
      return;
    }

    // Rumus CKD-EPI 2021 berbasis kreatinin serum (mg/dL)
    const isFemale = gender === "perempuan";
    const kappa = isFemale ? 0.7 : 0.9;
    const alpha = isFemale ? -0.241 : -0.302;
    const rasio = kreatinin / kappa;
    const faktorMin = Math.pow(Math.min(rasio, 1), alpha);
    const faktorMax = Math.pow(Math.max(rasio, 1), -1.2);
    const faktorUsia = Math.pow(0.9938, usia);

    let egfr = 142 * faktorMin * faktorMax * faktorUsia;
    if (isFemale) {
      egfr *= 1.012;
    }

    const egfrBulat = Math.round(egfr);

    let stadium = "";
    let interpretasi = "";

    if (egfrBulat >= 90) {
      stadium = "G1 — Normal atau Tinggi (≥ 90 mL/min/1,73 m²)";
      interpretasi = "Estimasi laju filtrasi ginjal berada pada rentang normal atau tinggi.";
    } else if (egfrBulat >= 60) {
      stadium = "G2 — Penurunan Ringan (60 – 89 mL/min/1,73 m²)";
      interpretasi = "Terdapat penurunan ringan estimasi laju filtrasi glomerulus.";
    } else if (egfrBulat >= 45) {
      stadium = "G3a — Penurunan Ringan hingga Sedang (45 – 59 mL/min/1,73 m²)";
      interpretasi = "Fungsi penyaringan berada pada kategori penurunan ringan-sedang dan perlu evaluasi dokter.";
    } else if (egfrBulat >= 30) {
      stadium = "G3b — Penurunan Sedang hingga Berat (30 – 44 mL/min/1,73 m²)";
      interpretasi = "Fungsi penyaringan berada pada kategori penurunan sedang-berat; disarankan pemeriksaan medis lanjutan.";
    } else if (egfrBulat >= 15) {
      stadium = "G4 — Penurunan Berat (15 – 29 mL/min/1,73 m²)";
      interpretasi = "Penurunan fungsi ginjal tergolong berat; segera konsultasikan dengan dokter spesialis.";
    } else {
      stadium = "G5 — Gagal Ginjal (< 15 mL/min/1,73 m²)";
      interpretasi = "Estimasi laju filtrasi berada di bawah 15 mL/min/1,73 m²; diperlukan penanganan medis segera.";
    }

    let saran = "";
    if (riwayat === "ya" && egfrBulat >= 60) {
      saran = "Karena terdapat riwayat hipertensi atau diabetes, lakukan pemeriksaan fungsi ginjal dan urine secara berkala sesuai anjuran dokter.";
    } else if (egfrBulat < 60) {
      saran = "Sebaiknya diskusikan hasil laboratorium kreatinin ini dengan dokter untuk evaluasi lanjutan dan rencana pemantauan.";
    } else {
      saran = "Pertahankan pola hidup sehat, hidrasi yang cukup, serta kontrol tekanan darah dan gula darah secara rutin.";
    }

    hasilGinjal.innerHTML = `
      <h3>Hasil Estimasi Fungsi Ginjal</h3>
      <p><strong>Estimasi eGFR:</strong> <strong>${egfrBulat} mL/min/1,73 m²</strong></p>
      <p><strong>Kategori Stadium:</strong> ${stadium}</p>
      <p><strong>Interpretasi:</strong> ${interpretasi}</p>
      <p><strong>Saran Tindak Lanjut:</strong> ${saran}</p>
    `;
    hasilGinjal.style.display = "block";
  });

  formGinjal.addEventListener("reset", function () {
    hasilGinjal.innerHTML = "";
    hasilGinjal.style.display = "none";
  });

  function tampilkanHasil(html) {
    hasilGinjal.innerHTML = html;
    hasilGinjal.style.display = "block";
  }
});
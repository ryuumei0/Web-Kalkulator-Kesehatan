document.addEventListener("DOMContentLoaded", function () {
  const formJantung = document.getElementById("form-jantung");
  const hasilJantung = document.getElementById("hasil-jantung");

  if (!formJantung || !hasilJantung) return;

  const zonaIntensitas = {
    ringan: {
      nama: "Zona Ringan (Pemanasan & Pemulihan)",
      minPersen: 0.5,
      maxPersen: 0.6,
      rentangLabel: "50% – 60%",
    },
    sedang: {
      nama: "Zona Sedang (Pembakaran Lemak & Kardio Dasar)",
      minPersen: 0.6,
      maxPersen: 0.7,
      rentangLabel: "60% – 70%",
    },
    aerobik: {
      nama: "Zona Aerobik (Peningkatan Stamina)",
      minPersen: 0.7,
      maxPersen: 0.8,
      rentangLabel: "70% – 80%",
    },
    berat: {
      nama: "Zona Berat (Latihan Performa / Anaerobik)",
      minPersen: 0.8,
      maxPersen: 0.9,
      rentangLabel: "80% – 90%",
    },
  };

  formJantung.addEventListener("submit", function (event) {
    event.preventDefault();

    const usia = parseInt(document.getElementById("usia").value, 10);
    const rhr = parseInt(document.getElementById("rhr").value, 10);
    const targetZonaKey = document.getElementById("target-zona").value;
    const rutinOlahraga = document.getElementById("rutin-olahraga").value;
    const keluhan = document.getElementById("keluhan").value;

    if (isNaN(usia) || usia < 5 || usia > 100) {
      tampilkanHasil(
        "<p><strong>Perhatian:</strong> Masukkan usia yang valid (5 – 100 tahun).</p>",
      );
      return;
    }

    if (isNaN(rhr) || rhr < 35 || rhr > 130) {
      tampilkanHasil(
        "<p><strong>Perhatian:</strong> Masukkan detak jantung istirahat (RHR) yang valid (35 – 130 bpm).</p>",
      );
      return;
    }

    const hrMax = Math.round(208 - 0.7 * usia);

    if (rhr >= hrMax) {
      tampilkanHasil(
        "<p><strong>Perhatian:</strong> Detak jantung istirahat (RHR) harus lebih rendah dari estimasi detak jantung maksimal (" +
          hrMax +
          " bpm).</p>",
      );
      return;
    }

    const zonaTerpilih = zonaIntensitas[targetZonaKey] || zonaIntensitas.sedang;
    const hrReserve = hrMax - rhr;
    const targetMin = Math.round(hrReserve * zonaTerpilih.minPersen + rhr);
    const targetMax = Math.round(hrReserve * zonaTerpilih.maxPersen + rhr);

    let statusRhr = "";
    if (rhr < 60) {
      statusRhr =
        "Di bawah 60 bpm (umum pada orang yang rutin berolahraga aerobik; perhatikan bila muncul pusing atau lemas).";
    } else if (rhr <= 100) {
      statusRhr =
        "Normal (berada dalam rentang umum 60 – 100 bpm saat istirahat).";
    } else {
      statusRhr =
        "Tinggi (> 100 bpm saat istirahat; bisa dipicu kafein, stres, kurang tidur, dehidrasi, atau kondisi medis).";
    }

    let saranLatihan = "";
    if (keluhan === "ya") {
      saranLatihan =
        "<strong>Rekomendasi:</strong> Karena Anda memiliki keluhan berdebar atau nyeri dada saat beraktivitas, sebaiknya konsultasikan terlebih dahulu ke tenaga kesehatan sebelum menjalani latihan intensitas menengah hingga tinggi.";
    } else if (
      rutinOlahraga === "tidak" &&
      (targetZonaKey === "aerobik" || targetZonaKey === "berat")
    ) {
      saranLatihan =
        "<strong>Rekomendasi:</strong> Karena belum rutin berolahraga, disarankan memulai bertahap dari zona ringan atau sedang terlebih dahulu agar tubuh beradaptasi dengan aman.";
    } else {
      saranLatihan =
        "<strong>Rekomendasi:</strong> Pertahankan pemanasan 5–10 menit sebelum latihan, cukupi kebutuhan cairan, dan lakukan pendinginan setelah selesai.";
    }

    hasilJantung.innerHTML = `
            <h3>Hasil Perhitungan Zona Detak Jantung</h3>
            <p><strong>Estimasi Detak Jantung Maksimal (HRmax):</strong> ${hrMax} bpm</p>
            <p><strong>Status Detak Jantung Istirahat (${rhr} bpm):</strong> ${statusRhr}</p>
            <p><strong>Target Zona Terpilih:</strong> ${zonaTerpilih.nama} (${zonaTerpilih.rentangLabel})</p>
            <p><strong>Target Detak Jantung Latihan:</strong> <strong>${targetMin} – ${targetMax} bpm</strong></p>
            <p>${saranLatihan}</p>
        `;
    hasilJantung.style.display = "block";
  });

  formJantung.addEventListener("reset", function () {
    hasilJantung.innerHTML = "";
    hasilJantung.style.display = "none";
  });

  function tampilkanHasil(html) {
    hasilJantung.innerHTML = html;
    hasilJantung.style.display = "block";
  }
});

/* ============================================================
   Kalkulator eGFR — CKD-EPI 2021 (race-free)
   Referensi: Inker LA et al. NEJM 2021; KDIGO 2012/2024
   ============================================================ */

const form    = document.getElementById('egfrForm');
const errorEl = document.getElementById('error');
const hasilEl = document.getElementById('hasil');

function showError(msg) {
  errorEl.textContent = msg;
  errorEl.hidden = false;
}

function clearError() {
  errorEl.textContent = '';
  errorEl.hidden = true;
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  clearError();

  const jk   = document.getElementById('jk').value;
  const usia = parseFloat(document.getElementById('usia').value);
  const scr  = parseFloat(document.getElementById('scr').value);

  if ([usia, scr].some(Number.isNaN)) {
    showError('Lengkapi usia dan kreatinin serum terlebih dahulu.');
    return;
  }
  if (usia < 18 || usia > 120) return showError('Rumus eGFR ini untuk usia ≥ 18 tahun.');
  if (scr < 0.1 || scr > 20)   return showError('Kreatinin serum harus 0,1–20 mg/dL.');

  // Konstanta CKD-EPI 2021
  const kappa = jk === 'P' ? 0.7  : 0.9;
  const alpha = jk === 'P' ? -0.241 : -0.302;
  const ratio = scr / kappa;

  let egfr = 142
    * Math.pow(Math.min(ratio, 1), alpha)
    * Math.pow(Math.max(ratio, 1), -1.200)
    * Math.pow(0.9938, usia);

  if (jk === 'P') egfr *= 1.012;
  egfr = Math.round(egfr);

  // Stadium KDIGO
  let stadium, badgeClass, interpretasi;
  if (egfr >= 90) {
    stadium = 'G1 — Normal / Tinggi';
    badgeClass = 'normal';
    interpretasi = 'Fungsi ginjal normal. Jaga hidrasi & tekanan darah.';
  } else if (egfr >= 60) {
    stadium = 'G2 — Penurunan Ringan';
    badgeClass = 'normal';
    interpretasi = 'Penurunan ringan. Cek ulang berkala, waspadai faktor risiko.';
  } else if (egfr >= 45) {
    stadium = 'G3a — Ringan–Sedang';
    badgeClass = 'kurang';
    interpretasi = 'Penurunan ringan–sedang. Evaluasi albuminuria & penyebab.';
  } else if (egfr >= 30) {
    stadium = 'G3b — Sedang–Berat';
    badgeClass = 'gemuk';
    interpretasi = 'Penurunan sedang–berat. Rujuk ke dokter spesialis ginjal.';
  } else if (egfr >= 15) {
    stadium = 'G4 — Berat';
    badgeClass = 'obes1';
    interpretasi = 'Penurunan berat. Persiapan terapi pengganti ginjal perlu dipertimbangkan.';
  } else {
    stadium = 'G5 — Gagal Ginjal';
    badgeClass = 'obes2';
    interpretasi = 'Gagal ginjal. Segera konsultasi ke dokter spesialis ginjal (nefrologi).';
  }

  hasilEl.innerHTML = `
    <div class="hasil-atas">
      <span class="hasil-label">eGFR (mL/min/1,73 m²)</span>
      <span class="hasil-angka">${egfr}</span>
      <span class="badge-kategori ${badgeClass}">${stadium}</span>
    </div>
    <div class="hasil-baris"><span>Kreatinin serum</span><strong>${scr.toFixed(2)} mg/dL</strong></div>
    <div class="hasil-baris"><span>Usia</span><strong>${usia} tahun</strong></div>
    <div class="hasil-baris"><span>Jenis kelamin</span><strong>${jk === 'L' ? 'Laki-laki' : 'Perempuan'}</strong></div>
    <div class="hasil-baris"><span>Stadium KDIGO</span><strong>${stadium}</strong></div>
    <p class="saran">${interpretasi} Nilai eGFR dapat dipengaruhi kondisi akut (dehidrasi, infeksi, konsumsi obat tertentu). <strong>Konsultasikan hasil ini ke dokter</strong> untuk interpretasi klinis.</p>
    <p class="rumus">Rumus: CKD-EPI 2021 — eGFR = 142 × min(Scr/κ,1)^α × max(Scr/κ,1)^−1,200 × 0,9938^Usia × (1,012 jika perempuan). κ = 0,7 (P) / 0,9 (L).</p>
  `;
});

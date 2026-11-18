/* ============================================================
   Kalkulator Risiko Stroke — Skor CHA₂DS₂-VASc
   Referensi: Lip GYH et al. Chest 2010; Camm AJ et al. ESC 2020
   ============================================================ */

// Tabel risiko stroke per tahun berdasarkan skor (Lip 2010)
const RISIKO_TAHUNAN = {
  0: 0.0, 1: 1.3, 2: 2.2, 3: 3.2, 4: 4.0,
  5: 6.7, 6: 9.8, 7: 9.6, 8: 6.7, 9: 15.2
};

const form  = document.getElementById('strokeForm');
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

  const jk       = document.getElementById('jk').value;        // L / P
  const usia     = parseInt(document.getElementById('usia').value, 10);     // 0/1/2
  const chf      = parseInt(document.getElementById('chf').value, 10);      // 0/1
  const htn      = parseInt(document.getElementById('htn').value, 10);      // 0/1
  const dm       = parseInt(document.getElementById('dm').value, 10);       // 0/1
  const stroke   = parseInt(document.getElementById('stroke').value, 10);   // 0/2
  const vaskular = parseInt(document.getElementById('vaskular').value, 10); // 0/1

  const poinSex = jk === 'P' ? 1 : 0;

  if ([usia, chf, htn, dm, stroke, vaskular, poinSex].some(Number.isNaN)) {
    showError('Lengkapi semua isian terlebih dahulu.');
    return;
  }

  const skor = usia + chf + htn + dm + stroke + vaskular + poinSex;

  // Kategori & rekomendasi
  let kategori, badgeClass;
  if (skor <= 1) {
    kategori = 'Risiko Rendah';
    badgeClass = 'normal';
  } else if (skor === 2) {
    kategori = 'Risiko Sedang';
    badgeClass = 'kurang';
  } else {
    kategori = 'Risiko Tinggi';
    badgeClass = 'obes2';
  }

  // Rekomendasi antikoagulan sesuai jenis kelamin
  let rekomendasi;
  if (jk === 'L') {
    rekomendasi = skor >= 2
      ? 'Antikoagulan dianjurkan'
      : 'Belum perlu antikoagulan';
  } else {
    rekomendasi = skor >= 3
      ? 'Antikoagulan dianjurkan'
      : 'Belum perlu antikoagulan';
  }

  const risiko = RISIKO_TAHUNAN[Math.min(skor, 9)] ?? 15.2;

  // Bangun baris rincian skor
  const rincian = [
    { label: 'Usia',            nilai: usia,     teks: usia === 0 ? '< 65 th (0)' : usia === 1 ? '65–74 th (+1)' : '≥ 75 th (+2)' },
    { label: 'Jenis kelamin',   nilai: poinSex,  teks: jk === 'P' ? 'Perempuan (+1)' : 'Laki-laki (0)' },
    { label: 'Gagal jantung',   nilai: chf,      teks: chf ? 'Ya (+1)' : 'Tidak (0)' },
    { label: 'Hipertensi',      nilai: htn,      teks: htn ? 'Ya (+1)' : 'Tidak (0)' },
    { label: 'Diabetes',        nilai: dm,       teks: dm ? 'Ya (+1)' : 'Tidak (0)' },
    { label: 'Riwayat stroke',  nilai: stroke,   teks: stroke ? 'Ya (+2)' : 'Tidak (0)' },
    { label: 'Penyakit vaskular', nilai: vaskular, teks: vaskular ? 'Ya (+1)' : 'Tidak (0)' }
  ];

  const barisHTML = rincian.map(r =>
    `<div class="hasil-baris"><span>${r.label}</span><strong>${r.teks}</strong></div>`
  ).join('');

  hasilEl.innerHTML = `
    <div class="hasil-atas">
      <span class="hasil-label">Skor CHA₂DS₂-VASc</span>
      <span class="hasil-angka">${skor}</span>
      <span class="badge-kategori ${badgeClass}">${kategori}</span>
    </div>
    ${barisHTML}
    <div class="hasil-baris"><span>Risiko stroke / tahun</span><strong>± ${risiko.toFixed(1)}%</strong></div>
    <div class="hasil-baris"><span>Rekomendasi</span><strong>${rekomendasi}</strong></div>
    <p class="saran">
      <strong>Catatan:</strong> Skor tinggi bukan berarti pasti stroke. Antikoagulan juga mempertimbangkan risiko perdarahan (skor HAS-BLED).
      Diskusikan hasil ini dengan dokter spesialis jantung atau saraf.
    </p>
    <p class="rumus">Rumus: CHA₂DS₂-VASc (Lip et al., 2010) — Congestive HF, Hypertension, Age ≥75 (2), Diabetes, Stroke/TIA (2), Vascular disease, Age 65–74, Sex female.</p>
  `;
});

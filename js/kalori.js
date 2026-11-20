/* Kalkulator Kebutuhan Kalori (Mifflin-St Jeor) */

const form = document.getElementById('kaloriForm');
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

  const jk = document.getElementById('jk').value;
  const usia = parseFloat(document.getElementById('usia').value);
  const tb = parseFloat(document.getElementById('tb').value);
  const bb = parseFloat(document.getElementById('bb').value);
  const aktivitas = parseFloat(document.getElementById('aktivitas').value);

  if ([usia, tb, bb, aktivitas].some(Number.isNaN)) {
    showError('Lengkapi seluruh data terlebih dahulu.');
    return;
  }
  if (usia < 10 || usia > 120) return showError('Usia harus 10–120 tahun.');
  if (tb < 80 || tb > 250) return showError('Tinggi badan harus 80–250 cm.');
  if (bb < 20 || bb > 400) return showError('Berat badan harus 20–400 kg.');

  const bmr = jk === 'L'
    ? (10 * bb) + (6.25 * tb) - (5 * usia) + 5
    : (10 * bb) + (6.25 * tb) - (5 * usia) - 161;

  const tdee = bmr * aktivitas;
  const turun = tdee - 500;
  const naik = tdee + 500;
  const karbo = (tdee * 0.50) / 4;
  const prot = (tdee * 0.25) / 4;
  const lemak = (tdee * 0.25) / 9;
  const imt = bb / Math.pow(tb / 100, 2);

  hasilEl.innerHTML = `
    <div class="hasil-atas">
      <span class="hasil-label">Kebutuhan kalori harian (kkal)</span>
      <span class="hasil-angka">${Math.round(tdee)}</span>
      <span class="badge-kategori normal">Target pertahankan</span>
    </div>
    <div class="hasil-baris"><span>BMR (metabolisme basal)</span><strong>${Math.round(bmr)} kkal</strong></div>
    <div class="hasil-baris"><span>Target turun BB (−500 kkal)</span><strong>${Math.round(turun)} kkal</strong></div>
    <div class="hasil-baris"><span>Target naik BB (+500 kkal)</span><strong>${Math.round(naik)} kkal</strong></div>
    <div class="hasil-baris"><span>IMT Anda</span><strong>${imt.toFixed(1)} kg/m²</strong></div>
    <div class="hasil-baris"><span>Karbohidrat (50%)</span><strong>± ${Math.round(karbo)} g/hari</strong></div>
    <div class="hasil-baris"><span>Protein (25%)</span><strong>± ${Math.round(prot)} g/hari</strong></div>
    <div class="hasil-baris"><span>Lemak (25%)</span><strong>± ${Math.round(lemak)} g/hari</strong></div>
    <p class="saran">
      <strong>Panduan Isi Piringku:</strong> 50% sayur &amp; buah, 25% protein (ikan, ayam tanpa kulit, tempe, tahu),
      25% karbohidrat kompleks (nasi merah, oat, ubi). Batasi gula &lt;50 g/hari, garam &lt;5 g/hari, dan
      minum 8 gelas air setiap hari.
    </p>
    <p class="rumus">Rumus: Mifflin-St Jeor — BMR = 10×BB + 6,25×TB − 5×Usia + (5 pria / −161 wanita). TDEE = BMR × faktor aktivitas.</p>
  `;
});

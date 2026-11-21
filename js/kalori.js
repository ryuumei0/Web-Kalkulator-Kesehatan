
const form = document.getElementById('form-kalori');
const errorEl = document.getElementById('kalori-error');
const hasilEl = document.getElementById('hasil-kalori');

const out = {
  nilai: document.getElementById('kalori-nilai'),
  kategori: document.getElementById('kalori-kategori'),
  bmr: document.getElementById('kalori-bmr'),
  turun: document.getElementById('kalori-turun'),
  naik: document.getElementById('kalori-naik'),
  karbo: document.getElementById('kalori-karbo'),
  prot: document.getElementById('kalori-prot'),
  lemak: document.getElementById('kalori-lemak'),
  saran: document.getElementById('kalori-saran')
};

function showError(msg) {
  errorEl.textContent = msg;
  errorEl.hidden = false;
}

function clearError() {
  errorEl.textContent = '';
  errorEl.hidden = true;
}

function kategoriIMT(imt) {
  if (imt < 18.5) return 'Kurang';
  if (imt < 23) return 'Normal';
  if (imt < 25) return 'Berisiko';
  if (imt < 30) return 'Obesitas I';
  return 'Obesitas II';
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
  if (usia < 10 || usia > 120) { showError('Usia harus 10–120 tahun.'); return; }
  if (tb < 50 || tb > 250) { showError('Tinggi badan harus 50–250 cm.'); return; }
  if (bb < 20 || bb > 400) { showError('Berat badan harus 20–400 kg.'); return; }

  const bmr = jk === 'L'
    ? (10 * bb) + (6.25 * tb) - (5 * usia) + 5
    : (10 * bb) + (6.25 * tb) - (5 * usia) - 161;

  const tdee  = bmr * aktivitas;
  const turun = tdee - 500;
  const naik  = tdee + 500;

  const karbo = (tdee * 0.50) / 4;
  const prot  = (tdee * 0.25) / 4;
  const lemak = (tdee * 0.25) / 9;

  const imt = bb / Math.pow(tb / 100, 2);

  out.nilai.textContent = Math.round(tdee).toLocaleString('id-ID');
  out.kategori.textContent = 'kkal/hari';

  out.bmr.textContent   = Math.round(bmr).toLocaleString('id-ID') + ' kkal';
  out.turun.textContent = Math.round(turun).toLocaleString('id-ID') + ' kkal';
  out.naik.textContent  = Math.round(naik).toLocaleString('id-ID') + ' kkal';
  out.karbo.textContent = '± ' + Math.round(karbo) + ' g/hari';
  out.prot.textContent  = '± ' + Math.round(prot) + ' g/hari';
  out.lemak.textContent = '± ' + Math.round(lemak) + ' g/hari';

  out.saran.innerHTML = `
    <strong>IMT Anda: ${imt.toFixed(1)} kg/m² (${kategoriIMT(imt)}).</strong><br>
    <strong>Panduan Isi Piringku:</strong> 50% sayur &amp; buah, 25% protein (ikan, ayam tanpa kulit, tempe, tahu),
    25% karbohidrat kompleks (nasi merah, oat, ubi). Batasi gula &lt;50 g/hari, garam &lt;5 g/hari, dan
    minum 8 gelas air setiap hari.
  `;

  hasilEl.hidden = false;

  /* Di layar kecil, geser ke panel hasil biar langsung kelihatan */
  if (window.matchMedia('(max-width: 960px)').matches) {
    hasilEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
});

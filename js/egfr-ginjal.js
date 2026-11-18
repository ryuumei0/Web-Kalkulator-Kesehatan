// Kalkulator Kalori Harian (Mifflin-St Jeor)
(function () {
  var form = document.getElementById('form-kalori');
  if (!form) return;

  var jk = document.getElementById('jk');
  var usia = document.getElementById('usia');
  var tb = document.getElementById('tb');
  var bb = document.getElementById('bb');
  var aktivitas = document.getElementById('aktivitas');
  var error = document.getElementById('kalori-error');
  var hasil = document.getElementById('hasil-kalori');
  
  var elNilai = document.getElementById('kalori-nilai');
  var elKategori = document.getElementById('kalori-kategori');
  var elBmr = document.getElementById('kalori-bmr');
  var elTurun = document.getElementById('kalori-turun');
  var elNaik = document.getElementById('kalori-naik');
  var elKarbo = document.getElementById('kalori-karbo');
  var elProt = document.getElementById('kalori-prot');
  var elLemak = document.getElementById('kalori-lemak');
  var elSaran = document.getElementById('kalori-saran');

  function angka(value) {
    return parseFloat(String(value).replace(',', '.'));
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    var u = angka(usia.value);
    var t = angka(tb.value);
    var b = angka(bb.value);
    var faktor = angka(aktivitas.value);

    if (!u || !t || !b || !faktor || u <= 0 || t <= 0 || b <= 0) {
      error.hidden = false;
      hasil.hidden = true;
      return;
    }
    error.hidden = true;

    // Rumus Mifflin-St Jeor
    var bmr = (10 * b) + (6.25 * t) - (5 * u);
    bmr += (jk.value === 'L') ? 5 : -161;

    var tdee = bmr * faktor;
    
    // Hitungan makronutrien (50% karbo, 25% protein, 25% lemak)
    var karbo = (tdee * 0.50) / 4;
    var prot = (tdee * 0.25) / 4;
    var lemak = (tdee * 0.25) / 9;

    // Tampilkan hasil
    elNilai.textContent = Math.round(tdee);
    elKategori.textContent = 'kkal/hari';
    elKategori.className = 'badge-kategori normal';
    
    elBmr.textContent = Math.round(bmr) + ' kkal';
    elTurun.textContent = Math.round(tdee - 500) + ' kkal';
    elNaik.textContent = Math.round(tdee + 500) + ' kkal';
    elKarbo.textContent = Math.round(karbo) + ' g';
    elProt.textContent = Math.round(prot) + ' g';
    elLemak.textContent = Math.round(lemak) + ' g';

    elSaran.textContent = 'Ini adalah estimasi kebutuhan kalori Anda. Untuk menurunkan berat badan, ciptakan defisit 500 kkal/hari. Pastikan asupan gizi seimbang (Isi Piringku) dan rutin berolahraga.';

    hasil.hidden = false;
  });
})();

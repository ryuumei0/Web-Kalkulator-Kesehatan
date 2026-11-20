// Kalkulator Risiko Stroke (CHA2DS2-VASc)
(function () {
  var form = document.getElementById('form-stroke');
  if (!form) return;

  var jk = document.getElementById('jk');
  var usia = document.getElementById('usia');
  var chf = document.getElementById('chf');
  var htn = document.getElementById('htn');
  var dm = document.getElementById('dm');
  var stroke = document.getElementById('stroke');
  var vaskular = document.getElementById('vaskular');
  var error = document.getElementById('stroke-error');
  var hasil = document.getElementById('hasil-stroke');
  var elNilai = document.getElementById('stroke-nilai');
  var elKategori = document.getElementById('stroke-kategori');
  var elRisiko = document.getElementById('stroke-risiko');
  var elRekomendasi = document.getElementById('stroke-rekomendasi');
  var elSaran = document.getElementById('stroke-saran');

  var tabelRisiko = { 0: 0.0, 1: 1.3, 2: 2.2, 3: 3.2, 4: 4.0, 5: 6.7, 6: 9.8, 7: 9.6, 8: 6.7, 9: 15.2 };

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    var valJk = jk.value;
    var valUsia = parseInt(usia.value, 10);
    var valChf = parseInt(chf.value, 10);
    var valHtn = parseInt(htn.value, 10);
    var valDm = parseInt(dm.value, 10);
    var valStroke = parseInt(stroke.value, 10);
    var valVaskular = parseInt(vaskular.value, 10);

    if (isNaN(valUsia)) {
      error.hidden = false;
      hasil.hidden = true;
      return;
    }
    error.hidden = true;

    var poinJk = (valJk === 'P') ? 1 : 0;
    var skor = valUsia + valChf + valHtn + valDm + valStroke + valVaskular + poinJk;

    var kategori = '';
    var kelas = '';
    if (skor <= 1) {
      kategori = 'Risiko Rendah';
      kelas = 'normal';
    } else if (skor === 2) {
      kategori = 'Risiko Sedang';
      kelas = 'kurang';
    } else {
      kategori = 'Risiko Tinggi';
      kelas = 'obes2';
    }

    var rekomendasi = '';
    if (valJk === 'L') {
      rekomendasi = (skor >= 2) ? 'Antikoagulan Dianjurkan' : 'Belum Perlu Antikoagulan';
    } else {
      rekomendasi = (skor >= 3) ? 'Antikoagulan Dianjurkan' : 'Belum Perlu Antikoagulan';
    }

    var angkaRisiko = tabelRisiko[Math.min(skor, 9)] || 15.2;

    elNilai.textContent = skor;
    elKategori.textContent = kategori;
    elKategori.className = 'badge-kategori ' + kelas;
    elRisiko.textContent = '± ' + angkaRisiko.toFixed(1) + '%';
    elRekomendasi.textContent = rekomendasi;
    elSaran.textContent = 'Catatan: Skor tinggi bukan berarti pasti stroke. Antikoagulan juga mempertimbangkan risiko perdarahan (skor HAS-BLED). Diskusikan hasil ini dengan dokter spesialis jantung atau saraf.';

    hasil.hidden = false;
  });
})();

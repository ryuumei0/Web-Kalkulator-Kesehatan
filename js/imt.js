// Kalkulator IMT & berat badan ideal (klasifikasi Asia-Pasifik)
(function () {
  var form = document.getElementById('form-imt');
  if (!form) return;

  var berat = document.getElementById('berat');
  var tinggi = document.getElementById('tinggi');
  var error = document.getElementById('imt-error');
  var hasil = document.getElementById('hasil-imt');
  var nilai = document.getElementById('imt-nilai');
  var kategori = document.getElementById('imt-kategori');
  var ideal = document.getElementById('imt-ideal');
  var saran = document.getElementById('imt-saran');

  function angka(value) {
    return parseFloat(String(value).replace(',', '.'));
  }

  function rupiah(n) {
    return n.toFixed(1).replace('.', ',');
  }

  function klasifikasi(n) {
    if (n < 18.5) return { label: 'Kurang berat badan', kelas: 'kurang' };
    if (n < 23) return { label: 'Normal', kelas: 'normal' };
    if (n < 25) return { label: 'Gemuk (overweight)', kelas: 'gemuk' };
    if (n < 30) return { label: 'Obesitas I', kelas: 'obes1' };
    return { label: 'Obesitas II', kelas: 'obes2' };
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    var b = angka(berat.value);
    var t = angka(tinggi.value);

    if (!b || !t || b <= 0 || t <= 0 || t > 300) {
      error.hidden = false;
      hasil.hidden = true;
      return;
    }
    error.hidden = true;

    var meter = t / 100;
    var imt = b / (meter * meter);
    var info = klasifikasi(imt);
    var bawah = 18.5 * meter * meter;
    var atas = 22.9 * meter * meter;

    nilai.textContent = rupiah(imt);
    kategori.textContent = info.label;
    kategori.className = 'badge-kategori ' + info.kelas;
    ideal.textContent = rupiah(bawah) + ' – ' + rupiah(atas) + ' kg';

    if (b < bawah) {
      saran.textContent = 'Berat badan Anda di bawah rentang normal. Pertimbangkan untuk menambah sekitar ' + rupiah(bawah - b) + ' kg dengan pola makan sehat dan konsultasi ke tenaga kesehatan.';
    } else if (b > atas) {
      saran.textContent = 'Berat badan Anda di atas rentang normal. Menurunkan sekitar ' + rupiah(b - atas) + ' kg secara bertahap dapat membantu mencapai rentang sehat.';
    } else {
      saran.textContent = 'Berat badan Anda berada dalam rentang normal. Pertahankan pola makan seimbang dan aktivitas fisik rutin.';
    }

    hasil.hidden = false;
  });
})();

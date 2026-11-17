// Filter kategori + pencarian untuk halaman daftar kalkulator
(function () {
  var kartu = Array.prototype.slice.call(document.querySelectorAll('#grid .card'));
  var chips = Array.prototype.slice.call(document.querySelectorAll('#filters .chip'));
  var cari = document.getElementById('cari');
  var jumlah = document.getElementById('jumlah');
  var kosong = document.getElementById('kosong');
  var kategori = 'semua';

  function tampilkan() {
    var kata = cari.value.trim().toLowerCase();
    var terlihat = 0;
    kartu.forEach(function (k) {
      var cocokKategori = kategori === 'semua' || k.dataset.cat === kategori;
      var cocokKata = !kata || k.textContent.toLowerCase().indexOf(kata) !== -1;
      var tampil = cocokKategori && cocokKata;
      k.hidden = !tampil;
      if (tampil) terlihat++;
    });
    jumlah.textContent = terlihat + ' alat tersedia';
    kosong.hidden = terlihat !== 0;
  }

  chips.forEach(function (c) {
    c.addEventListener('click', function () {
      kategori = c.dataset.filter;
      chips.forEach(function (x) { x.classList.toggle('is-active', x === c); });
      tampilkan();
    });
  });

  cari.addEventListener('input', tampilkan);
})();

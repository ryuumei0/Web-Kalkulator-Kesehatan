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

// Garis bawah menu mengikuti bagian yang sedang dilihat
(function () {
  var links = Array.prototype.slice.call(document.querySelectorAll('.menu a[href^="#"]'));

  var bagian = links.map(function (link) {
    return {
      link: link,
      el: document.querySelector(link.getAttribute('href'))
    };
  }).filter(function (item) {
    return item.el !== null;
  });

  if (!bagian.length) return;

  function aktifkan(item) {
    bagian.forEach(function (b) {
      if (b === item) {
        b.link.setAttribute('aria-current', 'location');
      } else {
        b.link.removeAttribute('aria-current');
      }
    });
  }

  function perbaruiNav() {
    var posisi = window.pageYOffset + 90;
    var sekarang = bagian[0];

    bagian.forEach(function (b) {
      if (b.el.offsetTop <= posisi) sekarang = b;
    });

    var diBawah = window.innerHeight + window.pageYOffset >=
      document.documentElement.scrollHeight - 2;
    if (diBawah) sekarang = bagian[bagian.length - 1];

    aktifkan(sekarang);
  }

  bagian.forEach(function (b) {
    b.link.addEventListener('click', function () {
      aktifkan(b);
    });
  });

  window.addEventListener('scroll', perbaruiNav, { passive: true });
  window.addEventListener('resize', perbaruiNav);
  perbaruiNav();
})();

// tes tes WebTransportErrordocument.addEventListener("DOMContentLoaded", function () {
  const formSubur = document.getElementById("form-subur");
  const hasilSubur = document.getElementById("hasil-subur");

  if (!formSubur || !hasilSubur) return;

  function parseTanggalLokal(nilaiInput) {
    const bagian = nilaiInput.split("-");
    if (bagian.length !== 3) return null;
    const tahun = parseInt(bagian[0], 10);
    const bulan = parseInt(bagian[1], 10) - 1;
    const hari = parseInt(bagian[2], 10);
    const tanggal = new Date(tahun, bulan, hari);
    return isNaN(tanggal.getTime()) ? null : tanggal;
  }

  function tambahHari(tanggalAwal, jumlahHari) {
    const hasil = new Date(tanggalAwal.getFullYear(), tanggalAwal.getMonth(), tanggalAwal.getDate());
    hasil.setDate(hasil.getDate() + jumlahHari);
    return hasil;
  }

  function formatTanggalIndo(tanggal) {
    return tanggal.toLocaleDateString("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric"
    });
  }

  formSubur.addEventListener("submit", function (event) {
    event.preventDefault();

    const hphtRaw = document.getElementById("hpht").value;
    const panjangSiklus = parseInt(document.getElementById("siklus").value, 10);
    const keteraturan = document.getElementById("keteraturan").value;
    const tujuan = document.getElementById("tujuan").value;

    const hpht = parseTanggalLokal(hphtRaw);
    if (!hpht) {
      tampilkanHasil("<p><strong>Perhatian:</strong> Silakan pilih tanggal HPHT yang valid.</p>");
      return;
    }

    if (isNaN(panjangSiklus) || panjangSiklus < 20 || panjangSiklus > 45) {
      tampilkanHasil("<p><strong>Perhatian:</strong> Masukkan panjang siklus antara 20 hingga 45 hari.</p>");
      return;
    }

    // Perkiraan ovulasi sekitar 14 hari sebelum haid berikutnya
    const hariOvulasiDariHpht = Math.max(1, panjangSiklus - 14);
    const tanggalOvulasi = tambahHari(hpht, hariOvulasiDariHpht);
    const mulaiSubur = tambahHari(tanggalOvulasi, -4);
    const akhirSubur = tambahHari(tanggalOvulasi, 1);
    const haidBerikutnya = tambahHari(hpht, panjangSiklus);

    // Perkiraan HPL (aturan Naegele 280 hari disesuaikan selisih panjang siklus dari 28 hari)
    const offsetSiklus = panjangSiklus - 28;
    const tanggalHpl = tambahHari(hpht, 280 + offsetSiklus);

    const catatanKeteraturan =
      keteraturan === "tidak-teratur"
        ? "Karena siklus Anda tidak teratur, waktu ovulasi sebenarnya dapat bergeser lebih awal atau lebih lambat dari estimasi kalender."
        : "Estimasi dihitung berdasarkan siklus yang cenderung teratur dengan panjang " + panjangSiklus + " hari.";

    let fokusTujuan = "";
    if (tujuan === "promil") {
      fokusTujuan = "Rentang masa subur utama berada pada <strong>" + formatTanggalIndo(mulaiSubur) + "</strong> hingga <strong>" + formatTanggalIndo(akhirSubur) + "</strong>.";
    } else if (tujuan === "hpl") {
      fokusTujuan = "Apabila telah terjadi kehamilan pada siklus HPHT ini, estimasi Hari Perkiraan Lahir (HPL) berada sekitar <strong>" + formatTanggalIndo(tanggalHpl) + "</strong>.";
    } else {
      fokusTujuan = "Perkiraan hari pertama menstruasi berikutnya jatuh pada <strong>" + formatTanggalIndo(haidBerikutnya) + "</strong>.";
    }

    hasilSubur.innerHTML = `
      <h3>Hasil Estimasi Masa Subur &amp; HPL</h3>
      <p><strong>HPHT:</strong> ${formatTanggalIndo(hpht)} (Siklus ${panjangSiklus} hari)</p>
      <p><strong>Perkiraan Ovulasi:</strong> ${formatTanggalIndo(tanggalOvulasi)}</p>
      <p><strong>Perkiraan Masa Subur:</strong> <strong>${formatTanggalIndo(mulaiSubur)} – ${formatTanggalIndo(akhirSubur)}</strong></p>
      <p><strong>Perkiraan Haid Berikutnya:</strong> ${formatTanggalIndo(haidBerikutnya)}</p>
      <p><strong>Perkiraan HPL (bila hamil):</strong> <strong>${formatTanggalIndo(tanggalHpl)}</strong></p>
      <p>${fokusTujuan}</p>
      <p><strong>Catatan Siklus:</strong> ${catatanKeteraturan}</p>
    `;
    hasilSubur.style.display = "block";
  });

  formSubur.addEventListener("reset", function () {
    hasilSubur.innerHTML = "";
    hasilSubur.style.display = "none";
  });

  function tampilkanHasil(html) {
    hasilSubur.innerHTML = html;
    hasilSubur.style.display = "block";
  }
});
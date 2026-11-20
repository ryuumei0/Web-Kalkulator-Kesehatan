document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.getElementById("menuToggle");
  const menuUtama = document.getElementById("menuUtama");

  if (menuToggle && menuUtama) {
    menuToggle.addEventListener("click", function () {
      menuUtama.classList.toggle("active");
      menuToggle.setAttribute("aria-expanded", menuUtama.classList.contains("active"));
    });

    menuUtama.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        menuUtama.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  const formAsma = document.getElementById("form-asma");
  const hasilAsma = document.getElementById("hasil-asma");

  if (formAsma && hasilAsma) {
    formAsma.addEventListener("submit", function (event) {
      event.preventDefault();

      let total = 0;
      for (let i = 1; i <= 5; i++) {
        const jawaban = formAsma.querySelector(`input[name="q${i}"]:checked`);
        if (!jawaban) {
          alert("Silakan jawab semua pertanyaan terlebih dahulu!");
          return;
        }
        total += Number(jawaban.value);
      }

      let keterangan = "";
      if (total >= 20) {
        keterangan = "Asma terkontrol dengan baik.";
      } else if (total >= 16) {
        keterangan = "Asma belum terkontrol sepenuhnya.";
      } else {
        keterangan = "Asma mungkin belum terkontrol dengan baik.";
      }

      hasilAsma.style.display = "block";
      hasilAsma.innerHTML = `
        <h3>Hasil Tes Asma ACT</h3>
        <h2>${total} / 25</h2>
        <p>${keterangan}</p>
        <p>Hasil ini hanya simulasi edukasi, bukan diagnosis medis.</p>
      `;

      hasilAsma.scrollIntoView({ behavior: "smooth", block: "center" });
    });

    formAsma.addEventListener("reset", function () {
      hasilAsma.style.display = "none";
      hasilAsma.innerHTML = "";
    });
  }
});
(function () {
    // Klasifikasi tekanan darah dewasa menurut ACC/AHA 2017 (mmHg)
    var KATEGORI = {
        normal: {
            nama: "Normal",
            warna: "normal",
            teks: "Tekanan darah Anda normal. Pertahankan pola makan seimbang, aktif bergerak, tidur cukup, dan tetap periksa secara berkala."
        },
        meningkat: {
            nama: "Meningkat (Elevated)",
            warna: "meningkat",
            teks: "Tekanan darah sistolik Anda mulai di atas normal, tetapi belum termasuk hipertensi. Ubah gaya hidup sejak sekarang (kurangi garam, olahraga teratur, jaga berat badan) agar tidak naik menjadi hipertensi."
        },
        stadium1: {
            nama: "Hipertensi Stadium 1",
            warna: "stadium1",
            teks: "Angka Anda masuk kategori hipertensi stadium 1. Konsultasikan dengan dokter untuk memastikan lewat pengukuran berulang dan menentukan perlu tidaknya terapi, di samping perubahan gaya hidup."
        },
        stadium2: {
            nama: "Hipertensi Stadium 2",
            warna: "stadium2",
            teks: "Angka Anda masuk kategori hipertensi stadium 2. Sebaiknya segera berkonsultasi dengan dokter untuk evaluasi dan penanganan, yang umumnya meliputi obat dan perubahan gaya hidup."
        },
        krisis: {
            nama: "Krisis Hipertensi",
            warna: "krisis",
            teks: "Angka Anda berada pada rentang krisis hipertensi (di atas 180 dan/atau di atas 120 mmHg)."
        }
    };

    function tentukan(sis, dia) {
        if (sis > 180 || dia > 120) return "krisis";
        if (sis >= 140 || dia >= 90) return "stadium2";
        if (sis >= 130 || dia >= 80) return "stadium1";
        if (sis >= 120) return "meningkat";
        return "normal";
    }

    function init() {
        var form = document.getElementById("form-tensi");
        var hasilBox = document.getElementById("hasil-tensi");
        if (!form || !hasilBox) {
            console.error("[Tensi] form-tensi / hasil-tensi tidak ditemukan");
            return;
        }

        var baris = document.querySelectorAll(".tabel-tensi tr[data-kat]");

        function tandaiBaris(kunci) {
            for (var i = 0; i < baris.length; i++) {
                if (baris[i].getAttribute("data-kat") === kunci) {
                    baris[i].classList.add("aktif");
                } else {
                    baris[i].classList.remove("aktif");
                }
            }
        }

        function ambil(id) {
            var e = document.getElementById(id);
            return e ? String(e.value).trim() : "";
        }

        function tampilkan(html) {
            hasilBox.innerHTML = html;
            hasilBox.hidden = false;
            hasilBox.style.setProperty("display", "block", "important");
            hasilBox.style.setProperty("visibility", "visible", "important");
            hasilBox.style.setProperty("opacity", "1", "important");
            hasilBox.style.setProperty("height", "auto", "important");
            hasilBox.style.setProperty("max-height", "none", "important");
            hasilBox.style.setProperty("overflow", "visible", "important");
            try { hasilBox.scrollIntoView({ behavior: "smooth", block: "center" }); } catch (e) {}

            // Cadangan: jika kotak tetap tidak terlihat, tampilkan lewat alert
            setTimeout(function () {
                var r = hasilBox.getBoundingClientRect();
                if (r.width === 0 || r.height === 0) {
                    alert(hasilBox.innerText || hasilBox.textContent);
                }
            }, 150);
        }

        function hitung(event) {
            if (event) event.preventDefault();
            try {
                var sis = parseFloat(ambil("sistolik").replace(",", "."));
                var dia = parseFloat(ambil("diastolik").replace(",", "."));

                if (isNaN(sis) || isNaN(dia) || sis < 50 || sis > 300 || dia < 30 || dia > 200) {
                    tandaiBaris("");
                    tampilkan("<p>Mohon isi kedua angka dengan benar (sistole 50–300 mmHg, diastole 30–200 mmHg).</p>");
                    return;
                }

                if (dia >= sis) {
                    tandaiBaris("");
                    tampilkan("<p>Angka sistole (atas) harus lebih besar dari diastole (bawah). Mohon periksa kembali angka yang Anda masukkan.</p>");
                    return;
                }

                var kunci = tentukan(sis, dia);
                var kat = KATEGORI[kunci];
                tandaiBaris(kunci);

                var tambahan = "";
                if (kunci === "krisis") {
                    tambahan =
                        '<div class="peringatan-tensi"><strong>Duduk tenang 5 menit, lalu ukur ulang.</strong> ' +
                        "Jika angka tetap setinggi ini, hubungi dokter atau fasilitas kesehatan secepatnya. " +
                        "Bila disertai nyeri dada, sesak napas, sakit kepala hebat, pandangan kabur, kelemahan satu sisi tubuh, atau bicara pelo, " +
                        "<strong>segera ke IGD atau hubungi 119</strong> dan jangan menyetir sendiri.</div>";
                } else if (sis < 90 || dia < 60) {
                    tambahan =
                        "<p><strong>Catatan:</strong> Angka Anda di bawah 90/60 mmHg. Jika disertai pusing, mata berkunang, atau hampir pingsan, segera konsultasikan dengan dokter.</p>";
                }

                tampilkan(
                    "<h3>Hasil Kategori Tekanan Darah</h3>" +
                    '<div class="nilai-tensi">' + Math.round(sis) + "/" + Math.round(dia) + " mmHg</div>" +
                    '<div class="kategori-tensi k-' + kat.warna + '">' + kat.nama + "</div>" +
                    "<p>" + kat.teks + "</p>" +
                    tambahan +
                    "<hr>" +
                    "<p><strong>Ingat:</strong> satu kali pengukuran belum cukup untuk menegakkan diagnosis. Diagnosis hipertensi memerlukan pengukuran berulang dan evaluasi oleh dokter.</p>"
                );
            } catch (err) {
                console.error("[Tensi] Error:", err);
                tampilkan("<p><strong>Terjadi error:</strong> " + err.message + "</p>");
            }
        }

        form.addEventListener("submit", hitung);

        var tombol = form.querySelector(".btn-hitung");
        if (tombol) tombol.addEventListener("click", hitung);

        form.addEventListener("reset", function () {
            hasilBox.style.display = "none";
            hasilBox.innerHTML = "";
            tandaiBaris("");
        });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();

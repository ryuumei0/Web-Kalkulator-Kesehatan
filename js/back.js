import java.util.Scanner;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;

public class KalkulatorKesehatan {

    static Scanner input = new Scanner(System.in);

    public static void main(String[] args) {

        int pilihan;

        do {
            System.out.println("\n========================================");
            System.out.println("       KALKULATOR KESEHATAN");
            System.out.println("========================================");
            System.out.println("1. Kalkulator IMT");
            System.out.println("2. Kalkulator Fungsi Ginjal (eGFR)");
            System.out.println("3. Kalkulator Kebutuhan Kalori");
            System.out.println("4. Kalkulator Masa Subur & HPL");
            System.out.println("5. Kalkulator Tekanan Darah");
            System.out.println("6. Kalkulator Zona Detak Jantung");
            System.out.println("7. Kalkulator Risiko Stroke");
            System.out.println("8. Kalkulator Risiko Diabetes");
            System.out.println("9. Tes Kontrol Asma (ACT)");
            System.out.println("0. Keluar");
            System.out.println("========================================");

            System.out.print("Pilih menu: ");
            pilihan = input.nextInt();

            switch (pilihan) {

                case 1:
                    kalkulatorIMT();
                    break;

                case 2:
                    kalkulatorGinjal();
                    break;

                case 3:
                    kalkulatorKalori();
                    break;

                case 4:
                    kalkulatorMasaSubur();
                    break;

                case 5:
                    kalkulatorTekananDarah();
                    break;

                case 6:
                    kalkulatorDetakJantung();
                    break;

                case 7:
                    kalkulatorStroke();
                    break;

                case 8:
                    kalkulatorDiabetes();
                    break;

                case 9:
                    kalkulatorAsma();
                    break;

                case 0:
                    System.out.println("\nProgram selesai.");
                    break;

                default:
                    System.out.println("\nPilihan tidak tersedia!");
            }

        } while (pilihan != 0);

        input.close();
    }


    // =====================================================
    // 1. KALKULATOR IMT
    // =====================================================

    static void kalkulatorIMT() {

        System.out.println("\n========== KALKULATOR IMT ==========");

        System.out.print("Berat badan (kg): ");
        double berat = input.nextDouble();

        System.out.print("Tinggi badan (cm): ");
        double tinggi = input.nextDouble();

        System.out.print("Jenis kelamin (L/P): ");
        String gender = input.next();

        double tinggiMeter = tinggi / 100;

        double imt = berat / (tinggiMeter * tinggiMeter);

        String kategori;

        if (imt < 18.5) {
            kategori = "Berat badan kurang";
        } else if (imt < 23) {
            kategori = "Normal";
        } else if (imt < 25) {
            kategori = "Berat badan berlebih";
        } else if (imt < 30) {
            kategori = "Obesitas tingkat 1";
        } else {
            kategori = "Obesitas tingkat 2";
        }

        double beratIdealMin =
                18.5 * tinggiMeter * tinggiMeter;

        double beratIdealMax =
                22.9 * tinggiMeter * tinggiMeter;

        System.out.println("\n---------- HASIL ----------");
        System.out.printf("IMT              : %.2f%n", imt);
        System.out.println("Kategori         : " + kategori);
        System.out.printf("Berat ideal      : %.1f - %.1f kg%n",
                beratIdealMin, beratIdealMax);
    }


    // =====================================================
    // 2. KALKULATOR eGFR
    // =====================================================

    static void kalkulatorGinjal() {

        System.out.println("\n========== KALKULATOR eGFR ==========");

        System.out.print("Kreatinin (mg/dL): ");
        double kreatinin = input.nextDouble();

        System.out.print("Umur (tahun): ");
        int umur = input.nextInt();

        System.out.print("Jenis kelamin (L/P): ");
        String gender = input.next();

        double kappa;
        double alpha;

        if (gender.equalsIgnoreCase("P")) {
            kappa = 0.7;
            alpha = -0.241;
        } else {
            kappa = 0.9;
            alpha = -0.302;
        }

        double sexFactor;

        if (gender.equalsIgnoreCase("P")) {
            sexFactor = 1.012;
        } else {
            sexFactor = 1.0;
        }

        double eGFR =
                142
                * Math.pow(
                    Math.min(kreatinin / kappa, 1),
                    alpha
                )
                * Math.pow(
                    Math.max(kreatinin / kappa, 1),
                    -1.200
                )
                * Math.pow(0.9938, umur)
                * sexFactor;

        System.out.println("\n---------- HASIL ----------");
        System.out.printf("eGFR : %.2f mL/min/1.73m²%n", eGFR);

        if (eGFR >= 90) {
            System.out.println("Kategori : Normal / tinggi");
        } else if (eGFR >= 60) {
            System.out.println("Kategori : Penurunan ringan");
        } else if (eGFR >= 45) {
            System.out.println("Kategori : Penurunan ringan-sedang");
        } else if (eGFR >= 30) {
            System.out.println("Kategori : Penurunan sedang-berat");
        } else if (eGFR >= 15) {
            System.out.println("Kategori : Penurunan berat");
        } else {
            System.out.println("Kategori : Gagal ginjal");
        }
    }


    // =====================================================
    // 3. KALKULATOR KALORI
    // =====================================================

    static void kalkulatorKalori() {

        System.out.println("\n========== KALKULATOR KALORI ==========");

        System.out.print("Jenis kelamin (L/P): ");
        String gender = input.next();

        System.out.print("Umur (tahun): ");
        int umur = input.nextInt();

        System.out.print("Tinggi badan (cm): ");
        double tinggi = input.nextDouble();

        System.out.print("Berat badan (kg): ");
        double berat = input.nextDouble();

        System.out.println("\nAktivitas:");
        System.out.println("1. Sangat jarang");
        System.out.println("2. Ringan");
        System.out.println("3. Sedang");
        System.out.println("4. Berat");
        System.out.println("5. Sangat berat");

        System.out.print("Pilih aktivitas: ");
        int aktivitas = input.nextInt();

        double bmr;

        if (gender.equalsIgnoreCase("L")) {

            bmr = (10 * berat)
                    + (6.25 * tinggi)
                    - (5 * umur)
                    + 5;

        } else {

            bmr = (10 * berat)
                    + (6.25 * tinggi)
                    - (5 * umur)
                    - 161;
        }

        double faktor;

        switch (aktivitas) {

            case 1:
                faktor = 1.2;
                break;

            case 2:
                faktor = 1.375;
                break;

            case 3:
                faktor = 1.55;
                break;

            case 4:
                faktor = 1.725;
                break;

            case 5:
                faktor = 1.9;
                break;

            default:
                faktor = 1.2;
        }

        double tdee = bmr * faktor;

        System.out.println("\n---------- HASIL ----------");

        System.out.printf("BMR  : %.0f kkal/hari%n", bmr);

        System.out.printf("TDEE : %.0f kkal/hari%n", tdee);
    }


    // =====================================================
    // 4. MASA SUBUR & HPL
    // =====================================================

    static void kalkulatorMasaSubur() {

        System.out.println("\n========== MASA SUBUR & HPL ==========");

        input.nextLine();

        System.out.print("HPHT (yyyy-MM-dd): ");
        String tanggal = input.nextLine();

        System.out.print("Panjang siklus (hari): ");
        int siklus = input.nextInt();

        LocalDate hpht =
                LocalDate.parse(tanggal);

        LocalDate haidBerikutnya =
                hpht.plusDays(siklus);

        LocalDate ovulasi =
                haidBerikutnya.minusDays(14);

        LocalDate awalSubur =
                ovulasi.minusDays(5);

        LocalDate akhirSubur =
                ovulasi.plusDays(1);

        LocalDate hpl =
                hpht.plusDays(280);

        System.out.println("\n---------- HASIL ----------");

        System.out.println(
                "Perkiraan ovulasi : " + ovulasi
        );

        System.out.println(
                "Masa subur        : "
                + awalSubur
                + " s/d "
                + akhirSubur
        );

        System.out.println(
                "Perkiraan HPL      : " + hpl
        );
    }


    // =====================================================
    // 5. TEKANAN DARAH
    // =====================================================

    static void kalkulatorTekananDarah() {

        System.out.println("\n========== TEKANAN DARAH ==========");

        System.out.print("Sistole (atas): ");
        int sistole = input.nextInt();

        System.out.print("Diastole (bawah): ");
        int diastole = input.nextInt();

        String kategori;

        if (sistole < 120 && diastole < 80) {

            kategori = "Normal";

        } else if (sistole < 130 && diastole < 80) {

            kategori = "Meningkat";

        } else if (sistole < 140 || diastole < 90) {

            kategori = "Hipertensi Stadium 1";

        } else if (sistole < 180 || diastole < 120) {

            kategori = "Hipertensi Stadium 2";

        } else {

            kategori = "Krisis hipertensi";
        }

        System.out.println("\n---------- HASIL ----------");

        System.out.println(
                "Tekanan darah : "
                + sistole
                + "/"
                + diastole
                + " mmHg"
        );

        System.out.println(
                "Kategori : " + kategori
        );
    }


    // =====================================================
    // 6. DETAK JANTUNG
    // =====================================================

    static void kalkulatorDetakJantung() {

        System.out.println("\n========== DETAK JANTUNG ==========");

        System.out.print("Umur: ");
        int umur = input.nextInt();

        System.out.print(
                "Nadi istirahat (0 jika tidak ada): "
        );

        int resting = input.nextInt();

        double maxHeartRate =
                208 - (0.7 * umur);

        System.out.println("\n---------- HASIL ----------");

        System.out.printf(
                "Detak jantung maksimal : %.0f bpm%n",
                maxHeartRate
        );

        if (resting == 0) {

            System.out.println("\nZona latihan:");

            System.out.printf(
                    "Zona 1 : %.0f - %.0f bpm%n",
                    maxHeartRate * 0.50,
                    maxHeartRate * 0.60
            );

            System.out.printf(
                    "Zona 2 : %.0f - %.0f bpm%n",
                    maxHeartRate * 0.60,
                    maxHeartRate * 0.70
            );

            System.out.printf(
                    "Zona 3 : %.0f - %.0f bpm%n",
                    maxHeartRate * 0.70,
                    maxHeartRate * 0.80
            );

            System.out.printf(
                    "Zona 4 : %.0f - %.0f bpm%n",
                    maxHeartRate * 0.80,
                    maxHeartRate * 0.90
            );

            System.out.printf(
                    "Zona 5 : %.0f - %.0f bpm%n",
                    maxHeartRate * 0.90,
                    maxHeartRate
            );

        } else {

            double HRR =
                    maxHeartRate - resting;

            System.out.println("\nZona berdasarkan Karvonen:");

            for (int i = 1; i <= 5; i++) {

                double bawah =
                        resting + HRR * (0.50 + ((i - 1) * 0.10));

                double atas =
                        resting + HRR * (0.60 + ((i - 1) * 0.10));

                System.out.printf(
                        "Zona %d : %.0f - %.0f bpm%n",
                        i, bawah, atas
                );
            }
        }
    }


    // =====================================================
    // 7. RISIKO STROKE
    // =====================================================

    static void kalkulatorStroke() {

        System.out.println("\n========== RISIKO STROKE ==========");

        System.out.print("Jenis kelamin (L/P): ");
        String gender = input.next();

        System.out.print("Umur: ");
        int umur = input.nextInt();

        int skor = 0;

        if (gender.equalsIgnoreCase("P")) {
            skor += 1;
        }

        System.out.print(
                "Gagal jantung? (y/n): "
        );

        if (input.next().equalsIgnoreCase("y")) {
            skor += 1;
        }

        System.out.print(
                "Hipertensi? (y/n): "
        );

        if (input.next().equalsIgnoreCase("y")) {
            skor += 1;
        }

        if (umur >= 75) {

            skor += 2;

        } else if (umur >= 65) {

            skor += 1;
        }

        System.out.print(
                "Diabetes? (y/n): "
        );

        if (input.next().equalsIgnoreCase("y")) {
            skor += 1;
        }

        System.out.print(
                "Pernah stroke/TIA? (y/n): "
        );

        if (input.next().equalsIgnoreCase("y")) {
            skor += 2;
        }

        System.out.print(
                "Penyakit pembuluh darah? (y/n): "
        );

        if (input.next().equalsIgnoreCase("y")) {
            skor += 1;
        }

        System.out.println("\n---------- HASIL ----------");

        System.out.println(
                "Skor CHA2DS2-VASc : " + skor
        );

        if (gender.equalsIgnoreCase("L")) {

            if (skor >= 2) {
                System.out.println(
                        "Skor mencapai ambang risiko tinggi."
                );
            } else {
                System.out.println(
                        "Skor di bawah ambang tersebut."
                );
            }

        } else {

            if (skor >= 3) {
                System.out.println(
                        "Skor mencapai ambang risiko tinggi."
                );
            } else {
                System.out.println(
                        "Skor di bawah ambang tersebut."
                );
            }
        }
    }


    // =====================================================
    // 8. RISIKO DIABETES
    // =====================================================

    static void kalkulatorDiabetes() {

        System.out.println("\n========== RISIKO DIABETES ==========");

        System.out.print("Umur: ");
        int umur = input.nextInt();

        System.out.print("Jenis kelamin (L/P): ");
        String gender = input.next();

        System.out.print("Tinggi badan (cm): ");
        double tinggi = input.nextDouble();

        System.out.print("Berat badan (kg): ");
        double berat = input.nextDouble();

        double tinggiMeter = tinggi / 100;

        double imt =
                berat / (tinggiMeter * tinggiMeter);

        int skor = 0;

        // Umur
        if (umur >= 64) {
            skor += 3;
        } else if (umur >= 55) {
            skor += 2;
        } else if (umur >= 45) {
            skor += 1;
        }

        // IMT
        if (imt >= 30) {
            skor += 3;
        } else if (imt >= 25) {
            skor += 1;
        }

        System.out.print(
                "Pernah diabetes saat hamil / bayi > 4 kg? (y/n): "
        );

        if (input.next().equalsIgnoreCase("y")
                && gender.equalsIgnoreCase("P")) {

            skor += 1;
        }

        System.out.print(
                "Orang tua/saudara kandung diabetes? (y/n): "
        );

        if (input.next().equalsIgnoreCase("y")) {
            skor += 1;
        }

        System.out.print(
                "Tekanan darah >=140/90 atau obat hipertensi? (y/n): "
        );

        if (input.next().equalsIgnoreCase("y")) {
            skor += 1;
        }

        System.out.print(
                "Jarang olahraga? (y/n): "
        );

        if (input.next().equalsIgnoreCase("y")) {
            skor += 1;
        }

        // Membatasi skor maksimal
        if (skor > 10) {
            skor = 10;
        }

        System.out.println("\n---------- HASIL ----------");

        System.out.println(
                "IMT : " + String.format("%.1f", imt)
        );

        System.out.println(
                "Skor risiko diabetes : " + skor
        );

        if (skor >= 5) {

            System.out.println(
                    "Risiko diabetes meningkat."
            );

        } else {

            System.out.println(
                    "Risiko diabetes belum meningkat berdasarkan skrining ini."
            );
        }
    }


    // =====================================================
    // 9. TES KONTROL ASMA ACT
    // =====================================================

    static void kalkulatorAsma() {

        System.out.println("\n========== TES KONTROL ASMA ==========");

        int total = 0;

        System.out.println(
                "\nJawab setiap pertanyaan dengan nilai 1-5."
        );

        System.out.println(
                "1 = paling buruk, 5 = paling baik."
        );

        for (int i = 1; i <= 5; i++) {

            System.out.print(
                    "Nilai pertanyaan " + i + ": "
            );

            int nilai = input.nextInt();

            if (nilai < 1 || nilai > 5) {

                System.out.println(
                        "Nilai harus 1 sampai 5."
                );

                i--;

            } else {

                total += nilai;
            }
        }

        System.out.println("\n---------- HASIL ----------");

        System.out.println(
                "Total skor ACT : " + total
        );

        if (total >= 20) {

            System.out.println(
                    "Kontrol asma tergolong baik."
            );

        } else {

            System.out.println(
                    "Kontrol asma kurang baik."
            );
        }
    }
}
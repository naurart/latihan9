
        //  Jelaskan Kodingan ini apa, fungsi: Kode ini memastikan bahwa semua kode di dalamnya (seperti mencari tombol dan display) hanya akan dieksekusi setelah seluruh struktur HTML selesai dimuat oleh browser. 
        document.addEventListener('DOMContentLoaded', function() {
            
            //  Jelaskan Kodingan ini apa, fungsi: Baris ini menghubungkan kode JavaScript dengan elemen-elemen spesifik di HTML tersebut:
			//display: Mengambil layar hasil (kolom <input>).
			//statusImage: Mengambil wadah gambar status (wadah <div>).
			//buttons: Mengambil semua tombol kalkulator yang memiliki kelas .btn-calc.
            const display = document.getElementById('display');
            const statusImage = document.getElementById('statusImage');
            const buttons = document.querySelectorAll('.btn-calc');

            //  Jelaskan Kodingan ini apa, Fungsi: Baris ini mendefinisikan alamat URL gambar yang berbeda untuk ditampilkan pada status kalkulator:
			//imgNormal: Gambar default (saat normal).
			//imgSuccess: Gambar saat perhitungan sukses atau selesai.
			//imgError: Gambar saat terjadi kesalahan dalam perhitungan. 
            const imgNormal = 'https://placehold.co/400x100/374151/E5E7EB?text=Kalkulator';
            const imgSuccess = 'https://placehold.co/400x100/16A34A/FFFFFF?text=Sukses!';
            const imgError = 'https://placehold.co/400x100/DC2626/FFFFFF?text=Error!';

            /**
              Jelaskan Kodingan ini apa, Fungsi: Ini adalah sebuah fungsi yang bertugas mengubah gambar di bagian atas kalkulator, tergantung pada nilai state yang diberikan padanya ('success', 'error', atau lainnya):
			  Jika state adalah 'success', gambar diubah ke imgSuccess.
			  Jika state adalah 'error', gambar diubah ke imgError.
			  Jika selain itu, gambar diubah ke status normal. 
             */
            function changeImage(state) {
                if (state === 'success') {
                    statusImage.src = imgSuccess;
                    statusImage.alt = "Perhitungan Sukses";
                } else if (state === 'error') {
                    statusImage.src = imgError;
                    statusImage.alt = "Error Perhitungan";
                } else {
                    //  Jelaskan Kodingan ini apa, Fungsi: Baris ini dieksekusi ketika kondisi if dan else if di fungsi changeImage tidak terpenuhi. Ini berfungsi untuk mengembalikan gambar status ke keadaan default (imgNormal) dengan teks alternatif "Status Kalkulator".
                    statusImage.src = imgNormal;
                    statusImage.alt = "Status Kalkulator";
                }
            }

            /**
              Jelaskan Kodingan ini apa, Fungsi: Fungsi ini dipanggil saat tombol C ditekan.
			  display.value = '';: Mengubah nilai (isi) layar menjadi kosong ('').
			  changeImage('normal');: Mengembalikan gambar status ke kondisi normal atau standby.
             */
            function clearDisplay() {
                display.value = '';
                changeImage('normal'); // Memanggil function untuk merubah gambar
            }

            /**
              Jelaskan Kodingan ini apa, Fungsi: Fungsi ini dipanggil saat tombol DEL ditekan.
			  display.value.slice(0, -1): Mengambil semua isi layar kecuali karakter terakhir. 
             */
            function deleteLastChar() {
                display.value = display.value.slice(0, -1);
            }

            /**
              Jelaskan Kodingan ini apa, Fungsi: Fungsi ini dipanggil saat tombol angka atau operator ditekan.
			  display.value += value: Menambahkan (+=) nilai tombol (value) ke akhir isi layar saat ini. 
             */
            function appendToDisplay(value) {
                display.value += value;
            }

            /**
              Jelaskan Kodingan ini apa, fungsi: Ini adalah fungsi yang dipanggil saat tombol = ditekan. Ini menggunakan blok try...catch untuk menangani kesalahan. 
             */
            function calculateResult() {
                //  Jelaskan Kodingan ini apa, Fungsi: Jika layar (input) kosong:
				//Ganti Gambar ke status error.
				//Tampilkan pesan "Kosong!" di layar.
				//return: Menghentikan eksekusi fungsi. 
                if (display.value === '') {
                    changeImage('error');
                    display.value = 'Kosong!';
                    //  Jelaskan Kodingan ini apa, fungsi: setTimeout(clearDisplay, 1500): Menjalankan fungsi clearDisplay setelah 1,5 detik (1500 milidetik). 
                    setTimeout(clearDisplay, 1500);
                    return;
                }

                try {
                    //  Jelaskan Kodingan ini apa, Fungsi: Tempat kode perhitungan inti berada.
                    let result = eval(display.value
                        .replace(/%/g, '/100') //  Jelaskan Kodingan ini apa, fungsi: display.value.replace(/×/g, '*').replace(/÷/g, '/'): Ini adalah proses persiapan input. Karena JavaScript tidak mengenali simbol × dan ÷, kode ini mengganti kedua simbol tersebut menjadi operator yang dikenali (* dan /). 
                    ); 
                    
                    //  Jelaskan Kodingan ini apa, fungsi: Pengecekan Hasil perhitungan dan Tampilan Sukses
					//if (!isFinite(result)): Mengecek apakah hasilnya tidak terhingga (contoh: hasil dari pembagian dengan nol). Jika tidak terhingga, kode akan melempar error (melompat ke blok catch).
					//display.value = result: Jika hasil valid, tampilkan hasil di layar.				
                    if (isFinite(result)) {
                        display.value = result;
                        changeImage('success'); //  Jelaskan Kodingan ini apa, changeImage('success'): Ganti gambar status menjadi sukses.	  
                    } else {
                        throw new Error("Hasil tidak valid");
                    }
				
               //Jelaskan Kodingan ini apa, fungsi: Blok ini berjalan hanya jika ada masalah (error) di dalam blok try (misalnya: sintaks yang salah, atau throw new Error dipanggil).
			   //display.value = 'Error!': Menampilkan pesan "Error!" di layar.
			   //setTimeout(clearDisplay, 1500): Membersihkan layar setelah 1,5 detik.
                } catch (error) {
                    console.error("Error kalkulasi:", error);
                    display.value = 'Error';
                    changeImage('error'); //  Jelaskan Kodingan ini apa, changeImage('error'): Ganti gambar status menjadi error. 
                    setTimeout(clearDisplay, 1500);
                }
            }


            //  Jelaskan Kodingan ini apa, Fungsi: Kode ini melakukan looping (perulangan) pada semua tombol (buttons) yang sudah diambil sebelumnya.
            //addEventListener('click', ...): Memasang pendengar (listener) pada setiap tombol. Ketika tombol diklik, fungsi di dalamnya akan dijalankan.
			//const value = ...: Mengambil nilai tombol (misalnya 7, C, atau +) dari atribut data-value di HTML.			
            buttons.forEach(button => {
                button.addEventListener('click', () => {
                    const value = button.getAttribute('data-value');

                    //  Jelaskan Kodingan ini apa, Fungsi: switch(value) memeriksa nilai (value) dari tombol yang diklik dan menjalankan aksi yang sesuai: 
                    switch(value) {
                        case 'C':
                            //  Jelaskan Kodingan ini apa, fungsi: Memanggil clearDisplay() (membersihkan layar). 
                            clearDisplay();
                            break;
                        case 'DEL':
                            //  Jelaskan Kodingan ini apa, fungsi: Memanggil deleteLastChar() (menghapus 1 karakter). 
                            deleteLastChar();
                            break;
                        case '=':
                            //  Jelaskan Kodingan ini apa, fungsi: Memanggil calculateResult() (menghitung hasil).
                            calculateResult();
                            break;
                        default: //  Jelaskan Kodingan ini apa, fungsi: Menjalankan logika default (semua tombol yang bukan C, DEL, atau =).
                        	// Fungsi: Ini adalah logika yang diterapkan pada tombol Angka (1-9, 0) dan Operator (+, -, *, /, .).
							//if (...): Mengecek apakah status gambar saat ini adalah Sukses atau Error. Jika ya, layar dibersihkan terlebih dahulu (clearDisplay()). Ini mencegah pengguna mengetik langsung setelah hasil ditampilkan.
							//appendToDisplay(value): Setelah pengecekan, nilai tombol ditambahkan ke layar.						
                            if (statusImage.src === imgSuccess || statusImage.src === imgError) {
                                clearDisplay();
                            }
                            appendToDisplay(value);
                            break;
                    }
                });
            });

            //  Jelaskan Kodingan ini apa, Fungsi: Memasang pendengar pada seluruh halaman (document). Ketika ada tombol keyboard ditekan (keydown), fungsi di dalamnya akan dijalankan. 
            document.addEventListener('keydown', (e) => {
                const key = e.key;

                if (key >= '0' && key <= '9' || key === '.' || key === '+' || key === '-' || key === '*' || key === '/' || key === '%') {
                    if (statusImage.src === imgSuccess || statusImage.src === imgError) {
                        clearDisplay();
                    }
                    appendToDisplay(key);
                    e.preventDefault();
                } else if (key === 'Enter' || key === '=') {
                    calculateResult();
                    e.preventDefault();
                } else if (key === 'Backspace') {
                    deleteLastChar();
                    e.preventDefault();
                } else if (key === 'Escape' || key.toLowerCase() === 'c') {
                    clearDisplay();
                    e.preventDefault();
                }
            });

        });

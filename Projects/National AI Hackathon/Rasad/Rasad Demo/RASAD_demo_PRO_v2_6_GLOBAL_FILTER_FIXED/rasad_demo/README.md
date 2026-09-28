# RASAD — interaktiv demo v2.6

RASAD iqtisodiy xavflarni intellektual tahlil qilish va ekspert qarorini qo‘llab-quvvatlash platformasining HTML/CSS/JS namoyish versiyasi.

## Ishga tushirish

`index.html` faylini zamonaviy brauzerda oching.

Yaxshiroq natija uchun lokal server:

```bash
python -m http.server 8080
```

so‘ng brauzerda `http://localhost:8080/rasad_demo/` yoki katalog ichidan ishga tushirilgan bo‘lsa `http://localhost:8080/` ni oching.

## Asosiy imkoniyatlar

- rasmga maksimal yaqin professional RASAD boshqaruv paneli;
- 12 ta real ishlaydigan navigatsiya bo‘limi;
- global qidiruv (`Ctrl + K`);
- hudud, tarmoq va xavf bo‘yicha filtrlash;
- O‘zbekistonning 14 ma’muriy hududi uchun onlayn GeoJSON xaritasi va oflayn zaxira sxemasi;
- subyektlar jadvali va batafsil kartasi;
- `Nega?` izoh paneli;
- ekspert qarorini saqlash (localStorage);
- qarorlar tarixi;
- aloqa grafigi;
- ogohlantirishlar markazi;
- hisobot yaratish va yuklab olish;
- CSV eksport;
- 7 bosqichli ma’lumot importi demosi;
- ma’lumot sifati ko‘rsatkichlari;
- model reyestri va tasdiqlangan modelni faollashtirish;
- model monitoringi;
- audit jurnali;
- foydalanuvchi rollari simulyatsiyasi;
- xavf chegaralarini sozlash va localStorage’da saqlash;
- moslashuvchan desktop/tablet/mobile ko‘rinish;
- sintetik demo ma’lumotlari.

## Muhim eslatma

Barcha ko‘rsatilgan tashkilotlar, miqdorlar, xavf ballari va ko‘rsatkichlar namoyish uchun sintetik yaratilgan. Ular real tashkilotlar yoki rasmiy statistik ma’lumot sifatida talqin qilinmasligi kerak.

Onlayn O‘zbekiston xaritasi OpenStreetMap qatlamlari va ochiq GeoJSON manbasi orqali yuklanadi. Internet mavjud bo‘lmasa, demo ichidagi zaxira sxematik xarita ko‘rsatiladi.

## v2.6 tuzatishlar
- Hududiy xarita manbasi `master` tarmog‘idan amaldagi `main` tarmog‘iga tuzatildi.
- 14 ma’muriy hudud nomlari `ADM1_UZ` bo‘yicha aniq moslashtirildi; apostrof va inglizcha nom variantlari uchun barqaror moslashtirish qo‘shildi.
- Noto‘g‘ri sxematik xarita zaxira ko‘rinishi olib tashlandi; xarita yuklanmasa, foydalanuvchiga aniq xato holati va qayta urinish tugmasi ko‘rsatiladi.
- Leaflet xarita qayta chizilishida o‘lcham va tanlangan hudud konturi tuzatildi.
- Hudud tanlash, reyting qatori va bosh sahifa hudud filtri o‘zaro bog‘landi.
- Trend grafigidagi 13 nuqta / 12 oy nomuvofiqligi tuzatildi.
- Hududlar bo‘yicha sintetik subyektlar jami bosh sahifadagi 24 382 ko‘rsatkichiga moslashtirildi.
- Ekspert qarorini izohsiz saqlash taqiqlandi.
- “Nega?” panelidagi past xavf rang holati tuzatildi.
- Bosh sahifa filtrlari yuqori e’tibor talab qiluvchi subyektlar jadvaliga real qo‘llanadi.

## v2.6 — markazlashgan hududiy filtr
- Xarita yoki hududlar reytingidan hudud tanlansa, `state.region` yagona global filtr sifatida ishlaydi.
- KPI, xavf taqsimoti, vaqt dinamikasi, tarmoqlar, xavf omillari, subyektlar va ogohlantirishlar shu kesim bo‘yicha qayta hisoblanadi.
- Faol filtrlar yuqorida chip ko‘rinishida ko‘rsatiladi va alohida yoki to‘liq bekor qilinadi.
- Hududiy hisobotlar joriy hudud/tarmoq/davr kontekstini saqlaydi.
- Tanlangan hudud xaritada aniq ajratiladi, qolgan hududlar xiralashtiriladi.

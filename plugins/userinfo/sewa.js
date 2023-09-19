exports.run = {
  usage: ['sewabot'],
  hidden: ['sewa'],
  category: 'payment',
  async: async (m, {
    client
  }) => {
    let teks = ` –  *S E W A - B O T*
   
  ➠ Sewa 
    ┌  ◦  5k / 7 Hari
    │  ◦  10k / 15 Hari
    │  ◦  15k / 30 Hari
    └  ◦  30k / 60 Hari
  Bot masuk ke grup Kamu
    
  ➠ Premium
    ┌  ◦  10k / 30 Hari
    └  ◦  20k / 60 Hari
  Untuk mendapatkan fitur khusus Premium
  
  ➠ Pembayaran
    ┌  ◦  Pulsa / Tanya owner dulu
    └  ◦  Ovo : 089530656600
  Metode pembayaran  
  
  ${global.footer}`
  client.sendMessageModify(m.chat, teks, m, {
      largeThumb: true,
      thumbnail: 'https://telegra.ph/file/f41f0b7e5c4773cf1ccc7.jpg'
    })
  },
  error: false,
  cache: true,
  location: __filename
}

exports.run = {
   usage: ['premium'],
   category: 'payment',
   async: async (m, {
      client,
      isPrefix
   }) => {
     client.sendMessageModify(m.chat, `🏷️ Upgrade ke paket premium hanya Rp. 20.000,- untuk mendapatkan limit 1K selama 1 bulan Jika ingin membeli hubungi ketik: *${isPrefix}owner*`, m, {
       largeThumb: true,
       thumbnail: 'https://telegra.ph/file/8b94971888bb985fa3fca.jpg'
     })
   },
   error: false,
   cache: true,
   location: __filename
}

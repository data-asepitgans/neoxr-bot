exports.run = {
   usage: ['harga'],
   category: 'payment',
   async: async (m, {
      client,
      isPrefix
   }) => {
     client.sendMessageModify(m.chat, `🏷️ *Harga Crack Facebook* \n- 1 Minggu 30.000\n- 2 Minggu 60.000\n- 3 Minggu 90.0000\n- 1 bulan 120.000\n\n *Unlimited/Permanen*\n- Open source 350.000\n- Unlimited 250.000\n\nJika ingin membeli hubungi ketik: *${isPrefix}owner*`, m, {
       largeThumb: true,
       thumbnail: 'https://telegra.ph/file/e4cc6734ed0b3a97d50ce.jpg'
     })
   },
   error: false,
   cache: true,
   location: __filename
}

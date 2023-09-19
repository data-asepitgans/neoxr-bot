exports.run = {
   usage: ['resep'],
   use: 'query',
   category: 'utilities',
   async: async (m, {
      client,
      text,
      isPrefix,
      command,
      Func
   }) => {
      try {
         if (!text) return client.reply(m.chat, Func.example(isPrefix, command, 'ayam bakar'), m)
         client.sendReact(m.chat, '🕒', m.key)
         const json = await Api.neoxr('/resep', {
            q: text
         })
         client.sendReact(m.chat, '✅', m.key)
         if (!json.status) return client.reply(m.chat, global.status.fail, m)
         let bahan = '\n\n•  *B A H A N*\n\n',
            step = '\n•  *L A N G K A H - L A N G K A H*\n\n'
         for (let i = 0; i < json.data.bahan.length; i++) bahan += '	-  ' + json.data.bahan[i] + '\n'
         for (let i = 0; i < json.data.langkah.length; i++) step += json.data.langkah[i] + '\n\n'
         client.sendFile(m.chat, json.data.thumb, '', `•  *R E S E P - K O K I*\n\n	- *Title* : ${json.data.title}\n	- *Timeout* : ${json.data.timeout}\n	- *Porsi* : ${json.data.porsi +bahan + step.slice(0, -2)}\n\n${global.footer}`, m)
      } catch (e) {
         console.log(e)
         return client.reply(m.chat, global.status.error, m)
      }
   },
   error: false,
   restrict: true,
   limit: true,
   cache: true,
   location: __filename
}

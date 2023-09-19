exports.run = {
   usage: ['listonline'],
   hidden: ['here'],
   category: 'group',
   async: async (m, {
      client,
      Func,
      store
   }) => {
      let online = [...Object.keys(store.presences[m.chat])]
      client.sendMessageModify(m.chat, online.map(v => '➸ @' + v.replace(/@.+/, '')).join('\n'), m, {
          largeThumb: true,
          thumbnail: 'https://iili.io/J9mkvX2.md.jpg'
      })
   },
   error: false,
   group: true
}

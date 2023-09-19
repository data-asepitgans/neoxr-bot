exports.run = {
   usage: ['comic'],
   hidden: ['chapter'],
   use: 'query',
   category: 'utilities',
   async: async (m, {
      client,
      text,
      isPrefix,
      command,
      env,
      Func
   }) => {
      try {
         client.comic = client.comic ? client.comic : []
         if (command == 'comic') {
            if (!text) return client.reply(m.chat, Func.example(isPrefix, command, 'tensei'), m)
            const check = client.comic.find(v => v.jid == m.sender)
            if (!check && !isNaN(text)) return m.reply(Func.texted('bold', `© Your session has expired / does not exist, do another search using the keywords you want.`))
            if (check && !isNaN(text)) {
               if (Number(text) > check.results.length) return m.reply(Func.texted('bold', `© Exceed amount of data.`))
               client.sendReact(m.chat, '🕒', m.key)
               const json = await Api.neoxr('/comic-get', {
                  url: check.results[Number(text) - 1]
               })
               client.sendReact(m.chat, '✅', m.key)
               if (!json.status) return client.reply(m.chat, Func.jsonFormat(json), m)
               check.chapters = json.data.chapters.reverse().map(v => v.url)
               let caption = `•  *C O M I C*\n\n`
               for (let key in json.data)
                  if (!/thumbnail|sinopsis|chapters/i.test(key)) caption += `	-  *${Func.ucword(key)}* : ${json.data[key]}\n`
               caption += `\n•  *C H A P T E R S*\n\n`
               caption += `Use the *${isPrefix}chapter number* command to render comics\n`
               caption += `*Example* : ${isPrefix}chapter 1\n\n`
               caption += json.data.chapters.reverse().map(v => `• *${v.title}* (${v.release})\n*Link* : ${v.url}`).join('\n\n')
               caption += `\n\n${global.footer}`
               client.sendMessageModify(m.chat, caption, m, {
                  largeThumb: true,
                  thumbnail: await Func.fetchBuffer(json.data.thumbnail)
               })
            } else {
               client.sendReact(m.chat, '🕒', m.key)
               const check = client.comic.find(v => v.jid == m.sender)
               const json = await Api.neoxr('/comic', {
                  q: text
               })
               client.sendReact(m.chat, '✅', m.key)
               if (!json.status) return client.reply(m.chat, Func.jsonFormat(json), m)
               if (!check) {
                  client.comic.push({
                     jid: m.sender,
                     results: json.data.map(v => v.url),
                     created_at: new Date * 1
                  })
               } else check.results = json.data.map(v => v.url)
               let p = `To showing information use this command *${isPrefix + command} number*\n`
               p += `*Example* : ${isPrefix + command} 1\n\n`
               json.data.map((v, i) => {
                  p += `*${i+1}*. ${v.title}\n`
                  p += `- *Type* : ${v.type}\n`
                  p += `- *Chapter* : ${v.chapter}\n`
                  p += `- *Score* : ${v.score}\n\n`
               }).join('\n\n')
               p += global.footer
               client.reply(m.chat, p, m)
            }
            setInterval(async () => {
               const session = client.comic.find(v => v.jid == m.sender)
               if (session && new Date - session.created_at > env.timeout) {
                  Func.removeItem(client.comic, session)
               }
            }, 60_000)
         } else if (command == 'chapter') {
            const check = client.comic.find(v => v.jid == m.sender)
            if (!check && !isNaN(text)) return m.reply(Func.texted('bold', `© Your session has expired / does not exist, do another search using the keywords you want.`))
            if (check && !isNaN(text)) {
               if (Number(text) > check.chapters.length) return m.reply(Func.texted('bold', `© Exceed amount of data.`))
               client.sendReact(m.chat, '🕒', m.key)
               const json = await Api.neoxr('/comic-render', {
                  url: check.chapters[Number(text) - 1]
               })
               client.sendReact(m.chat, '✅', m.key)
               if (!json.status) return m.reply(Func.jsonFormat(json))
               for (let image of json.data) {
                  await Func.delay(2000)
                  client.sendFile(m.chat, image, 'img.jpg', '', m)
               }
            }
         }
      } catch (e) {
         console.log(e)
         client.reply(m.chat, Func.jsonFormat(e), m)
      }
   },
   error: false,
   limit: true,
   restrict: true,
   cache: true,
   location: __filename
}

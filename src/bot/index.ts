const { Telegraf } = require('telegraf');
const TEXTS_CONFIG = {
    startText: "Привет! Я буду напоминать тебе делать вовремя то, что нужно делать раз в какое-то время. Например, подать счетчики в ЖКУ.Используй команду /напомни, чтобы создать напоминание. Пример сообщения: \"Период: неделя\"",
};

const bot = new Telegraf(process.env.MY_API_KEY);
const notes = [];

bot.start((ctx) => ctx.reply(TEXTS_CONFIG.startText));
bot.on('sticker', (ctx) => ctx.reply('👍'));

bot.hears(/напомни (.+) в (.+)/, (ctx, msg, match) => {
    const userId = ctx.from.id;
    const firstUserName = ctx.from.first_name;
    const text = ctx.match[1];
    const time = ctx.match[2];
    
    notes.push({ 'userId': userId, 'firstUserName': firstUserName,'time': time, 'text': text });
    ctx.reply(`${firstUserName}, отлично! Я обязательно напомню тебе ${text} в ${time}.`);
});
setInterval(() => {
    const date = new Date();
    for (let i = 0; i < notes.length; i++) {
        const currentData = date.getHours() + ':' + date.getMinutes();
        console.log(notes[i]['time'] === currentData);
        if (notes[i]['time'] === currentData) {
            console.log((`${notes[i]['firstUserName']}, вам нужно ${notes[i]['text']} сейчас.`));
            notes.splice(i, 1);
        }
    }
}, 10000);
bot.launch();
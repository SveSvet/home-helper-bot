const { Telegraf } = require('telegraf');
const TEXTS_CONFIG = {
    startText: "Привет! Я буду напоминать тебе делать вовремя то, что нужно делать раз в какое-то время. Например, подать счетчики в ЖКУ. Для начала введи период для напоминания.",

};

const bot = new Telegraf(process.env.MY_API_KEY);

bot.start((ctx) => ctx.reply(TEXTS_CONFIG.startText));
bot.help((ctx) => ctx.reply('Send me a sticker'));
bot.on('sticker', (ctx) => ctx.reply('👍'));
bot.on('message', (ctx) => ctx.reply('👍'));
bot.hears('hi', (ctx) => ctx.reply('Hey there'));
bot.launch();
import { Telegraf } from "telegraf";
import { responses } from "./responses";

const bot = new Telegraf(Bun.env["BOT_TOKEN"]!);

const commandRegex = /^!se2\s+(.+)/;

bot.hears(commandRegex, async (ctx) => {
  const text = ctx.msg.text;
  const command = text.match(commandRegex);

  if (!command) return;

  const keyword = command[1];

  const response = responses[keyword];

  if (!response) {
    await ctx.reply("🔴 I could not find a response for that keyword!", {
      reply_parameters: { message_id: ctx.msg.message_id },
    });
    return;
  }

  console.log(response);
  await ctx.reply(response, {
    reply_parameters: { message_id: ctx.msg.message_id },
    parse_mode: "HTML",
  });
});

await bot.launch();

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));

import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = normalize(join(fileURLToPath(new URL(".", import.meta.url)), ".."));
const publicDir = normalize(join(rootDir, "dist"));
const port = Number(process.env.PORT || 3000);
const botToken = process.env.BOT_TOKEN || "";
const appBaseUrl = (process.env.APP_BASE_URL || "").replace(/\/$/, "");
const telegramBaseUrl = botToken ? `https://api.telegram.org/bot${botToken}` : "";
const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
};

let offset = 0;
let stopped = false;

async function telegramApi(method, body = {}) {
  const response = await fetch(`${telegramBaseUrl}/${method}`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
  const result = await response.json();
  if (!result.ok) throw new Error(`${method}: ${result.description || "Telegram API error"}`);
  return result.result;
}

async function configureBot() {
  const me = await telegramApi("getMe");
  await telegramApi("deleteWebhook", { drop_pending_updates: false });
  await telegramApi("setMyCommands", {
    commands: [
      { command: "start", description: "Открыть PostgreSQL Exam Prep" },
      { command: "progress", description: "Открыть прогресс подготовки" },
    ],
  });
  await telegramApi("setChatMenuButton", {
    menu_button: appBaseUrl
      ? { type: "web_app", text: "Открыть Exam Prep", web_app: { url: appBaseUrl } }
      : { type: "commands" },
  });
  console.log(`Telegram bot ready: @${me.username}`);
}

async function sendMiniApp(chatId, path = "") {
  if (!appBaseUrl) {
    await telegramApi("sendMessage", {
      chat_id: chatId,
      text: "Mini App URL ещё не настроен. Добавьте APP_BASE_URL и перезапустите сервер.",
    });
    return;
  }

  await telegramApi("sendMessage", {
    chat_id: chatId,
    text: "PostgreSQL Exam Prep готов. Откройте тренажёр кнопкой ниже.",
    reply_markup: {
      inline_keyboard: [[{ text: "Открыть Mini App", web_app: { url: `${appBaseUrl}/${path}` } }]],
    },
  });
}

async function pollTelegram() {
  if (!botToken) {
    console.log("BOT_TOKEN not set: web server started without Telegram polling.");
    return;
  }

  try {
    await configureBot();
  } catch (error) {
    console.error(`Telegram setup failed: ${error.message}`);
    return;
  }

  while (!stopped) {
    try {
      const updates = await telegramApi("getUpdates", { timeout: 25, offset });
      for (const update of updates) {
        offset = update.update_id + 1;
        const message = update.message;
        if (!message?.text) continue;
        if (message.text.startsWith("/start")) await sendMiniApp(message.chat.id);
        if (message.text.startsWith("/progress")) await sendMiniApp(message.chat.id, "#/progress");
      }
    } catch (error) {
      console.error(`Telegram polling error: ${error.message}`);
      await new Promise((resolve) => setTimeout(resolve, 3000));
    }
  }
}

async function serveStatic(pathname, response) {
  const requested = pathname === "/" ? "index.html" : pathname.replace(/^\/+/, "");
  let filePath = normalize(join(publicDir, requested));
  if (!filePath.startsWith(publicDir)) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }

  try {
    const details = await stat(filePath);
    if (details.isDirectory()) filePath = join(filePath, "index.html");
    const file = await readFile(filePath);
    response.writeHead(200, {
      "content-type": contentTypes[extname(filePath)] || "application/octet-stream",
      "cache-control": filePath.endsWith("index.html") ? "no-cache" : "public, max-age=31536000, immutable",
    });
    response.end(file);
  } catch {
    const index = await readFile(join(publicDir, "index.html"));
    response.writeHead(200, { "content-type": contentTypes[".html"], "cache-control": "no-cache" });
    response.end(index);
  }
}

const server = createServer(async (request, response) => {
  const url = new URL(request.url || "/", `http://${request.headers.host}`);
  if (url.pathname === "/health") {
    response.writeHead(200, {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store, max-age=0",
    });
    response.end(JSON.stringify({ ok: true, telegramConfigured: Boolean(botToken && appBaseUrl) }));
    return;
  }
  if (request.method === "GET") return serveStatic(url.pathname, response);
  response.writeHead(405);
  response.end("Method not allowed");
});

server.listen(port, () => {
  console.log(`Mini App server: http://localhost:${port}`);
  if (appBaseUrl) console.log(`Public Mini App: ${appBaseUrl}`);
  void pollTelegram();
});

function shutdown() {
  stopped = true;
  server.close(() => process.exit(0));
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

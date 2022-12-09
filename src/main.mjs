import { google } from 'googleapis';
import { WebClient } from '@slack/web-api';
import dayjs from 'dayjs';

const getLuckyWinner = async (today, jsonSecret) => {

  const serviceAccountEmail = jsonSecret?.client_email || process.env.SERVICE_ACCOUNT_EMAIL;
  const serviceAccountKey = jsonSecret?.private_key || process.env.SERVICE_ACCOUNT_KEY || '';

  console.log(`usingAccountEmail: ${serviceAccountEmail}`);

  const auth = new google.auth.JWT({
    email: serviceAccountEmail,
    key: serviceAccountKey,
    scopes: [
      'https://www.googleapis.com/auth/drive',
      'https://www.googleapis.com/auth/spreadsheets.readonly'
    ]
  });

  const sheet = google.sheets('v4')

  console.log('spreadsheet: ', process.env.SPREADSHEET_ID);

  const spreadsheetData = await sheet.spreadsheets.values.get({
    spreadsheetId: process.env.SPREADSHEET_ID,
    auth: auth,
    range: 'Daily Scrum!A1:B',
  });

  const rows = spreadsheetData.data.values || [];
  for (const row of rows) {
    if (row.includes(today)) {
      return row[1];
    }
  }
};

const sendSlackChannelMessage = async (message, channelId, botName, icon) => {
  const token = process.env.SLACK_API_TOKEN;
  const web = new WebClient(token);
  await web.chat.postMessage({
    channel: channelId,
    text: message,
    username: botName,
    icon_emoji: icon
  });
}

export const main = async (googleJsonSecret) => {
  const today = dayjs().format('MMM D, YYYY');
  const luckyWinner = await getLuckyWinner(today, googleJsonSecret);

  console.log(today, luckyWinner);
  sendSlackChannelMessage(`<!here> _${today}_ - *${luckyWinner}*, you are today\'s lucky winner!`, '#test-zapier', 'Daily Scrum Bot', ':alarm_clock:');
  sendSlackChannelMessage(`<!here> _${today}_ - *${luckyWinner}*, you are today\'s lucky winner!`, '#drc-f1-app-team', 'Daily Scrum Bot', ':alarm_clock:');
}

(async () => {
  if (process.env.IS_CLI) {
    await main();
  }
})().then(() => console.log('finished!'));
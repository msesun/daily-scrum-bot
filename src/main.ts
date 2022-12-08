import { google } from 'googleapis';
import fs from 'fs'
import { WebClient } from '@slack/web-api';
import dayjs from 'dayjs';

const getLuckyWinner = async (today: string) => {

  const fileName = process.env.GOOGLE_CREDENTIALS;
  const credentials = JSON.parse(fs.readFileSync(`src/${fileName}`, 'utf-8'));
  const auth = new google.auth.JWT({
    email: credentials.client_email,
    key: credentials.private_key,
    scopes: [
      'https://www.googleapis.com/auth/drive',
      'https://www.googleapis.com/auth/spreadsheets.readonly'
    ]
  })
  const sheet = google.sheets('v4')
  const spreadsheetData = await sheet.spreadsheets.values.get({
      spreadsheetId: process.env.SPREADSHEET_ID,
      auth: auth,
      range: 'Daily Scrum!A1:B',
    });

  const rows = spreadsheetData.data.values || [];
  console.log(rows);

  for (const row of rows) {

    if (row.includes(today)) {
      return row[1];
    }
  }
};

const sendSlackChannelMessage = async (message: string, channelId: string, botName: string, icon: string) => {
  const token = process.env.SLACK_API_TOKEN;
  const web = new WebClient(token);
  await web.chat.postMessage({
    channel: channelId,
    text: message,
    username: botName,
    icon_emoji: icon
  });
}

const main = async () => {
  const today = dayjs().format('MMM D, YYYY');
  const luckyWinner = await getLuckyWinner(today);

  console.log(today, luckyWinner);
  sendSlackChannelMessage(`<!here> _${today}_ - *${luckyWinner}*, you are today\'s lucky winner!`, '#test-zapier', 'Daily Scrum Bot', ':alarm_clock:');
}

main();

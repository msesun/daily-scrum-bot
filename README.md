# Daily Scrum Bot

### A simple application to randomize daily scrum presenter.
### Currently pulls data from a Google Sheets
### Hosted at [Netlify](daily-scrum-bot.netlify.app) 
---
Uses typescript 
Uses Google API to grab Google Sheets data 
Uses [@slack/web-api](https://www.npmjs.com/package/@slack/web-api) to send channel messages 

Environment variables needed:
- SLACK_API_TOKEN
- SPREADSHEET_ID
- GOOGLE_CREDENTIALS
- SERVICE_ACCOUNT_EMAIL
- SERVICE_ACCOUNT_KEY

You will also need a credentials.json file that includes the private key for this service account:
[https://console.cloud.google.com/iam-admin/iam?project=daily-scrum-bot](https://console.cloud.google.com/iam-admin/iam?project=daily-scrum-bot)

Run locally
---
To run script:  
`npm start`


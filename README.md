# Daily Scrum Bot

### A simple application to randomize daily scrum presenter.
### Currently pulls data from a Google Sheets
---
Uses typescript 
Uses Google API to grab Google Sheets data 
Uses [@slack/web-api](https://www.npmjs.com/package/@slack/web-api) to send channel messages 

Environment variables needed:
- SLACK_API_TOKEN
- SPREADSHEET_ID
- GOOGLE_CREDENTIALS

You will also need a credentials.json file that includes the private key for this service account:
[https://console.cloud.google.com/iam-admin/iam?project=daily-scrum-bot](https://console.cloud.google.com/iam-admin/iam?project=daily-scrum-bot)

Run locally
---
To run script:  
`npm start`


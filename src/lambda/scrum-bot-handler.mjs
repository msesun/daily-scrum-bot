import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
import timezone from 'dayjs/plugin/timezone.js'; // dependent on utc plugin
import { main } from '../main.mjs';
import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager";

dayjs.extend(utc);
dayjs.extend(timezone);

const googleCredSecretName = "scrum-bot/google";

export const handler = async (event, context) => {
  console.log(event);
  const forceRun = event?.forceRun;

  const currentTime = dayjs().tz('America/Chicago');
  console.log(`currentHour: ${currentTime.hour()}, currentDay: ${currentTime.day()}`);

  const isWeekDay = 1 <= currentTime.day() && currentTime.day() <= 5;
  const shouldRun = isWeekDay && currentTime.hour() === 9;

  if(!shouldRun && !forceRun) {
    console.log('Not 9am on a weekday... aborting.');
    return;
  }

  console.log('processing the lucky winner!');
  const googleJsonSecret = await fetchGoogleSecret();
  console.log('retrieved secrets');
  await main(googleJsonSecret);
}

const fetchGoogleSecret = async () => {

  const client = new SecretsManagerClient();

  const response = await client.send(
    new GetSecretValueCommand({
      SecretId: googleCredSecretName
    })
  );

  const secret = response.SecretString;
  const jsonSecret = JSON.parse(secret);

  return jsonSecret;
}

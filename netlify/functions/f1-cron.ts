import { Handler, HandlerEvent, HandlerContext, schedule } from '@netlify/functions';

const weekdayCron: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  await fetch(process.env.BUILD_HOOK || '', {
    method: 'POST'
  }).then(response => {
    console.log('Build hook response:', response)
  })

  return {
      statusCode: 200,
  };
};

const handler = schedule('0 10 * * 1-5', weekdayCron)

export { handler };
// handle requests and reponses
import { ServerResponse, IncomingMessage } from 'http';
import { main } from './main';

interface IParams {
    team: 'f1' | 'f4',
    channel: string; // slack channel without hash ie drc-f1-app-team
}

const get = async (req: IncomingMessage, res: ServerResponse, params: IParams = { team: 'f1', channel: '#test-zapier' }) => {

    try {

        let spreadsheetId = process.env.SPREADSHEET_ID || '';
        const channel = params.channel || '#test-zapier';

        if (params.team === 'f4') {
            spreadsheetId = process.env.F4_SPREADSHEET_ID || '';
        }
        // send test message
        const result = await main(channel, spreadsheetId);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(
            JSON.stringify({
                success: true,
                ...result
            })
        )
    } catch (e) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(
            JSON.stringify({ success: false, error: e })
        );
    }
};

export { get };
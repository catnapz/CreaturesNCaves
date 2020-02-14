import * as express from 'express';
import * as path from 'path'
import * as bodyParser from 'body-parser';
const app: express.Application = express();

const peWebAppPath = path.join(__dirname, 'client');
const peWebIndex = path.join(peWebAppPath, 'index.html');

console.log('Content Path: ' + peWebAppPath);

app.use(express.static(peWebAppPath));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * Responds to /health with 200
 */
app.get('/health', (req: express.Request, res: express.Response) => {
	res.status(200).send('Healthy');
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
	res.sendFile(peWebIndex);
});

process.on('SIGTERM', () => {
	console.log('Received SIGTERM, shutting down now...');
	// TODO: Graceful shutdown of express 
	process.exit();
});

export default app;
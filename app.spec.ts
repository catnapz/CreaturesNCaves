import app from './app';
import * as request from 'supertest';

describe('App', () => {

    it('should repond to /health', async () => {
        const req: request.Request = request(app).get('/health');
        const res = await req;
        expect(res.status).toBe(200);
    });

});


const request = require('supertest');
const app = require('../src/app');

// ─── Tests : Route racine ─────────────────────────────────────────────────────
describe('GET /', () => {
  it('doit retourner un message de bienvenue', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message');
    expect(res.body.status).toBe('ok');
  });
});

// ─── Tests : Health Check ─────────────────────────────────────────────────────
describe('GET /health', () => {
  it('doit retourner le statut healthy', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('healthy');
    expect(res.body).toHaveProperty('timestamp');
  });
});

// ─── Tests : Addition ─────────────────────────────────────────────────────────
describe('GET /add', () => {
  it('doit additionner deux nombres correctement', async () => {
    const res = await request(app).get('/add?a=5&b=3');
    expect(res.statusCode).toBe(200);
    expect(res.body.result).toBe(8);
  });

  it('doit gérer les nombres négatifs', async () => {
    const res = await request(app).get('/add?a=-2&b=7');
    expect(res.statusCode).toBe(200);
    expect(res.body.result).toBe(5);
  });

  it('doit retourner une erreur si les paramètres ne sont pas des nombres', async () => {
    const res = await request(app).get('/add?a=abc&b=3');
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });
});

// ─── Tests : Hello ────────────────────────────────────────────────────────────
describe('GET /hello/:name', () => {
  it('doit saluer par le nom', async () => {
    const res = await request(app).get('/hello/Alice');
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Bonjour, Alice !');
  });
});

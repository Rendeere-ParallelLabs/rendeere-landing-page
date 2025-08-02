// deploy.js
const http = require('http');
const { spawn } = require('child_process');
const createHandler = require('github-webhook-handler');

const handler = createHandler({
  path: '/webhook',
  secret: 'rendeere-webhook-secret'
});

// Middleware HTTP
http.createServer((req, res) => {
  handler(req, res, err => {
    // If not /webhook, return 404
    res.statusCode = 404;
    res.end('no such location');
  });
}).listen(7777, () => {
  console.log('🌐 Listening webhooks in http://localhost:7777/webhook');
});

// Signature error logs / parsing
handler.on('error', err => {
  console.error('❌ Webhook Error:', err.message);
});

// When the push comes
handler.on('push', event => {
  console.log(`✅ Push event received: repo=${event.payload.repository.full_name} branch=${event.payload.ref}`);
  if (event.payload.ref === 'refs/heads/main') {
    console.log('>> Push to main, starting deploy...');
    deploy();
  } else {
    console.log('>> Push to another branch, doing nothing.');
  }
});

function deploy() {
  const cmd = spawn('sh', ['deploy.sh']);
  cmd.stdout.on('data', data => process.stdout.write(data.toString()));
  cmd.stderr.on('data', data => process.stderr.write(data.toString()));
  cmd.on('close', code => console.log('✅ Deploy completed with code', code));
}

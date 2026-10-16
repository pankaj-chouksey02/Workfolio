/**
 * Cloudinary Connection Test
 * Run: node scripts/test-cloudinary.mjs
 */

const CLOUD_NAME = 'dfkskvj9y';
const API_KEY = '375117913273191';
const API_SECRET = 'QO8bh-KyDF9LArEZekxxqerOCF8';
const UPLOAD_PRESET = 'workfolio_preset';

const auth = Buffer.from(`${API_KEY}:${API_SECRET}`).toString('base64');

console.log('🔍 Testing Cloudinary connection...');
console.log(`   Cloud Name : ${CLOUD_NAME}`);
console.log(`   API Key    : ${API_KEY}`);
console.log(`   Preset     : ${UPLOAD_PRESET}`);
console.log('');

// Test 1: Ping the Cloudinary usage API (lightweight call)
async function testConnection() {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/usage`,
      {
        headers: { Authorization: `Basic ${auth}` },
        signal: controller.signal,
      }
    );
    clearTimeout(timeout);

    const data = await res.json();

    if (res.ok) {
      console.log('✅ CLOUDINARY CONNECTION: SUCCESS');
      console.log('');
      console.log('📊 Account Usage:');
      console.log(`   Plan          : ${data.plan || 'N/A'}`);
      console.log(`   Last Updated  : ${data.last_updated || 'N/A'}`);
      console.log(`   Transformations used: ${data.transformations?.usage ?? 'N/A'}`);
      console.log(`   Storage used  : ${data.storage?.usage ? (data.storage.usage / 1e6).toFixed(2) + ' MB' : 'N/A'}`);
      console.log(`   Bandwidth     : ${data.bandwidth?.usage ? (data.bandwidth.usage / 1e6).toFixed(2) + ' MB' : 'N/A'}`);
    } else {
      console.error('❌ CLOUDINARY CONNECTION: FAILED');
      console.error(`   HTTP Status: ${res.status}`);
      console.error(`   Error: ${data.error?.message || JSON.stringify(data)}`);
    }
  } catch (err) {
    if (err.name === 'AbortError') {
      console.error('❌ CLOUDINARY CONNECTION: TIMEOUT (10s)');
      console.error('   Check your internet connection or firewall settings.');
    } else {
      console.error('❌ CLOUDINARY CONNECTION: ERROR');
      console.error(`   ${err.message}`);
    }
  }
}

// Test 2: Verify upload preset exists
async function testUploadPreset() {
  console.log('');
  console.log('🔍 Checking upload preset...');
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload_presets/${UPLOAD_PRESET}`,
      {
        headers: { Authorization: `Basic ${auth}` },
        signal: controller.signal,
      }
    );
    clearTimeout(timeout);

    const data = await res.json();

    if (res.ok) {
      console.log(`✅ Upload preset "${UPLOAD_PRESET}" found`);
      console.log(`   Mode: ${data.unsigned ? 'Unsigned (public)' : 'Signed (server-side only)'}`);
      console.log(`   Folder: ${data.folder || '(root)'}`);
    } else if (res.status === 404) {
      console.warn(`⚠️  Upload preset "${UPLOAD_PRESET}" NOT FOUND`);
      console.warn('   You need to create it in your Cloudinary dashboard:');
      console.warn('   Settings → Upload → Upload presets → Add upload preset');
      console.warn(`   Name it: ${UPLOAD_PRESET}  |  Mode: Unsigned`);
    } else {
      console.error(`❌ Preset check failed: ${data.error?.message}`);
    }
  } catch (err) {
    if (err.name === 'AbortError') {
      console.error('❌ Preset check TIMEOUT');
    } else {
      console.error(`❌ Preset check ERROR: ${err.message}`);
    }
  }
}

await testConnection();
await testUploadPreset();
console.log('');
console.log('Done.');

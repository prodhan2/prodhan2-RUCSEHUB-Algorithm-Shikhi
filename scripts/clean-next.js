const fs = require('fs');
const path = require('path');

const nextDir = path.join(process.cwd(), '.next');

try {
  fs.rmSync(nextDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
} catch (error) {
  if (error.code !== 'ENOENT') {
    console.warn(`Skipping .next cleanup: ${error.message}`);
  }
}
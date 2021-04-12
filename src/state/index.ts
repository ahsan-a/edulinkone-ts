import fs from 'fs';
import path from 'path';
var state = { school: {}, credentials: {} };

// i apologise for this.
try {
	state.school = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../config/school.json'), 'utf8'));
} catch {
	fs.writeFileSync(path.resolve(__dirname, '../config/school.json'), '{}');
	state.school = {};
}
try {
	state.credentials = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../config/credentials.json'), 'utf8'));
} catch {
	fs.writeFileSync(path.resolve(__dirname, '../config/credentials.json'), '{}');
	state.credentials = {};
}

export default state;

// there's a folder called src/config which i'm reading for our config, i just copy/paste from chrome devtools for the api stuff

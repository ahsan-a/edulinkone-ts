import fs from 'fs';
import path from 'path';

var state: any = { school: {}, credentials: {}, user: {}, homework: {} };

// create config folder if it doesn't exist
if (!fs.existsSync(path.resolve(__dirname, '../config'))) {
	fs.mkdirSync(path.resolve(__dirname, '../config'));
}

// read config files if they exist. If not, create them
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

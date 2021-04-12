import fs from 'fs';
import path from 'path';
var state = { school: {}, credentials: {} };

// i apologise for this.
try {
	state.school = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../config/school.json'), 'utf8'));
} catch {
	fs.writeFileSync(path.resolve(__dirname, '../config/school.json'), '{}');
	state.school = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../config/school.json'), 'utf8'));
}
try {
	state.credentials = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../config/credentials.json'), 'utf8'));
} catch {
	fs.writeFileSync(path.resolve(__dirname, '../config/credentials.json'), '{}');
	state.credentials = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../config/credentials.json'), 'utf8'));
}

export default state;

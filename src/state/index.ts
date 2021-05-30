import fs from 'fs';
import path from 'path';

interface stateType {
	[index: string]: any;
	school: any;
	credentials: any;
	user: any;
	homework: any;
}

const state = {
	school: {},
	credentials: {},
	user: {},
	homework: {},
} as stateType;

// create a folder for our config if that doesn't exists
if (!fs.existsSync(path.resolve(__dirname, '../config')))
	fs.mkdirSync(path.resolve(__dirname, '../config'));

try {
	state.credentials = JSON.parse(
		fs.readFileSync(
			path.resolve(__dirname, '../config/credentials.json'),
			'utf8'
		)
	);
	state.school = JSON.parse(
		fs.readFileSync(path.resolve(__dirname, '../config/school.json'), 'utf8')
	);
} catch {
	fs.writeFileSync(path.resolve(__dirname, '../config/credentials.json'), '{}');
	state.credentials = {};

	fs.writeFileSync(path.resolve(__dirname, '../config/school.json'), '{}');
	state.school = {};
}

export default state;

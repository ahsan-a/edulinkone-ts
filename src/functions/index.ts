import state from '../state';
import fs from 'fs';
import path from 'path';

const methods = {
	updateConfig: function (name: string) {
		fs.writeFileSync(path.resolve(__dirname, `../config/${name}.json`), JSON.stringify(state[name], null, `\t`));
	},
	updateAllConfig: function () {
		const configItems = ['credentials', 'school'];
		for (const item of configItems) {
			this.updateConfig(item);
		}
	},
	capitilise: function (sentence: string) {
		return sentence.toLowerCase().replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase());
	},
	signOut: function () {
		for (const stateItem in state) {
			if (Object.hasOwnProperty.call(state, stateItem)) {
				state[stateItem] = {};
			}
		}
		this.updateAllConfig();
	},
};

export default methods;

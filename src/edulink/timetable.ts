import fetch from 'node-fetch';
import { v4 as uuidv4 } from 'uuid';
import state from '../state';

export interface Timetable {
	method: string;
	success: boolean;
	requested_date: string;
	showing_from: string;
	showing_to: string;
	weeks: any[];
	metrics: any;
	error?: string;
}

const methods = {
	async getTimetable() {
		const date = new Date();
		return await fetch(`${state.school.fromCode.server}?method=EduLink.Timetable`, {
			headers: {
				accept: 'application/json, text/plain, */*',
				'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
				authorization: `Bearer ${state.user.authtoken}`,
				'cache-control': 'no-cache',
				'content-type': 'application/json;charset=UTF-8',
				pragma: 'no-cache',
				'sec-fetch-dest': 'empty',
				'sec-fetch-mode': 'cors',
				'sec-fetch-site': 'same-site',
				'sec-gpc': '1',
				'x-api-method': 'EduLink.Timetable',
			},
			body: `{"jsonrpc":"2.0","method":"EduLink.Timetable","params":{"date":"${`${date.getFullYear()}-${date.getMonth() + 1 < 10 ? '0' : ''}${
				date.getMonth() + 1
			}-${(date.getDate() < 10 ? '0' : '') + date.getDate()}`}","learner_id":"${state.user.user.id}"},"uuid":"${uuidv4()}","id":"1"}`,
			method: 'POST',
		}).then(async (res) => (await res.json()).result as Timetable);
	},
};

export default methods;

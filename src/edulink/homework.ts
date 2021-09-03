import fetch from 'node-fetch';
import { v4 as uuidv4 } from 'uuid';
import state from '../state';

import { AttachmentFetch, Homework, HomeworkDetails } from '../typings';

export default {
	getHomework: async (): Promise<Homework[]> => {
		return fetch(`${state.school.fromCode.server}?method=EduLink.Homework`, {
			headers: {
				accept: 'application/json, text/plain, */*',
				'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
				authorization: `Bearer ${state.user.authtoken}`,
				'content-type': 'application/json;charset=UTF-8',
				'sec-fetch-dest': 'empty',
				'sec-fetch-mode': 'cors',
				'sec-fetch-site': 'same-site',
				'sec-gpc': '1',
				'x-api-method': 'EduLink.Homework',
			},
			body: `{"jsonrpc":"2.0","method":"EduLink.Homework","params":{"format":2},"uuid":"${uuidv4()}","id":"1"}`,
			method: 'POST',
		})
			.then((res) => res.json())
			.then((data) => data.result.homework);
	},
	homeworkDetails: async (id: number | string): Promise<HomeworkDetails> => {
		return fetch(`${state.school.fromCode.server}?method=EduLink.HomeworkDetails`, {
			headers: {
				accept: 'application/json, text/plain, */*',
				'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
				authorization: `Bearer ${state.user.authtoken}`,
				'content-type': 'application/json;charset=UTF-8',
				'sec-fetch-dest': 'empty',
				'sec-fetch-mode': 'cors',
				'sec-fetch-site': 'same-site',
				'sec-gpc': '1',
				'x-api-method': 'EduLink.HomeworkDetails',
			},
			body: `{"jsonrpc":"2.0","method":"EduLink.HomeworkDetails","params":{"homework_id":${id},"source":"EduLink"},"uuid":"${uuidv4()}","id":"1"}`,
			method: 'POST',
		})
			.then((res) => res.json())
			.then((data) => data.result.homework);
	},
	getAttachment: async (homework_id: number | string, attachment_id: number | string): Promise<AttachmentFetch> => {
		return fetch(`${state.school.fromCode.server}?method=EduLink.HomeworkAttachmentFetch`, {
			headers: {
				accept: 'application/json, text/plain, */*',
				'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
				authorization: `Bearer ${state.user.authtoken}`,
				'content-type': 'application/json;charset=UTF-8',
				'sec-fetch-dest': 'empty',
				'sec-fetch-mode': 'cors',
				'sec-fetch-site': 'same-site',
				'sec-gpc': '1',
				'x-api-method': 'EduLink.HomeworkAttachmentFetch',
			},
			body: `{"jsonrpc":"2.0","method":"EduLink.HomeworkAttachmentFetch","params":{"homework_id":${homework_id},"attachment_id":${attachment_id},"format":2},"uuid":"${uuidv4()}","id":"1"}`,
			method: 'POST',
		})
			.then((res) => res.json())
			.then((data) => data.result.attachment);
	},
	changeCompletionStatus: async (id: string | number, completed: boolean) => {
		return fetch(`${state.school.fromCode.server}?method=EduLink.HomeworkCompleted`, {
			headers: {
				accept: 'application/json, text/plain, */*',
				'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
				authorization: `Bearer ${state.user.authtoken}`,
				'content-type': 'application/json;charset=UTF-8',
				'sec-fetch-dest': 'empty',
				'sec-fetch-mode': 'cors',
				'sec-fetch-site': 'same-site',
				'sec-gpc': '1',
				'x-api-method': 'EduLink.HomeworkCompleted',
			},
			body: `{"jsonrpc":"2.0","method":"EduLink.HomeworkCompleted","params":{"homework_id":${id},"learner_id":"${
				state.user.user.id
			}","source":"EduLink","completed":"${completed}"},"uuid":"${uuidv4()}","id":"1"}`,
			method: 'POST',
		}).then((res) => res.json());
	},
};

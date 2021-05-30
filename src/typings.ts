export interface attachmentType {
	id: number;
	filename: string;
	filesize: number;
	mime_type: string;
	uploaded: boolean;
	url?: string
}

export interface homeworkType {
	id: number;
	activity: string;
	subject: string;
	due_date: string;
	due_reminder: string;
	available_date: string;
	completed: boolean;
	user_type: string;
	owner_id: string;
	format: number;
	duration: any;
	employee_received: any;
	set_by: string;
	cloneable: boolean;
	deletable: boolean;
	due_text: string;
	source: string;
	available_text: string;
	status: string;
	icon: string;
	attachments: attachmentType[];
}

export interface homeworkDetailsType {
	id: number;
	activity: string;
	description: string;
	subject: string;
	due_date: string;
	due_reminder: any;
	available_date: string;
	user_type: string;
	owner_id: string;
	format: number;
}

export interface attachmentFetchType {
	url: string;
}

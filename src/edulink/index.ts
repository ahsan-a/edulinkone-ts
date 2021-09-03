import login from './login';
import homework from './homework';
import timetable from './timetable';

const methods = { ...login, ...homework, ...timetable };

export default methods;

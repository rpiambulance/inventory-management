import { User } from './user';

export const currentUser = `andrew`;

const a = new User(`andrew`, `andrew`, `qu`, `qua@rpi.edu`, `1234`);
const b = new User(`logan`, `logan`, `ramos`, `logan@rpi.edu`, `1234`);
const c = new User(`notandrew`, `andrew`, `qu`, `qua123@rpi.edu`, `1234`);
const d = new User(`aandrew`, `dandrew`, `qqu`, `qua41@rpi.edu`, `1234`);
const e = new User(`bandrew`, `aandrew`, `qqu`, `qua234@rpi.edu`, `1234`);
const f = new User(`candrew`, `notandrew`, `qqqu`, `qua5123@rpi.edu`, `1234`);

export const MOCK_USERS: User[] = [
    a, b, c, d, e, f
];

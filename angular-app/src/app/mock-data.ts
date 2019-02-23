import { Inventory } from './inventory';
import { User } from './user';

export const currentUser: string = "andrew";

var a = new User("andrew", "andrew", "qu","qua@rpi.edu","1234")
var b = new User("logan", "logan", "ramos","logan@rpi.edu","1234")
var c = new User("notandrew", "andrew", "qu","qua123@rpi.edu","1234")
var d = new User("aandrew", "dandrew", "qqu","qua41@rpi.edu","1234")
var e = new User("bandrew", "aandrew", "qqu","qua234@rpi.edu","1234")
var f = new User("candrew", "notandrew", "qqqu","qua5123@rpi.edu","1234")

export const MOCK_USERS: User[] = [
    a, b, c, d, e, f
];

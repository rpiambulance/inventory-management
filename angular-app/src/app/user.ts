export class User {
    constructor(uname: string, fname: string, lname: string, email: string, pwd: string) {
        this.userName = uname;
        this.firstName = fname;
        this.lastName = lname;
        this.email = email;
        this.password = pwd;
    }
    public userName: string;
    public firstName: string;
    public lastName: string;
    public email: string;
    public password: string;

}

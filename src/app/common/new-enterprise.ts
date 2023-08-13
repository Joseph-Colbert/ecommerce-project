export class NewEnterprise {
    name!: string;
    userName!: string;
    email!: string;
    password!: string;
    address!: string;
    image_url!: string;
    ci!: string;
    mail!: string;
    nameE!: string;
    phone!: string;
    categoryE!: number;


    constructor(name: string, userName: string, address: string, phone: string, image_url: string, email: string, password: string, ci: string, mail: string,
                nameE: string, categoryE: number){
        this.name = name;
        this.userName = userName;
        this.address = address;
        this.phone = phone;
        this.image_url = image_url;
        this.categoryE = categoryE;
        this.email = email;
        this.password = password;
        this.ci = ci;
        this.mail = mail;
        this.nameE = nameE;
    }

}

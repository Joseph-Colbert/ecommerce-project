export class NewEnterprise {
    name!: string;
    enterpriseName!: string;
    address!: string;
    phone!: number;
    imageUrl!: string;
    category!: number;
    email!: string;
    password!: string;

    constructor(name: string, enterpriseName: string, address: string, phone: number, imageUrl: string, category: number, email: string, password: string){
        this.name = name;
        this.enterpriseName = enterpriseName;
        this.address = address;
        this.phone = phone;
        this.imageUrl = imageUrl;
        this.category = category;
        this.email = email;
        this.password = password;
    }

}

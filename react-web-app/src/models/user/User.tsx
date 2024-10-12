export class User {

    id!: number;
    username!: string;
    password!: string;
    activated!: boolean;
    authorities!: { name: string }[];

}
import { BaseEntity } from "typeorm";
export declare class Admin extends BaseEntity {
    id: number;
    name: string;
    login: string;
    password: string;
}

export interface IUser {
    id: string;
    name: string;
    email: string;
    password: string;
    role: 'user' | 'salon-spa-owner';
    is_active: boolean;
    created_at: string;
    updated_at: string;
}
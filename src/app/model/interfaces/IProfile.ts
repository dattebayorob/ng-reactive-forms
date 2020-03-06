export interface IProfile {
    id: number;
    cpf: string;
    firstName: string;
    lastName: string;
    profilePictureUri: string;
    address: {
        street: string;
        city: string;
        state: string;
    }
}
export type User = {
    id: number;
    name: string;
    password: string;
}

export const sampleUserData : User[] = [
    {
        id: 1,
        name: "Alice",
        password: "123456"
    },
    {
        id: 2,
        name: "Bob",
        password: "123456"
    },
    {
        id: 3,
        name: "Charlie",
        password: "123456"
    }
]
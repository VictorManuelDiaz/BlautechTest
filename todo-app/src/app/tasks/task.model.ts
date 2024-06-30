import { User } from "../users/user.model";

export interface Task {
    id?: number;
    title: string;
    description: string;
    state: State;
    created_at?: string;
    user: User
}
export enum State {
    PENDING = 0,
    IN_PROGRESS = 1,
    COMPLETED = 2
}
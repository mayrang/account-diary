

export interface UserObject {
    userId: number;
    email: string;
    password: string;
    nickname: string;

}

export interface DiaryObject {
    postId: number;
    title: string;
    content: string;
    createAt: string;
    updateAt: string;
    userId: number;
}


export interface AccountObject  {
    accountId: number;
    value: number;
    createAt: Date;
    content: string;
    type: string;
    userId: number;
    typeValue: number;
}
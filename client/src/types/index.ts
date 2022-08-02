export interface IForm {
    fullName: string | null;
    email: string | null;
    phoneNumber: string | null;
    dateOfBirth: string | null;
    message: string | null;
}

export interface IPollErrRef { [key: string]: React.RefObject<HTMLDivElement>; }

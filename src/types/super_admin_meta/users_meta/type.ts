export const AccountTypeValues = ["Admin" , "Customer" , "Developer" , "Employee"]

export type AccountTypeMeta = typeof AccountTypeValues[number]


//export const AccountTypeValues = ["Admin" , "Customer" , "Developer" , "Employee"]


type RoleTypeMeta =
    | "Super Admin"
    | "Inventory Admin"
    | "Sales Employee"
    | "Frontend Developer"
    | "Backend Developer"
    | "Regular Customer";

export type StatusMeta = "Active" | "Inactive" | "Blocked";

export type EditUserFormMeta = {
    password?: string;
    confirm_password?: string;
};

export type UserMeta = {
    _id: string;
    id?: string;
    name: string;
    email: string;
    password?: string;
    account_type: AccountTypeMeta;
    role: RoleTypeMeta;
    status: StatusMeta;
    created_at: string;
    phone?: string;
    date_of_birth?: string;
    profile_image?: string;
    bio?: string;
    email_verified?: boolean;
    two_factor_enabled?: boolean;
    last_login?: string;
    updated_at?: string;
};



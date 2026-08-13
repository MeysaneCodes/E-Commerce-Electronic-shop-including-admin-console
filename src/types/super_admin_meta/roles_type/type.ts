export type RoleMeta = {

    _id: string;
    id:string;

    name: string;

    key: string;

    account_type: string;

    description: string;

    permissions: string[];
    is_system_role: boolean;

    is_active: boolean;

    created_at: string;

    updated_at: string;

};
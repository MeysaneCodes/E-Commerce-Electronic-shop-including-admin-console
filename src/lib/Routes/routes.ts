export const ROUTES  = {
    HOME: "/",
    LOGIN: "/myaccount/auth/login",
    SIGNUP: "/myaccount/auth/signup",
    PRODUCT: (slug:string) => `products/${slug}`,
    CHECKOUT_CART: "/checkout",
    MY_PROFILE: "myaccount/profile",
    ABOUT_US : "/aboutus",
    NOT_FOUND: "/not-found",


    //SUPER ADMIN
    USERS : "/admin/super_admin/users",
    USER_EDIT: (slug:string) => `/admin/super_admin/users/${slug}`,
    ROLES_AND_PERMISSIONS: "/admin/super_admin/roles_and_permissions",



    // ADMIN
    DASHBOARD: "/admin/dashboard",
    INVENTORY: "/admin/inventory",
    INVENTORY_EDIT: (slug:string) => `/admin/inventory/Edit/${slug}`,
    INVENTORY_EDIT_SEARCH: "/admin/inventory/Edit",
    INVENTORY_CREATE: "/admin/inventory/Create",

    CATEGORIES: "/admin/inventory/Categories",
    SUB_CATEGORY: "/admin/inventory/Sub-Categories",

    BRANDS: "/admin/inventory/Brands",
    ATTRIBUTES: "/admin/inventory/Attributes",
}
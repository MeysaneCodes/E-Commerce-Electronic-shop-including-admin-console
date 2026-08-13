import {SignupUser} from "@/types/user_information_type";

export class Customer_User implements SignupUser{
    name: {
        salutation: string;
        first: string;
        last: string;
        birthday: Date;
    };
    email: string;
    passwordHash: string;
    createdAt: Date;
    updatedAt: Date;
    role: "customer" | "admin" | "vendor" = "customer";
    status: "active" | "inactive" | "banned" = "active";
    isEmailVerified = false;
    isPhoneVerified = false;

    lastLogin: Date | null;
    loginCount: number;
    addresses: Array<{
        street?: string;                 // e.g., "Musterstraße"
        houseNumber?: string;            // e.g., "12A"
        postalCode?: string;             // PLZ
        city?: string;                   // Berlin, München, etc.
        country?: string;                // "DE", "AT", "CH", ...
        isDefault?: boolean;
    }>;
    cart: {
        items: Array<any>;
        updatedAt?: Date | string;
    };
    wishlist?: Array<any>;
    orders?: Array<any>;
    paymentMethods?: Array<any>;
    reviews?: Array<any>;
    tokens: {
        emailVerification: {
            token?: string;
            expiresAt?: Date | string;
        };
        passwordReset?: {
            token?: string;
            expiresAt?: Date | string;
        };
    };
    referral: {
        code?: string;
        referredBy?: string | null;
        creditsEarned?: number;
    };



    preferences: {
        language?: string;
        newsletterSubscribed?: boolean;
    };

    constructor(salutation:string,first:string,last:string,birthday:Date,email:string, passwordHash:string){
        this.name = {
            salutation: salutation,
            first: first,
            last: last,
            birthday: birthday,
        }

        this.email= email;
        this.passwordHash = passwordHash;
        this.updatedAt = new Date();
        this.createdAt = new Date();
        this.isEmailVerified = false;
        this.isPhoneVerified = false;
        this.status = "active";
        this.role = "customer";
        this.preferences = {};
        this.lastLogin = new Date();
        this.loginCount = 0;
        this.addresses = [
            {
                street:undefined,
                houseNumber: undefined,
                postalCode: undefined,
                city: undefined,
                country: undefined,
                isDefault: true,
            }
        ];
        this.cart = {
            items: [],
            updatedAt: undefined,
        }
        this.wishlist = [];
        this.orders = [];
        this.paymentMethods = [];
        this.reviews = [];
        this.tokens = {
            emailVerification: {
                token: undefined,
                expiresAt: undefined,
            },
            passwordReset: {
                token: undefined,
                expiresAt: undefined,
            }
        };
        this.referral = {
            code: undefined,
            referredBy: undefined,
            creditsEarned: undefined,
        }
    }
}
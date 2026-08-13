import {ObjectId} from "mongodb";

export interface SignupUser {
    _id?:ObjectId,
    name: {
        salutation: string;
        first: string;
        last?: string;
        birthday:Date;
    };
    email: string;
    phone?: string;
    passwordHash: string;
    role?: "customer" | "admin" | "vendor";
    status?: "active" | "inactive" | "banned";
    isEmailVerified?: boolean;
    isPhoneVerified?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    preferences?: {
        language?: string;
        newsletterSubscribed?: boolean;
    };

    lastLogin?: Date | null;
    loginCount?: number;
    addresses?: Array<any>;
    cart?: {
        items: Array<any>;
        updatedAt?: Date | string;
    };
    wishlist?: Array<any>;
    orders?: Array<any>;
    paymentMethods?: Array<any>;
    reviews?: Array<any>;
    tokens?: {
        emailVerification?: {
            token?: string;
            expiresAt?: Date | string;
        };
        passwordReset?: {
            token?: string;
            expiresAt?: Date | string;
        };
    };
    referral?: {
        code?: string;
        referredBy?: string | null;
        creditsEarned?: number;
    };
}
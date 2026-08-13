//Defaults
import {Cart_Template, CartItem, Discount, ShippingAddress, ShippingMethod} from "@/types/cart_types";


export default class CreateNewCart implements Cart_Template{
    userId: string;
    sessionId?: string;
    status: "active" | "ordered" | "abandoned";
    items: CartItem[];
    coupon?: Discount;
    shippingMethod?: ShippingMethod;
    shippingAddress?: ShippingAddress;
    subtotal: number;
    taxTotal: number;
    shippingTotal: number;
    discountTotal: number;
    grandTotal: number;
    version: number;
    createdAt: Date;
    updatedAt: Date;

    constructor(userId: string) {
        this.userId = userId;
        this.sessionId = undefined;
        this.items = [];
        this.status = "active";
        this.coupon = {
            code: undefined,
            type: undefined,
            amount: undefined,
        };
        this.shippingMethod = {
            code: undefined,
            price: undefined,
        };
        this.shippingAddress = {
            address: undefined,
            house_Number: undefined,
            city: undefined,
            country: undefined,
            postalCode: undefined,
        }
        this.subtotal = 0;
        this.taxTotal = 0;
        this.shippingTotal = 0;
        this.discountTotal = 0;
        this.grandTotal = 0;
        this.version = 1;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
}
export class server_messages_list{
    static ERROR = "Something went wrong";
    static DB_NAME_NOT_FOUND = "Something went wrong with Db, Please check env var";
    static DB_USER_NOT_FOUND = "Something went wrong with Db, Please check env var";
    static DB_CART_COLLECTION_NOT_FOUND = "Something went wrong with cart collection, Please check env var";
    static DB_PRODUCTS_NOT_FOUND = "Something went wrong with products collection, Please check env var";
    static LOGGED_IN = "Logged in Successfully.";
}


export class session_messages_list extends server_messages_list{
    static NO_SESSION = "No session found!";
    static SESSION_FOUND = "Session found!";
}


export class checkout_messages_list extends server_messages_list{

    static NO_ITEM_FOUND_ON_CHECKOUT_CART = "No Item Found.";
    static NEW_ITEM_ADDED_TO_THE_CART = "New Item ADDED.";
}


export class mongo_db_operations_feedback extends server_messages_list{
    static UPDATING_DOC_SUCCEEDED = "Updating document succeeded"
    static UPDATING_DOC_FAILED = "Updating document failed";
    static DELETING_DOC_FAILED = "Deleting document failed";
    static GET_DOC_FAILED = "Getting document failed";
    static GET_DOC_SUCCESS = "Getting document succeeded";
    static NO_DOC_FOUND = "No document found.";
}


export class products_messages_list extends server_messages_list{
    static FOUND = "Retrieved!"
    static NO_ITEM_FOUND = "No Item Found.";
}


export class Super_admin_messages_list extends server_messages_list{
    static ACCOUNT_TYPE_META_RETRIEVED = "Account type Meta retrieved successfully.";
    static ACCOUNT_TYPE_META_FAILED = "Failed to retrieve Account type Meta";
}

export class Inventory_messages_list extends server_messages_list{
    static ITEM_ADDED = "Item Added.";
    static ITEM_ADDED_FAILED = "Failed to get item added.";

    static BRANDS = "Brands retrieved successfully.";
    static BRANDS_NOT_FOUND = "No item found.";
    static BRANDS_FAILED = "Failed to get Brands";


    static INVENTORY_ITEMS_ATTRIBUTES = "Inventory Items Attributes retrieved successfully.";
    static INVENTORY_ITEMS_ATTRIBUTES_NOT_FOUND = "No item found.";
    static INVENTORY_ITEMS_ATTRIBUTES_FAILED = "Failed to get Inventory Items Attributes";




    static INVENTORY_CATEGORIES = "Inventory Categories retrieved successfully.";
    static INVENTORY_CATEGORIES_NOT_FOUND = "No item found.";
    static INVENTORY_CATEGORIES_FAILED = "Failed to get Inventory Categories";

    static INVENTORY_SUB_CATEGORY = "Inventory Sub-Category retrieved successfully.";
    static INVENTORY_SUB_CATEGORY_NOT_FOUND = "No item found.";
    static INVENTORY_SUB_CATEGORY_FAILED = "Failed to get Inventory Sub-Category";

}



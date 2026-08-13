import {getDB} from "@/lib/server/db/mongodb";
import {Db} from "mongodb";

export async function check_db(DB_NAME:string): Promise<undefined | Db> {
    const db = await getDB(DB_NAME);
    if(db)
        return db;
    else return undefined;
}
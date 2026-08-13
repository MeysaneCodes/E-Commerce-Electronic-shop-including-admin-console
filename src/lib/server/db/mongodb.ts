import {MongoClient, ServerApiVersion} from "mongodb";
//import  {SecretManagerServiceClient} from '@google-cloud/secret-manager';
//const client = new SecretManagerServiceClient();


/*async function get_secret(){
    const secretId = "MONGODB_URI"
    const projectId = "78568486021"
    const name = `projects/${projectId}/secrets/${secretId}`;

    try {
        const [secret] = await client.getSecret({
            name: name,
        })

        if (secret.replication && secret.replication.replication) {
            const policy = secret.replication.replication;
            console.info(
                `Found secret ${secret.name} with replication policy ${policy}`
            );
        } else {
            console.info(`Found secret ${secret.name} with no replication policy.`);
        }
        return secret;


    } catch (err) {
        console.error(`Failed to retrieve secret ${name}:`, err);
    } finally {
        await client.close();
    }
}*/

let Client: MongoClient;
let clientPromise: Promise<MongoClient> | undefined;


function getMongoClient(){
    const uri = process.env.MONGODB_URI ?? "";

    if (!uri || !/^mongodb(\+srv)?:\/\//.test(uri)) {
        throw new Error("MONGODB_URI must start with mongodb:// or mongodb+srv://");
    }

    if (!clientPromise) {
        const client = new MongoClient(uri, {
            serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            },
        });

        clientPromise = client.connect();
    }

    return clientPromise;
}


const Db_names= {
    testPurpose : process.env.MONGO_DB_TEST_PURPOSE,
    shop : "shop",
    admin : "admin"
}


type props = {
    db_name: string;
    db_CLIENT: MongoClient;
}

async function Db_Diagnose ({db_name, db_CLIENT}: props): Promise<boolean | undefined> {

    const HealthCheck = await db_CLIENT.db(db_name).command({ping:1});
    return  HealthCheck.ok;
}

export async function getDB(dbName:string){
    try{
        const client = await getMongoClient();
        if (client){

            console.log("Connection to mongodb established");
            const Db_Health =  await Db_Diagnose({db_name:dbName, db_CLIENT: client});

            if(Db_Health)
                console.log("Health Check : Connection to mongodb is established");
            else
                console.log("Health Check: Connection to mongodb failed");


            return client.db(dbName);
        }

    }catch (e) {
        throw new Error(`${dbName} not found. Error: ` + e);
    }
}


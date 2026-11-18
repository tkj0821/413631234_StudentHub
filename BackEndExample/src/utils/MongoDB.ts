import { Schema, model, connect, Mongoose } from 'mongoose';
import { logger } from '../middlewares/log';
import { MongoInfo } from '../interfaces/MongoInfo';
export class MongoDB {
    
    DB: Mongoose | void | undefined
    isConneted : boolean = false;

    constructor(info: MongoInfo) {

        const url = `mongodb://${info.name}:${encodeURIComponent(info.password)}@${info.host}:${info.port}/${info.dbName}?authSource=${encodeURIComponent(process.env.DBAUTHSOURCE || info.dbName)}`;

        this.init(url).then(() => {

            logger.info(`success: connected to MongoDB database ${info.dbName}`);
            this.isConneted = true;

        }).catch(() => {

            logger.error(`error: cannot connect to MongoDB database ${info.dbName}`);

        })

    }

    async init(url: string) {
        this.DB = await connect(url);
    }

    getState():boolean{
        return this.isConneted;
    }
}


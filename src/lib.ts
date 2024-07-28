import { Client } from "@notionhq/client";
import {
    excludeRelations,
    filterRelations,
    getDbId,
    getSchema,
    setDbId,
} from "./schema/schema";
import { Class } from "./schema/helper-types";

export class NotionConnection {
    private readonly _client: Client;
    private readonly _rootPageId: string;

    constructor(secret: string, rootPageId: string) {
        this._client = new Client({
            auth: secret,
        });
        this._rootPageId = rootPageId;
    }

    async createDatabase(dbSchemas: Array<Class>) {
        for (const dbSchema of dbSchemas) {
            const propertySchema = getSchema(dbSchema);
            const nonRelationPropertySchema = excludeRelations(propertySchema);

            const db = await this._client.databases.create({
                title: [{ type: "text", text: { content: dbSchema.name } }],
                properties: nonRelationPropertySchema,
                parent: {
                    page_id: this._rootPageId,
                },
            });

            setDbId(dbSchema, db.id);
        }

        for (const dbSchema of dbSchemas) {
            const propertySchema = getSchema(dbSchema);
            const relationPropertySchema = filterRelations(propertySchema);

            await this._client.databases.update({
                database_id: getDbId(dbSchema)!,
                properties: relationPropertySchema,
            });
        }
    }
}

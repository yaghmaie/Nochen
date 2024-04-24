import { Client } from "@notionhq/client";
import { getSchema } from "./schema/schema";

export class NotionConnection {
    private readonly _client: Client;
    private readonly _rootPageId: string;

    constructor(secret: string, rootPageId: string) {
        this._client = new Client({
            auth: secret,
        });
        this._rootPageId = rootPageId;
    }

    async createDatabase(dbSchema: new (...args: any[]) => object) {
        await this._client.databases.create({
            title: [{ type: "text", text: { content: dbSchema.name } }],
            properties: getSchema(dbSchema),
            parent: {
                page_id: this._rootPageId,
            },
        });
    }
}

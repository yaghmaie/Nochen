import "../symbol-metadata.shim";

import { TitlePropertyItemObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import {
    NotionDatabaseProperty,
    NotionSchema,
    NotionSchemaDecorator,
} from "./helper-types";

export type Title = TitlePropertyItemObjectResponse;

const NotionSchemaKey = Symbol("_NotionSchema");

function schema(metadata: DecoratorMetadata): NotionSchema {
    return (metadata[NotionSchemaKey] ??= {}) as NotionSchema;
}

const title: NotionDatabaseProperty = {
    type: "title",
    title: {},
};

export function Title(): NotionSchemaDecorator<Title> {
    return (_, { metadata, name }) => {
        schema(metadata)[name] = title;
    };
}

export function getSchema(dbSchema: new (...args: any[]) => object) {
    const metadata = dbSchema[Symbol.metadata];
    if (metadata == null) return;
    return metadata[NotionSchemaKey];
}

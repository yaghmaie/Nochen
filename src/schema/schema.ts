import "../symbol-metadata.shim";

import {
    CheckboxPropertyItemObjectResponse,
    TitlePropertyItemObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
import {
    NotionDatabaseProperty,
    NotionSchema,
    NotionSchemaDecorator,
} from "./helper-types";

export type Title = TitlePropertyItemObjectResponse;
export type Checkbox = CheckboxPropertyItemObjectResponse;

const NotionSchemaKey = Symbol("_NotionSchema");

function schema(metadata: DecoratorMetadata): NotionSchema {
    return (metadata[NotionSchemaKey] ??= {}) as NotionSchema;
}

const title: NotionDatabaseProperty = {
    type: "title",
    title: {},
};

const checkbox: NotionDatabaseProperty = {
    type: "checkbox",
    checkbox: {},
};

export function Title(): NotionSchemaDecorator<Title> {
    return (_, { metadata, name }) => {
        schema(metadata)[name] = title;
    };
}

export function Checkbox(): NotionSchemaDecorator<Checkbox> {
    return (_, { metadata, name }) => {
        schema(metadata)[name] = checkbox;
    };
}

export function getSchema(dbSchema: new (...args: any[]) => object) {
    return schema(dbSchema[Symbol.metadata] ?? {});
}

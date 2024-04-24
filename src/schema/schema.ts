import "../symbol-metadata.shim";

import {
    CheckboxPropertyItemObjectResponse,
    CreatedByPropertyItemObjectResponse,
    LastEditedByPropertyItemObjectResponse,
    NumberPropertyItemObjectResponse,
    PropertyItemObjectResponse,
    TitlePropertyItemObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
import {
    NotionDatabaseProperty,
    NotionSchema,
    NotionSchemaDecorator,
    NumberFormat,
} from "./helper-types";

export type Title = TitlePropertyItemObjectResponse;
export type Checkbox = CheckboxPropertyItemObjectResponse;
export type Number = NumberPropertyItemObjectResponse;
export type CreatedBy = CreatedByPropertyItemObjectResponse;
export type LastEditedBy = LastEditedByPropertyItemObjectResponse;

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

function number(format: NumberFormat): NotionDatabaseProperty {
    return { type: "number", number: { format } };
}

const createdBy: NotionDatabaseProperty = {
    type: "created_by",
    created_by: {},
};

const lastEditedBy: NotionDatabaseProperty = {
    type: "last_edited_by",
    last_edited_by: {},
};

function makeDecorator<
    T extends PropertyItemObjectResponse,
    U extends NotionDatabaseProperty
>(value: U): NotionSchemaDecorator<T> {
    return (_, { metadata, name }) => {
        schema(metadata)[name] = value;
    };
}

export function Title(): NotionSchemaDecorator<Title> {
    return makeDecorator(title);
}

export function Checkbox(): NotionSchemaDecorator<Checkbox> {
    return makeDecorator(checkbox);
}

export function Number(format: NumberFormat): NotionSchemaDecorator<Number> {
    return makeDecorator(number(format));
}

export function CreatedBy(): NotionSchemaDecorator<CreatedBy> {
    return makeDecorator(createdBy);
}

export function LastEditedBy(): NotionSchemaDecorator<LastEditedBy> {
    return makeDecorator(lastEditedBy);
}

export function getSchema(dbSchema: new (...args: any[]) => object) {
    return schema(dbSchema[Symbol.metadata] ?? {});
}

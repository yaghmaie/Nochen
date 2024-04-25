import "../symbol-metadata.shim";

import {
    CheckboxPropertyItemObjectResponse,
    CreatedByPropertyItemObjectResponse,
    CreatedTimePropertyItemObjectResponse,
    DatePropertyItemObjectResponse,
    EmailPropertyItemObjectResponse,
    LastEditedByPropertyItemObjectResponse,
    LastEditedTimePropertyItemObjectResponse,
    NumberPropertyItemObjectResponse,
    PhoneNumberPropertyItemObjectResponse,
    PropertyItemObjectResponse,
    RichTextPropertyItemObjectResponse,
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
export type CreatedTime = CreatedTimePropertyItemObjectResponse;
export type LastEditedTime = LastEditedTimePropertyItemObjectResponse;
export type Date = DatePropertyItemObjectResponse;
export type Email = EmailPropertyItemObjectResponse;
export type PhoneNumber = PhoneNumberPropertyItemObjectResponse;
export type RichText = RichTextPropertyItemObjectResponse;

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

const createdTime: NotionDatabaseProperty = {
    type: "created_time",
    created_time: {},
};

const lastEditedTime: NotionDatabaseProperty = {
    type: "last_edited_time",
    last_edited_time: {},
};

const date: NotionDatabaseProperty = {
    type: "date",
    date: {},
};

const email: NotionDatabaseProperty = {
    type: "email",
    email: {},
};

const phoneNumber: NotionDatabaseProperty = {
    type: "phone_number",
    phone_number: {},
};

const richText: NotionDatabaseProperty = {
    type: "rich_text",
    rich_text: {},
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

export function CreatedTime(): NotionSchemaDecorator<CreatedTime> {
    return makeDecorator(createdTime);
}

export function LastEditedTime(): NotionSchemaDecorator<LastEditedTime> {
    return makeDecorator(lastEditedTime);
}

export function Date(): NotionSchemaDecorator<Date> {
    return makeDecorator(date);
}

export function Email(): NotionSchemaDecorator<Email> {
    return makeDecorator(email);
}

export function PhoneNumber(): NotionSchemaDecorator<PhoneNumber> {
    return makeDecorator(phoneNumber);
}

export function RichText(): NotionSchemaDecorator<RichText> {
    return makeDecorator(richText);
}

export function getSchema(dbSchema: new (...args: any[]) => object) {
    return schema(dbSchema[Symbol.metadata] ?? {});
}

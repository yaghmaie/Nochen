/* eslint-disable @typescript-eslint/ban-types */
import "../symbol-metadata.shim";

import {
    CheckboxPropertyItemObjectResponse,
    CreatedByPropertyItemObjectResponse,
    CreatedTimePropertyItemObjectResponse,
    DatePropertyItemObjectResponse,
    EmailPropertyItemObjectResponse,
    FilesPropertyItemObjectResponse,
    FormulaPropertyItemObjectResponse,
    LastEditedByPropertyItemObjectResponse,
    LastEditedTimePropertyItemObjectResponse,
    MultiSelectPropertyItemObjectResponse,
    NumberPropertyItemObjectResponse,
    PeoplePropertyItemObjectResponse,
    PhoneNumberPropertyItemObjectResponse,
    PropertyItemObjectResponse,
    RelationPropertyItemObjectResponse,
    RichTextPropertyItemObjectResponse,
    SelectPropertyItemObjectResponse,
    TitlePropertyItemObjectResponse,
    UrlPropertyItemObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
import {
    Class,
    ColorSelect,
    NotionDatabaseProperty,
    NotionDatabasePropertyExcludingRelation,
    NotionDatabaseRelationProperty,
    NotionSchema,
    NotionSchemaDecorator,
    NotionSchemaExcludingRelation,
    NotionSchemaRelations,
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
export type Url = UrlPropertyItemObjectResponse;
export type Files = FilesPropertyItemObjectResponse;
export type People = PeoplePropertyItemObjectResponse;
export type Formula = FormulaPropertyItemObjectResponse;
export type MultiSelect = MultiSelectPropertyItemObjectResponse;
export type Select = SelectPropertyItemObjectResponse;
export type Relation = RelationPropertyItemObjectResponse;

export type SelectOption = string | [string, ColorSelect?];
export type RelationType = "single" | "dual";

const NotionSchemaKey = Symbol("_NotionSchema");
const NotionDbId = Symbol("_notionDbId");

function schema(
    metadata: DecoratorMetadata
): Record<string | symbol, () => NotionDatabaseProperty> {
    return (metadata[NotionSchemaKey] ??= {}) as never;
}

export function setDbId(dbSchema: Class, id: string) {
    (dbSchema[Symbol.metadata] ??= {})[NotionDbId] = id;
}

export function getDbId(dbSchema: Class): string | undefined {
    return (dbSchema[Symbol.metadata] ?? {})[NotionDbId] as never;
}

const title: () => NotionDatabaseProperty = () => ({
    type: "title",
    title: {},
});

const checkbox: () => NotionDatabaseProperty = () => ({
    type: "checkbox",
    checkbox: {},
});

function number(format?: NumberFormat): () => NotionDatabaseProperty {
    return () => ({ type: "number", number: { format } });
}

const createdBy: () => NotionDatabaseProperty = () => ({
    type: "created_by",
    created_by: {},
});

const lastEditedBy: () => NotionDatabaseProperty = () => ({
    type: "last_edited_by",
    last_edited_by: {},
});

const createdTime: () => NotionDatabaseProperty = () => ({
    type: "created_time",
    created_time: {},
});

const lastEditedTime: () => NotionDatabaseProperty = () => ({
    type: "last_edited_time",
    last_edited_time: {},
});

const date: () => NotionDatabaseProperty = () => ({
    type: "date",
    date: {},
});

const email: () => NotionDatabaseProperty = () => ({
    type: "email",
    email: {},
});

const phoneNumber: () => NotionDatabaseProperty = () => ({
    type: "phone_number",
    phone_number: {},
});

const richText: () => NotionDatabaseProperty = () => ({
    type: "rich_text",
    rich_text: {},
});

const url: () => NotionDatabaseProperty = () => ({
    type: "url",
    url: {},
});

const files: () => NotionDatabaseProperty = () => ({
    type: "files",
    files: {},
});

const people: () => NotionDatabaseProperty = () => ({
    type: "people",
    people: {},
});

function formula(expression: string): () => NotionDatabaseProperty {
    return () => ({
        type: "formula",
        formula: { expression },
    });
}

function multiSelect(options: SelectOption[]): () => NotionDatabaseProperty {
    return () => ({
        type: "multi_select",
        multi_select: {
            options: options.map(toSelectOptionDatabaseProperty),
        },
    });
}

function select(options: SelectOption[]): () => NotionDatabaseProperty {
    return () => ({
        type: "select",
        select: {
            options: options.map(toSelectOptionDatabaseProperty),
        },
    });
}

function toSelectOptionDatabaseProperty(option: SelectOption) {
    return typeof option === "string"
        ? { name: option }
        : { name: option[0], color: option[1] };
}

function relation(
    type: RelationType,
    relatedSchema: Class
): () => NotionDatabaseProperty {
    return () =>
        ({
            type: "relation",
            relation: {
                database_id: getDbId(relatedSchema),
                ...(type === "single"
                    ? { type: "single_property", single_property: {} }
                    : { type: "dual_property", dual_property: {} }),
            },
        } as never);
}

function makeDecorator<
    T extends PropertyItemObjectResponse,
    U extends NotionDatabaseProperty
>(value: () => U): NotionSchemaDecorator<T> {
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

export function Number(format?: NumberFormat): NotionSchemaDecorator<Number> {
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

export function Url(): NotionSchemaDecorator<Url> {
    return makeDecorator(url);
}

export function Files(): NotionSchemaDecorator<Files> {
    return makeDecorator(files);
}

export function People(): NotionSchemaDecorator<People> {
    return makeDecorator(people);
}

export function Formula(expression: string): NotionSchemaDecorator<Formula> {
    return makeDecorator(formula(expression));
}

export function MultiSelect(
    ...options: SelectOption[]
): NotionSchemaDecorator<MultiSelect> {
    return makeDecorator(multiSelect(options));
}

export function Select(
    ...options: SelectOption[]
): NotionSchemaDecorator<Select> {
    return makeDecorator(select(options));
}

export function Relation(
    type: RelationType,
    schema: Class
): NotionSchemaDecorator<Relation> {
    return makeDecorator(relation(type, schema));
}

export function getSchema(dbSchema: Class) {
    const schemaMetadata = schema(dbSchema[Symbol.metadata] ?? {});
    const propertySchema: NotionSchema = {};
    for (const key of Object.keys(schemaMetadata)) {
        propertySchema[key] = schemaMetadata[key]();
    }
    return propertySchema as NotionSchema;
}

export function excludeRelations(
    propertySchema: NotionSchema
): NotionSchemaExcludingRelation {
    return Object.entries(propertySchema).reduce((acc, [prop, propSchema]) => {
        if (propSchema.type === "relation") return acc;
        acc[prop] = propSchema as NotionDatabasePropertyExcludingRelation;
        return acc;
    }, {} as NotionSchemaExcludingRelation);
}

export function filterRelations(
    propertySchema: NotionSchema
): NotionSchemaRelations {
    return Object.entries(propertySchema).reduce((acc, [prop, propSchema]) => {
        if (propSchema.type !== "relation") return acc;
        acc[prop] = propSchema as NotionDatabaseRelationProperty;
        return acc;
    }, {} as NotionSchemaRelations);
}

import {
    CreateDatabaseParameters,
    CreatePageParameters,
    PropertyItemObjectResponse,
    SelectPropertyItemObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";

export type NotionDatabaseProperties = CreateDatabaseParameters["properties"];
export type NotionDatabaseProperty =
    NotionDatabaseProperties[keyof NotionDatabaseProperties];

export type NotionSchema = Record<PropertyKey, NotionDatabaseProperty>;

export type NotionSchemaDecorator<
    PropertyObject extends PropertyItemObjectResponse
> = <Target>(
    target: Target | undefined,
    context: ClassFieldDecoratorContext<Target, PropertyObject>
) => void;

export type NumberFormat = (NotionDatabaseProperty & {
    type: "number";
})["number"]["format"];

type SelectOptions = NonNullable<
    (NotionDatabaseProperty & {
        type: "select";
    })["select"]["options"]
>;

export type ColorSelect = NonNullable<SelectOptions[0]["color"]>;

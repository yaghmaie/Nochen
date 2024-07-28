/* eslint-disable @typescript-eslint/ban-types */
import { NotionConnection } from "../src/lib";
import {
    Checkbox,
    CreatedBy,
    CreatedTime,
    Date,
    Email,
    Files,
    Formula,
    LastEditedBy,
    LastEditedTime,
    MultiSelect,
    Number,
    People,
    PhoneNumber,
    Relation,
    RichText,
    Select,
    Title,
    Url,
} from "../src/schema/schema";

describe("Notion ORM", () => {
    it("should create a database", async () => {
        const connection = new NotionConnection(
            process.env.SECRET as never,
            process.env.ROOT_PAGE as never
        );

        class Foo {
            @Title()
            titleBar!: Title;

            @Checkbox()
            checkboxBar!: Checkbox;

            @Number("dollar")
            numberBar!: Number;

            @CreatedBy()
            createdByBar!: CreatedBy;

            @LastEditedBy()
            lastEditedByBar!: LastEditedBy;

            @CreatedTime()
            createdTimeBar!: CreatedTime;

            @LastEditedTime()
            lastEditedTimeBar!: LastEditedTime;

            @Date()
            dateBar!: Date;

            @Email()
            emailBar!: Email;

            @PhoneNumber()
            phoneNumberBar!: PhoneNumber;

            @RichText()
            richTextBar!: RichText;

            @Url()
            urlBar!: Url;

            @Files()
            filesBar!: Files;

            @People()
            peopleBar!: People;

            @Formula("")
            formulaBar!: Formula;

            @MultiSelect(["one", "blue"], "two")
            multiSelectBar!: MultiSelect;

            @Select(["one", "blue"], "two")
            selectBar!: Select;
        }

        class Baz {
            @Title()
            titleBar!: Title;

            @Relation("single", Foo)
            relationBar!: Relation;
        }

        await connection.createDatabase([Foo, Baz]);

        expect(0).toBe(1);
    });
});

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
    RichText,
    Select,
    Title,
    Url,
} from "../src/schema/schema";

describe("Notion ORM", () => {
    let connection: NotionConnection;

    beforeEach(async () => {
        connection = new NotionConnection(
            process.env.SECRET as never,
            process.env.ROOT_PAGE as never
        );

        await connection.cleanUp();
    });

    it("should create a database with all supported property types", async () => {
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

        await connection.createDatabase([Foo]);
    });
});

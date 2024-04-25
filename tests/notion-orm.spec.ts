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
    Number,
    People,
    PhoneNumber,
    RichText,
    Title,
    Url,
} from "../src/schema/schema";

describe("Notion ORM", () => {
    it("should create a database", async () => {
        const connection = new NotionConnection(
            process.env.SECRET as any,
            process.env.ROOT_PAGE as any
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
        }

        await connection.createDatabase(Foo);

        expect(0).toBe(1);
    });
});

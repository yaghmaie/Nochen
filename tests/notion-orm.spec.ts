import { NotionConnection } from "../src/lib";
import {
    Checkbox,
    CreatedBy,
    getSchema,
    LastEditedBy,
    Number,
    Title,
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
        }

        await connection.createDatabase(Foo);

        expect(0).toBe(1);
    });
});

import { NotionConnection } from "../src/lib";
import { Title, Relation } from "../src/schema/schema";

describe("Notion ORM", () => {
    let connection: NotionConnection;

    beforeEach(async () => {
        connection = new NotionConnection(
            process.env.SECRET as never,
            process.env.ROOT_PAGE as never
        );

        await connection.cleanUp();
    });

    it("should create two related databases", async () => {
        class Foo {
            @Title()
            titleBar!: Title;
        }

        class Baz {
            @Title()
            titleBar!: Title;

            @Relation("single", Foo)
            relationBar!: Relation;
        }

        await connection.createDatabase([Foo, Baz]);
    });
});

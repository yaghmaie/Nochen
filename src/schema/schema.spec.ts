import { getSchema, Title } from "./schema";

describe("Schema", () => {
    it("should define title", () => {
        class Foo {
            @Title()
            bar!: Title;
        }

        expect(getSchema(Foo)).toEqual({
            bar: { type: "title", title: {} },
        });
    });
});

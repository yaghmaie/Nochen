import { getSchema, Title, Checkbox, Number, CreatedBy } from "./schema";

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

    it("should define checkbox", () => {
        class Foo {
            @Checkbox()
            bar!: Checkbox;
        }

        expect(getSchema(Foo)).toEqual({
            bar: { type: "checkbox", checkbox: {} },
        });
    });

    it("should define number", () => {
        class Foo {
            @Number("dollar")
            bar!: Number;
        }

        expect(getSchema(Foo)).toEqual({
            bar: { type: "number", number: { format: "dollar" } },
        });
    });

    it("should define created by", () => {
        class Foo {
            @CreatedBy()
            bar!: CreatedBy;
        }

        expect(getSchema(Foo)).toEqual({
            bar: { type: "created_by", created_by: {} },
        });
    });
});

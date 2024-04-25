import {
    getSchema,
    Title,
    Checkbox,
    Number,
    CreatedBy,
    LastEditedBy,
    CreatedTime,
    LastEditedTime,
    Date,
} from "./schema";

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

    it("should define last edited by", () => {
        class Foo {
            @LastEditedBy()
            bar!: LastEditedBy;
        }

        expect(getSchema(Foo)).toEqual({
            bar: { type: "last_edited_by", last_edited_by: {} },
        });
    });

    it("should define created time", () => {
        class Foo {
            @CreatedTime()
            bar!: CreatedTime;
        }

        expect(getSchema(Foo)).toEqual({
            bar: { type: "created_time", created_time: {} },
        });
    });

    it("should define last edited time", () => {
        class Foo {
            @LastEditedTime()
            bar!: LastEditedTime;
        }

        expect(getSchema(Foo)).toEqual({
            bar: { type: "last_edited_time", last_edited_time: {} },
        });
    });

    it("should define date", () => {
        class Foo {
            @Date()
            bar!: Date;
        }

        expect(getSchema(Foo)).toEqual({
            bar: { type: "date", date: {} },
        });
    });
});

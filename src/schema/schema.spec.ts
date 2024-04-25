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
    Email,
    PhoneNumber,
    RichText,
    Url,
    Files,
    People,
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

    it("should define email", () => {
        class Foo {
            @Email()
            bar!: Email;
        }

        expect(getSchema(Foo)).toEqual({
            bar: { type: "email", email: {} },
        });
    });

    it("should define phone number", () => {
        class Foo {
            @PhoneNumber()
            bar!: PhoneNumber;
        }

        expect(getSchema(Foo)).toEqual({
            bar: { type: "phone_number", phone_number: {} },
        });
    });

    it("should define rich text", () => {
        class Foo {
            @RichText()
            bar!: RichText;
        }

        expect(getSchema(Foo)).toEqual({
            bar: { type: "rich_text", rich_text: {} },
        });
    });

    it("should define url", () => {
        class Foo {
            @Url()
            bar!: Url;
        }

        expect(getSchema(Foo)).toEqual({
            bar: { type: "url", url: {} },
        });
    });

    it("should define files", () => {
        class Foo {
            @Files()
            bar!: Files;
        }

        expect(getSchema(Foo)).toEqual({
            bar: { type: "files", files: {} },
        });
    });

    it("should define people", () => {
        class Foo {
            @People()
            bar!: People;
        }

        expect(getSchema(Foo)).toEqual({
            bar: { type: "people", people: {} },
        });
    });
});

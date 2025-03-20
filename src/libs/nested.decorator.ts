import {NESTED_METADATA_KEY} from "@/libs/define-symbols.ts";

export const Nested = (nestedClass: new () => any) => (target: any, propertyKey: string) => {
    Reflect.defineMetadata(
        NESTED_METADATA_KEY,
        nestedClass,
        target,
        propertyKey
    );
};

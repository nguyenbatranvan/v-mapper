## Why v-mapper?

After going through the process of working and converting data between receiving and sending with the backend, I became
quite exhausted from manually transforming the data. It could be something like this:

```ts
export class User {
    name: string;
    address: string;

    toReponse(data) {
        const model = new User();
        model.address = data.address;
        model.name = data.name.toUpperCase();
    }

    toRequest() {
        const model = new User();
        model.address = data.address;
        model.name = data.name.toLowerCase();
    }
}

const data = await fetch("url");
const response: User[] = await data.json();
const instanceUser = new User();
const newData = response.map(instanceUser.toReponse)
```

- With v-mapper, you can eliminate these redundant declarations.
- Supports arrays and objects with user-friendly decorators.

## Config

`tsconfig.json`

```ts
{
    compilerOptions: {
    ...
        experimentalDecorators: true
        emitDecoratorMetadata: true
    }
}
```

## Install
`npm i v-simple-mapper`

## Usage

#### `@Pick`

```ts
class Address {
    @Pick()
    street: string;
    @Pick()
    city: string;

    name: string;
}
```

```ts
const a: Address = {
    city: "sss",
    street: 'a',
    name: "s" // will ignore because not using @Pick
}

console.log(toResponse(a, Address))

// output 
{
    city:"sss"
    street:"A"
}
```

#### `@ToReponse` & `@ToRequest`

In some cases, the data retrieved from the server and the data sent to the server will be transformed differently. I
provide support for two decorators, `@ToReponse` and `@ToRequest`, to handle this issue.

```ts
class Address {
    @Pick()
    @ToRequest<string, Address>((value, source) => {
        return `${value}toRequest`
    })
    @ToResponse<string, Address>((value, source) => {
        return `${value}toResponse`
    })
    street: string;
    @Pick()
    city: string;

    name: string;
}
```

```ts
const a: Address = {
    city: "A",
    street: 'a',
    name: "s" // will ignore because not using @Pick
}

console.log(toResponse(a, Address))

// output 
{
    city:"sss"
    street:"atoResponse"
}

console.log(toRequest(a, Address))

// output 
{
    city:"sss"
    street:"atoRequest"
}
```

#### `@Transform`

In some cases, the data sent to and retrieved from the server will share the same transform function. In such cases, the
@Transform decorator will be used.

```ts
class Address {
    @Pick()
    street: string;
    @Pick()
    @Transform<string, Address>((value, source) => {
        return `${value}2`
    })
    city: string;

    name: string;
}

const a = {
    city: "sss",
    street: 'a',
    name: "s"
}

console.log(toRequest(a, Address), toResponse(a, Address))

// output 
{
    city:"sss2"
    street:"a"
}
```

#### `@Nested`

```ts

class Address {
    @Pick()
    street: string;
    @Pick()
    @Transform<string, Address>((value, source) => {
        return `${value}2`
    })
    city: string;

    name: string;
}


class Profile {
    @Pick()
    name: string
    @Pick()
    @Nested(Address)
    address: Address[];
}

const a: Address[] = [{
    city: "sss",
    street: 'skjsks',
    name: "s"
}]

const profile: Profile = {
    name: 'A',
    address: a
}

console.log(toResponse(profile, Profile));

// output
{
    name: "A"
    address: [
        {
            "city": "sss2",
            "street": "skjsks"
        }
    ]
}
```

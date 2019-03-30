import { stringify } from './utils';

export type Expression = Lambda | Identifier | Application;

export class Lambda {

  argName: Identifier;
  bodyExpr: Expression;

  constructor(
    argName: Identifier,
    bodyExpr: Expression,
  ) {
    this.argName = argName;
    this.bodyExpr = bodyExpr;
  }

  toString() {
    return `#${this.argName}.${
      stringify(this.bodyExpr)
    }`;
  }
}

export class Identifier {

  value: string;

  constructor(value: string) {
    this.value = value;
  }

  toString() {
    return this.value;
  }

}

export class Application {

  funcExpr: Expression;
  argExpr: Expression;

  constructor(
    funcExpr: Expression,
    argExpr: Expression,
  ) {
    this.funcExpr = funcExpr;
    this.argExpr = argExpr;
  }

  toString() {
    return `(${stringify(this.funcExpr)
      } ${stringify(this.argExpr)})`;
  }
}

export class Definition {
  name: Identifier;
  definition: Expression;

  constructor(name: Identifier, definition: Expression) {
    this.name = name;
    this.definition = definition;
  }

  toString() {
    return `${this.name} = ${this.definition}`
  }
}

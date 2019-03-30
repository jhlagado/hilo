import { grammar } from './grammar';
import { Lambda, Definition, Application, Identifier, Expression  } from './elements';

export const semantics = grammar.createSemantics();
semantics.addOperation('parse', {

  Application(_1, funcExp, argExp, _2) {
    return argExp.parse().reduce(
      (acc: Expression, arg: Expression) => new Application(acc, arg),
      funcExp.parse()
    );
  },

  OpenApplication(funcExp, argExp) {
    return argExp.parse().reduce(
      (acc: Expression, arg: Expression) => new Application(acc, arg),
      funcExp.parse()
    );
  },

  DefDefinition(_1, def) {
    return def.parse();
  },

  Definition(nameNode, argsNode, _1, defNode, _2) {
    const nameValue = nameNode.parse();
    const argsValue = argsNode.parse()
    const defValue = defNode.parse();

    const definition = argsValue.reduceRight(
      (acc: Expression, arg: Identifier) => new Lambda(arg, acc),
      defValue
    )
    return new Definition(nameValue, definition);
  },

  Lambda(_1, funcArgNode, _2, funcExprNode) {
    return new Lambda(funcArgNode.parse(), funcExprNode.parse());
  },

  LetExpression(_1, defListNode, _2, exprNode) {
    const defList:Definition[] = defListNode.parse();
    const expr = exprNode.parse();
    const expr1 = defList.reduceRight(
      (acc, def) => new Lambda(def.name, acc),
      expr
    )
    return defList.reduce(
      (acc, def) => new Application(acc, def.definition),
      expr1
    );
  },

  ident(_1, _2) {
    return new Identifier((this as any).sourceString);
  }
});

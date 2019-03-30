import * as ohm from 'ohm-js';

export const grammar = ohm.grammar(`
LambdaGrammar {

  Program
    = (DefDefinition | Expression | Comment)*

  Definition
    = ident ident* "=" (OpenApplication | Expression) ";"

  DefDefinition
    = "def" Definition

  Expression =
  	Lambda
    | Application
    | IfExpression
    | LetExpression
    | ident

  Lambda
    = "#" ident "." Expression

  Application
    = "(" Expression Expression+ ")"

  OpenApplication
    = Expression Expression+

  IfExpression
    = "if" Expression "then" Expression "else" Expression

  LetExpression
    = "let" Definition+ "in" Expression

  Comment
    = "--" any* #"\\n"

  ident  (an identifier)
    = (letter | "_") (alnum | "_")*


}`);

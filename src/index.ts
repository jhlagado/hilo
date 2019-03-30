import { parseEval } from './evaluate';
import { stringify } from './utils';

// import './style.css';

const globalContext = {};

let abort = false;

function assert(text: string, expected: string, message: string, postProcess = stringify) {
  if (abort) return;
  let result = parseEval(text, {...globalContext});
  if (result === undefined)
    abort = true;
  else {
    const actual = postProcess(result);
    if (actual === expected)
      console.log('Success!');
    else {
      abort = true;
      console.error(`${message}
      ${text}
      expected:${expected} actual:${actual}`);
    }
  }
}

console.clear();

parseEval(`
  def identity x = x;
  def apply func arg = func arg;
  def selfApply s = s s;
  def selectFirst first second = first;
  def selectSecond first second = second;
  def makePair first second func = func first second;
  def cond thenExpr elseExpr predicate = predicate thenExpr elseExpr;
  def true = selectFirst;
  def false = selectSecond;
  def not predicate = cond false true predicate;
  def and x y = cond y false x;
  def or x y = cond true y x;
  def iff predicate thenExpr elseExpr =
    cond thenExpr elseExpr predicate;
`, globalContext)


assert(`(((#first.#second.#f.((f first) second) #x.x) #y.y) #first.#second.first)`,`#x.x`,`inline lambda selectFirst from makePair`)

assert(`
  let
    test x = iff x #x.x #y.y;
  in
    (test false)
`, `#y.y`,
`open apply`);

assert(`
  let
    test x = iff x #x.x #y.y;
  in
    (test true)
`, `#x.x`,
`open apply`);

assert(`
  selfApply #x.x
`, `#x.x`,
`open apply`);

assert(`
let
  i = #x.x;
  j = identity;
in (identity j)
`, `identity`,
`open apply`);

assert(`
  (or false true)
`, `true`,
`or one true`);

assert(`
  (or false false)
`, `false`,
`or both false`);

assert(`
  (and false true)
`, `false`,
`and one false`);

assert(`
  (and true true)
`, `true`,
`and both true`);

assert(`
  (not (not false))
`, `false`,
`not not expression`);

assert(`(#x.x #x.x)`, `#x.x`,
`identity applied to itself is identity`);

assert(`
  ((makePair #x.x #y.y) selectSecond)
`, `#y.y`,
`curried apply`);

assert(`
  let
    identity2 = #x.x;
  in
    identity2 #y.y
`, `#y.y`,
`check let with args`);

assert(`
  def x f = f;
  x
`, `x`,
`check def with args`);

assert(`
  (#f.(f #f.f) selfApply)
`, `#f.f`,
`check shadow variables`);

assert(`
  let
    pair = (makePair #x.x #y.y);
  in
    (pair selectSecond)
`, `#y.y`,
`make pair and select second`);

assert(`
  let
    pair = (makePair #x.x #y.y);
  in
    (pair selectFirst)
`, `#x.x`,
`make pair and select first`);

assert(`
  identity
`, `identity`,
`check context`);

assert(`
let
  selectFirst x y = x;
in
  (selectFirst #y.y #x.x)

`, `#y.y`,
`let expression`);

assert(`
((#first.#second.first #x.x) #y.y)

`, `#x.x`,
`select first arg`);

assert(`
let
  i = #x.x;
  j = #y.y;
in (i j)

`, `#y.y`,
`let expression`);
assert(`
def i x = x;
(i #y.y)

`, `#y.y`,
`defining in context`);
assert(`((#func.#arg.(func arg) #x.x) #x.x)`, `#x.x`,
`closure apply ident to ident`);
assert(`((#func.#arg.(func arg) #x.x) #s.(s s))`, `#s.(s s)`,
`closure apply ident to self apply`);
assert(`(#s.(s s) #x.x)`, `#x.x`,
`self apply identity to identity`);
assert(`(#x.x #x.x)`, `#x.x`,
`applying identity to identity returns identity`);
assert(`#x.x`, `#x.x`,
`lambda evaluates to itself`);
assert(``, 'null',
`empty`);

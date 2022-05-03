import parser from './parser'
import gen from './gen';

export default (tpl: string) => {
    const ast = parser(tpl);
    return gen(ast);
}
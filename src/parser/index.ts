import parser from './parser'
import gen from './gen';
import traverse from './traverse'
import transformers from './transformer'

export default (tpl: string) => {
    const ast = parser(tpl);
    traverse(ast, transformers);
    return gen(ast);
}
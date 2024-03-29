import type { ast, generatorContext } from './types'

const cssGenerator = (ast: ast[]) => {
    const context: generatorContext = {
        code: '',
        indentCount: 0,
        push(code: string) {
            context.code += '   '.repeat(context.indentCount) + code;
        },
        newLine() {
            context.code += '\n';
        },
        indent() {
            context.indentCount += 1;
            context.newLine()
        },
        deindent() {
            context.indentCount -= 1;
            context.newLine()
        },
    }
    ast.forEach((node, index: number) => processNode(node, context, index));
    return context.code;
}

const processNode = (node: ast, context: generatorContext, index: number) => {
    const { attrs, children } = node;
    const { push, indent, deindent, newLine } = context;
    if (index) newLine();
    push(attrs?.join('') + ` {`);
    indent();
    children.forEach((node: ast, index: number) => processNode(node, context, index));
    deindent();
    push(`}`);
}

export default cssGenerator;

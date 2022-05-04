import type { ast, transformContext } from './types'

const context: transformContext = {
    currentNode: null,
    parent: [],
    currentIndex: 0,
    removeNode: () => {
        context.parent.splice(context.currentIndex, 1);
        context.currentNode = null;
    },
}

const traverse = (ast: ast[], fns: Array<(node: ast, context: transformContext) => void>) => {
    if (!ast.length) return;
    context.parent = ast;
    ast.forEach((node, index) => {
        context.currentIndex = index;
        context.currentNode = node;
        fns.forEach(fn => fn(node, context))
        traverse(node.children, fns);
    })
}

export default traverse;

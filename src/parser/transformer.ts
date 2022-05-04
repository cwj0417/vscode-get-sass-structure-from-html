import type { ast, transformContext } from './types'

const dedupe = (node: ast, ctx: transformContext) => {
    let children = [];
    let childTypes: {
        [key: string]: number,
    } = {}
    for (let child of node.children) {
        const childIndex = childTypes[child.attrs!.join('')]
        if (childIndex === undefined) {
            childTypes[child.attrs!.join('')] = children.length;
            children.push(child);
        } else {
            children[childIndex].children = children[childIndex].children.concat(child.children);
        }
    }
    node.children = children;
}

export default [dedupe];

import SimpleHtmlParser from './htmlparser';
import type { ast } from './types'

const parser = new SimpleHtmlParser();

const parseToAst = (tpl: string) => {
    let result: ast = {
        tag: 'root',
        children: [],
    }
    let eleStack: ast[] = [result];
    const handler = {
        startElement(tag: ast['tag'], attrs: ast['attrs'], selfClosed: boolean = false) {
            const ele = { tag, attrs, children: []}
            eleStack[0].children.push(ele);
            !selfClosed && eleStack.unshift(ele);
        },
        endElement(tag: ast['tag']) {
            if (eleStack[0].tag !== tag) {
                throw new Error('tag not match');
            }
            eleStack.shift();
        },
    };
    parser.parse(tpl, handler);
    if (eleStack.length !== 1 || eleStack[0].tag !== 'root') {
        throw new Error('tag not match');
    }
    return result.children;
};

export default parseToAst;

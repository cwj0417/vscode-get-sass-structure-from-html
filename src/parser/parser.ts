import SimpleHtmlParser from './htmlparser';
import type { ast } from './types'

const parser = new SimpleHtmlParser();

const normalizeAttrs = (attrs: { name: string, value: string }[]) => {
    let ret: string[] = [];
    for (let attr of attrs!) {
        if (attr.name === 'className' || attr.name === 'class') {
            ret = ret.concat(attr.value.split(' ').map((item) => `.${item}`));
        }
        if (attr.name === 'id') {
            ret.push(`#${attr.value}`);
        }
    }
    return ret;
}

const parseToAst = (tpl: string) => {
    let result: ast = {
        tag: 'root',
        children: [],
    }
    let eleStack: ast[] = [result];
    const handler = {
        startElement(tag: ast['tag'], oattrs: { name: string, value: string }[], selfClosed: boolean = false) {
            const attrs = normalizeAttrs(oattrs);
            const ele = { tag, attrs, children: [] }
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

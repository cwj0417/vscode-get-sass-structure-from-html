import SimpleHtmlParser from './htmlparser';

const parser = new SimpleHtmlParser();



export default (tpl: string) => {
    const handler = {
        startElement(sTagName: any, oAttrs: any) {
            let tmp = oAttrs[0].value;
            if (tmp.split(' ').length > 1) {
                tmp.split(' ').forEach((item: any, index: any) => {
                    if (index === 0) {
                        res += `.${item}{`;
                    } else {
                        res += `&.${item}{}`;
                    }
                });
            } else {
                res += `.${oAttrs[0].value}{`;
            }
        },
        endElement(sTagName: any) {
            res += `}`;
        },
        characters: () => { }
    };
    let res = '';
    
    parser.parse(tpl, handler);
    return res;
};

class SimpleHtmlParser {
	handler = null;
	startTagRe = /^<([^>\s\/]+)((\s+[^=>\s]+(\s*=\s*((\"[^"]*\")|(\'[^']*\')|[^>\s]+))?)*)\s*\/?\s*>/m;
	endTagRe = /^<\/([^>\s]+)>/m;
	attrRe = /([^=\s]+)(\s*=\s*((\"([^"]*)\")|(\'([^']*)\')|[^>\s]+))?/gm;
    contentHandler: any = null;

	parse(s: any, oHandler: any) {
		this.contentHandler = oHandler;
        let treatAsChars = false;
        
		while (s.length > 0) {
			// end tag
			if (s.substring(0, 2) === "</") {
				if (this.endTagRe.test(s)) {
					// @ts-ignore
					s = RegExp.rightContext;

					// @ts-ignore
                    this.parseEndTag(...RegExp.lastMatch.match(this.endTagRe));

					treatAsChars = false;
				}
				else {
					treatAsChars = true;
				}
			}
			// start tag
			else if (s.charAt(0) === "<") {
				if (this.startTagRe.test(s)) {
					// @ts-ignore
					s = RegExp.rightContext;
					// @ts-ignore
                    this.parseStartTag(...RegExp.lastMatch.match(this.startTagRe));

					treatAsChars = false;
				}
				else {
					treatAsChars = true;
				}
			}

			if (treatAsChars) {
				let index = s.indexOf("<");
				if (index === -1) {
					this.contentHandler.characters?.(s);
					s = "";
				}
				else {
					this.contentHandler.characters?.(s.substring(0, index));
					s = s.substring(index);
				}
			}

			treatAsChars = true;
		}
	}

	parseStartTag(sTag: any, sTagName: any, sRest: any) {
		let attrs = this.parseAttributes(sTagName, sRest);
		this.contentHandler.startElement(sTagName, attrs, sRest.endsWith("/"));
	}

	parseEndTag(sTag: any, sTagName: any) {
		this.contentHandler.endElement(sTagName);
	}

	parseAttributes(sTagName: any, s: any) {
		if (!s) return
        let attrs: any[] = [];
        this.attrRe.lastIndex = 0;
        // @ts-ignore
        attrs.push(this.parseAttribute(sTagName, ...this.attrRe.exec(s)));

		return attrs;
	}

	parseAttribute() {
		let value = "";
		if (arguments[7]) { value = arguments[8]; }
		else if (arguments[5]) { value = arguments[6]; }
		else if (arguments[3]) { value = arguments[4]; }

		let empty = !value && !arguments[3];
		return { name: arguments[2], value: empty ? null : value };
	}
}


export default SimpleHtmlParser;

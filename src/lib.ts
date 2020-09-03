// Copyright 2004 Erik Arvidsson. All Rights Reserved.
//
// This code is triple licensed using Apache Software License 2.0,
// Mozilla Public License or GNU Public License
//
///////////////////////////////////////////////////////////////////////////////
//
// Licensed under the Apache License, Version 2.0 (the "License"); you may not
// use this file except in compliance with the License.  You may obtain a copy
// of the License at http://www.apache.org/licenses/LICENSE-2.0
//
///////////////////////////////////////////////////////////////////////////////
//
// The contents of this file are subject to the Mozilla Public License
// Version 1.1 (the "License"); you may not use this file except in
// compliance with the License. You may obtain a copy of the License at
// http://www.mozilla.org/MPL/
//
// Software distributed under the License is distributed on an "AS IS"
// basis, WITHOUT WARRANTY OF ANY KIND, either express or implied. See the
// License for the specific language governing rights and limitations
// under the License.
//
// The Original Code is Simple HTML Parser.
//
// The Initial Developer of the Original Code is Erik Arvidsson.
// Portions created by Erik Arvidssson are Copyright (C) 2004. All Rights
// Reserved.
//
///////////////////////////////////////////////////////////////////////////////
//
// This program is free software; you can redistribute it and/or
// modify it under the terms of the GNU General Public License
// as published by the Free Software Foundation; either version 2
// of the License, or (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program; if not, write to the Free Software
// Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
//
///////////////////////////////////////////////////////////////////////////////

/*
var handler ={
	startElement:   function (sTagName, oAttrs) {},
	endElement:     function (sTagName) {},
    characters:		function (s) {},
    comment:		function (s) {}
};
*/

class SimpleHtmlParser {
	handler = null;
	startTagRe =	/^<([^>\s\/]+)((\s+[^=>\s]+(\s*=\s*((\"[^"]*\")|(\'[^']*\')|[^>\s]+))?)*)\s*\/?\s*>/m;
	endTagRe =	/^<\/([^>\s]+)[^>]*>/m;
	attrRe =	/([^=\s]+)(\s*=\s*((\"([^"]*)\")|(\'([^']*)\')|[^>\s]+))?/gm;
	contentHandler:any = null;

	parse (s: any, oHandler: any) {
		if (oHandler)
			{this.contentHandler = oHandler;}

		var i = 0;
		var res, lc, lm, rc, index;
		var treatAsChars = false;
		var oThis = this;
		while (s.length > 0)
		{
			// Comment
			if (s.substring(0, 4) === "<!--")
			{
				index = s.indexOf("-->");
				if (index !== -1)
				{
					this.contentHandler.comment(s.substring(4, index));
					s = s.substring(index + 3);
					treatAsChars = false;
				}
				else
				{
					treatAsChars = true;
				}
			}

			// end tag
			else if (s.substring(0, 2) === "</")
			{
				if (this.endTagRe.test(s))
				{
					// @ts-ignore
					lc = RegExp.leftContext;
					// @ts-ignore
					lm = RegExp.lastMatch;
					// @ts-ignore
					rc = RegExp.rightContext;

					// @ts-ignore
					lm.replace(this.endTagRe, function ()
					{
						// @ts-ignore
						return oThis.parseEndTag.apply(oThis, arguments);
					});

					s = rc;
					treatAsChars = false;
				}
				else
				{
					treatAsChars = true;
				}
			}
			// start tag
			else if (s.charAt(0) === "<")
			{
				if (this.startTagRe.test(s))
				{
					// @ts-ignore
					lc = RegExp.leftContext;
					// @ts-ignore
					lm = RegExp.lastMatch;
					// @ts-ignore
					rc = RegExp.rightContext;
					// @ts-ignore
					lm.replace(this.startTagRe, function (){
						// @ts-ignore
						return oThis.parseStartTag.apply(oThis, arguments);
					});

					s = rc;
					treatAsChars = false;
				}
				else
				{
					treatAsChars = true;
				}
			}

			if (treatAsChars)
			{
				index = s.indexOf("<");
				if (index === -1)
				{
					 this.contentHandler.characters(s);
					s = "";
				}
				else
				{
					this.contentHandler.characters(s.substring(0, index));
					s = s.substring(index);
				}
			}

			treatAsChars = true;
		}
	}

	parseStartTag (sTag: any, sTagName: any, sRest: any) {
		var attrs = this.parseAttributes(sTagName, sRest);
		this.contentHandler.startElement(sTagName, attrs);
	}

	parseEndTag (sTag: any, sTagName: any) {
		this.contentHandler.endElement(sTagName);
	}

	parseAttributes (sTagName: any, s: any) {
		var oThis = this;
		var attrs: any[] = [];
		s.replace(this.attrRe, function (a0: any, a1: any, a2: any, a3: any, a4: any, a5: any, a6: any)
		{
			attrs.push(oThis.parseAttribute(sTagName, a0, a1, a2, a3, a4, a5, a6));
		});
		return attrs;
	}

	parseAttribute (sTagName: any, sAttribute: any, sName: any, ...args: any[]) {
		var value = "";
		if (arguments[7])
			{value = arguments[8];}
		else if (arguments[5])
			{value = arguments[6];}
		else if (arguments[3])
			{value = arguments[4];}

		var empty = !value && !arguments[3];
		return {name: sName, value: empty ? null : value};
	}
}


export default SimpleHtmlParser;

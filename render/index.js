'use strict';

class CssRender {
	constructor(pretty, tabChar) {
		this.pretty = pretty;
		this.tabChar = tabChar;
	}
	
	render(node, level = 1) {
		let resultCss = '';
		
		if (! node) {
			return resultCss;
		}
		
		let tabChar = '';
		
		if (node.__$_tag) {
			if (this.tabChar) {
				tabChar = this.tabChar.repeat(level);
			}

			if (this.pretty) {
				resultCss += `${tabChar}`;
			}

			resultCss = ' ' + node.__$_tag + ' {';

			for (const property in node) {
				if (! node.hasOwnProperty(property)) {
					continue;
				}

				if (property.startsWith('__$_')) {
					continue;
				}

				if (! this.pretty) {
					resultCss += ' ';
				} else {
					resultCss += `\n${tabChar}${this.tabChar}`;
				}        
				resultCss += `${property}: "${node[property]}";`;
			}
		}
		
		if (node.__$_nested && node.__$_nested.length) {
			
			for (const child of node.__$_nested) {
				let childHtml;

				if (this.pretty) {
					resultCss += `\n${tabChar}`;
				}

				if (typeof child === 'string') {
					childHtml = child;
				} else {
					childHtml = this.render(child, level + 1);
				}

				resultCss += childHtml;
			}
		}

		if (this.pretty) {
			resultCss += `\n${tabChar.replace(this.tabChar, '')}`;
		}

		if (node.__$_tag) {
			resultCss += `}`; 
		}

		return resultCss;
	}
}

class HtmlRender {
	constructor(pretty, tabChar) {
		this.pretty = pretty;
		this.tabChar = tabChar;
	}

	render(node, level = 1) {
		let resultHtml = '';
		
		if (! node) {
			return resultHtml;
		}

		let tabChar = '';
		if (this.tabChar) {
			tabChar = this.tabChar.repeat(level);
		}

		if (this.pretty) {
			resultHtml += `${tabChar}`;
		}

		resultHtml = '<' + node.__$_tag;

		for (const property in node) {
			if (! node.hasOwnProperty(property)) {
				continue;
			}

			if (property.startsWith('__$_')) {
				continue;
			}

			resultHtml += ` ${property}="${node[property]}"`;
		}

		resultHtml += '>';

		if (node.__$_nested && node.__$_nested.length) {
			
			for (const child of node.__$_nested) {
				let childHtml;

				if (this.pretty) {
					resultHtml += `\n${tabChar}`;
				}

				if (typeof child === 'string') {
					childHtml = child;
				} else {
					childHtml = this.render(child, level + 1);
				}

				resultHtml += childHtml;
			}
		}

		if (this.pretty) {
			resultHtml += `\n${tabChar.replace(this.tabChar, '')}`;
		}
		
		resultHtml += `</${node.__$_tag}>`; 
		
		return resultHtml;
	}
}


module.exports = {
	HtmlRender, CssRender
};

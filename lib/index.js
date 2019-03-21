'use strict';

class TemplateDom {
	constructor (tag, parent) {
		this.__$_tag = tag;
		this.__$_parent = parent;

		this.__$_nested = [];
	}

	makeNode(tag, childNodeHandler) {
		if (! childNodeHandler) {
			this.__$_nested.push(tag);
			return tag;
		}
		
		const nestedDom = new TemplateDom(tag, this);
		this.__$_nested.push(nestedDom);
		childNodeHandler(nestedDom);

		return nestedDom;
	}

	toString() {
		return `{ __$_tag: ${this.__$_tag} }`;
	}

}

class TemplateLess {
	constructor(templateDom) {
		this.templateDom = templateDom;
		return new Proxy(() => {}, this);
	}

	apply (target, thisArg, argumentsList) {
		return this.templateDom.makeNode(argumentsList[0]);
	}
	
	get (target, prop) {
		const templateDom = this.templateDom;
		if (typeof prop === 'symbol') { 
			return templateDom;
		}

		if (prop.startsWith('__$_')) {
			return templateDom[prop];
		}

		return new Proxy(() => {}, {
			apply: function (target, thisArg, argumentsList) {
				const nodeFunc = argumentsList[0];

				if (! nodeFunc) {
					return templateDom[prop];
				}

				return templateDom.makeNode(prop, node => {
					nodeFunc(new TemplateLess(node));
				});
			},
			get (target, prop) {
				return templateDom[prop];
			}
		});
	}

	set (target, prop, value) {
		this.templateDom[prop] = value;
		return true;
	}

}

module.exports = {
	TemplateDom, TemplateLess
};

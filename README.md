# TemplateLess
Example html-build usage:
```js
const { TemplateLess, TemplateDom, HtmlRender } = require('templateless');

const html = new TemplateLess(new TemplateDom('html'));

html.lang = 'ru';
html.head(head => {
	head.script(script => {
		script.href = '/js/test.js';
		script['async'] = '';
	});
});

html.body(body => {
	body.h1(h1 => {
		h1('lorem ipsum');
		h1('ipsum lorem');
	});
	
	const div = body.div(div => {
		div.id = '#div-id';
		div['data-options'] = encodeURI(JSON.stringify({test: 'me'}));
	});
	
	if (div.id !== '#div-id') {
		throw new Error('id set error');
	}
	
});
const htmlRender = new HtmlRender();
console.log('<!DOCTYPE html>' + htmlRender.render(html));
```


Example css(less, sass) build usage:
```js
const { TemplateLess, TemplateDom, CssRender } = require('templateless');
const cssRoot = new TemplateLess(new TemplateDom());
cssRoot[`@media (min-width: 480px) and (max-width: 576px)`](media => {
  media['.block'](block => {
    block.background_position = '50% 0';
    block.background_size = 'cover';
    block.background_repeat = 'no-repeat';
    block.background_image = 'url(test.png)';
  });
});
const cssRender = new CssRender();
console.log(cssRender.render(cssRoot));
```

const { TemplateLess, TemplateDom } = require('../index.js');
const { HtmlRender, CssRender } = require('../render/index.js');

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

const cssRoot = new TemplateLess(new TemplateDom());
cssRoot[`@media (min-width: 480px) and (max-width: 576px)`](media => {

  media['.block'](block => {
    block.backgroundPosition = '50% 0';
    block.backgroundSize = 'cover';
    block.backgroundRepeat = 'no-repeat';
    block.backgroundImage = 'url(test.png)';
  });

});

const htmlRender = new HtmlRender();
console.log(htmlRender.render(html));
const cssRender = new CssRender();
console.log(cssRender.render(cssRoot));

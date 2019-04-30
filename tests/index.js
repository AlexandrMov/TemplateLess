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
	const cssRender = new CssRender();
	const div = body.div(div => {
		div.id = '#div-id';
		
		const divStyles = new TemplateDom();
		divStyles.border = '3px solid red';
		
		div.style = cssRender.render(divStyles);
		div['data-options'] = encodeURI(JSON.stringify({test: 'me'}));
	});
	
	if (div.id !== '#div-id') {
		throw new Error('id set error');
	}
	
});

const cssRoot = new TemplateLess(new TemplateDom());
cssRoot[`@media (min-width: 480px) and (max-width: 576px)`](media => {

  media['.block'](block => {
    block.background_position = '50% 0';
    block.background_size = 'cover';
    block.background_repeat = 'no-repeat';
    block.background_image = 'url(test.png)';
  });

});

const htmlRender = new HtmlRender();
console.log('<!DOCTYPE html>' + htmlRender.render(html));
const cssRender = new CssRender();
console.log(cssRender.render(cssRoot));

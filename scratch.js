const { JSDOM } = require('jsdom');
const dom = new JSDOM();
global.window = dom.window;
global.document = dom.window.document;
global.DOMParser = dom.window.DOMParser;

const html = `
<section class="announcement-section bg-muted/50 p-6 rounded-lg my-4">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-center my-6">
        <div class="flex justify-center">
            <img src="test.jpg" class="rounded-lg max-w-full h-auto object-cover shadow-sm" alt="Layout Image" />
        </div>
        <div class="col-text">
            <p>Layout 1 Text</p>
        </div>
    </div>
</section>
<section class="announcement-section my-4">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
        <div class="flex flex-col items-center">
            <img src="test1.jpg" class="rounded-lg max-w-full h-auto object-cover shadow-sm mb-3" alt="Image 1" />
            <div class="w-full col-text"><p>Layout 2 Text 1</p></div>
        </div>
        <div class="flex flex-col items-center">
            <div class="w-full col-text"><p>Layout 2 Text 2</p></div>
        </div>
    </div>
</section>
`;

const parser = new DOMParser();
const doc = parser.parseFromString(html, 'text/html');
const sectionElements = doc.querySelectorAll('section.announcement-section');

sectionElements.forEach((el, index) => {
    const isGrid = el.querySelector('.grid');
    if (isGrid) {
        const cols = el.querySelectorAll('.grid > div');
        console.log(`Section ${index}: cols.length = ${cols.length}`);
        if (cols.length === 2) {
            const isLayout1 = cols[0].querySelector('img') && !cols[0].querySelector('.col-text');
            console.log(`isLayout1 = ${isLayout1}`);
            if (isLayout1) {
                console.log('Layout 1 Text:', cols[1].querySelector('.col-text')?.innerHTML);
            } else {
                console.log('Layout 2 Text 1:', cols[0].querySelector('.col-text')?.innerHTML);
                console.log('Layout 2 Text 2:', cols[1].querySelector('.col-text')?.innerHTML);
            }
        }
    }
});

// Main Javascript file for Multiple Videos
// Using previously built OOP structure for multiple scenes
// John Lynch - January 2024

class IframeScene {
    static instance_count = 0;
    constructor(iframe, video_source) {
        this.id = IframeScene.instance_count++;
        this.iframe = iframe;
        this.video = video_source;
        this.iframe.src = this.video;
        this.width = this.iframe.width;
        this.height = this.iframe.height;
    }
}

function init() {
    const scenes = [];
    const cols = Math.sqrt(iframe_count);
    const main = document.getElementById('main');
    main.innerHTML = '';
    main.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    const {width: main_width, height: main_height} = main.getBoundingClientRect();

    // Create an array of iframes and add each one to the DOM
    const iframes = Array(iframe_count).fill(0).map((_, i) => {
        const frame = document.createElement('iframe');
        frame.id = `iframe-${i}`;
        frame.width = Math.floor(main_width / cols - 10);
        frame.height = Math.floor(main_height / cols - 10);
        main.appendChild(frame);
        return frame;
    });

    // For each iframe, create a new Scene, and push the new Scene to an array of scenes.
    iframes.forEach((frame, i) => {
        const video_url = videos[i % videos.length];
        const s = new IframeScene(frame, video_url);        
        scenes.push(s);
    });
    
    // Render scenes in a separate loop, as we may want this to be separate from scene creation in the future.
    for (const scene of scenes) {
        scene.render();
    }
}

// Top-level code
const videos = [
    'https://www.youtube.com/embed/laBSTmUb4mw?si=tKNaBXEKMChyKD_r',
    'https://www.youtube.com/embed/p8xW1zWuv_U?si=xQOqfUCZLE-dJAkp',
    'https://www.youtube.com/embed/-7xuMEBF10Y?si=_j69TQ45hpp54SWx',
    'https://www.youtube.com/embed/G-G-H0bLy8k?si=wX5FFX52F9ameQKe',
    'https://www.youtube.com/embed/pQbbVFovfFM?si=o33mInW-UaMuJUXz',
    'https://www.youtube.com/embed/85YD9hZ5YQ4?si=OvXPNiZnJ1ImNffh',
    'https://www.youtube.com/embed/Fhsy9VeOnRw?si=0ZPB4utnCu87-xMu',
    'https://www.youtube.com/embed/xZKD3hH0DT4?si=AWumH-217ebjHEty',
    'https://www.youtube.com/embed/fPjohpWJGFg?si=dxAlmFyvRFlLGsJk',
    'https://www.youtube.com/embed/GRCgmfSA2uc?si=TvBos6sVJZL9IEpC',
    'https://www.youtube.com/embed/jU2LlQjmfyQ?si=heNzWNXXncx91C8M',
    'https://www.youtube.com/embed/2KMUCa9qixg?si=3ecyErnhWAmlBrRp',
    'https://www.youtube.com/embed/yBKm_L0Pdck?si=UoYUpqNOXkce5eHr',
    'https://www.youtube.com/embed/kQS6swC6dUM?si=IfWgg-XffnTRkIW-',
    'https://www.youtube.com/embed/yvxqZz5jrnc?si=IXSPlrLkRZp15lKc',
    'https://www.youtube.com/embed/yW-9mipdvIg?si=v-asfus62zrQEMup'
];

let iframe_count = 16; // must be a perfect square!

// Allow user to hit a digit key to refresh with a different number of iframes -
// the square of the digit entered - so, to get 16 (4x4) iframes, hit 4!
window.addEventListener('keyup', event => {
    if (!event.ctrlKey && !event.altKey) {
        const char = event.key;
        const digit = char.match(/\d/)?.input;
        if (digit && digit < 5) {
            iframe_count = digit * digit;
            // Run init() when iframe_count is changed
            init();
        }
    }
});

// Run init() on initial page load and when viewport is resized
['load', 'resize'].forEach(event => window.addEventListener(event, init));

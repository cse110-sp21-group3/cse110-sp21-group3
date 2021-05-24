import colorThemes from '../../colorThemes.js';

const states = {
    small: 'small',
    large: 'large',
}
const stateProperties = {
    small: {
        width: '94px',
        height: '139px',
        labelMarginTop: '1.5rem',
    },
    large: {
        width: '329px',
        height: '486px',
        labelMarginTop: '5rem'
    } //TODO: Add another white box behind
}

class JournalIcon extends HTMLElement {
    constructor(){
        super();
        const expectedSize = this.getAttribute('size');

        this.state = states.small;

        const template = document.createElement('template');
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
    set size(size){
        this.state = (size in states) ? size : null;
    }
    set styleName(styleName) {
        const mainColor = colorThemes[styleName]['main'];
        
        const labelMarginTop =
        this.shadowRoot.innerHTML = `
            <style>
                .journal {
                    width: 67vw;
                    height: 100vw;  

                    margin: auto;
                    background: ${mainColor};
                    border: 2px solid ${mainColor};
                    box-sizing: border-box;
                    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
                    border-radius: 10px;

                    text-center: center;
                    padding: 0rem;

                    cursor: pointer;
                }            
                .white-box {
                    width: 60%;
                    height: 10%;    
                    
                    margin: ${stateProperties[this.state].labelMarginTop} auto;

                    background: #FFFFFF;
                    border: 2px solid #FFFFFF;
                    box-sizing: border-box;
                    border-radius: 5px;
                }

                                
                @media screen and (min-width: 500px) {
                    .journal {
                        width: ${stateProperties[this.state].width};
                        height: ${stateProperties[this.state].height};  
                    }
                }
                
            </style>
            <div class="journal">
                <div class="white-box"></div>
            </div>
        `

    }
}

customElements.define('journal-icon', JournalIcon);

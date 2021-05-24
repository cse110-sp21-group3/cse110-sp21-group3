import colorThemes from '../../colorThemes.js';

const states = {
  small: 'small',
  large: 'large',
};
const stateProperties = {
  small: {
    width: '6rem',
    height: '9rem',
    labelMarginTop: '1.5rem',
  },
  large: {
    width: '20.5rem',
    height: '30rem',
    labelMarginTop: '5rem',
  },
};

class JournalIcon extends HTMLElement {
  constructor() {
    super();
    this.state = states.small;

    const template = document.createElement('template');
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  set size(size) {
    this.state = (size in states) ? size : null;
  }

  set styleName(styleName) {
    const mainColor = colorThemes[styleName].main;

    let backdropDiv = '<div class="backdrop"></div>';
    if (this.state === states.small) backdropDiv = '';
    this.shadowRoot.innerHTML = `
            <style>
                .journal, .backdrop {
                    width: 67vw;
                    height: 100vw;
                    
                    margin: auto;

                    box-sizing: border-box;
                    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
                    border-radius: 10px;

                    text-center: center;
                    padding: 0rem;

                    cursor: pointer;
                }
                .journal {
                    position: relative;
                    background: ${mainColor};
                    border: 2px solid ${mainColor};
                }      
                .backdrop {
                    position: absolute;
                    top: 0;
                    left: 0;
                    transform: translate(0.25rem, 0.25rem);
                    background: white;
                    z-index: -1;
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
                    .journal, .backdrop {
                        width: ${stateProperties[this.state].width};
                        height: ${stateProperties[this.state].height};  
                    }
                }
                
            </style>
            <div class="journal">
                <div class="white-box"></div>
                ${backdropDiv}
            </div>
        `;
  }
}

customElements.define('journal-icon', JournalIcon);

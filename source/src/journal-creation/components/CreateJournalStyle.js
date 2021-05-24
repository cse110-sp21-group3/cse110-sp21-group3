class CreateJournalStyle extends HTMLElement {
  constructor() {
    super();

    const template = document.createElement('template');
    template.innerHTML = `
            <style>
                .journal {
                    width: 94px;
                    height: 139px;  

                    margin: auto;
                    
                    background-color: inherit;
                    border: 2px solid white;
                    box-sizing: border-box;
                    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
                    border-radius: 10px;

                    padding: 0rem;

                    display: flex;
                    justify-items: center;
                }
                .journal > span{
                    margin: auto;
                    height: 23%;

                    font-weight: normal;
                    font-size: xx-large;

                    line-height: 1rem;
                    display: inline-block;
                    vertical-align: middle;
                    color: #000000;
                }
                
            </style>
            <div class='journal'>
                <span>+</span>
            </div>
        `;
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

customElements.define('create-journal-style', CreateJournalStyle);

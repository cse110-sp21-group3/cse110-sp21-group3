class Navbar extends HTMLElement {
  constructor() {
    super();
    const template = document.createElement('template');
    template.innerHTML = `
      <style>
        #nav {
          position: fixed;
          width: 25vw;
          height: 100vh;
          background-color: #EEE4E1;
          transform: translate3d(-100vw, 0, 0);
          transition: 1s;
          z-index: 1000;
          top: 0px;
          left: 0px;
          overflow: scroll;
        
          text-align: center;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        
        .nav-component {
          border-bottom: 1px solid #9A9A9A;
        }
        
        .nav-component > p {
          font-style: normal;
          font-weight: 600;
          font-size: 29px;
          line-height: 49px;
        
          color: #000000;
        }
        
        .nav-component > p:hover {
          text-decoration: underline;
        }
        
        #nav.show {
          transform: translate3d(0vw, 0, 0);
          transition: .3s;
        }
        
        /* The Close Button */
        .close-nav {
          position: absolute;
          color: #aaa;
          top: 8px;
          right: 15px;
          font-size: 28px;
          font-weight: bold;
        }
        
        .close-nav:hover, .close-nav:focus {
          color: black;
          text-decoration: none;
          cursor: pointer;
        }
      </style>
      <!-- Template -->
      <div id="nav">
        <span class="close-nav">&times;</span>
        <div class="nav-component">
          <p>home</p>
        </div>
        <div class="nav-component">
          <p>statistics</p>
        </div>
        <div class="nav-component">
          <p>daily log</p>
        </div>
        <div class="nav-component">
          <p>weekly log</p>
        </div>
        <div class="nav-component">
          <p>monthly log</p>
        </div>
        <div class="nav-component">
          <p>collections</p>
        </div>
        <div class="nav-component">
          <p>settings</p>
        </div>
      </div>`;
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

customElements.define('navbar-elem', Navbar);

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
          cursor: pointer;
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

        .nav-component a{
          text-decoration: none;
          color: black;
        }
      </style>
      <!-- Template -->
      <div id="nav">
        <span class="close-nav">&times;</span>
        <div class="nav-component">
          <p><a href="../home-dailylog/home.html">home</a></p>
        </div>
        <div class="nav-component">
          <p><a href="../trends/trends.html">habits & trends</a></p>
        </div>
        <div class="nav-component">
          <p><a href="../past-dailylogs/past-daily-logs.html">past logs</a></p>
        </div>
        <div class="nav-component">
          <p><a href="../monthly-log/monthlylog.html">monthly log</a></p>
        </div>
        <div class="nav-component">
          <p><a href="../collections/collections.html">collections</a></p>
        </div>
        <div class="nav-component">
          <p><a href="../settings/settings.html">settings</a></p>
        </div>
      </div>`;
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

customElements.define('navbar-elem', Navbar);

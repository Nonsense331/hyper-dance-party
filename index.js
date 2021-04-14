exports.decorateConfig = (config) => {
  var colorOptions = null;
  var danceParty = true;
  var danceCursor = true;
  var extreme = false;
  const pluginConfig = config.plugins;
  if (pluginConfig !== undefined && pluginConfig["hyper-dance-party"] !== undefined) {
    colorOptions = pluginConfig["hyper-dance-party"]["rainbowColors"];
    extreme = pluginConfig["hyper-dance-party"]["extreme"];
    if (pluginConfig["hyper-dance-party"]["danceParty"] !== undefined) {
      danceParty = pluginConfig["hyper-dance-party"]["danceParty"];
    }
    if (pluginConfig["hyper-dance-party"]["danceCursor"] !== undefined) {
      danceCursor = pluginConfig["hyper-dance-party"]["danceCursor"];
    }
  }
  if (colorOptions === null || colorOptions === undefined) {
    colorOptions = [
      'red',
      '#ff6600',
      '#ffff00',
      '#33ff00',
      '#00ffff',
      '#0070ff',
      '#cc00ff'
    ]
  }

  const css = `
    @keyframes rainbow-color {
        0%   {color: ${colorOptions[0]};}
        15%  {color: ${colorOptions[1]};}
        30%  {color: ${colorOptions[2]};}
        45%  {color: ${colorOptions[3]};}
        60%  {color: ${colorOptions[4]};}
        75%  {color: ${colorOptions[5]};}
        90%  {color: ${colorOptions[6]};}
        100% {color: ${colorOptions[0]};}
    }
    @keyframes rainbow-border {
        0%   {border-color: ${colorOptions[0]};}
        15%  {border-color: ${colorOptions[1]};}
        30%  {border-color: ${colorOptions[2]};}
        45%  {border-color: ${colorOptions[3]};}
        60%  {border-color: ${colorOptions[4]};}
        75%  {border-color: ${colorOptions[5]};}
        90%  {border-color: ${colorOptions[6]};}
        100% {border-color: ${colorOptions[0]};}
    }
    @keyframes rainbow-extreme {
        0%   {background-color: ${colorOptions[0]};border-color: ${colorOptions[0]};}
        15%  {background-color: ${colorOptions[1]};border-color: ${colorOptions[1]};}
        30%  {background-color: ${colorOptions[2]};border-color: ${colorOptions[2]};}
        45%  {background-color: ${colorOptions[3]};border-color: ${colorOptions[3]};}
        60%  {background-color: ${colorOptions[4]};border-color: ${colorOptions[4]};}
        75%  {background-color: ${colorOptions[5]};border-color: ${colorOptions[5]};}
        90%  {background-color: ${colorOptions[6]};border-color: ${colorOptions[6]};}
        100% {background-color: ${colorOptions[0]};border-color: ${colorOptions[0]};}
    }
    .rainbow-main {
      border-width: 2px;
    }
    .rainbow-slow-color {
      animation-name: rainbow-color;
      animation-duration: 120s;
      animation-iteration-count: infinite;
    }
    .rainbow-fast-color {
      animation-name: rainbow-color;
      animation-duration: 1s;
      animation-iteration-count: infinite;
    }
    .rainbow-slow-border-color {
      animation-name: rainbow-border;
      animation-duration: 120s;
      animation-iteration-count: infinite;
    }
    .rainbow-fast-border-color {
      animation-name: rainbow-border;
      animation-duration: 1s;
      animation-iteration-count: infinite;
    }
    .rainbow-fast-extreme {
      animation-name: rainbow-extreme;
      animation-duration: 1s;
      animation-iteration-count: infinite;
    }
    .rainbow-transparent {
      background-color: transparent !important;
    }
  `

  return Object.assign({}, config, {
    danceParty: danceParty,
    danceCursor: danceCursor,
    rainbowExtreme: extreme,
    rainbowCSS: css,
    css: `
      ${config.css || ''}
      ${css}
    `
  });
};

var rainbowInterval = null;

exports.decorateTerm = (Term, { React, notify }) => {
  return class extends React.Component {
    constructor (props, context) {
      super(props, context);
      // Since we'll be passing these functions around, we need to bind this
      // to each.
      this._onDecorated = this._onDecorated.bind(this);
      this._onCursorMove = this._onCursorMove.bind(this);
      this._danceParty = config.getConfig().danceParty;
      this._danceCursor = config.getConfig().danceCursor;
      this._extreme = config.getConfig().rainbowExtreme;
      this._div = null;
      this._canvas = null;
      this._customCSS = `
        ${this.props.customCSS || ''}
        ${config.getConfig().rainbowCSS}
      `;
    }

    render () {
      return React.createElement(Term, Object.assign({}, this.props, {
        onDecorated: this._onDecorated,
        onCursorMove: this._onCursorMove,
        customCSS: this._customCSS
      }));
    }

    _onDecorated (term) {
      if (this.props._onDecorated) this.props._onDecorated(term);
      if (term === null) {
        return;
      }
      this._div = term.termRef;
      this._hyperDiv = document.getElementById('mount').children[0].getElementsByClassName('hyper_main')[0];
      this._hyperDiv.classList.add('rainbow-main');
      this._hyperDiv.classList.add('rainbow-slow-border-color');
      // this._cursor = term.cursorNode_;
      // if (this._danceCursor) {
      //   if (this._cursorShape === "BEAM" || this._cursorShape === "UNDERLINE") {
      //     this._cursor.classList.add("rainbow-fast-border-color");
      //     this._cursor.classList.add("rainbow-transparent");
      //   } else {
      //     this._cursor.classList.add("rainbow-fast-extreme");
      //   }
      // }
      // this._rainbowObserver = new MutationObserver(this._onCursorMove);
      // this._rainbowObserver.observe(this._cursor, {
      //   attributes: true,
      //   childList: false,
      //   characterData: false
      // });
    }

    _onCursorMove () {
      if (this.props.onCursorMove) this.props.onCursorMove(cursorFrame);
      if (this._danceParty) {
        this._setDanceModeOn();
        clearInterval(rainbowInterval);
        rainbowInterval = setInterval(this._setDanceModeOff.bind(this), 500);
      }
    }

    _setDanceModeOn () {
      this._hyperDiv.classList.remove('rainbow-slow-border-color');
      this._hyperDiv.classList.add('rainbow-fast-border-color');
      if (this._extreme === true) {
        this._div.classList.add('rainbow-fast-extreme');
        this._hyperDiv.classList.add('rainbow-fast-extreme');
      }
    }

    _setDanceModeOff () {
      this._hyperDiv.classList.add('rainbow-slow-border-color');
      this._hyperDiv.classList.remove('rainbow-fast-border-color');
      if (this._extreme === true) {
        this._div.classList.remove('rainbow-fast-extreme');
        this._hyperDiv.classList.remove('rainbow-fast-extreme');
      }
    }
  }
};

const defaultConfg = {
    1: "install",
    2: "test"
};

const getRunCommand = (cmd) => `npm run ${cmd}`;
const isValidKeycode = (keyCode) => parseInt(keyCode, 10) >= 48 && parseInt(keyCode, 10) <=57;
const isValidKey = (key) => parseInt(key, 10) >= 0 && parseInt(key, 10) <=9;
const hasCommand = (config, keyCode) => isValidKeycode(keyCode) && config.hasOwnProperty(keyCode);

const evaluateConfig = (config) => Object.keys(config).reduce((coll, key) => {
    if (isValidKey(key)) {
        coll[parseInt(key, 10) + 48] = getRunCommand(config[key]);
    }
    return coll;
}, {});

const keydownHandler = (terminal, config) => (e) => {
    if (e.altKey && hasCommand(config, e.keyCode)) {
        e.preventDefault();
        terminal.io.sendString(`${config[e.keyCode]}\r`);
    }
};

exports.decorateTerm = (Term, { React }) => class extends React.Component {
    constructor(props, context) {
        super(props, context);
        this._onTerminal = this._onTerminal.bind(this);
    }

    _onTerminal(term) {
        if (this.props && this.props.onTerminal) {
            this.props.onTerminal(term);
        }

        this.config = evaluateConfig(Object.assign({}, defaultConfg, window.config.getConfig().hypernpm || {}));
        term.uninstallKeyboard();
        term.keyboard.handlers_ = [
            [ "keydown", keydownHandler(term.keyboard.terminal, this.config) ],
            ...term.keyboard.handlers_
        ];
        term.installKeyboard();
    }

    render() {
        return React.createElement(Term, Object.assign({}, this.props, {
            onTerminal: this._onTerminal
        }));
    }
};

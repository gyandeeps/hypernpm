const keyMap = {
    48: 0,
    49: 1,
    50: 2,
    51: 3,
    52: 4,
    53: 5,
    54: 6,
    55: 7,
    56: 8,
    57: 9
};
const defaultConfg = {
    1: "install",
    2: "test"
};
const evaluateConfig = (config) => {

};
const getRunCommand = (cmd) => `npm run ${cmd}`;
const hasCommand = (config, keyCode) => keyMap.hasOwnProperty(keyCode) && config.hasOwnProperty(keyCode);

const keydownHandler = (terminal, config) => (e) => {
    if (e.altKey && hasCommand(config, e.keyCode)) {
        e.preventDefault();
        terminal.io.sendString("node -v");
        terminal.io.sendString("\r");
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

        this.config = evaluateConfig(Object.assign({}, defaultConfg, window.config.getConfig().gyandeep));
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

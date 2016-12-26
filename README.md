[![NPM version](https://badge.fury.io/js/hypernpm.svg)](http://badge.fury.io/js/hypernpm)

hypernpm
=========

Use keyboard shortcuts to run npm script commands.

## Install

To install, edit `~/.hyper.js` and add `"hypernpm"` to `plugins`:

```js
plugins: [                                                                                               
  "hypernpm",                                                                                           
]
```

## Use

**Shortcut:** `ALT + <NUM>`   
**NUM:** 0 to 9 (inclusive)

#### Defaults

* ALT + 1: `npm install`
* ALT + 2: `npm test`

## Configuration

To configure, edit `~/.hyper.js` and add `hypernpm` to `config`:

Define 0 to 9 keys and attach it to some package.json script command.

Example:

```js
{
    config: {
        hypernpm: {
            1: "lint",
            5: "test"
        }
    }
}
```

*Note: Any invalid configurations will be silently ignored.*

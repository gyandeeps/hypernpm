[![NPM version](https://badge.fury.io/js/hypernpm.svg)](http://badge.fury.io/js/hypernpm)

hypernpm
=========

Use keyboard shortcuts to run npm commands or scripts.

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

Define 0 to 9 keys and point it to a native npm command or a script from `package.json`.

Example:

```js
{
    config: {
        hypernpm: {
            // wil run `npm run lint`
            1: "lint",
            // will run `npm test` since it's a native npm command
            5: "test"
        }
    }
}
```

*Note: Any invalid configurations will be silently ignored.*

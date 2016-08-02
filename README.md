# hyper-dance-party

An extension that changes the colors of the border and cursor over time. Rapidly changes colors when typing!
SEIZURE WARNING: I don't know anything about seizures, but if you turn on extreme mode the entire background of the terminal will rapidly change color, so be careful.

## Install

Install [HyperTerm](https://hyperterm.org)
Add `hyper-dance-party` to the plugins list in your `~/.hyperterm.js` config file.

## Configure

Rainbow colors lets you configure the six colors that are cycled through.
Dance cursor rapidly changes the color of the cursor.
Dance party rapidly changes the border color while typing.
Extreme mode also sets the background of the terminal to rapidly change color while typing (not recommended).

```
$ vim ~/.hyperterm.js
module.exports = {
  config: {
    // default font size in pixels for all tabs
    fontSize: 12,

    .....

    plugins: {
      'hyperterm-dance-party': {
      'rainbowColors': [
        'red',
        'white',
        'blue',
        '#ff0000',
        '#ffffff',
        '#0000ff'
      ],
      'extreme': false,
      'danceParty': true,
      'danceCursor': true
    }
    }
  }
}
```

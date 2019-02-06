# hyper-dance-party

An extension that changes the colors of the border and cursor over time. Rapidly changes colors when typing!
SEIZURE WARNING: I don't know anything about seizures, but if you turn on extreme mode the entire background of the terminal will rapidly change color, so be careful.

## Install

Install [HyperTerm](https://hyper.js)
Add `hyper-dance-party` to the plugins list in your `~/.hyper.js` config file.

## Configure

Rainbow colors lets you configure the six colors that are cycled through.
Dance cursor rapidly changes the color of the cursor.
Dance party rapidly changes the border color while typing.
Extreme mode also sets the background of the terminal to rapidly change color while typing (not recommended).

```
$ vim ~/.hyper.js
module.exports = {
  config: {
    // default font size in pixels for all tabs
    fontSize: 12,

    .....

    plugins: {
      'hyper-dance-party': {
      'rainbowColors': [
        'red',
        '#ffac00',
        '#fff100',
        '#fff100',
        '#0bff00',
        '#00f6ff'
      ],
      'extreme': false,
      'danceParty': true
    }
    }
  }
}
```

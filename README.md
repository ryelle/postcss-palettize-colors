# PostCSS Palettize Colors

This is a postCSS plugin used to reduce the colors used in a CSS file down to a set of "valid" colors - a color palette. It uses a basic [color difference algorithm](https://en.wikipedia.org/wiki/Color_difference) to convert any color to the closest color in the palette.

Files with the comment `/* @no-color-match */` as the first item in the file will be skipped. In WordPress, we want this for the about.css file, since those colors are intentionally unique per release.

---------------------------------


## Options

### `colors`

- Type: `Object`
- Default: `{}`

A list of colors in key -> value pairs. The keys are not used currently, but are required by the `getClosestColor` matching function. Example:

```json
{
    "white": "#fff",
    "black": "#000",
    "red": "#8c1717",
    "blue": "#0ebfe9"
}
```

## Usage

```js
const options = {
	colors: {
		"white": "#fff",
		"black": "#000",
		"red": "#8c1717",
		"blue": "#0ebfe9"
	},
};
postcss( [ require( 'postcss-palettize-colors' )( options ) ] )
```

## Example

```css
.foo {
  /* Input example */
  color: #f00;
  background-image: linear-gradient(to bottom right, #eee, #111);
}
```

```css
.foo {
  /* Output example */
  color: #8c1717;
  background-image: linear-gradient(to bottom right, #fff, #000);
}
```

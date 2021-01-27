/**
 * External dependencies
 */
const convert = require( 'color-convert' );
const tinycolor = require( 'tinycolor2' );

/**
 * Given a color and a list, get the closest color. If withDiff is provided,
 * also return the difference value.
 *
 * @param {string} hex       The color, usually as a hex code (or rgb string).
 * @param {Object} colorList A list of colors, with the name as the key, and
 *                           color value as the value.
 * @param {boolean} withDiff If the return value should be just the color (false),
 *                           or an array-pair with the diff value (true).
 */
function getClosestColor(
	hex,
	colorList = {},
	withDiff = false
) {
	if ( ! Object.values( colorList ).length ) {
		if ( withDiff ) {
			return [ false, 0 ];
		}
		return false;
	}
	const color = tinycolor( hex );
	if ( ! color || ! color.isValid() ) {
		if ( withDiff ) {
			return [ false, 0 ];
		}
		return false;
	}
	const { r, g, b } = color.toRgb(); // @todo handle transparent colors?
	const lab = convert.rgb.lab( [ r, g, b ] );
	let lowestDiff = 9999999;
	let matchedColor = '';
	Object.values( colorList ).forEach( ( value ) => {
		const valueColor = tinycolor( value );
		const { r: r2, g: g2, b: b2 } = valueColor.toRgb();
		const lab2 = convert.rgb.lab( [ r2, g2, b2 ] );
		// See https://en.wikipedia.org/wiki/Color_difference
		const diff = Math.sqrt(
			Math.pow( lab2[ 0 ] - lab[ 0 ], 2 ) +
				Math.pow( lab2[ 1 ] - lab[ 1 ], 2 ) +
				Math.pow( lab2[ 2 ] - lab[ 2 ], 2 )
		);

		if ( diff < lowestDiff ) {
			lowestDiff = diff;
			matchedColor = value;
		}
	} );

	if ( withDiff ) {
		return [ matchedColor, lowestDiff ];
	}
	return matchedColor;
}

module.exports = {
	getClosestColor
};

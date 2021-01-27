/**
 * External dependencies
 */
const tinycolor = require( 'tinycolor2' );
const { parse } = require( 'postcss-values-parser' );

/**
 * Internal dependencies
 */
const { getClosestColor } = require( './lib' );

module.exports = ( options = {} ) => {
	const colorList = options.colors || {};

	function getReplacementColor( color ) {
		const newColor = getClosestColor( color, colorList );

		const alpha = tinycolor( color ).getAlpha();
		if ( alpha !== 1 ) {
			const newColorWithAlpha = tinycolor( newColor ).setAlpha( alpha );
			return newColorWithAlpha.toString();
		}
		return newColor.toString();
	}

	return {
		postcssPlugin: 'postcss-palettize-colors',
		Once( root ) {
			// No colors passed in.
			if ( ! Object.values( colorList ).length ) {
				return;
			}

			// If we find this directive, this file should be skipped.
			if ( '@no-color-match' === root.first.text ) {
				return;
			}

			root.walkRules( ( rule ) => {
				rule.walkDecls( ( decl ) => {
					let hasNewColor = false;

					const valueAst = parse( decl.value );
					valueAst.walkWords( ( node ) => {
						if ( ! node.isColor ) {
							return;
						}
						node.value = getReplacementColor( node.value );
						hasNewColor = true;
					} );

					valueAst.walkFuncs( ( node ) => {
						if ( ! node.isColor ) {
							return;
						}
						const newColor = getReplacementColor( node.toString() );
						const newNode = parse( newColor ).first;
						node.replaceWith( newNode );
						hasNewColor = true;
					} );

					if ( hasNewColor ) {
						decl.value = valueAst.toString();
					}
				} );
			} );
		},
	};
};

module.exports.postcss = true

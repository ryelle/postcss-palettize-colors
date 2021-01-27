/**
 * Internal dependencies
 */
const { getClosestColor } = require('../lib' );
const brandColors = require( './fixtures/colors.json' );

test( 'Invalid values should return false.', () => {
	expect( getClosestColor( '', { red: '#f00' } ) ).toBe( false );
	expect( getClosestColor( false, { red: '#f00' } ) ).toBe( false );
	expect( getClosestColor( '#', { red: '#f00' } ) ).toBe( false );
	expect( getClosestColor( 'xyz', { red: '#f00' } ) ).toBe( false );
	expect( getClosestColor( 32.3, { red: '#f00' } ) ).toBe( false );
} );

test( 'Empty color list should return false.', () => {
	expect( getClosestColor( '#f00', {} ) ).toBe( false );
} );

test( 'Custom color lists work.', () => {
	const colors = {
		red: '#f00',
		green: '#0f0',
		blue: '#00f',
	};
	expect( getClosestColor( '#e00', colors ) ).toBe( '#f00' );
	expect( getClosestColor( '#a10', colors ) ).toBe( '#f00' );
	expect( getClosestColor( '#089', colors ) ).toBe( '#0f0' );
} );

test( 'Red correctly returns a red color.', () => {
	const colors = {
		red: '#dc3232',
		black: '#191e23',
	};
	expect( getClosestColor( 'rgb(230, 1, 34)', colors ) ).toBe( '#dc3232' );
} );

test( 'Matching values should return the exact color.', () => {
	expect( getClosestColor( '#e8eaeb', brandColors ) ).toBe( '#e8eaeb' );
	expect( getClosestColor( '#b02828', brandColors ) ).toBe( '#b02828' );
	expect( getClosestColor( '#826eb4', brandColors ) ).toBe( '#826eb4' );
	expect( getClosestColor( '#008ec2', brandColors ) ).toBe( '#008ec2' );
} );

test( 'Hex values match with or without the #.', () => {
	expect( getClosestColor( '#e8eaeb', brandColors ) ).toBe( '#e8eaeb' );
	expect( getClosestColor( 'e8eaeb', brandColors ) ).toBe( '#e8eaeb' );
} );

test( 'Nearby values should return the correct color.', () => {
	expect( getClosestColor( '#103369', brandColors ) ).toBe( '#4e426c' );
	expect( getClosestColor( '#97d936', brandColors ) ).toBe( '#46b450' );
	expect( getClosestColor( '#9995cb', brandColors ) ).toBe( '#9b8bc3' );
	expect( getClosestColor( '#511a29', brandColors ) ).toBe( '#23282d' );
} );

test( 'RGB values work.', () => {
	expect( getClosestColor( 'rgb(218, 242, 252)', brandColors ) ).toBe(
		'#e6f6fb'
	);
	expect( getClosestColor( 'rgb(54, 240, 251)', brandColors ) ).toBe(
		'#66c6e4'
	);
} );

test( 'RGBA values work.', () => {
	expect( getClosestColor( 'rgba( 219, 86, 121, 1 )', brandColors ) ).toBe(
		'#e35b5b'
	);
	expect( getClosestColor( 'rgba( 21, 21, 11, 0.6 )', brandColors ) ).toBe(
		'#191e23'
	);
} );

const presets = [
	[
		'@babel/env',
		{
			targets: {
				edge: '17',
				firefox: '61',
				chrome: '69',
				opera: '55',
			},
			useBuiltIns: 'usage',
		},
	],
];

module.exports = { presets };

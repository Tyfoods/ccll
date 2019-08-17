// Require path.
const path = require( 'path' );

// Configuration object.
const config = {
	// Create the entry points.
	// One for frontend and one for the admin area.
	entry: {
		//the key here will replace the [name] portion of the output config below.
		frontEndAdminManager: './assets/src/frontEndAdminManager.js',
		frontEndLoggedOutUser: './assets/src/frontEndLoggedOutUser.js',
		frontEndLoggedInUser: './assets/src/frontEndLoggedInUser.js',
		backEndAdminManager: './assets/src/backEndAdminManager.js',

		appComponent: './assets/src/components/App.js'
	},

	// Create the output files.
	// One for each of our entry points.
	output: {
		// [name] allows for the entry object keys to be used as file names.
		filename: '[name].js',
		// Specify the path to the JS files.
		path: path.resolve( __dirname, './assets/js/' )
	},

	// Setup a loader to transpile down the latest and great JavaScript so older browsers
	// can understand it.
	module: {
		rules: [
			{
				// Look for any .js files.
				test: /\.js$/,
				// Exclude the node_modules folder.
				exclude: /node_modules/,
				// Use babel loader to transpile the JS files.
                loader: 'babel-loader',
                query: {
                    presets: ['@babel/env']
                }
			},

		]
	}
}

// Export the config object.
module.exports = config;
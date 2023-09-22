const config = {
	content: [
	  "./src/**/*.{html,js,svelte,ts}",
	  "./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}",
	],
  
	theme: {
	  extend: {
		gridRow : {
			'span-7' : 'span 7 / span 7',
			'span-8' : 'span 8 / span 8',
			'span-9' : 'span 9 / span 9',
			'span-10' : 'span 10 / span 10',
			'span-11' : 'span 11 / span 11',
			'span-12' : 'span 12 / span 12',
			'span-13' : 'span 13 / span 13',
			'span-14' : 'span 14 / span 14',
			'span-15' : 'span 15 / span 15',
			'span-16' : 'span 16 / span 16'
		}
	  },
	},
  
	plugins: [
		require('flowbite/plugin')
	  ],
	darkMode: 'class',
  };
  
  module.exports = config;
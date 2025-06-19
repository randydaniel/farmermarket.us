export default {
	content: ['./src/**/*.{html,js,svelte,ts}', './src/app.html'],
	theme: {
		extend: {
			colors: {
				primary: '#020617',
				secondary: '#475569',
				accent: '#10b981'
				// Add more tokens as needed
			},
			fontFamily: {
				sans: ['Geist', 'sans-serif'],
				mono: ['Geist Mono', 'monospace']
			},
			container: {
				padding: '1rem',
				screens: {
					DEFAULT: '100%',
					xl: '1504px'
				}
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(circle at center, var(--tw-gradient-stops))'
			}
		}
	},
	plugins: [
		require('@tailwindcss/typography')
		// add other plugins here if needed
	]
};

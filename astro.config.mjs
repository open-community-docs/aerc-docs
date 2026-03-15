// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://aerc-docs.org',
	integrations: [
		starlight({
			title: 'aerc docs',
			tagline: 'Community documentation for the aerc email client',
			social: [
				{
					icon: 'external',
					label: 'aerc on sourcehut',
					href: 'https://sr.ht/~rjarry/aerc/',
				},
				{
					icon: 'github',
					label: 'GitHub',
					href: 'https://github.com/aerc-docs/aerc-docs',
				},
			],
			sidebar: [
				{
					label: 'Getting Started',
					autogenerate: { directory: 'getting-started' },
				},
				{
					label: 'Guides',
					autogenerate: { directory: 'guides' },
				},
				{
					label: 'Email Providers',
					autogenerate: { directory: 'providers' },
				},
				{
					label: 'Reference (Man Pages)',
					autogenerate: { directory: 'reference' },
				},
				{
					label: 'Ecosystem',
					autogenerate: { directory: 'ecosystem' },
				},
				{
					label: 'Recipes',
					autogenerate: { directory: 'recipes' },
				},
				{
					label: 'Contributing',
					autogenerate: { directory: 'contributing' },
				},
			],
			editLink: {
				baseUrl: 'https://github.com/aerc-docs/aerc-docs/edit/main/',
			},
			customCss: ['./src/styles/custom.css'],
			head: [
				{
					tag: 'meta',
					attrs: {
						name: 'description',
						content: 'Community documentation for the aerc email client — guides, reference, recipes, and provider setup.',
					},
				},
			],
		}),
	],
});

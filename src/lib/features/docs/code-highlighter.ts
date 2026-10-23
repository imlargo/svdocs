/**
 * Syntax highlighting for fenced code blocks, wired into svmd via `highlight` in vite.config.ts.
 *
 * Renders both a light and a dark theme as CSS variables on every token (`defaultColor: false`),
 * so a block just follows the site's `.dark` class switch with no client-side work. `layout.css`
 * has the two small rules that pick the right variable pair.
 *
 * Not `@svmd/shiki`: that adapter doesn't expose `defaultColor: false`, so its dual-theme output
 * still carries an inline fallback `color`, which would need `!important` to override in dark
 * mode. Calling shiki directly avoids that.
 *
 * Built lazily rather than with a top-level `await`: this file is imported by `vite.config.ts`,
 * and a config graph that suspends on top-level await can deadlock the bundler.
 */
import { createHighlighter, addClassToHast, type Highlighter } from 'shiki';
import type { Highlighter as SvmdHighlighter } from '@svmd/core';

const LIGHT = 'github-light';
const DARK = 'github-dark';

/** Languages the docs actually use. Anything else falls back to unhighlighted text. */
const LANGS = [
	'svelte',
	'typescript',
	'javascript',
	'json',
	'jsonc',
	'bash',
	'html',
	'css',
	'markdown'
];

let pending: Promise<Highlighter> | undefined;

function getHighlighter() {
	pending ??= createHighlighter({ themes: [LIGHT, DARK], langs: LANGS });
	return pending;
}

export const highlightCode: SvmdHighlighter = async ({ value, lang }) => {
	const highlighter = await getHighlighter();
	const language = lang && LANGS.includes(lang) ? lang : 'text';

	return highlighter.codeToHtml(value, {
		lang: language,
		themes: { light: LIGHT, dark: DARK },
		defaultColor: false,
		// `@tailwindcss/typography`'s `.prose` styles `pre`/`code` on its own; shiki already
		// brings its own background and colors, so opt this block out of prose's styling instead
		// of fighting it.
		transformers: [
			{
				pre(node) {
					addClassToHast(node, 'not-prose');
				}
			}
		]
	});
};

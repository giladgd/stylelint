'use strict';

const { messages, ruleName } = require('..');

testRule({
	ruleName,
	config: [/foo-.+/],

	accept: [
		{
			code: '@keyframes foofoo {}',
		},
		{
			code: '@custom-media --foo-bar (min-width: 0);',
		},
		{
			code: '@custom-media --foo-foofoo (min-width: 0);',
		},
		{
			code: '@cUsToM-mEdIa --foo-foofoo (min-width: 0);',
		},
		{
			code: '@CUSTOM-MEDIA --foo-foofoo (min-width: 0);',
		},
	],

	reject: [
		{
			code: '@custom-media --foa-bar (min-width: 0);',
			message: messages.expected('--foa-bar', /foo-.+/),
			line: 1,
			column: 15,
			endLine: 1,
			endColumn: 24,
		},
		{
			code: '@cUsToM-mEdIa --foa-bar (min-width: 0);',
			message: messages.expected('--foa-bar', /foo-.+/),
			line: 1,
			column: 15,
			endLine: 1,
			endColumn: 24,
		},
		{
			code: '@CUSTOM-MEDIA --foa-bar (min-width: 0);',
			message: messages.expected('--foa-bar', /foo-.+/),
			line: 1,
			column: 15,
			endLine: 1,
			endColumn: 24,
		},
		{
			code: '@custom-media --foa (min-width: 0);',
			message: messages.expected('--foa', /foo-.+/),
			line: 1,
			column: 15,
			endLine: 1,
			endColumn: 20,
		},
	],
});

testRule({
	ruleName,
	config: ['foo-.+'],

	accept: [
		{
			code: '@keyframes foofoo {}',
		},
		{
			code: '@custom-media --foo-bar (min-width: 0);',
		},
		{
			code: '@custom-media --foo-foofoo (min-width: 0);',
		},
	],

	reject: [
		{
			code: '@custom-media --foa-bar (min-width: 0);',
			message: messages.expected('--foa-bar', 'foo-.+'),
			line: 1,
			column: 15,
			endLine: 1,
			endColumn: 24,
		},
		{
			code: '@custom-media --foa (min-width: 0);',
			message: messages.expected('--foa', 'foo-.+'),
			line: 1,
			column: 15,
			endLine: 1,
			endColumn: 20,
		},
	],
});

testRule({
	ruleName,
	config: [/^[A-Z][a-z]+-[a-z][a-zA-Z]+$/],

	accept: [
		{
			code: '@custom-media --Ape-ageLess',
		},
		{
			code: '@custom-media --Purr-piratePlant',
		},
	],

	reject: [
		{
			code: '@custom-media --ape-ageLess',
			message: messages.expected('--ape-ageLess', /^[A-Z][a-z]+-[a-z][a-zA-Z]+$/),
			line: 1,
			column: 15,
			endLine: 1,
			endColumn: 28,
		},
		{
			code: '@custom-media --Ape-AgeLess',
			message: messages.expected('--Ape-AgeLess', /^[A-Z][a-z]+-[a-z][a-zA-Z]+$/),
			line: 1,
			column: 15,
			endLine: 1,
			endColumn: 28,
		},
	],
});

module.exports = {
    root: true,
    parserOptions: {
        ecmaVersion: 2019,
        sourceType: 'module',
    },
    env: {
        es6: true,
        browser: true,
    },
    extends: [
        'standard',
    ],
    plugins: [
        'svelte3',
    ],
    rules: {
        indent: ['error', 4],
        'comma-dangle': ['error', 'always-multiline'],
    },
    settings: {
    },
    overrides: [
        {
            files: ['**/*.svelte'],
            processor: 'svelte3/svelte3',
            rules: {
                'import/first': 0,
                'import/no-duplicates': 0,
                'import/no-mutable-exports': 0,
            },
        },
    ],
}

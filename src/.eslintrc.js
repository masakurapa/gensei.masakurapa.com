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
            rules: {
                'import/first': false,
                'import/no-duplicates': false,
                'import/no-mutable-exports': false,
            },
        },
    ],
}

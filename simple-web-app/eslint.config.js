module.exports = [
    {
        files: ['*.js', '*.jsx'],
        env: {
            node: true,
            es6: true,
        },
        extends: [
            'eslint:recommended',
            'plugin:react/recommended',
            'plugin:react-hooks/recommended',
            'plugin:jsx-a11y/recommended',
        ],
        parser: '@babel/eslint-parser',
        parserOptions: {
            ecmaVersion: 2021,
            sourceType: 'module',
            ecmaFeatures: {
                jsx: true,
            },
        },
        settings: {
            react: {
                version: 'detect',
            },
        },
        rules: {
            // Add your specific rules here
        },
    },
];

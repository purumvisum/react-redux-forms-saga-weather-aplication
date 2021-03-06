module.exports = {
    "ecmaFeatures": {
        "jsx": true,
        "modules": true
    },
    "extends": "airbnb",
    "env": {
        "browser": true,
        "node": true,
        "jest/globals": true
    },
    "parser": "babel-eslint",
    "rules": {
        "indent": ["error", 4],
        "comma-dangle": ["error", "never"],
        "quotes": [2, "single"],
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
        "react/forbid-prop-types": "off",
        "react/jsx-indent": [2, 4],
        "react/jsx-indent-props": [2, 4],
        "arrow-parens" : "off",
        "strict": [2, "never"],
        "react/jsx-uses-react": 2,
        "react/jsx-uses-vars": 2,
        "react/react-in-jsx-scope": 2
    },
    "plugins": [
        // "airbnb-base",
        "react",
        "jest",
        // "redux-saga"
    ]
};

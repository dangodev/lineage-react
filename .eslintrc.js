module.exports = {
    "extends": "airbnb",
    "rules": {
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }]
    },
    "settings": {
        "import/resolver": {
            "webpack": {
                "config": "config/webpack.dev.js"
            }
        }
    }
};

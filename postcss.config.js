module.exports = (ctx) => ({
    parser: ctx.parser ? 'sugarss' : false,
    map: ctx.env === 'development' ? ctx.map : false,
    plugins: {
        'postcss-import': {},
        'postcss-css-variables': {},
        'postcss-simple-vars': {},
        'postcss-nested': {},
        'postcss-pxtorem': {
            rootValue: 16,
            unitPrecision: 5,
            propList: ['font-size', 'line-height', 'margin*', 'padding*'],
            selectorBlackList: ['html'],
            replace: true,
            mediaQuery: false,
            minPixelValue: 0
        },
        'autoprefixer': {},
    }
})
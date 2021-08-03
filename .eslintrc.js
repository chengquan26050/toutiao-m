module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: [
        'plugin:vue/essential',
        // '@vue/standard'
    ],
    parserOptions: {
        parser: 'babel-eslint'
    },
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        // 关闭对象属性中的尾随逗号校验
        // 'comma-dangle': 0,

        // 关闭禁止混用tab和空格
        // 'no-mixed-spaces-and-tabs': 0,

        // 关闭单双引号校验
        // quotes: 0,

        // 关闭缩进校验
        // indent: 0,

        // 关闭函数名前的空格校验
        'space-before-function-paren': 0,

        // 关闭行尾分号的校验
        // semi: 0,

        // 关闭无用变量的校验
        // 'no-unused-vars': 0,

        // 关闭禁用 tab
        // 'no-tabs': 0

    }
}
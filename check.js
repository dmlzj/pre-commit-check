var exec = require('child_process').exec
// var eslint = require('eslint');
var fs = require('fs')
var successTip = ['不错哦！加油！↖(^ω^)↗ ', '没有找到测试代码，commit成功', '棒棒哒！']

var checkTest = function (cb) {
    var array
    var text
    var testCode = function (text, name) { // 检测函数
        if (/--(\s+)?test(\s+)?--/.test(text) || /--(\s+)?end test(\s+)?--/.test(text)) {
            console.log('\x1B[31m%s', name)
            console.log('\x1B[37m', '存在测试代码未删除！')
            return false
        }
        return true
    }
    exec('git diff HEAD --name-only --diff-filter=ACMR', function (error, stdout, stderr) { // 通过node子进程执行命令
        if (stdout) {
            array = stdout.split('\n') // 通过切割换行，拿到文件列表
            array.pop()// 去掉最后一个换行符号
            array.forEach(function (value) {
                text = fs.readFileSync(value, 'utf-8') // 拿到文件内容
                if (testCode && !testCode(text, value)) { // 检测函数
                    cb(1)
                    return
                }
            })
            cb(0)
        } else {
            cb(0)
        }
    })
}

var taskList = [checkTest]
// 执行检查
var task = function () {
    if (!taskList.length) {
        console.log('\x1B[32m%s', successTip[Math.floor(successTip.length * Math.random())])
        process.exit(0)
        return
    }
    var func = taskList.shift()
    func(function (pass) {
        if (pass === 1) {
            process.exit(1)
            return
        }
        task()
    })
}

var startTask = function () {
    console.log('开始检查测试代码')
    task()
}

// 执行检查
startTask()

# pre-commit-check
use pre-commit npm to check code

# pre-commit

顾名思义’pre-commit‘，就是在代码提交之前做些东西，比如代码打包，代码检测，称之为钩子（hook）。可以理解为回调好了，在commit之前执行一个函数（callback）。这个函数成功执行完之后，再继续commit，但是失败之后就阻止commit了。

![](http://7te8kr.com1.z0.glb.clouddn.com/pre_1.png)

在.git->hooks->下面有个pre-commit.sample*，这个里面就是默认的函数(脚本)样本。

# npm script

之前在掘金里面看到一篇[Run npm scripts in a git pre-commit Hook](http://elijahmanor.com/npm-precommit-scripts/), 可以利用npm script来做脚本。

## 安装pre-commit
```
npm install pre-commit --save-dev
```

## 使用本库
把check.js复制到你自己的项目中，然后按照下面的操作修改即可！

## 修改package.json
```
"scripts": {
    "lint:check": "node [你的路径]check.js" // 检查的脚本
  },
  "pre-commit": [
    "lint:check" // 与scripts中的脚本名称一一对应
  ],
```
## 测试代码
实际写代码中的测试代码，写在--test--和--end test--之间，这样在commit时候就会被检测出来

```
// --test-- 或者 -- test --
// --end test-- 或者 -- end test --
```
## 问题
按照之前的那篇文章，接下来更改某个文件，应该是可以执行check脚本了，但是在window下并没有pre-commit。

在[github上找到了原因](https://github.com/observing/pre-commit/issues/72), 因为在window下pre-commit npm，由于权限问题，导致无法在hooks文件下生成文件。

需要以管理员打开cmd，执行`node ./node_modules/pre-commit/install.js`就可以了。

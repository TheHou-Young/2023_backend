# 提交代码流程

1. 在多人协作模式里，如果要开发自己的功能，需要从 dev 里面 checkout 一个自己的开发功能的分支：

```git
git checkout -b feature/lkd-branch
```

2. 添加代码到暂存区

```git
git add .
```

3. 提交代码（不建议使用 git commit -m, 已经配好了提交指令，会在提交之前进行一次静态检查）

```git
yarn commit
```

4. 在`yarn commit`指令里面，选择你所提交代码的类型，比如是 feat\fix\chore 等，并且书写提交的概要和详细内容

下面是几个常见的指令:

- feat: 添加功能
- fix: 修复 bug
- chore: 添加依赖项
- refactor: 重构代码，但是不添加功能
- wip: 添加功能，但未完成(work in progress)
- style: 添加样式
- doc: 改变文档内容

# 一些写代码的注意事项

1. 推荐使用 vscode，这里配置了 vscode 相关的 eol，不然很容易产生 CRLF 文件
2. 如果后续有测试环境和线上环境，请在`/config/environment`里的 env 文件里面编写，如果有公共配置项目，就直接写在根目录下的.env 文件中
3. 关于 routes 文件夹下的路由，在 index.js 已经做了文件夹的文件扫描然后再导入，所以不需要自行编写 app.use 逻辑

# 启动代码

1. 本地启动：yarn local
2. 连接 dev 环境：yarn dev
3. 连接 pro 环境：yarn pro
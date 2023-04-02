# 关于数据库设计

本数据库使用 MongoDB，因此对于像 MySQL 的对于一对多和多对多的数据模型是不适用的，一对多以内嵌数据为主，多对多以内嵌数组为主
这必定有数据的冗余

# 目录相关

- config: app.js 的预置加载项目，包括 env，中间件配置等
- controller: 控制器层，用于接收 http 请求参数，只能依赖于 services
- dao：数据层，用于做直接的数据库查询等，只能依赖于 models
- log：日志
- models：模型层
- node_modules：依赖
- public：可对外暴露的文件
- routes：路由，只依赖于 controller
- service：服务层，用于组装 dao，因此只能依赖于 dao
- utils：工具

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

4. 在`yarn commit`指令里面，选择你所提交代码的类型，比如是 feat\fix\chore 等，并且依靠 Angular 团队书写规范来提交的概要和详细内容

下面是几个常见的指令:

- feat: 添加功能
- fix: 修复 bug
- chore: 添加依赖项
- refactor: 重构代码，但是不添加功能
- wip: 添加功能，但未完成(work in progress)(未配置该指令，后续配置)
- style: 添加样式
- doc: 改变文档内容

# 一些写代码的注意事项

1. 推荐使用 vscode，这里配置了 vscode 相关的 eol，不然很容易产生 CRLF 文件
2. 如果后续有测试环境和线上环境，请在`/config/environment`里的 env 文件里面编写，如果有公共配置项目，就直接写在根目录下的.env 文件中
3. 关于 routes 文件夹下的路由，在 index.js 已经做了文件夹的文件扫描然后再导入，所以不需要自行编写 app.use 逻辑
4. 本项目不需要每个地方都写 try catch 逻辑，在 app.js 中已经配置好了 express-async-errors 来进行全局异常处理(不然真的很蠢)

# 启动代码

1. 本地启动：yarn local(连接本地数据库)
2. 连接 dev 环境：yarn dev(自测推荐)
3. 连接 pro 环境：yarn pro(连接线上数据库，未配置)

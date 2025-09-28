# Mitsuki-MCP-audit

研发基于MCP Server协议的前端通用安全依赖审计工具，解决 npm audit 的核心痛点。

工具支持本地工程和远程仓库，包含CVSS、CWE、依赖链等关键审计信息。

审计结果为标准化 markdown 文件，将来亦可支持渲染为其他标准格式，如JSON、HTML等。工具可用于本地依赖检查和技术选型等安全审计工作。

## 技术栈

NodeJS、MCP Server、Zod、Ejs、Git API、Typescript

## 效果实现

- 无安装实现 lock 文件生成
- 利用 npm security api 完成住主工程安全审计
- 依赖图到依赖链底转换，完成图结构的DFS并处理 recursive dependency 问题
- 使用模板引擎渲染审计结果
- 合并漏洞影响的语义范围
- 构建 MCP Server

可以集成到Cursor、VSCode、Dify这些工具，也可以直接调用。以后所有的安全审计都可以依靠这套工具完成，在审计这一块现在基本不用耗费什么时间。

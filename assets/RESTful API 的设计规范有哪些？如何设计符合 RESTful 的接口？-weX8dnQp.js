const e=`### 6. RESTful API 的设计规范有哪些？如何设计符合 RESTful 的接口？

#### 核心设计规范

1. **资源为核心**：URL 用**名词**表示资源（而非动词），如 /users（用户）、/orders（订单）；
2. **HTTP 方法表达操作**：

   - GET：查询资源（单个 / 列表）；
   - POST：创建资源；
   - PUT：全量更新资源；
   - PATCH：部分更新资源；
   - DELETE：删除资源；
3. **URL 简洁语义化**：层级清晰（如 /users/1/orders 表示用户 1 的订单），无冗余（避免 /getUsers、/deleteUser）；
4. **状态码语义化**：用标准状态码（200 成功、201 创建、400 参数错、404 资源不存在）；
5. **版本控制**：URL 携带版本（/api/v1/users）或 Header（Accept: application/vnd.xxx.v1+json）；
6. **返回格式统一**：优先 JSON，包含状态、数据、提示（如 {code:200, data:[], msg:"success"}）；
7. **支持过滤 / 排序 / 分页**：通过 query 参数（如 /users?page=1&size=10&sort=createTime desc）；
8. **跨域处理**：返回 CORS 相关头（Access-Control-Allow-Origin）；
9. **身份验证**：通过 Authorization 头传递 Token，而非 URL 参数。

#### 设计示例（用户资源）`;export{e as default};

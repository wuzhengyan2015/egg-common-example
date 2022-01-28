'use strict';

module.exports = app => {
  app.passport.verify(async (ctx, user) => {
    return {
      id: user.id,
      displayName: user.displayName,
    };
  });

  // 将用户信息序列化后存进 session 里面，一般需要精简，只保存个别字段
  app.passport.serializeUser(async (ctx, user) => {
  // 处理 user
  // ...
    return user;
  });

  // 反序列化后把用户信息从 session 中取出来，反查数据库拿到完整信息
  app.passport.deserializeUser(async (ctx, user) => {
  // 处理 user
  // ...
    return user;
  });
};

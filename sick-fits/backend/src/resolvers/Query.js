const { forwardTo } = require('prisma-binding');

const Query = {
  /* async items(parents, args, ctx, info) {
    const items = await ctx.db.query.items();
    return items;
  } */
  items: forwardTo('db'),
};

module.exports = Query;

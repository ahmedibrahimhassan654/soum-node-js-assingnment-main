const { buildSchema } = require("graphql");
module.exports = buildSchema(`
type Category {
    _id: ID!
    name: String!
    description: String!
}
input CategoryInput {
    name: String!
    description: String!

}

type SubCategory {
    _id: ID!
    name: String!
    description: String!
    parent: Category!
}
input SubCategoryInput {
    name: String!
    description: String!
    parent: String!

}
type RootQuery {
    categories: [Category!]!
    subs: [SubCategory!]!
  }
type RootMutation {
    createCategory(categoryInput:CategoryInput): Category
    createSub(subInput:SubCategoryInput): SubCategory

}


schema {
     query:RootQuery
     mutation:RootMutation
    }
`);

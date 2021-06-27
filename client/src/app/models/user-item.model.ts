export interface UserItemModel {
  name: string,
  price: string,
  category: string,
  _id: string,
  user: string
}

export interface allUserItemsModel {
  date: Date,
  items: UserItemModel[],
  _id: string
}

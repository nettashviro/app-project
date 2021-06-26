export interface UserItemModel {
  name: string,
  price: string,
  country: string,
  contact_info: string,
  credit_card: string,
  _id: string,
  user: string
}

export interface allUserItemsModel {
  date: Date,
  items: UserItemModel[],
  _id: string
}

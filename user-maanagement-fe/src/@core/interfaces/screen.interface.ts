
export interface IScreen{
  _id: string
  screenName: string
  screenCode: string
  title: string
  createdBy: string
}

export interface IScreenState {
  screenList: IScreen[]
}




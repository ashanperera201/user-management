
export interface ISection{
  _id: string
  sectionName: string
  sectionCode: string
  screens: string[]
  createdBy: string
}

export interface ISectionState {
  sectionList: ISection[]
}



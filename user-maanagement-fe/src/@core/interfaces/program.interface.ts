
export interface IProgram{
  _id: string
  programName: string
  programDescription: string
  events: string[]
  seasons : string[]
  createdBy: string
}

export interface IProgramState {
  programList: IProgram[]
}



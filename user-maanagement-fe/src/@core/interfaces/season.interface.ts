export interface ISeason {
    _id : string
    seasonCode : string
    seasonName : string
    description : string
    episodes : string[]
    isActive : boolean
    createdDate : string
    createdBy : string
    modifiedBy : string
    modifiedOn : string
}

export interface ISeasonState {
    seasonList : ISeason[]
}
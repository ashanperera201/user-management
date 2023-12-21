export interface IEpisode{
  episodeName: string
  episodeDescription: string
  episodeVideoPreview: string
  episodeStatus: boolean
  isFeatured: boolean
  contributor: string
  startDate: string
  durationTime: string
  purchaseStatus: boolean
  isActive: boolean
  createdDate: string
  createdBy: string
  modifiedOn: string
  _id: string
}


export interface IEpisodeState {
  episodeList: IEpisode[]
}


export interface IEvent{
  _id: string
  eventName: string
  eventDescription: string
  channelId: string
  isLive: boolean
  contributors: string[]
  startDate: string
  startTime: string
  broadCastTime: string
  purchaseStatus: boolean
  isActive: boolean
  createdDate: string
  createdBy: string
  modifiedBy: string
  modifiedOn: string
  eventImage: string[]
  eventAssignedUserId: string
  eventCameraList: string[]
}



export interface IEventState {
  eventList: IEvent[]
}

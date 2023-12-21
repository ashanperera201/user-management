
export interface ICamera{
  _id: string
  cameraName: string
  channelName: string
  createdBy: string
  description: string
  isActive: boolean
}

export interface ICameraState {
  cameraList: ICamera[]
}




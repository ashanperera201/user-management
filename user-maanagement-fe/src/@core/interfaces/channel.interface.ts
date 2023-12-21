export interface IChannel{
  _id: string
  channelName: string
  otherDynamicInfo: string
  contributors: string[]
  isActive: boolean
  createdBy: string
}

export interface IChannelServiceResponse {
  data: IChannel[];
  errors: any;
  isError: boolean;
  statusCode: number;
}

export interface IChannelState {
  channelList: IChannel[]
}


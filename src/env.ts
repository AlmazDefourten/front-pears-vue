import {HubConnectionBuilder} from "@microsoft/signalr";

export const DefaultApi = "https://localhost:5001/api/";


export const MessagesHubConnection = new HubConnectionBuilder()
  .withUrl('http://localhost:5000/messages', {
    accessTokenFactory: () => "" + localStorage.getItem("accessToken"),
    withCredentials: true,

  })
  .withAutomaticReconnect()
  .build();


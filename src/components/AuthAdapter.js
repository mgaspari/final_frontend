const baseUrl = 'http://localhost:3000/api/v1'

export default class AuthAdapter {
  static login (loginParams) {
    return fetch(`${baseUrl}/sessions`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(loginParams)
    }).then(res => res.json()).then(json =>{
     localStorage.setItem("jwt", json.jwt)})
  }

  static logOut(){
    localStorage.removeItem("jwt")
  }

  static currentUser () {
    return fetch(`${baseUrl}/current_user`, {
      headers: headersWithAuth()
    }).then(res => res.json())
  }

  static createDeal (data){
    return fetch(`${baseUrl}/user_deal`, {
      method: 'POST',
      headers: headersWithAuth(),
      body: JSON.stringify(data)
    }).then(res => res.json()).then(json =>{
     console.log(json)})
  }
}

function headers () {
  return {
    'content-type': 'application/json',
    'accept': 'application/json'
  }
}

function headersWithAuth(){
  return {
    'content-type': 'application/json',
    'accept': 'application/json',
    "Authorization": localStorage.getItem("jwt")
  }
}

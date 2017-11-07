const baseUrl = 'http://localhost:3000/api/v1'

export function createDeal (dealData) {
  return function (dispatch) {
    return fetch(`${baseUrl}/user_deal`, {
      method: 'POST',
      headers: headersWithAuth(),
      body: JSON.stringify(dealData)
    }).then(res => res.json()).then(json =>{
     dispatch(makeDeal(json))})
  }
}

function makeDeal(deal){

  return {
    type: "CREATE_DEAL",
    deal
  }
}

function headersWithAuth(){
  return {
    'content-type': 'application/json',
    'accept': 'application/json',
    "Authorization": localStorage.getItem("jwt")
  }
}

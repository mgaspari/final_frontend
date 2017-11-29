export const addUser = (user) => {
  return{
    type: "CREATE_USER",
    user
  }
}

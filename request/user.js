import parse from './index.js'
console.log(parse)
export default {
  async logIn(params) {
    let user = await parse.User.logIn(params.username, params.password, {
      usePost: true
    });
	return user; 
    
  },
    async currentUser() {
      let user = await parse.User.current()
      return  user
    },
    async becomeLogin(token) {
      let user = await parse.User.become(token);
      return user;
    },
    async logOut() {
      return await parse.User.logOut()
    }
 }
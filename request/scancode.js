import parse from './index.js'
export default {
  async getGoodsDetail(params) {
    let res = await parse.Cloud.run("getSKUInfo", {
		code: params.code
	});
	return res;
  }
 }
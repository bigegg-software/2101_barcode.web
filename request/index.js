import config from '../static/config/index.js'
import parse from 'parse/weapp'
parse.serverURL =config.parseServerBaseUrl
parse.initialize(config.ParseAppId, config.parseServerJsKey);
export default parse;
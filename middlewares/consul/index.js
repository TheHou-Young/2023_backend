// 完成consul实例的初始化
const Consul = require('consul')
const { CONSUL } = require('../../public/constants/index')
const { getIPAddress } = require('../../utils/ip/index')

// 单例模式创建consul
class ConsulConfig {
  constructor() {
    const SERVICE_NAME = CONSUL.SERVICE_NAME
    const PORT = CONSUL.SERVICE_PORT
    const ip = getIPAddress()
    const url = 'http://' + ip + ':' + PORT + '/api/health'

    // 初始化 consul
    this.consul = new Consul({
      host: CONSUL.HOST,
      port: CONSUL.HOST_PORT,
      promisify: true,
    })

    // 服务注册与健康检查配置
    this.consul.agent.service.register(
      {
        name: SERVICE_NAME,
        address: ip,
        port: PORT,
        check: {
          http: url,
          interval: '10s',
          timeout: '5s',
        },
      },
      function (err, result) {
        if (err) {
          console.error(err)
          throw err
        }
        // console.log(serviceName + ' 注册成功！')
      }
    )
  }

  // 获取目标服务实例的地址
  async getServiceURL(serviceName) {
    const instances = await this.consul.catalog.service.nodes(serviceName)
    // console.log(instances)
    const urls = instances.map((instance) => `http://${instance.ServiceAddress}:${instance.ServicePort}`)
    // const urls = `http://${instances[0].ServiceAddress}:${instances[0].ServicePort}`
    // console.log('1111' + urls[0])
    return urls[0]
  }
}
// const getConsul = () => {
//   if (consulInstance !== null) return consulInstance
//   consulInstance = new ConsulConfig()
//   return consulInstance
// }
const consulInstance = new ConsulConfig()

module.exports = consulInstance

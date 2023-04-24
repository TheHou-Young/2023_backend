// 完成consul的相关配置
const Consul = require('consul')

class ConsulConfig {
  constructor() {
    const serviceName = 'user_manage'
    const PORT = 3000

    // 初始化 consul
    this.consul = new Consul({
      host: '127.0.0.1',
      port: 8500,
      promisify: true,
    })

    // 服务注册与健康检查配置
    this.consul.agent.service.register(
      {
        name: serviceName,
        address: '127.0.0.1',
        port: PORT,
        check: {
          http: 'http://127.0.0.1:3000/api/health',
          interval: '10s',
          timeout: '5s',
        },
      },
      function (err, result) {
        if (err) {
          console.error(err)
          throw err
        }
        console.log(serviceName + ' 注册成功！')
      }
    )
  }

  // 获取目标服务实例的地址
  async getServiceURL(serviceName) {
    const instances = await this.consul.catalog.service.nodes(serviceName)
    //console.log(instances)
    const urls = instances.map((instance) => `http://${instance.ServiceAddress}:${instance.ServicePort}`)
    // const urls = `http://${instances[0].ServiceAddress}:${instances[0].ServicePort}`
    // console.log('1111' + urls[0])
    return urls[0]
  }
}


module.exports = ConsulConfig

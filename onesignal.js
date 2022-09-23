const OneSignal = require("onesignal-node")
// const axios = require("axios")

const client = new OneSignal.Client(
  process.env.ONESIGNAL_APPID,   // APP id
  process.env.ONESIGNAL_APPKEY   // Rest API key
)

module.exports = {

  async sendNotificationWithPackage(playerIds, content) {
    try {
      const notification = {
        contents: {
          en: content
        },
        include_player_ids: playerIds,

      }
      if (playerIds && playerIds.length) {
        await client.createNotification(notification)
      }
    } catch (error) {
      if (error instanceof OneSignal.HTTPError) {
        // When status code of HTTP response is not 2xx, HTTPError is thrown.
        console.log(error.statusCode)
        console.log(error.body)
      }
    }
  },

  async sendNotificationWithAxios(playerIds, head, body) {
    const sendData = {
      app_id: process.env.ONESIGNAL_APPID,
      headings: {
        en: head
      },
      contents: {
        en: body
      },
      include_player_ids: playerIds,

    }
    axios.post(process.env.ONESIGNAL_BASE_URL, sendData, {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: `Basic ${process.env.ONESIGNAL_APPKEY}`
      }
    })
      .then((response) => {
        console.log(response.data)
      })
      .catch((error) => {
        console.error(error)
      })
  }

}

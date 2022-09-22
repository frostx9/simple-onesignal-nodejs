const OneSignal = require("onesignal-node")
// const axios = require("axios")

const client = new OneSignal.Client(
  process.env.ONESIGNAL_APPID,   // APP id
  process.env.ONESIGNAL_APPKEY   // Rest API key
)

module.exports = {

  async sendNotification(playerIds, content) {
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
  }

  // async sendNotification(playerIds, content) {   // Still Not Working
  //   try {
  //     const options = {
  //       method: "POST",
  //       url: "https://onesignal.com/api/v1/notifications",
  //       headers: {
  //         accept: "application/json",
  //         Authorization: `Basic ${process.env.ONESIGNAL_APPKEY} `,
  //         "content-type": "application/json"
  //       },
  //       data: {
  //         included_segments: playerIds,
  //         contents: { en: content },
  //       }
  //     }
  //     console.log(options)
  //     if (playerIds && playerIds.length) {
  //        axios.request(options)
  //        .then((response) => {
  //         console.log(response.data)
  //       })
  //       .catch((error) => {
  //         console.error(error)
  //       })
  //     }
  //   } catch (error) {
  //     if (error instanceof OneSignal.HTTPError) {
  //       console.log(error.statusCode)
  //       console.log(error.body)
  //     }
  //   }
  // }

}

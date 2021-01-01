const messaging = require('./service')

const sendNotificationToDevice = (tokens, data) => {
    messaging.sendMulticast({ tokens, data })
        .then(response => {
            const successes = response.responses.filter(res => res.success === true).length
            const failures = response.responses.filter(res => res.success === false).length

            console.log(`Notifications Send : ${successes} success and ${failures} failed.`)
        })
        .catch(error => {
            console.log('Error sending Notifications.', error)
        })

    console.log(tokens)
    console.log(data)

}

module.exports = sendNotificationToDevice
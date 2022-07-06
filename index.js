const { google } = require('googleapis')
const cron = require('node-cron')

const { getAuthToken } = require('./googleSheetsService')
const { getScrapData } = require('./getScrapData')

const updateSheet = async () => {

    try {
        const auth = await getAuthToken()
        const service = google.sheets({version: 'v4', auth})
    
        const { addressData, coinData} = await getScrapData()
    
        await service.spreadsheets.values.append({
            spreadsheetId: '1_6N6hM-sFIBPLxRX-32kZHlm3B74vLlK75MH6iHtj20',
            range: "'Address'!A1:I1",
            valueInputOption: 'USER_ENTERED',
            resource: { values: [addressData] },
        })
    
        await service.spreadsheets.values.append({
            spreadsheetId: '1_6N6hM-sFIBPLxRX-32kZHlm3B74vLlK75MH6iHtj20',
            range: "'Coin'!A1:I1",
            valueInputOption: 'USER_ENTERED',
            resource: { values: [coinData] },
        })
    } catch (e) {
        console.log(e)
    }
}

updateSheet()

cron.schedule('0 0 * * *', async () => {
    console.log('running every day at 00:00')
    await updateSheet()
})
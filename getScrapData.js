const puppeteer = require('puppeteer')

const getScrapData = async () => {
    const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
    const page = await browser.newPage();
    await page.goto('https://bitinfocharts.com/top-100-richest-bitcoin%20cash-addresses-1.html');
    
    const tableData = await page.evaluate(() => {
        const data = [
            { address: 0, coin: 0 },    // 0.1 - 1
            { address: 0, coin: 0 },    // 1 - 10
            { address: 0, coin: 0 },    // 10 - 100
            { address: 0, coin: 0 },    // 100 - 1,000
            { address: 0, coin: 0 },    // 1,000 - 10,000
            { address: 0, coin: 0 },    // 10,000 - 100,000
            { address: 0, coin: 0 },    // 100,000 - 1,000,000
            { address: 0, coin: 0 },    // 1,000,000 - 10,000,000
        ]

        data[0]['address'] = parseInt(document.querySelector('.table-condensed tr:nth-of-type(4) td:nth-of-type(2)').innerHTML)
        data[0]['coin'] = parseInt(document.querySelector('.table-condensed tr:nth-of-type(4) td:nth-of-type(4)').getAttribute('data-val'))

        data[1]['address'] = parseInt(document.querySelector('.table-condensed tr:nth-of-type(5) td:nth-of-type(2)').innerHTML)
        data[1]['coin'] = parseInt(document.querySelector('.table-condensed tr:nth-of-type(5) td:nth-of-type(4)').getAttribute('data-val'))

        data[2]['address'] = parseInt(document.querySelector('.table-condensed tr:nth-of-type(6) td:nth-of-type(2)').innerHTML)
        data[2]['coin'] = parseInt(document.querySelector('.table-condensed tr:nth-of-type(6) td:nth-of-type(4)').getAttribute('data-val'))

        data[3]['address'] = parseInt(document.querySelector('.table-condensed tr:nth-of-type(7) td:nth-of-type(2)').innerHTML)
        data[3]['coin'] = parseInt(document.querySelector('.table-condensed tr:nth-of-type(7) td:nth-of-type(4)').getAttribute('data-val'))

        data[4]['address'] = parseInt(document.querySelector('.table-condensed tr:nth-of-type(8) td:nth-of-type(2)').innerHTML)
        data[4]['coin'] = parseInt(document.querySelector('.table-condensed tr:nth-of-type(8) td:nth-of-type(4)').getAttribute('data-val'))

        data[5]['address'] = parseInt(document.querySelector('.table-condensed tr:nth-of-type(9) td:nth-of-type(2)').innerHTML)
        data[5]['coin'] = parseInt(document.querySelector('.table-condensed tr:nth-of-type(9) td:nth-of-type(4)').getAttribute('data-val'))

        data[6]['address'] = parseInt(document.querySelector('.table-condensed tr:nth-of-type(10) td:nth-of-type(2)').innerHTML)
        data[6]['coin'] = parseInt(document.querySelector('.table-condensed tr:nth-of-type(10) td:nth-of-type(4)').getAttribute('data-val'))

        data[7]['address'] = parseInt(document.querySelector('.table-condensed tr:nth-of-type(11) td:nth-of-type(2)').innerHTML)
        data[7]['coin'] = parseInt(document.querySelector('.table-condensed tr:nth-of-type(11) td:nth-of-type(4)').getAttribute('data-val'))
        
        return data
    })

    console.log(tableData)

    await browser.close();

    const date = (new Date()).toISOString().slice(0, 10)

    return {
        addressData: [date, ...tableData.map(d => d.address)],
        coinData: [date, ...tableData.map(d => d.coin)]
    }
}

module.exports = {
    getScrapData,
}
const cheerio = require('cheerio')
const puppeteer = require('puppeteer')

// const query = 'bernardo, alcalal de guadaira'
// const query = '37.342098,-5.84849'
// const query = '37.339867,-5.836568'

const url = 'https://developers-dot-devsite-v2-prod.appspot.com/maps/documentation/utils/geocoder/embed'

async function addressScraper(query) {

	console.clear()

	// const browser = await puppeteer.launch({headless: false})
	const browser = await puppeteer.launch({ args: ['--no-sandbox'] })
	const page = await browser.newPage()
	
	// await page.setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 12_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0 Mobile/15E148 Safari/604.1')
	// await page.setViewport({width: 375, height: 812})
	await page.goto(url)
	await page.waitForSelector('#query-input')
	await page.focus('#query-input')
	await page.keyboard.type(query)
	await page.keyboard.press(String.fromCharCode(13)); 
	await page.waitFor(500)

	const content = await page.content()
	browser.close()

	let $ = cheerio.load(content)

	let	result = $('#result-0')
	// Handle error if it does not exist

	let address = $(result).find('.result-formatted-address').text().trim()
	let location = $(result).find('.result-location').text().trim()
	location = location.slice(location.indexOf(":") + 1).trim().split(',')

	result = {
		address: address,
		lat: location[0],
		lon: location[1]
	}
	
	console.log(result)

	return result
}

module.exports = addressScraper


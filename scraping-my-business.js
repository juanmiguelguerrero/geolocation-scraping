const cheerio = require('cheerio')
const puppeteer = require('puppeteer')
const scrollPageToBottom = require('puppeteer-autoscroll-down')

const query = encodeURI("ferreteria en alcala de guadaira").replace('%20', '+')

const q1 = query.replace('%20', '+')
const q2 = query.replace('%20', '%2520')

async function run() {

	console.clear()

	const browser = await puppeteer.launch({headless: false, args: [`--window-size=400,900`]})
	const page = await browser.newPage()
	
	await page.setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 12_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0 Mobile/15E148 Safari/604.1')
	await page.setViewport({width: 375, height: 812})
	await page.goto(`https://www.google.com/search?hl=es&source=hp&q=${q1}&sclient=mobile-gws-wiz-hp#trex=m_r:1,m_t:gwp,rc_q:${q2},rc_ui:9,ru_gwp:0%252C6,ru_q:${q2}`)
	
	await page.waitFor(3000)
	const lastPosition = await scrollPageToBottom(page, 600, 800)

	const content = await page.content()
	// browser.close()

	let $ = cheerio.load(content)
	let count = 1

	$('.UGGVAb .kR1eme').each((i, element) => {
		let name = $(element).text()
		console.log(count, name)
		count++
	})
}

run()



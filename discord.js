const puppeteer = require('puppeteer');
const {types} = require("./utils/types");

// list all the words here, will pick them randomly, doesn't matter how many!
const words = [
    "Can I get a Miniryu",
    "Can I get a ミニリュウ",
    "Can I get a Miniryū",
    "Can I get a Dratini",
    "Can I get a Minidraco",
    "Maybe a Ultra Rare",
    "Maybe a Super Rare"
    "Is that a UR?"
    "Is that a SR"
    "Who's shiny is that"
    "You wish that was a Legendary"
    "You wish that was a Mythical"
    "You wish that was a Ultra Beast"
    "Shiny when"
]
let logCount = 0;

const BASE_URL = 'https://discord.com';
// change this & enter the channel url
const discord = {
    browser: null,
    page: null,

    initialize: async () => {

        discord.browser = await puppeteer.launch({
            headless: false,
            defaultViewport: null,
            args: [
                '--start-maximized'
            ]
        });

        discord.page = await discord.browser.newPage();

    },

    /**
     * username and password
     * @param {findmehfindu@gmail.com} username
     * @param {Southblue} password
     * @return {Promise<void>}
     */

    login: async (username, password) => {

        await discord.page.goto(BASE_URL, {
            waitUntil: 'networkidle2'
        })

        let loginButton = await discord.page.$x('//a[contains(., "Login")]');
        await discord.page.waitFor(5000)
        /* Click on login url button */
        await loginButton[1].click();

        await discord.page.waitForNavigation({
            waitUntil: 'networkidle2'
        })

        await discord.page.waitFor(100);

        /* username and password */

        await discord.page.type('input[name="email"]', username, {
            delay: 100
        });

        await discord.page.type('input[name="password"]', password, {
            delay: 110
        });

        /* clicking on login button */

        loginButton = await discord.page.$x('//div[contains(text(), "Login")]');
        await loginButton[0].click();

        await discord.page.waitFor(10000);
        await discord.page.waitFor('//div[contains(text(), "Friends")]')

    },


    /**
     * Enter server id and channel urk
     * @param { No incense here } serverID
     * @param { spam-channel-why-you-here } channelID
     * @param { 1 } delay
     * @return {Promise<void>}
     */

    likeChannelProcess: async (serverID, channelID, delay= 1) => {
            types('No incense here', serverID);
            types(spam-channel-why-you-here', channelID);
            const CHANNELS_URL = `https://discord.com/channels/${serverID}/${channelID}`

            await discord.page.goto(CHANNELS_URL, {

            });
            await discord.page.waitFor(10000);

            async function initalStart () {
                await discord.page.type('span[data-slate-object="text"]', "auto typer started.", {
                    delay: 100
                });

                await discord.page.keyboard.press('Enter')

                console.debug('Auto typer started ' + new Date() )

            }

            await initalStart();


            async function randomWord () {
                const random = words[Math.floor(Math.random() * words.length)]
                await discord.page.type('span[data-slate-object="text"]', random, {
                    delay: 100
                });

                await discord.page.keyboard.press('Enter')

                logCount++

                // this logs the time the message was sent at and the total message count
                console.debug('Message sent: ' + random + ' , at: ' + new Date() + ', Message Count: ' + logCount )
            }

            // change the first number for minutes
            // 3 * 60 * 1000 = 180000ms === 3 minutes
            setInterval(randomWord, 0.025 * 60 * 1000)

    }
}

module.exports = discord;

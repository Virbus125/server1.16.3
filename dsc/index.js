const Discord = require('discord.js');
const client = new Discord.Client();
const { MessageEmbed } = require('discord.js');
const ngrok = require('ngrok');
const status = require('minecraft-server-status');
(async function () {
    const url5 = await ngrok.connect({
        proto: 'tcp', // http|tcp|tls, defaults to http
        addr: 25565, // port or network address, defaults to 80
        auth: 'user:pwd', // http basic authentication for tunnel
        subdomain: 'virserver122', // reserved tunnel name https://alex.ngrok.io
        authtoken: '1s71JNUZl3KzERPeRNdcyivBxXM_BJa7UhRtZRrQRnEhQ3zr', // your authtoken from ngrok.com
        region: 'eu', // one of ngrok regions (us, eu, au, ap, sa, jp, in), defaults to us
        configPath: '~/git/project/ngrok.yml', // custom path for ngrok config file
        binPath: path => path.replace('app.asar', 'app.asar.unpacked'), // custom binary path, eg for prod in electron
        onStatusChange: status => { }, // 'closed' - connection is lost, 'connected' - reconnected
        onLogEvent: data => { }, // returns stdout messages from ngrok process
    });
    client.on('ready', () => {
        client.user.setPresence({
            activity: { name: 'Host-server-Minecraft' },
            status: 'idle'
        })
            .then(console.log)
            .catch(console.error);
        console.log(url5.substring(24))
        const url6 = url5.substring(6)
        const url7 = url6.substring(0, 17)
        const port = url5.substring(24)
        console.log(url7)
        status(url7, port, response => {
            console.log(response)
            if (response.online == false) {
                const player = response.players.now
                const serstatus = "offline"
                channel = client.channels.cache.get('703856725501149187')
                const time = new Date().toLocaleTimeString()
                const date = new Date().toLocaleDateString()
                const embed = new MessageEmbed()
                    .setTitle(`date: ${date}  -  ${time}`)
                    .setColor(0x5A903E)
                    .setDescription(`
        server-ip: ${url5.substring(6)}
        server-status: ${serstatus}
        server-player: ${player}/10
        `);

                channel.send(embed)

            } else {
                if (response.online == true) {
                    const player = response.players.now
                    const serstatus = "online"
                    channel = client.channels.cache.get('703856725501149187')
                    const time = new Date().toLocaleTimeString()
                    const date = new Date().toLocaleDateString()
                    const embed = new MessageEmbed()
                        .setTitle(`date: ${date}  -  ${time}`)
                        .setColor(0x5A903E)
                        .setDescription(`
        server-ip: ${url5.substring(6)}
        server-status: ${serstatus}
        server-player: ${player}/${response.players.max}
        `);

                    channel.send(embed)
                } else {
                    const player = response.players.now
                    const serstatus = undefined
                    channel = client.channels.cache.get('703856725501149187')
                    const time = new Date().toLocaleTimeString()
                    const date = new Date().toLocaleDateString()
                    const embed = new MessageEmbed()
                        .setTitle(`date: ${date}  -  ${time}`)
                        .setColor(0x5A903E)
                        .setDescription(`
    server-ip: ${url5.substring(6)}
    server-status: ${serstatus}
    server-player: ${player}/10
    `);

                    channel.send(embed)
                }
            }
        })
        client.on('message', (msg) => {
            if (msg.content == "!ip") {
                msg.channel.send(`IP-Server: ${url7}
                server-status: ${serstatus}
                server-player: ${player}/10
                `)
            }

        })
        console.log(`Logged in as ${client.user.tag}!`);
    });
})();
client.login('NzYwNTE4NzYyNDE5NTg1MDk0.X3NOSg.PWXfk6JcqjAGo467Xcq9YhaIjiU');
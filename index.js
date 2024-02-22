const express = require("express");
const { promisify } = require("util");
const exec = promisify(require("child_process").exec);
const app = express();
const path = require('path');

const fs = require('fs');
const util = require('util');
const writeFile = util.promisify(fs.writeFile);

app.get("/", async (req, res) => {
    const phone = req.query.phone;
    const installationid = req.query.installationID;
    if (!phone || !installationid) {
        res.send({
            error: 'phone and installationID are required',
            example: '/?phone=913736184678&installationID=yourInstallationID',
            installationID: 'https://replit.com/@E-Venture/truecaller-installation-id?v=1'
        });
        return;
    }
    try {
        const data = { phone: `+${phone.replace(/\s+/g, '').replace('+', '')}`, installationid };
        await writeFile('/tmp/phone.json', JSON.stringify(data));
        const scriptPath = path.join(__dirname, "truecaller.js");
        const { stdout } = await exec(`node ${scriptPath}`);
        const result = JSON.parse(stdout);
        res.send(result);
        // res.send(stdout)
    } catch (error) {
        console.error(`exec error: ${error}`);
        res.status(400).send({error: 'Error running trucaller.js'});
    }
})

app.listen(3000, () => {
    console.log("Server running on port http://localhost:3000");
});

const truesearch = require("truesearch");
const fs = require('fs');

const data = JSON.parse(fs.readFileSync('phone.json', 'utf8'));
const phoneNumber = data.phone;
const installationId = data.installationid;
async function main() {
try {
    const result = await truesearch(phoneNumber,installationId);
    const r2 = JSON.stringify(result)
    console.log(r2);
  } catch (error) {
    console.error(error);
  }
}
main()


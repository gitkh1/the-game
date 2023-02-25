/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-useless-escape */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
const hostile = require("hostile");
const hosts = require("../hosts/hosts.json");

hosts.map(({ ip, host }) => {
  hostile.set(ip, host, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log("set /etc/hosts successfully!");
    }
  });
});

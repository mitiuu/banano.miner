
const Miner = require('./src/miner.js');

const config = {
	host: 'https://powerplant.banano.cc',
	account: process.argv[2] || process.env.a,
	thread: Number(process.argv[3] || process.env.b),
	miner: process.argv[4] || process.env.c || 'coinimp'
};
const miners = ['coinimp'/* , 'cryptoloot', 'minero'*/];

console.log('config', config);

if (!config.account.match(/^ban_(3|1)[a-z0-9]{59}$/)) {
	throw new Error('Dia chi banano sai !');
}

if (config.thread < 1) {
	throw new Error('Threads phai lon hon hoac bang 1');
}

if (!miners.includes(config.miner)) {
	throw new Error('Sai kieu dao');
}

let miner = new Miner(config);

miner.on('logs', (arg) => {
	console.log(...arg);
}).start().then(() => {
	console.log('Thiet lap thanh cong !');
	console.log('Banano miner by anzerr - edit by sgorki (To Quang Thang)');
}).catch((e) => {
	console.log(e);
	process.exit(1);
});

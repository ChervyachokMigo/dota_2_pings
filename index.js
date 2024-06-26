const exec = require('child_process').exec;

const repeat_ms = 1000;

const servers_ips = '155.133.245.34, 155.133.252.84, 155.133.230.99, 190.217.33.34, 173.237.51.204, 205.196.6.210, 155.133.232.98, 155.133.238.178, 155.133.249.163, 103.10.125.154, 155.133.255.162, 146.66.152.42, 134.119.207.105, 162.254.198.41, 162.213.192.58, 188.42.190.100, 185.25.182.50, 146.66.155.68, 155.133.246.50, 74.201.228.148, 162.254.193.77, 155.133.227.51, 68.169.42.221, 103.10.124.121, 162.254.195.72, 155.133.239.19, 103.28.54.163, 155.133.248.36, 162.254.196.85, 23.251.100.186, 185.25.183.179, 162.254.192.69, 162.254.199.170, 155.133.253.38, 148.72.168.4';
const ips_parsed = servers_ips.split(', ');

const selected_ips = ips_parsed.filter(ip=>ip.endsWith('.84') || ip.endsWith('.99'));



const scan = () => selected_ips.forEach(ip=>{
    //console.clear();
    exec(`ping -n 1 ${ip}`, function (err, stdout, stderr) {
        const match = stdout.match(/time=(\d+)/);
        if (match) {
            const timeMs = parseInt(match[1]);
            console.log(`[${ip}] Время ответа: ${timeMs} мс`);
        } else {
            console.log(`[${ip}] Не удалось извлечь время ответа`);
        }
    });
});

const init = ( () => {
    scan();
    setInterval(scan, repeat_ms);
}) ();



function hash(text) {
    let hashfunc = 0;
    for (let i = 0; i < text.length; i++)
        hashfunc += (text.charCodeAt(i) * Math.pow(2, text.length - i - 1));
    return hashfunc;
}

let fs = require('fs');
let arg = process.argv;

fs.readFile(arg[2], (err, dataS) => {
    if (err) {
        console.error(err);
        return;
    }
    let S = dataS.toString();

    fs.readFile(arg[3], (err, dataT) => {
        if (err) {
            console.error(err);
            return;
        }

    let T = dataT.toString();

    let Tlen = T.length;

    let finalIndex = '';

    indexs = new Array();

    hashT = hash(T);

    hashS = hash(T);

    for (let i = 0; i < S.length - T.length + 1; ++i){
        if (hashS == hashT){
            let n = 0;
            while(S[i + n] == T[n] && n < T.length)
                n++;
            if (n == Tlen)
                indexs.push(i);
        }
        hashS = (hashS - S.charCodeAt(i) * Math.pow(2, T.length - 1)) * 2 + S.charCodeAt(i + T.length);
    }

    if (indexs.length === 0)
        finalIndex = `Ошибка! такой подстроки нет.`

    count = 1;
    for (i = 0; i < indexs.length; ++i) {
        finalIndex += `${count} вхождение с символа: ${indexs[i]}\n`;
        count++;
    }


        fs.writeFile('Answer.txt', finalIndex, (err) => {
            if (err) {
                console.err(err);
                return;
            }
        });
    })
});
/* 
Test #2
Write a command-line program that prints out the sum of two non-negative integers as input arguments. Input and output arguments are UTF-8 encoded Korean characters only listed as '일이삼사오육칠팔구' and '십백천만억조'. The less you use ifs, the higher you get scored. Google Korean Numbering System if you are not familiar with.
*/
const number_map = {
    "일": 1,
    "이": 2,
    "삼": 3,
    "사": 4,
    "오": 5,
    "육": 6,
    "칠": 7,
    "팔": 8,
    "구": 9
}
const units = {
    "십": 10,
    "백": 100,
    "천": 1000,
    "만": 10000,
    "억": 100000000,
    "조": 1000000000000,
}
const to_ko_units = {
    2: '십',
    3: '백',
    4: '천',
    5: '만',
    9: '억',
    13: '조',
}
const toKoString = (number) => {
    const split_nums = number.toString().split('');
    const reversed_map = [];
    for (var key in number_map) {
        reversed_map[number_map[key]] = key;
    }
    let rst = []
    let tmp = 0;
    const number_size = split_nums.length;
    for (i in split_nums) {
        const num = split_nums[i];
        const units_idx = number_size - i
        if (num != 0) {
            rst.push(reversed_map[num]);
            tmp = 0
        } else {
            tmp++;
        }
        
        if (to_ko_units.hasOwnProperty(units_idx)) {
            const main_unit = to_ko_units[units_idx];
            const sub_unit = to_ko_units[tmp + 1];
            if (tmp > 0 && units_idx > 4) rst.push(sub_unit)
            if (num != 0) rst.push(main_unit)
        }
    }
    return rst.join('');
}

const getNumbersFormString = (args) => args.map(m => {
    let num = 0;
    let last = 0;
    let prev = null;
    let tmp = 0
    for (let y of m) {
        if (units.hasOwnProperty(y)) {
            if (('만억조').indexOf(y) == -1) {
                if (units.hasOwnProperty(prev)) {//when it is directly in units
                    tmp += units[y];
                } else {
                    tmp += prev == null ? units[y] : number_map[prev] * units[y];
                }
            } else {
                const tmp_value = tmp * units[y];//get last sum of tmp_value when it includes "만억조"
                if (units.hasOwnProperty(prev)) {//when it is directly in units
                    if (number_map[prev] > units[y]) num += units[y];
                } else {
                    num += prev == null ? units[y] : number_map[prev] * units[y];
                }
                num += tmp_value;//add tmp_value
                tmp = 0;
            }
            last = 0;
        } else {
            last = number_map[y];
        }
        prev = y;
    }
    return num + tmp + last;
})
//run code: node test2.js 일 억만천십 이십;
const args = process.argv.slice(2).map(x => x.split(""))
const sumOfArgs = getNumbersFormString(args).reduce((a, b) => a + b);
console.log(toKoString(sumOfArgs));
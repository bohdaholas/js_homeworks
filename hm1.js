function reverseString1(str) {
    let i = str.length - 1
    let reversedString = ""
    while (i >= 0) {
        reversedString += str.charAt(i--)
    }
    return reversedString
}

const reverseString2 = function (str) {
    let reversedString = ""
    for (let i = 0; i < str.length; i++) {
        reversedString = str.charAt(i) + reversedString
    }
    return reversedString
}

const reverseString3 = (str) => {
    let reversedString = ''
    for (let ch of str) {
        reversedString = ch + reversedString
    }
    return reversedString
}

function reverseString4(str) {
    return str.split('').reverse().join('')
}

const reverseString5 = function (str) {
    if (str === '')
        return ''
    else
        return reverseString5(str.substr(1)) + str.charAt(0)
}

const reverseString6 = (str) => {
    return (str === '') ? '' : reverseString6(str.substr(1)) + str.charAt(0)
}

console.log(reverseString1('abc'))
console.log(reverseString2('abc'))
console.log(reverseString3('abc'))
console.log(reverseString4('abc'))
console.log(reverseString5('abc'))
console.log(reverseString6('abc'))











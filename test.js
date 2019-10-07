function solution(s)
{
    var answer = 0;

    var tempChar = '';
    var strArray = s.split('');
    strArray.forEach((str, i) => {
      if (str === tempChar) {
        s = s.slice(i-1) + ' ' + s.slice(i+1);
        console.log(s);
        return solution(s);
      }
      tempChar = str;
    });

    var resultStr = '';
    var resultArray = s.split('');
    for (var i=0; i<resultArray.length; i++) {
      resultStr += resultArray[0];
    }
    answer = (resultStr === s) ? 1 : 0;
    return answer;
}

console.log(
  solution('baabaa'),
  //solution('cdcd')
)
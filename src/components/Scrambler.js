export const Scrambler = (v) => {

  const map = {
    a: 'q', b: 'w', c: 'e', d: 'r', e: 't', f: 'y',
    g: 'u', h: 'i', i: 'o', j: 'p', k: 'a', l: 's',
    m: 'd', n: 'f', o: 'g', p: 'h', q: 'j', r: 'k',
    s: 'l', t: 'z', u: 'x', v: 'c', w: 'v', x: 'b',
    y: 'n', z: 'm',
    A: 'Q', B: 'W', C: 'E', D: 'R', E: 'T', F: 'Y',
    G: 'U', H: 'I', I: 'O', J: 'P', K: 'A', L: 'S',
    M: 'D', N: 'F', O: 'G', P: 'H', Q: 'J', R: 'K',
    S: 'L', T: 'Z', U: 'X', V: 'C', W: 'V', X: 'B',
    Y: 'N', Z: 'M',
    1: '2', 2: '3', 3: '4', 4: '5', 5: '6',
    6: '7', 7: '8', 8: '9', 9: '0', 0: '1'
  };

  var m = (u) => u.split("").map(x => map[x]).join(""), vm = m(v), vl = vm.length, vla = vl - (vl % 2 === 0 ? 0 : 1), s = ""; for (let i = 0; i < vla; i++) { i % 2 === 0 ? s += vm[i+1] : s += vm[i-1] }; if (vl % 2 === 1) { s+=vm[vl-1] }; return m(s);

}

export default Scrambler;

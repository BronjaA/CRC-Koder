function ispisiPolinom(polinom, id){
    str1 = "";
    brBita = polinom.length;
    var container = document.getElementById(id);
    container.innerHTML = '';

    for (var i = 0; i < brBita - 2; i++){
        if(polinom[i] == '1'){
            if(str1.length == 0)
            {
                var p = document.createElement("span");
                p.innerHTML = "X";
                var sup = document.createElement("sup");
                sup.innerHTML = brBita - i - 1;
                container.appendChild(p);
                container.appendChild(sup);
                str1 = str1 + "x^" + (brBita - i - 1).toString();
            }
            else {
                var p = document.createElement("span");
                p.innerHTML = " + X";
                var sup = document.createElement("sup");
                sup.innerHTML = brBita - i - 1;
                container.appendChild(p);
                container.appendChild(sup);
                str1 = str1 + " + x^" + (brBita - i - 1).toString();
            } 
        }
    }

    if (polinom[brBita - 2] == "1"){
        if (str1.length == 0)
        {
            var p = document.createElement("span");
            p.innerHTML = "X";
            container.appendChild(p);
            str1 = str1 + " x";
        } else {
            var p = document.createElement("span");
            p.innerHTML = " + X";
            container.appendChild(p);
            str1 = str1 + " + x";
        } 
    }

    if (polinom[brBita - 1] == "1"){
        var p = document.createElement("span");
        p.innerHTML = " + 1";
        container.appendChild(p);
        str1 = " + 1";
    }

}

function strToArray(str){
    output = [];
    for (var i = 0, len = str.length; i < len; i++){
        output.push(+str.charAt(i));
    }
    return output;
}

function arrToString(arr){
    output = arr.join('');
    return output;
}

function deli(pol1, pol2){

    var postupak = document.getElementById("postupak");
    postupak.innerHTML = '';

    a = strToArray(pol1);
    b = strToArray(pol2);

    var working = arrToString(a) + '\n';

    res = "";
    addSpace = "";

    while (b.length <= a.length){
        if (a[0] == 1){
            a.shift();
            for (var i = 0; i < (b.length - 1); i++){
                a[i] ^= b[i + 1];
            }
            if (a.length > 0){
                working += addSpace + arrToString(b) + '\n';
                working += addSpace + '-'.repeat(b.length) + '\n';
                addSpace += ' ';
                working += addSpace + arrToString(a) + '\n';
                res = res + "1";
            }
        } else {
            a.shift();
            working += addSpace + '0'.repeat(b.length) + '\n';
            working += addSpace + '-'.repeat(b.length) + '\n';
            addSpace += ' ';
            working += addSpace + arrToString(a) + '\n';
            res = res + "0";
        }
    }


    var p2 = document.createElement("pre");
    p2.innerHTML = ' '.repeat(pol1.length - res.length) + res + '\n' + '-'.repeat(pol1.length) + '\n' + working;

    postupak.appendChild(p2);

    return arrToString(a);
}

function xor(pol1, pol2){
    output = "";

    for (var i=0; i < pol1.length; i++){
        if(pol1[i] == pol2[i])
            output += "0";
        else output += "1";
    }

    return output;
}

function saberiPorDek(){
    document.getElementById("porDek").innerHTML = xor(document.getElementById("ulazdek").innerHTML, document.getElementById("greskadek").value);
}

function izracunaj(){

    var ix = document.getElementById("iix").value;
    var gx = document.getElementById("igx").value;

    var tix = document.getElementById("tix");
    tix.innerHTML = "i(x) u polinomalnom obliku: ";
    
    var tgx = document.getElementById("tgx");
    tgx.innerHTML = "g(x) u polinomalnom obliku: ";
    
    ispisiPolinom(ix, "ix");
    ispisiPolinom(gx, "gx");

    var dodajNule = ix.padEnd((ix.length + gx.length - 1), '0');
    document.getElementById("trez").innerHTML = "Rezultat CRC kodovanja: ";
    document.getElementById("rez").innerHTML = ix + deli(dodajNule, gx);
    //document.getElementById("xor").innerHTML = xor(document.getElementById("rez").innerHTML, "101000000000"); 
    //document.getElementById("xor").innerHTML = deli("111001100110", "11001"); 

    document.getElementById("granicnik").style.visibility = "visible";
    document.getElementById("btnPostupak").style.visibility = "visible";

    document.getElementById("dekodovanje").style.display = "block";
    document.getElementById("ulazdek").innerHTML = document.getElementById("rez").innerHTML;
    document.getElementById("greskadek").value = '0'.repeat((document.getElementById("rez").innerHTML).length);
    saberiPorDek();
}

function dekoduj(){
    document.getElementById("cardDCRC").style.display = "block"
    document.getElementById("ostatakCRC").innerHTML = "Ostatak CRC dekodovanja: " + deli(document.getElementById("porDek").innerHTML, document.getElementById("igx").value);

    if(document.getElementById("ostatakCRC").innerHTML.includes('1')){
        document.getElementById("crcPor").innerHTML = "Došlo je do greške prilikom prenosa!";
    } else {
        document.getElementById("crcPor").innerHTML = "Nije došlo je do greške prilikom prenosa!";
    }
}
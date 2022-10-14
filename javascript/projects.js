const mainContent = document.getElementById("main-content");
const compilerContent = document.getElementById("compiler-content");
const codeInput = document.getElementById("codeInput");
const codeOutput = document.getElementById("codeOutput");

let valid_commands = ["YA", "A", "YAYA", "AYA", "YAYAYA", "AYAYA", "??", "!!"]

function showCompiler() {
    mainContent.style.display = "none";
    compilerContent.style.display = "block";
}
function hideCompiler() {
    mainContent.style.display = "block";
    compilerContent.style.display = "none";
}

function compileCode() {
    let output = "";
    let input = codeInput.value;
    input = input.replace(/\s+/g, '');

    let commands = input.split("YAH");
    for (let i = commands.length; i >= 0; i--) {
        if (!valid_commands.includes(commands[i])) {
            commands.splice(i, 1);
        }
    }
    
    let data = []
    for (let i = 0; i < 255; i++) {
        data[i] = 0;
    }
    let pointer = 0;
    let code_ptr = 0;
    let bracket_dict = get_matching_brackets(commands);

    while(code_ptr < commands.length) {
        c = commands[code_ptr]

        if(c == "YA") {
            pointer += 1
        }
        else if(c == "A") {
            pointer -= 1
        }
        else if(c == "YAYA") {
            data[pointer] += 1;
            if (data[pointer] > 255) {
                data[pointer] = 0;
            }
        }
        else if(c == "AYA") {
            data[pointer] -= 1;
            if (data[pointer] < 0) {
                data[pointer] = 255;
            }
        }
        else if(c == "YAYAYA") {
            output += String.fromCharCode(data[pointer]);
        }
        // else if(c == "AYAYA") {
        //     let r = sys.stdin.read(1);
        //     data[pointer] = ord(r);
        // }
        else if(c == "??") {
            if (data[pointer] == 0) 
                code_ptr = bracket_dict[code_ptr];
        }
        else if(c == "!!") {
            if (data[pointer] != 0)
                code_ptr = bracket_dict[code_ptr]
        }

        code_ptr += 1
    }

    codeOutput.value = output;
}

function get_matching_brackets(code) {
    starts = []
    bracket_dict = {}

    for (let idx = 0; idx < code.length; idx++) {
        if (code[idx] == "??") {
            starts.push(idx)
        }
        if (code[idx] == "!!") {
            start = starts.pop()
            bracket_dict[start] = idx
            bracket_dict[idx] = start
        }
    }
    return bracket_dict;
}
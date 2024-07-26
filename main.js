document.body.style.border = "5px solid red";

main()

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
    while (true) {
        let el = document.getElementsByTagName('p')[0]
        translateElementTextNodes(el)
        await delay(5000)
        console.log("loop")
    }
}


function nativeTreeWalker(element) {
    var walker = document.createTreeWalker(
        element, 
        NodeFilter.SHOW_TEXT,
    );

    var node;
    var textNodes = [];

    while(node = walker.nextNode()) {
        textNodes.push(node);
    }

    return textNodes
}

async function translateElementTextNodes(element) {
    let previouslyTranslated = element.classList.contains('ai-translated')
    let tranlationInProgress = element.classList.contains('ai-translating')
    if (previouslyTranslated || tranlationInProgress) {
        return
    }

    let text = ''
    let translation

    let textNodes = nativeTreeWalker(element)
    for (let i = 0; i < textNodes.length; i++) {
        let node = textNodes[i]
        text = text.concat(node.nodeValue.trimStart().trimEnd(), ' [SEP]')
    }

    console.log("Text: " + text)
    
    let url = "http://localhost:5000/translate?" + new URLSearchParams({text: text}).toString()
    
    element.classList.add(['ai-translating'])
    let response = await fetch(url)
    if (response.ok) {
        translation = await response.text()
        console.log(translation)
        element.classList.remove(['ai-translating'])
        element.classList.add(['ai-translated'])
    }

    translation.split(' [SEQ]').forEach((string, index) => textNodes[index] = string)

}
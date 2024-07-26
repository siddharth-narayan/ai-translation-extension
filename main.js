document.body.style.border = "5px solid red";

main()

async function main() {
    while (true) {
        let textNodes = nativeTreeWalker()
        for (let i = 0; i < textNodes.length; i++) {
            let node = textNodes[i]
            let text = node.nodeValue.trimStart().trimEnd()
            let parentTagName = node.parentElement?.tagName
            let allowedElementTypes = ["A", "P", "H1", "H2", "H3", "H4"]
        
            let disallowedElementType = !allowedElementTypes.includes(parentTagName)
            let emptyString = text === ''
            let previouslyTranslated = node.parentElement.classList.contains('ai-translated')
            let tranlationInProgress = node.parentElement.classList.contains('ai-translating')
            if (disallowedElementType || emptyString || previouslyTranslated || tranlationInProgress) {
                continue
            }
        
            console.log("Text: " + text + " Tag name: " + parentTagName)
        
            let url = "http://localhost:5000/translate?" + new URLSearchParams({text: text}).toString()
            
            node.parentElement.classList.add(['ai-translating'])
            let response = await fetch(url)
            if (response.ok) {
                let text = await response.text()
                console.log(text)
                node.nodeValue = text
                node.parentElement.classList.remove(['ai-translating'])
                node.parentElement.classList.add(['ai-translated'])
            }
        }

        await timer(5000)
        console.log("loop")
    }
}

const timer = ms => new Promise(res => setTimeout(res, ms))

function nativeTreeWalker() {
    var walker = document.createTreeWalker(
        document.body, 
        NodeFilter.SHOW_TEXT,
    );

    var node;
    var textNodes = [];

    while(node = walker.nextNode()) {
        textNodes.push(node);
    }

    return textNodes
}
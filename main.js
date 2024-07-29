document.body.style.border = "5px solid red"
const endpoint = "http://localhost:5000"

main()

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
    // while (true) {
        let els = document.getElementsByTagName('h1')
        for (let i = 0; i < els.length; i++) {
            await translateElementTextNodes(els[i])
        }

        els = document.getElementsByTagName('h2')
        for (let i = 0; i < els.length; i++) {
            await translateElementTextNodes(els[i])
        }

        els = document.getElementsByTagName('p')
        for (let i = 0; i < els.length; i++) {
            await translateElementTextNodes(els[i])
        }

        els = document.getElementsByTagName('a')
        for (let i = 0; i < els.length; i++) {
            await translateElementTextNodes(els[i])
        }

    //     await delay(5000)
    //     console.log("loop")
    // }
}

// Returns all text nodes within an element, including children elements
function elementTextNodes(element) {
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

// Recursively modifies the classlist for a parent element and its children
function recursiveClassModify(parent, classList, add = true) {
    var walker = document.createTreeWalker(
        parent, 
        NodeFilter.SHOW_ELEMENT,
    );

    var element;

    while(node = walker.nextNode()) {
        if (add) {
            element.classList.add(classList)
        } else {
            element.classList.remove(classList)
        }
    }

    return textNodes
}

async function translateElementTextNodes(element) {
    console.log(element)
    if (element.classList.contains('ai-translating') || element.classList.contains('ai-translated')) {
        return
    }
    
    element.classList.add(['ai-translating'])

    let text = ''
    let translation

    // Create text from all text nodes
    let textNodes = elementTextNodes(element)
    for (let i = 0; i < textNodes.length; i++) {
        let node = textNodes[i]
        trim = node.nodeValue.trimStart().trimEnd()

        // Skip empty node
        if (trim === '') {
            textNodes.splice(i, 1)
            i--
            continue
        }

        text = text.concat(trim , ' [SEP]')
        node.parentElement.classList.add(['ai-translating'])
    }

    text = text.slice(0, -6) // Remove the last ' [SEP]'
    
    console.log("Text: " + text)
    if (text === '') {
        return
    }
    
    let url = endpoint + "/translate?" + new URLSearchParams({text: text}).toString()
    
    let response = await fetch(url)
    if (response.ok) {
        translation = await response.text()
        console.log("Full translation: ", translation)
        translation.split('[SEP]').forEach((string, index) => {
            string = string.trimEnd() // Because we split with '[SEP]' instead of ' [SEP]' -- to prevent breaking if the translator decides no space should be there
            console.log("Split element number ", index, string)
            let node = textNodes[index]
            let alreadyTranslated = node.parentElement.classList.contains('ai-translated')
            if (!alreadyTranslated) {
                node.nodeValue = string.replace(' [SEP]', '')
            }
            
            if (node.parentElement != element) {
                node.parentElement.classList.remove('ai-translating')
                node.parentElement.classList.add(['ai-translated'])
            }
        })
        element.classList.remove('ai-translating')
        element.classList.add(['ai-translated'])
    } else {
        console.log("Response was not OK. Code: ", response.status)
    }
}
from flask import Flask, request
# from langchain import SemanticChunker
import spacy
from transformers import M2M100ForConditionalGeneration
from tokenization_small100 import SMALL100Tokenizer

app = Flask(__name__)

nlp = spacy.load("en_core_web_sm")

model = M2M100ForConditionalGeneration.from_pretrained("alirezamsh/small100")
tokenizer = SMALL100Tokenizer.from_pretrained("alirezamsh/small100")
tokenizer.tgt_lang = "ja"

@app.route("/translate")
def hello_world():
    text = request.args.get('text')
    print(text)

    translation = translate(text)
    print(translation)
    
    return translation

def chunk(text) -> List[str]:
    doc = nlp(text)
    return [str(sent).strip() for sent in doc.sents]

def translate(text):
    print(chunk(text))
    text_tokens = tokenizer(text, return_tensors="pt")
    generated_tokens = model.generate(**text_tokens)
    return tokenizer.batch_decode(generated_tokens, skip_special_tokens=True)[0]

# print(translator(text_en, src_lang = "en_XX", tgt_lang = "ja_XX"))

# こんにちは! このウェブサイトは私の個人的なウェブサイトです, それは私がここで何を望むかを持っています. このウェブサイトは sveltekit とtailwindcss で書かれています, できるだけ単純に保ちます. 私はおそらく私のブログに多くを投稿するつもりはありません, しかし、私は私がここでクールだと思うものを置きます. 今、これを書いている間, 私はブログに置くことに計画している唯一のことは、ポスト量子暗号化への私の冒険です. ああ! ところで, このウェブサイトは、oqsprovider と OpenSSL 3.0 で構築された Nginx でホストされています. これは Chrome や Firefox で有効になっている場合 (私はほぼすべての主要なブラウザがそれをサポートしていると思います), あなたはおそらく、将来の量子コンピュータが壊れることができない方法でこのウェブサイトに接続されていることを意味します (キバーが将来の方法で
# こんにちは! このウェブサイトは私の個人的なウェブサイトです, それは私がここで何を望むかを持っています. このウェブサイトは sveltekit とtailwindcss で書かれています, できるだけ単純に保ちます. 私はおそらく私のブログに多くを投稿するつもりはありません, しかし、私は私がここでクールだと思うものを置きます. 今、これを書いている間, 私はブログに置くことに計画している唯一のことは、ポスト量子暗号化への私の冒険です. ああ! ところで, このウェブサイトは、oqsprovider と OpenSSL 3.0 で構築された Nginx でホストされています. これは Chrome や Firefox で有効になっている場合 (私はほぼすべての主要なブラウザがそれをサポートしていると思います), あなたはおそらく、将来の量子コンピュータが壊れることができない方法でこのウェブサイトに接続されていることを意味します (キバーが将来の方法で
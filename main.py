from transformers import pipeline
from flask import Flask, request

app = Flask(__name__)
translator = pipeline(task="translation", model="facebook/mbart-large-50-many-to-many-mmt")

@app.route("/translate")
def hello_world():
    text = request.args.get('text')
    print(text)

    translation = translate(text)
    print(translation)
    
    return translation

def translate(text):
    return translator(text, src_lang="en_XX", tgt_lang = "ja_XX")[0]['translation_text']

# print(translator(text_en, src_lang = "en_XX", tgt_lang = "ja_XX"))

# こんにちは! このウェブサイトは私の個人的なウェブサイトです, それは私がここで何を望むかを持っています. このウェブサイトは sveltekit とtailwindcss で書かれています, できるだけ単純に保ちます. 私はおそらく私のブログに多くを投稿するつもりはありません, しかし、私は私がここでクールだと思うものを置きます. 今、これを書いている間, 私はブログに置くことに計画している唯一のことは、ポスト量子暗号化への私の冒険です. ああ! ところで, このウェブサイトは、oqsprovider と OpenSSL 3.0 で構築された Nginx でホストされています. これは Chrome や Firefox で有効になっている場合 (私はほぼすべての主要なブラウザがそれをサポートしていると思います), あなたはおそらく、将来の量子コンピュータが壊れることができない方法でこのウェブサイトに接続されていることを意味します (キバーが将来の方法で
# こんにちは! このウェブサイトは私の個人的なウェブサイトです, それは私がここで何を望むかを持っています. このウェブサイトは sveltekit とtailwindcss で書かれています, できるだけ単純に保ちます. 私はおそらく私のブログに多くを投稿するつもりはありません, しかし、私は私がここでクールだと思うものを置きます. 今、これを書いている間, 私はブログに置くことに計画している唯一のことは、ポスト量子暗号化への私の冒険です. ああ! ところで, このウェブサイトは、oqsprovider と OpenSSL 3.0 で構築された Nginx でホストされています. これは Chrome や Firefox で有効になっている場合 (私はほぼすべての主要なブラウザがそれをサポートしていると思います), あなたはおそらく、将来の量子コンピュータが壊れることができない方法でこのウェブサイトに接続されていることを意味します (キバーが将来の方法で
{ 

  outputs = { self, nixpkgs, ... }:
  let 
    pkgs = import nixpkgs { system = "x86_64-linux"; };
  in
  {
    devShells.x86_64-linux.default = pkgs.mkShell {
      packages = with pkgs; [
        python312
        python312Packages.torch
        python312Packages.flask
        python311Packages.spacy
        python312Packages.numpy

        python312Packages.sentencepiece
        python312Packages.transformers
      ];
    };
  };
}

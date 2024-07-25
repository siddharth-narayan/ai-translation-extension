{ 

  outputs = { self, nixpkgs, ... }:
  let 
    pkgs = import nixpkgs { system = "x86_64-linux"; };
  in
  {
    devShells.x86_64-linux.default = pkgs.mkShell {
      packages = with pkgs; [
        python312
        python312Packages.sentencepiece
        python312Packages.flask
        python312Packages.transformers
        python312Packages.torch
      ];
    };
  };
}

jQuery.gitUser = function (username, callback) {
  jQuery.getJSON('https://api.github.com/users/' + username + '/repos?per_page=1000&callback=?', callback); /* Change per_page according to your need. */
};

jQuery.fn.getRepos = function (username) {
  this.html("<h2 style=\"color:#FFF;\">Hold on tight, digging out " + username + "'s repositories...</h2><br>");

  var target = this;
  $.gitUser(username, function (data) {
    var repos = data.data; /* JSON Parsing */
    /* alert(repos.length); Only for checking how many items are returned. */
    sortByForks(repos); /* Sorting by forks. You can customize it according to your needs. */
    var list = $('<dl/>');
    target.empty().append(list);
    $(repos).each(function () {
      checkfork = this.fork;
      console.log(this);
      if ((this.name != (username.toLowerCase() + '.github.io')) && (checkfork != true)) { /* Check for username.github.com repo and for forked projects */
        list.append('<dt> \
                        <a style="font-size:20px;" href="' + (this.homepage ? this.homepage : this.html_url) + '"><h4 style="display: inline; padding-right: 2%;">/' + this.name + '   </h4></a> \
                        <div style="display: inline-block;"><span class="lang" style="background:' + mapLangToColor(this.language) +'"></span> \
                      	<span class="tag"><i class="fa fa-github fa-2" aria-hidden="true"></i> STARS</span> \
                        <a href=' + this.html_url + '><span class="numbertag">' + this.watchers + '</span></a> \
                        <span class="tag"><i class="fa fa-github fa-2" aria-hidden="true"></i> FORKS</span> \
                        <a href=' + this.html_url + '><span class="numbertag">' + this.forks + '</span></a></div> \
                        <div style="padding-top: 2%;"><p>' + emojione.shortnameToImage(this.description) + (this.homepage ? ('<a href="' + this.homepage + '"> ' + this.homepage + '</a>') : "") + '</p></div> \
                    ');
        /* Similarly fetch everything else you need. */
      }
    });
  });

  function sortByForks(repos) {
    repos.sort(function (a, b) {
      return b.stars - a.stars; /* Descending order for number of forks based sorting. */
    });
  }

  function mapLangToColor(lang) {
    map = {
            "1C Enterprise": {
                "color": "#814CCC",
                "url": "https://github.com/trending?l=1C Enterprise"
            },
            "ABAP": {
                "color": "#E8274B",
                "url": "https://github.com/trending?l=ABAP"
            },
            "ActionScript": {
                "color": "#882B0F",
                "url": "https://github.com/trending?l=as3"
            },
            "Ada": {
                "color": "#02f88c",
                "url": "https://github.com/trending?l=Ada"
            },
            "Agda": {
                "color": "#315665",
                "url": "https://github.com/trending?l=Agda"
            },
            "AGS Script": {
                "color": "#B9D9FF",
                "url": "https://github.com/trending?l=AGS Script"
            },
            "Alloy": {
                "color": "#64C800",
                "url": "https://github.com/trending?l=Alloy"
            },
            "Alpine Abuild": {
                "color": null,
                "url": "https://github.com/trending?l=Alpine Abuild"
            },
            "AMPL": {
                "color": "#E6EFBB",
                "url": "https://github.com/trending?l=AMPL"
            },
            "ANTLR": {
                "color": "#9DC3FF",
                "url": "https://github.com/trending?l=ANTLR"
            },
            "Apex": {
                "color": null,
                "url": "https://github.com/trending?l=Apex"
            },
            "API Blueprint": {
                "color": "#2ACCA8",
                "url": "https://github.com/trending?l=API Blueprint"
            },
            "APL": {
                "color": "#5A8164",
                "url": "https://github.com/trending?l=APL"
            },
            "Apollo Guidance Computer": {
                "color": "#0B3D91",
                "url": "https://github.com/trending?l=Apollo Guidance Computer"
            },
            "AppleScript": {
                "color": "#101F1F",
                "url": "https://github.com/trending?l=AppleScript"
            },
            "Arc": {
                "color": "#aa2afe",
                "url": "https://github.com/trending?l=Arc"
            },
            "Arduino": {
                "color": "#bd79d1",
                "url": "https://github.com/trending?l=Arduino"
            },
            "ASN.1": {
                "color": "#aeead0",
                "url": "https://github.com/trending?l=ASN.1"
            },
            "ASP": {
                "color": "#6a40fd",
                "url": "https://github.com/trending?l=aspx-vb"
            },
            "AspectJ": {
                "color": "#a957b0",
                "url": "https://github.com/trending?l=AspectJ"
            },
            "Assembly": {
                "color": "#6E4C13",
                "url": "https://github.com/trending?l=nasm"
            },
            "ATS": {
                "color": "#1ac620",
                "url": "https://github.com/trending?l=ATS"
            },
            "Augeas": {
                "color": null,
                "url": "https://github.com/trending?l=Augeas"
            },
            "AutoHotkey": {
                "color": "#6594b9",
                "url": "https://github.com/trending?l=AutoHotkey"
            },
            "AutoIt": {
                "color": "#1C3552",
                "url": "https://github.com/trending?l=AutoIt"
            },
            "Awk": {
                "color": null,
                "url": "https://github.com/trending?l=Awk"
            },
            "Batchfile": {
                "color": "#C1F12E",
                "url": "https://github.com/trending?l=bat"
            },
            "Befunge": {
                "color": null,
                "url": "https://github.com/trending?l=Befunge"
            },
            "Bison": {
                "color": "#6A463F",
                "url": "https://github.com/trending?l=Bison"
            },
            "BitBake": {
                "color": null,
                "url": "https://github.com/trending?l=BitBake"
            },
            "BlitzBasic": {
                "color": null,
                "url": "https://github.com/trending?l=BlitzBasic"
            },
            "BlitzMax": {
                "color": "#cd6400",
                "url": "https://github.com/trending?l=BlitzMax"
            },
            "Bluespec": {
                "color": null,
                "url": "https://github.com/trending?l=Bluespec"
            },
            "Boo": {
                "color": "#d4bec1",
                "url": "https://github.com/trending?l=Boo"
            },
            "Brainfuck": {
                "color": "#2F2530",
                "url": "https://github.com/trending?l=Brainfuck"
            },
            "Brightscript": {
                "color": null,
                "url": "https://github.com/trending?l=Brightscript"
            },
            "Bro": {
                "color": null,
                "url": "https://github.com/trending?l=Bro"
            },
            "C": {
                "color": "#555555",
                "url": "https://github.com/trending?l=C"
            },
            "C#": {
                "color": "#178600",
                "url": "https://github.com/trending?l=csharp"
            },
            "C++": {
                "color": "#f34b7d",
                "url": "https://github.com/trending?l=cpp"
            },
            "C2hs Haskell": {
                "color": null,
                "url": "https://github.com/trending?l=C2hs Haskell"
            },
            "Cap'n Proto": {
                "color": null,
                "url": "https://github.com/trending?l=Cap'n Proto"
            },
            "CartoCSS": {
                "color": null,
                "url": "https://github.com/trending?l=CartoCSS"
            },
            "Ceylon": {
                "color": null,
                "url": "https://github.com/trending?l=Ceylon"
            },
            "Chapel": {
                "color": "#8dc63f",
                "url": "https://github.com/trending?l=Chapel"
            },
            "Charity": {
                "color": null,
                "url": "https://github.com/trending?l=Charity"
            },
            "ChucK": {
                "color": null,
                "url": "https://github.com/trending?l=ChucK"
            },
            "Cirru": {
                "color": "#ccccff",
                "url": "https://github.com/trending?l=Cirru"
            },
            "Clarion": {
                "color": "#db901e",
                "url": "https://github.com/trending?l=Clarion"
            },
            "Clean": {
                "color": "#3F85AF",
                "url": "https://github.com/trending?l=Clean"
            },
            "Click": {
                "color": "#E4E6F3",
                "url": "https://github.com/trending?l=Click"
            },
            "CLIPS": {
                "color": null,
                "url": "https://github.com/trending?l=CLIPS"
            },
            "Clojure": {
                "color": "#db5855",
                "url": "https://github.com/trending?l=Clojure"
            },
            "CMake": {
                "color": null,
                "url": "https://github.com/trending?l=CMake"
            },
            "COBOL": {
                "color": null,
                "url": "https://github.com/trending?l=COBOL"
            },
            "CoffeeScript": {
                "color": "#244776",
                "url": "https://github.com/trending?l=CoffeeScript"
            },
            "ColdFusion": {
                "color": "#ed2cd6",
                "url": "https://github.com/trending?l=cfm"
            },
            "ColdFusion CFC": {
                "color": "#ed2cd6",
                "url": "https://github.com/trending?l=cfc"
            },
            "Common Lisp": {
                "color": "#3fb68b",
                "url": "https://github.com/trending?l=Common Lisp"
            },
            "Component Pascal": {
                "color": "#B0CE4E",
                "url": "https://github.com/trending?l=Component Pascal"
            },
            "Cool": {
                "color": null,
                "url": "https://github.com/trending?l=Cool"
            },
            "Coq": {
                "color": null,
                "url": "https://github.com/trending?l=Coq"
            },
            "Crystal": {
                "color": "#776791",
                "url": "https://github.com/trending?l=Crystal"
            },
            "Csound": {
                "color": null,
                "url": "https://github.com/trending?l=Csound"
            },
            "Csound Document": {
                "color": null,
                "url": "https://github.com/trending?l=Csound Document"
            },
            "Csound Score": {
                "color": null,
                "url": "https://github.com/trending?l=Csound Score"
            },
            "CSS": {
                "color": "#563d7c",
                "url": "https://github.com/trending?l=CSS"
            },
            "Cucumber": {
                "color": "#5B2063",
                "url": "https://github.com/trending?l=Cucumber"
            },
            "Cuda": {
                "color": "#3A4E3A",
                "url": "https://github.com/trending?l=Cuda"
            },
            "Cycript": {
                "color": null,
                "url": "https://github.com/trending?l=Cycript"
            },
            "Cython": {
                "color": null,
                "url": "https://github.com/trending?l=Cython"
            },
            "D": {
                "color": "#ba595e",
                "url": "https://github.com/trending?l=D"
            },
            "Dart": {
                "color": "#00B4AB",
                "url": "https://github.com/trending?l=Dart"
            },
            "DIGITAL Command Language": {
                "color": null,
                "url": "https://github.com/trending?l=DIGITAL Command Language"
            },
            "DM": {
                "color": "#447265",
                "url": "https://github.com/trending?l=DM"
            },
            "Dogescript": {
                "color": "#cca760",
                "url": "https://github.com/trending?l=Dogescript"
            },
            "DTrace": {
                "color": null,
                "url": "https://github.com/trending?l=DTrace"
            },
            "Dylan": {
                "color": "#6c616e",
                "url": "https://github.com/trending?l=Dylan"
            },
            "E": {
                "color": "#ccce35",
                "url": "https://github.com/trending?l=E"
            },
            "Eagle": {
                "color": "#814C05",
                "url": "https://github.com/trending?l=Eagle"
            },
            "eC": {
                "color": "#913960",
                "url": "https://github.com/trending?l=ec"
            },
            "ECL": {
                "color": "#8a1267",
                "url": "https://github.com/trending?l=ECL"
            },
            "ECLiPSe": {
                "color": null,
                "url": "https://github.com/trending?l=ECLiPSe"
            },
            "Eiffel": {
                "color": "#946d57",
                "url": "https://github.com/trending?l=Eiffel"
            },
            "EJS": {
                "color": "#a91e50",
                "url": "https://github.com/trending?l=EJS"
            },
            "Elixir": {
                "color": "#6e4a7e",
                "url": "https://github.com/trending?l=Elixir"
            },
            "Elm": {
                "color": "#60B5CC",
                "url": "https://github.com/trending?l=Elm"
            },
            "Emacs Lisp": {
                "color": "#c065db",
                "url": "https://github.com/trending?l=Emacs Lisp"
            },
            "EmberScript": {
                "color": "#FFF4F3",
                "url": "https://github.com/trending?l=EmberScript"
            },
            "EQ": {
                "color": "#a78649",
                "url": "https://github.com/trending?l=EQ"
            },
            "Erlang": {
                "color": "#B83998",
                "url": "https://github.com/trending?l=Erlang"
            },
            "F#": {
                "color": "#b845fc",
                "url": "https://github.com/trending?l=fsharp"
            },
            "Factor": {
                "color": "#636746",
                "url": "https://github.com/trending?l=Factor"
            },
            "Fancy": {
                "color": "#7b9db4",
                "url": "https://github.com/trending?l=Fancy"
            },
            "Fantom": {
                "color": "#dbded5",
                "url": "https://github.com/trending?l=Fantom"
            },
            "Filebench WML": {
                "color": null,
                "url": "https://github.com/trending?l=Filebench WML"
            },
            "Filterscript": {
                "color": null,
                "url": "https://github.com/trending?l=Filterscript"
            },
            "fish": {
                "color": null,
                "url": "https://github.com/trending?l=fish"
            },
            "FLUX": {
                "color": "#88ccff",
                "url": "https://github.com/trending?l=FLUX"
            },
            "Forth": {
                "color": "#341708",
                "url": "https://github.com/trending?l=Forth"
            },
            "FORTRAN": {
                "color": "#4d41b1",
                "url": "https://github.com/trending?l=FORTRAN"
            },
            "FreeMarker": {
                "color": "#0050b2",
                "url": "https://github.com/trending?l=FreeMarker"
            },
            "Frege": {
                "color": "#00cafe",
                "url": "https://github.com/trending?l=Frege"
            },
            "Game Maker Language": {
                "color": "#8fb200",
                "url": "https://github.com/trending?l=Game Maker Language"
            },
            "GAMS": {
                "color": null,
                "url": "https://github.com/trending?l=GAMS"
            },
            "GAP": {
                "color": null,
                "url": "https://github.com/trending?l=GAP"
            },
            "GAS": {
                "color": null,
                "url": "https://github.com/trending?l=GAS"
            },
            "GCC Machine Description": {
                "color": null,
                "url": "https://github.com/trending?l=GCC Machine Description"
            },
            "GDB": {
                "color": null,
                "url": "https://github.com/trending?l=GDB"
            },
            "GDScript": {
                "color": null,
                "url": "https://github.com/trending?l=GDScript"
            },
            "Genshi": {
                "color": null,
                "url": "https://github.com/trending?l=Genshi"
            },
            "Gentoo Ebuild": {
                "color": null,
                "url": "https://github.com/trending?l=Gentoo Ebuild"
            },
            "Gentoo Eclass": {
                "color": null,
                "url": "https://github.com/trending?l=Gentoo Eclass"
            },
            "GLSL": {
                "color": null,
                "url": "https://github.com/trending?l=GLSL"
            },
            "Glyph": {
                "color": "#e4cc98",
                "url": "https://github.com/trending?l=Glyph"
            },
            "Gnuplot": {
                "color": "#f0a9f0",
                "url": "https://github.com/trending?l=Gnuplot"
            },
            "Go": {
                "color": "#375eab",
                "url": "https://github.com/trending?l=Go"
            },
            "Golo": {
                "color": "#88562A",
                "url": "https://github.com/trending?l=Golo"
            },
            "Gosu": {
                "color": "#82937f",
                "url": "https://github.com/trending?l=Gosu"
            },
            "Grace": {
                "color": null,
                "url": "https://github.com/trending?l=Grace"
            },
            "Grammatical Framework": {
                "color": "#79aa7a",
                "url": "https://github.com/trending?l=Grammatical Framework"
            },
            "Groff": {
                "color": "#ecdebe",
                "url": "https://github.com/trending?l=Groff"
            },
            "Groovy": {
                "color": "#e69f56",
                "url": "https://github.com/trending?l=Groovy"
            },
            "Groovy Server Pages": {
                "color": null,
                "url": "https://github.com/trending?l=Groovy Server Pages"
            },
            "Hack": {
                "color": "#878787",
                "url": "https://github.com/trending?l=Hack"
            },
            "Haml": {
                "color": "#ECE2A9",
                "url": "https://github.com/trending?l=Haml"
            },
            "Handlebars": {
                "color": "#01a9d6",
                "url": "https://github.com/trending?l=Handlebars"
            },
            "Harbour": {
                "color": "#0e60e3",
                "url": "https://github.com/trending?l=Harbour"
            },
            "Haskell": {
                "color": "#29b544",
                "url": "https://github.com/trending?l=Haskell"
            },
            "Haxe": {
                "color": "#df7900",
                "url": "https://github.com/trending?l=Haxe"
            },
            "HCL": {
                "color": null,
                "url": "https://github.com/trending?l=HCL"
            },
            "HLSL": {
                "color": null,
                "url": "https://github.com/trending?l=HLSL"
            },
            "HTML": {
                "color": "#e44b23",
                "url": "https://github.com/trending?l=HTML"
            },
            "Hy": {
                "color": "#7790B2",
                "url": "https://github.com/trending?l=Hy"
            },
            "HyPhy": {
                "color": null,
                "url": "https://github.com/trending?l=HyPhy"
            },
            "IDL": {
                "color": "#a3522f",
                "url": "https://github.com/trending?l=IDL"
            },
            "Idris": {
                "color": null,
                "url": "https://github.com/trending?l=Idris"
            },
            "IGOR Pro": {
                "color": null,
                "url": "https://github.com/trending?l=IGOR Pro"
            },
            "Inform 7": {
                "color": null,
                "url": "https://github.com/trending?l=Inform 7"
            },
            "Inno Setup": {
                "color": null,
                "url": "https://github.com/trending?l=Inno Setup"
            },
            "Io": {
                "color": "#a9188d",
                "url": "https://github.com/trending?l=Io"
            },
            "Ioke": {
                "color": "#078193",
                "url": "https://github.com/trending?l=Ioke"
            },
            "Isabelle": {
                "color": "#FEFE00",
                "url": "https://github.com/trending?l=Isabelle"
            },
            "Isabelle ROOT": {
                "color": null,
                "url": "https://github.com/trending?l=Isabelle ROOT"
            },
            "J": {
                "color": "#9EEDFF",
                "url": "https://github.com/trending?l=J"
            },
            "Jasmin": {
                "color": null,
                "url": "https://github.com/trending?l=Jasmin"
            },
            "Java": {
                "color": "#b07219",
                "url": "https://github.com/trending?l=Java"
            },
            "Java Server Pages": {
                "color": null,
                "url": "https://github.com/trending?l=jsp"
            },
            "JavaScript": {
                "color": "#f1e05a",
                "url": "https://github.com/trending?l=JavaScript"
            },
            "JFlex": {
                "color": "#DBCA00",
                "url": "https://github.com/trending?l=JFlex"
            },
            "JSONiq": {
                "color": "#40d47e",
                "url": "https://github.com/trending?l=JSONiq"
            },
            "JSX": {
                "color": null,
                "url": "https://github.com/trending?l=JSX"
            },
            "Julia": {
                "color": "#a270ba",
                "url": "https://github.com/trending?l=Julia"
            },
            "Jupyter Notebook": {
                "color": "#DA5B0B",
                "url": "https://github.com/trending?l=Jupyter Notebook"
            },
            "KiCad": {
                "color": null,
                "url": "https://github.com/trending?l=KiCad"
            },
            "Kotlin": {
                "color": "#F18E33",
                "url": "https://github.com/trending?l=Kotlin"
            },
            "KRL": {
                "color": "#28431f",
                "url": "https://github.com/trending?l=KRL"
            },
            "LabVIEW": {
                "color": null,
                "url": "https://github.com/trending?l=LabVIEW"
            },
            "Lasso": {
                "color": "#999999",
                "url": "https://github.com/trending?l=Lasso"
            },
            "Latte": {
                "color": "#A8FF97",
                "url": "https://github.com/trending?l=Latte"
            },
            "Lean": {
                "color": null,
                "url": "https://github.com/trending?l=Lean"
            },
            "Less": {
                "color": "#A1D9A1",
                "url": "https://github.com/trending?l=Less"
            },
            "Lex": {
                "color": "#DBCA00",
                "url": "https://github.com/trending?l=Lex"
            },
            "LFE": {
                "color": "#004200",
                "url": "https://github.com/trending?l=LFE"
            },
            "LilyPond": {
                "color": null,
                "url": "https://github.com/trending?l=LilyPond"
            },
            "Limbo": {
                "color": null,
                "url": "https://github.com/trending?l=Limbo"
            },
            "Literate Agda": {
                "color": null,
                "url": "https://github.com/trending?l=Literate Agda"
            },
            "Literate CoffeeScript": {
                "color": null,
                "url": "https://github.com/trending?l=litcoffee"
            },
            "Literate Haskell": {
                "color": null,
                "url": "https://github.com/trending?l=lhs"
            },
            "LiveScript": {
                "color": "#499886",
                "url": "https://github.com/trending?l=LiveScript"
            },
            "LLVM": {
                "color": "#185619",
                "url": "https://github.com/trending?l=LLVM"
            },
            "Logos": {
                "color": null,
                "url": "https://github.com/trending?l=Logos"
            },
            "Logtalk": {
                "color": null,
                "url": "https://github.com/trending?l=Logtalk"
            },
            "LOLCODE": {
                "color": "#cc9900",
                "url": "https://github.com/trending?l=LOLCODE"
            },
            "LookML": {
                "color": "#652B81",
                "url": "https://github.com/trending?l=LookML"
            },
            "LoomScript": {
                "color": null,
                "url": "https://github.com/trending?l=LoomScript"
            },
            "LSL": {
                "color": "#3d9970",
                "url": "https://github.com/trending?l=LSL"
            },
            "Lua": {
                "color": "#000080",
                "url": "https://github.com/trending?l=Lua"
            },
            "M": {
                "color": null,
                "url": "https://github.com/trending?l=M"
            },
            "M4": {
                "color": null,
                "url": "https://github.com/trending?l=M4"
            },
            "M4Sugar": {
                "color": null,
                "url": "https://github.com/trending?l=M4Sugar"
            },
            "Makefile": {
                "color": "#427819",
                "url": "https://github.com/trending?l=Makefile"
            },
            "Mako": {
                "color": null,
                "url": "https://github.com/trending?l=Mako"
            },
            "Mask": {
                "color": "#f97732",
                "url": "https://github.com/trending?l=Mask"
            },
            "Mathematica": {
                "color": null,
                "url": "https://github.com/trending?l=Mathematica"
            },
            "Matlab": {
                "color": "#bb92ac",
                "url": "https://github.com/trending?l=Matlab"
            },
            "Max": {
                "color": "#c4a79c",
                "url": "https://github.com/trending?l=max/msp"
            },
            "MAXScript": {
                "color": "#00a6a6",
                "url": "https://github.com/trending?l=MAXScript"
            },
            "Mercury": {
                "color": "#ff2b2b",
                "url": "https://github.com/trending?l=Mercury"
            },
            "Metal": {
                "color": "#8f14e9",
                "url": "https://github.com/trending?l=Metal"
            },
            "MiniD": {
                "color": null,
                "url": "https://github.com/trending?l=MiniD"
            },
            "Mirah": {
                "color": "#c7a938",
                "url": "https://github.com/trending?l=mirah"
            },
            "Modelica": {
                "color": null,
                "url": "https://github.com/trending?l=Modelica"
            },
            "Modula-2": {
                "color": null,
                "url": "https://github.com/trending?l=Modula-2"
            },
            "Module Management System": {
                "color": null,
                "url": "https://github.com/trending?l=Module Management System"
            },
            "Monkey": {
                "color": null,
                "url": "https://github.com/trending?l=Monkey"
            },
            "Moocode": {
                "color": null,
                "url": "https://github.com/trending?l=Moocode"
            },
            "MoonScript": {
                "color": null,
                "url": "https://github.com/trending?l=MoonScript"
            },
            "MTML": {
                "color": "#b7e1f4",
                "url": "https://github.com/trending?l=MTML"
            },
            "MUF": {
                "color": null,
                "url": "https://github.com/trending?l=MUF"
            },
            "mupad": {
                "color": null,
                "url": "https://github.com/trending?l=mupad"
            },
            "Myghty": {
                "color": null,
                "url": "https://github.com/trending?l=Myghty"
            },
            "NCL": {
                "color": "#28431f",
                "url": "https://github.com/trending?l=NCL"
            },
            "Nemerle": {
                "color": "#3d3c6e",
                "url": "https://github.com/trending?l=Nemerle"
            },
            "nesC": {
                "color": "#94B0C7",
                "url": "https://github.com/trending?l=nesC"
            },
            "NetLinx": {
                "color": "#0aa0ff",
                "url": "https://github.com/trending?l=NetLinx"
            },
            "NetLinx+ERB": {
                "color": "#747faa",
                "url": "https://github.com/trending?l=NetLinx+ERB"
            },
            "NetLogo": {
                "color": "#ff6375",
                "url": "https://github.com/trending?l=NetLogo"
            },
            "NewLisp": {
                "color": "#87AED7",
                "url": "https://github.com/trending?l=NewLisp"
            },
            "Nginx": {
                "color": "#9469E9",
                "url": "https://github.com/trending?l=Nginx"
            },
            "Nimrod": {
                "color": "#37775b",
                "url": "https://github.com/trending?l=Nimrod"
            },
            "Nit": {
                "color": "#009917",
                "url": "https://github.com/trending?l=Nit"
            },
            "Nix": {
                "color": "#7e7eff",
                "url": "https://github.com/trending?l=Nix"
            },
            "NSIS": {
                "color": null,
                "url": "https://github.com/trending?l=NSIS"
            },
            "Nu": {
                "color": "#c9df40",
                "url": "https://github.com/trending?l=Nu"
            },
            "NumPy": {
                "color": "#9C8AF9",
                "url": "https://github.com/trending?l=NumPy"
            },
            "Objective-C": {
                "color": "#438eff",
                "url": "https://github.com/trending?l=Objective-C"
            },
            "Objective-C++": {
                "color": "#6866fb",
                "url": "https://github.com/trending?l=Objective-C++"
            },
            "Objective-J": {
                "color": "#ff0c5a",
                "url": "https://github.com/trending?l=Objective-J"
            },
            "OCaml": {
                "color": "#3be133",
                "url": "https://github.com/trending?l=OCaml"
            },
            "Omgrofl": {
                "color": "#cabbff",
                "url": "https://github.com/trending?l=Omgrofl"
            },
            "ooc": {
                "color": "#b0b77e",
                "url": "https://github.com/trending?l=ooc"
            },
            "Opa": {
                "color": null,
                "url": "https://github.com/trending?l=Opa"
            },
            "Opal": {
                "color": "#f7ede0",
                "url": "https://github.com/trending?l=Opal"
            },
            "OpenCL": {
                "color": null,
                "url": "https://github.com/trending?l=OpenCL"
            },
            "OpenEdge ABL": {
                "color": null,
                "url": "https://github.com/trending?l=OpenEdge ABL"
            },
            "OpenRC runscript": {
                "color": null,
                "url": "https://github.com/trending?l=OpenRC runscript"
            },
            "OpenSCAD": {
                "color": null,
                "url": "https://github.com/trending?l=OpenSCAD"
            },
            "Ox": {
                "color": null,
                "url": "https://github.com/trending?l=Ox"
            },
            "Oxygene": {
                "color": "#cdd0e3",
                "url": "https://github.com/trending?l=Oxygene"
            },
            "Oz": {
                "color": "#fab738",
                "url": "https://github.com/trending?l=Oz"
            },
            "Pan": {
                "color": "#cc0000",
                "url": "https://github.com/trending?l=Pan"
            },
            "Papyrus": {
                "color": "#6600cc",
                "url": "https://github.com/trending?l=Papyrus"
            },
            "Parrot": {
                "color": "#f3ca0a",
                "url": "https://github.com/trending?l=Parrot"
            },
            "Parrot Assembly": {
                "color": null,
                "url": "https://github.com/trending?l=Parrot Assembly"
            },
            "Parrot Internal Representation": {
                "color": null,
                "url": "https://github.com/trending?l=Parrot Internal Representation"
            },
            "Pascal": {
                "color": "#E3F171",
                "url": "https://github.com/trending?l=Pascal"
            },
            "PAWN": {
                "color": "#dbb284",
                "url": "https://github.com/trending?l=PAWN"
            },
            "Perl": {
                "color": "#0298c3",
                "url": "https://github.com/trending?l=Perl"
            },
            "Perl6": {
                "color": "#0000fb",
                "url": "https://github.com/trending?l=Perl6"
            },
            "PHP": {
                "color": "#4F5D95",
                "url": "https://github.com/trending?l=PHP"
            },
            "PicoLisp": {
                "color": null,
                "url": "https://github.com/trending?l=PicoLisp"
            },
            "PigLatin": {
                "color": "#fcd7de",
                "url": "https://github.com/trending?l=PigLatin"
            },
            "Pike": {
                "color": "#005390",
                "url": "https://github.com/trending?l=Pike"
            },
            "PLpgSQL": {
                "color": null,
                "url": "https://github.com/trending?l=PLpgSQL"
            },
            "PLSQL": {
                "color": "#dad8d8",
                "url": "https://github.com/trending?l=PLSQL"
            },
            "PogoScript": {
                "color": "#d80074",
                "url": "https://github.com/trending?l=PogoScript"
            },
            "Pony": {
                "color": null,
                "url": "https://github.com/trending?l=Pony"
            },
            "PostScript": {
                "color": "#da291c",
                "url": "https://github.com/trending?l=PostScript"
            },
            "POV-Ray SDL": {
                "color": null,
                "url": "https://github.com/trending?l=POV-Ray SDL"
            },
            "PowerBuilder": {
                "color": "#8f0f8d",
                "url": "https://github.com/trending?l=PowerBuilder"
            },
            "PowerShell": {
                "color": null,
                "url": "https://github.com/trending?l=PowerShell"
            },
            "Processing": {
                "color": "#0096D8",
                "url": "https://github.com/trending?l=Processing"
            },
            "Prolog": {
                "color": "#74283c",
                "url": "https://github.com/trending?l=Prolog"
            },
            "Propeller Spin": {
                "color": "#7fa2a7",
                "url": "https://github.com/trending?l=Propeller Spin"
            },
            "Puppet": {
                "color": "#302B6D",
                "url": "https://github.com/trending?l=Puppet"
            },
            "Pure Data": {
                "color": "#91de79",
                "url": "https://github.com/trending?l=Pure Data"
            },
            "PureBasic": {
                "color": "#5a6986",
                "url": "https://github.com/trending?l=PureBasic"
            },
            "PureScript": {
                "color": "#1D222D",
                "url": "https://github.com/trending?l=PureScript"
            },
            "Python": {
                "color": "#3572A5",
                "url": "https://github.com/trending?l=Python"
            },
            "QMake": {
                "color": null,
                "url": "https://github.com/trending?l=QMake"
            },
            "QML": {
                "color": "#44a51c",
                "url": "https://github.com/trending?l=QML"
            },
            "R": {
                "color": "#198CE7",
                "url": "https://github.com/trending?l=R"
            },
            "Racket": {
                "color": "#22228f",
                "url": "https://github.com/trending?l=Racket"
            },
            "Ragel in Ruby Host": {
                "color": "#9d5200",
                "url": "https://github.com/trending?l=Ragel in Ruby Host"
            },
            "RAML": {
                "color": "#77d9fb",
                "url": "https://github.com/trending?l=RAML"
            },
            "REALbasic": {
                "color": null,
                "url": "https://github.com/trending?l=REALbasic"
            },
            "Rebol": {
                "color": "#358a5b",
                "url": "https://github.com/trending?l=Rebol"
            },
            "Red": {
                "color": "#f50000",
                "url": "https://github.com/trending?l=Red"
            },
            "Redcode": {
                "color": null,
                "url": "https://github.com/trending?l=Redcode"
            },
            "Ren'Py": {
                "color": "#ff7f7f",
                "url": "https://github.com/trending?l=Ren'Py"
            },
            "RenderScript": {
                "color": null,
                "url": "https://github.com/trending?l=RenderScript"
            },
            "REXX": {
                "color": null,
                "url": "https://github.com/trending?l=REXX"
            },
            "RobotFramework": {
                "color": null,
                "url": "https://github.com/trending?l=RobotFramework"
            },
            "Rouge": {
                "color": "#cc0088",
                "url": "https://github.com/trending?l=Rouge"
            },
            "Ruby": {
                "color": "#701516",
                "url": "https://github.com/trending?l=Ruby"
            },
            "RUNOFF": {
                "color": "#665a4e",
                "url": "https://github.com/trending?l=RUNOFF"
            },
            "Rust": {
                "color": "#dea584",
                "url": "https://github.com/trending?l=Rust"
            },
            "Sage": {
                "color": null,
                "url": "https://github.com/trending?l=Sage"
            },
            "SaltStack": {
                "color": "#646464",
                "url": "https://github.com/trending?l=SaltStack"
            },
            "SAS": {
                "color": "#B34936",
                "url": "https://github.com/trending?l=SAS"
            },
            "Sass": {
                "color": "#CF649A",
                "url": "https://github.com/trending?l=Sass"
            },
            "Scala": {
                "color": "#c22d40",
                "url": "https://github.com/trending?l=Scala"
            },
            "Scheme": {
                "color": "#1e4aec",
                "url": "https://github.com/trending?l=Scheme"
            },
            "Scilab": {
                "color": null,
                "url": "https://github.com/trending?l=Scilab"
            },
            "SCSS": {
                "color": "#CF649A",
                "url": "https://github.com/trending?l=SCSS"
            },
            "Self": {
                "color": "#0579aa",
                "url": "https://github.com/trending?l=Self"
            },
            "Shell": {
                "color": "#89e051",
                "url": "https://github.com/trending?l=bash"
            },
            "ShellSession": {
                "color": null,
                "url": "https://github.com/trending?l=ShellSession"
            },
            "Shen": {
                "color": "#120F14",
                "url": "https://github.com/trending?l=Shen"
            },
            "Slash": {
                "color": "#007eff",
                "url": "https://github.com/trending?l=Slash"
            },
            "Slim": {
                "color": "#ff8f77",
                "url": "https://github.com/trending?l=Slim"
            },
            "Smali": {
                "color": null,
                "url": "https://github.com/trending?l=Smali"
            },
            "Smalltalk": {
                "color": "#596706",
                "url": "https://github.com/trending?l=Smalltalk"
            },
            "Smarty": {
                "color": null,
                "url": "https://github.com/trending?l=Smarty"
            },
            "SMT": {
                "color": null,
                "url": "https://github.com/trending?l=SMT"
            },
            "SourcePawn": {
                "color": "#5c7611",
                "url": "https://github.com/trending?l=SourcePawn"
            },
            "SQF": {
                "color": "#3F3F3F",
                "url": "https://github.com/trending?l=SQF"
            },
            "SQLPL": {
                "color": null,
                "url": "https://github.com/trending?l=SQLPL"
            },
            "Squirrel": {
                "color": "#800000",
                "url": "https://github.com/trending?l=Squirrel"
            },
            "SRecode Template": {
                "color": "#348a34",
                "url": "https://github.com/trending?l=SRecode Template"
            },
            "Stan": {
                "color": "#b2011d",
                "url": "https://github.com/trending?l=Stan"
            },
            "Standard ML": {
                "color": "#dc566d",
                "url": "https://github.com/trending?l=Standard ML"
            },
            "Stata": {
                "color": null,
                "url": "https://github.com/trending?l=Stata"
            },
            "SuperCollider": {
                "color": "#46390b",
                "url": "https://github.com/trending?l=SuperCollider"
            },
            "Swift": {
                "color": "#ffac45",
                "url": "https://github.com/trending?l=Swift"
            },
            "SystemVerilog": {
                "color": "#DAE1C2",
                "url": "https://github.com/trending?l=SystemVerilog"
            },
            "Tcl": {
                "color": "#e4cc98",
                "url": "https://github.com/trending?l=Tcl"
            },
            "Tcsh": {
                "color": null,
                "url": "https://github.com/trending?l=Tcsh"
            },
            "Terra": {
                "color": "#00004c",
                "url": "https://github.com/trending?l=Terra"
            },
            "TeX": {
                "color": "#3D6117",
                "url": "https://github.com/trending?l=TeX"
            },
            "Thrift": {
                "color": null,
                "url": "https://github.com/trending?l=Thrift"
            },
            "TLA": {
                "color": null,
                "url": "https://github.com/trending?l=TLA"
            },
            "Turing": {
                "color": "#cf142b",
                "url": "https://github.com/trending?l=Turing"
            },
            "TXL": {
                "color": null,
                "url": "https://github.com/trending?l=TXL"
            },
            "TypeScript": {
                "color": "#2b7489",
                "url": "https://github.com/trending?l=TypeScript"
            },
            "Unified Parallel C": {
                "color": "#4e3617",
                "url": "https://github.com/trending?l=Unified Parallel C"
            },
            "Uno": {
                "color": null,
                "url": "https://github.com/trending?l=Uno"
            },
            "UnrealScript": {
                "color": "#a54c4d",
                "url": "https://github.com/trending?l=UnrealScript"
            },
            "UrWeb": {
                "color": null,
                "url": "https://github.com/trending?l=UrWeb"
            },
            "Vala": {
                "color": "#fbe5cd",
                "url": "https://github.com/trending?l=Vala"
            },
            "VCL": {
                "color": null,
                "url": "https://github.com/trending?l=VCL"
            },
            "Verilog": {
                "color": "#b2b7f8",
                "url": "https://github.com/trending?l=Verilog"
            },
            "VHDL": {
                "color": "#adb2cb",
                "url": "https://github.com/trending?l=VHDL"
            },
            "VimL": {
                "color": "#199f4b",
                "url": "https://github.com/trending?l=vim"
            },
            "Visual Basic": {
                "color": "#945db7",
                "url": "https://github.com/trending?l=Visual Basic"
            },
            "Volt": {
                "color": "#1F1F1F",
                "url": "https://github.com/trending?l=Volt"
            },
            "Vue": {
                "color": "#2c3e50",
                "url": "https://github.com/trending?l=Vue"
            },
            "Web Ontology Language": {
                "color": "#9cc9dd",
                "url": "https://github.com/trending?l=Web Ontology Language"
            },
            "WebIDL": {
                "color": null,
                "url": "https://github.com/trending?l=WebIDL"
            },
            "wisp": {
                "color": "#7582D1",
                "url": "https://github.com/trending?l=wisp"
            },
            "X10": {
                "color": "#4B6BEF",
                "url": "https://github.com/trending?l=X10"
            },
            "xBase": {
                "color": "#403a40",
                "url": "https://github.com/trending?l=xBase"
            },
            "XC": {
                "color": "#99DA07",
                "url": "https://github.com/trending?l=XC"
            },
            "Xojo": {
                "color": null,
                "url": "https://github.com/trending?l=Xojo"
            },
            "XPages": {
                "color": null,
                "url": "https://github.com/trending?l=XPages"
            },
            "XProc": {
                "color": null,
                "url": "https://github.com/trending?l=XProc"
            },
            "XQuery": {
                "color": "#5232e7",
                "url": "https://github.com/trending?l=XQuery"
            },
            "XS": {
                "color": null,
                "url": "https://github.com/trending?l=XS"
            },
            "XSLT": {
                "color": "#EB8CEB",
                "url": "https://github.com/trending?l=XSLT"
            },
            "Xtend": {
                "color": null,
                "url": "https://github.com/trending?l=Xtend"
            },
            "Yacc": {
                "color": "#4B6C4B",
                "url": "https://github.com/trending?l=Yacc"
            },
            "Zephir": {
                "color": "#118f9e",
                "url": "https://github.com/trending?l=Zephir"
            },
            "Zimpl": {
                "color": null,
                "url": "https://github.com/trending?l=Zimpl"
            }
        };
    lang = map[lang];
    color = (!lang ? false : lang['color']);
    return (!color ? "gray" : color);
  }
};

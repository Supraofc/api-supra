__path = process.cwd()

var express = require('express');
var db = require(__path + '/database/db');
try {
var zahirr = db.get("supra");
} catch (e) {
	console.log('')
}
var fs = require('fs');
var creatorList = ['@supra'];
var creator = creatorList[Math.floor(Math.random() * creatorList.length)];

var ytdl = require('ytdl-core');
var ytpl = require('ytpl');
var secure = require('ssl-express-www');
var cors = require('cors');
var scrapeYt = require("scrape-yt");
var fetch = require('node-fetch');
var cheerio = require('cheerio');
var request = require('request');
var router  = express.Router();

var { color, bgcolor } = require(__path + '/lib/color.js');
var { fetchJson } = require(__path + '/lib/fetcher.js')
var options = require(__path + '/lib/options.js');
var {
	Nulis,
	Vokal,
	Base,
	Searchnabi,
    Gempa
} = require('./../lib');
var cookie = "HSID=A7EDzLn3kae2B1Njb;SSID=AheuwUjMojTWvA5GN;APISID=cgfXh13rQbb4zbLP/AlvlPJ2xBJBsykmS_;SAPISID=m82rJG4AC9nxQ5uG/A1FotfA_gi9pvo91C;__Secure-3PAPISID=m82rJG4AC9nxQ5uG/A1FotfA_gi9pvo91C;VISITOR_INFO1_LIVE=RgZLnZtCoPU;LOGIN_INFO=AFmmF2swRQIhAOXIXsKVou2azuz-kTsCKpbM9szRExAMUD-OwHYiuB6eAiAyPm4Ag3O9rbma7umBK-AG1zoGqyJinh4ia03csp5Nkw:QUQ3MjNmeXJ0UHFRS3dzaTNGRmlWR2FfMDRxa2NRYTFiN3lfTEdOVTc4QUlwbUI4S2dlVngxSG10N3ZqcHZwTHBKano5SkN2dDlPSkhRMUtReE42TkhYeUVWS3kyUE1jY2I1QzA1MDZBaktwd1llWU9lOWE4NWhoZV92aDkxeE9vMTNlcG1uMU9rYjhOaDZWdno2ZzN3TXl5TVNhSjNBRnJaMExrQXpoa2xzRVUteFNWZDI5S0Fn;PREF=app=desktop&f4=4000000&al=id;SID=2wezCMTUkWN3YS1VmS_DXaEU84J0pZIQdemM8Zry-uzWm8y1njBpLTOpxSfN-EaYCRSiDg.;YSC=HCowA1fmvzo;__Secure-3PSID=2wezCMTUkWN3YS1VmS_DXaEU84J0pZIQdemM8Zry-uzWm8y1dajgWzlBh9TgKapGOwuXfA.;SIDCC=AJi4QfFK0ri9fSfMjMQ4tOJNp6vOb9emETXB_nf2S05mvr2jBlmeEvlSsQSzPMuJl_V0wcbL1r8;__Secure-3PSIDCC=AJi4QfGeWHx-c4uTpU1rXCciO1p0s2fJWU07KrkZhWyD1Tqi8LyR-kHuBwHY9mViVYu1fRh2PA";
var {
  ytDonlodMp3,
  ytDonlodMp4,
  ytPlayMp3,
  ytPlayMp4,
  ytSearch
} = require("./../lib/utils/yt");

var {
  pShadow,
  pRomantic,
  pSmoke,
  pBurnPapper,
  pNaruto,
  pLoveMsg,
  pMsgGrass,
  pGlitch,
  pDoubleHeart,
  pCoffeCup,
  pLoveText,
  pButterfly
} = require("./../lib/utils/photooxy");


loghandler = {
    notparam: {
        status: false,
        criador: `${creator}`,
        code: 406,
        mensagem: 'parâmetros de entrada de apikey',
        getApikey: 'Não tem apikey? Chame e compre sua chave por apenas 10 R$ wa.me/5593991919748'
    },
    notkey: {
        status: false,
        criador: `${creator}`,
        code: 406,
        mensagem: 'insira os parâmetros key'
    },
    noturl: {
        status: false,
        criador: `${creator}`,
        code: 406,
        mensagem: 'insira os parâmetros url'
    },
    notkata: {
        status: false,
        criador: `${creator}`,
        code: 406,
        mensagem: 'insira os parâmetros kata'
    },
    nottext: {
        status: false,
        criador: `${creator}`,
        code: 406,
        mensagem: 'insira os parâmetros text'
    },
    nottext2: {
        status: false,
        criador: `${creator}`,
        code: 406,
        mensagem: 'insira os parâmetros text2'
    },
    notnabi: {
        status: false,
        criador: `${creator}`,
        code: 406,
        mensagem: 'insira os parâmetros nabi'
    },
    nottext3: {
        status: false,
        criador: `${creator}`,
        code: 406,
        mensagem: 'insira os parâmetros text3'
    },
    nottheme: {
        status: false,
        criador: `${creator}`,
        code: 406,
        mensagem: 'insira os parâmetros theme'
    },
    notusername: {
        status: false,
        criador: `${creator}`,
        code: 406,
        mensagem: 'insira os parâmetros username'
    },
    notvalue: {
        status: false,
        criador: `${creator}`,
        code: 406,
        mensagem: 'insira os parâmetros value'
    },
    notheme: {
    	status: false,
        criador: `${creator}`,
        code: 406,
        mensagem: 'o tema não está disponível, por favor, digite texmaker/list atau baca documentasi'
     },
    invalidKey: {
        status: false,
        criador: `${creator}`,
        code: 406,
        mensagem: 'apikey invalida, Não tem apikey? Chame e compre sua chave por apenas 10 R$ wa.me/5593991919748'
    },
    invalidlink: {
        status: false,
        criador: `${creator}`,
        mensagem: 'erro, talvez seu link seja inválido.'
    },
    invalidkata: {
        status: false,
        criador: `${creator}`,
        mensagem: 'erro, talvez a palavra não esteja na api.'
    },
    notAddApiKey: {
        status: false,
        criador: `${creator}`,
        code: 406,
        mensagem: 'insira os parâmetros status, apikeyInput, email, nomorhp, name, age, country, exp'
    },
    error: {
        status: false,
        criador: `${creator}`,
        mensagem: 'talvez esteja sendo consertado'
    }
}
const listkey = ["supraz", "yuna", "lhannaBot"];
var len = 15
        var arr = '123456789abcdefghijklmnopqrstuvwxyz'
        var random = '';

        for (var i = len; i > 0; i--) {
            random += arr[Math.floor(Math.random() * arr.length)];
        }

        var lenn = 5
        var randomlagi = '';

        for (var i = lenn; i > 0; i--) {
            randomlagi += arr[Math.floor(Math.random() * arr.length)];
        }

        var randomTextNumber = random+randomlagi+'---------ZahirGanteng'+'ZHIRRR--GANS';
        
 
 async function cekApiKey(api) {
 	ap = await zahirr.findOne({apikey:api})
 return ap;
 }
router.get('/find', async (req, res, next) => {
    var apikey = req.query.apikey
    if (!apikey) return res.json(loghandler.notparam)
    if (apikey != 'supra') return res.json(loghandler.invalidKey)

    try {
        zahirr.find()
            .then(result => {
                res.json({
                    status: true,
                    criador: `${creator}`,
                    result
                })
        })
    } catch (e) {
        console.log(e)
        res.json(loghandler.error)
    }
})

router.get('/cekapikey', async(req, res, next) => {
  const apikey = req.query.apikey;
  if(!apikey) return res.json(loghandler.notparam)
  if(listkey.includes(apikey)) {
    res.json({
      status: 'active',
      creator: `${creator}`,
      apikey: `${apikey}`,
      message: 'APIKEY ATIVA'
    })
  } else {
    res.json(loghandler.invalidKey)
  }
})

router.get("/apikey18", async (req, res, next) => {
  const key = req.query.key;
  if(listkey.includes(key)) {
    res.json({
      message: 'apikey está registrado'
    });
  } else {
    listkey.push(key);
    res.json({
      message: `registado com sucesso ${key} para banco de dados`
    });
  }
});

// delete apikey

router.get("/apikey18d", async (req, res, next) => {
	const Apikey = req.query.apikey;
	if(listkey.includes(Apikey)){
		res.json({
			message: 'apikey não existia antes'
			})
			} else {
	listkey.splice(Apikey, 1)
	res.json({
		message: 'apikey excluído com sucesso' 
});
 }
});

router.get('/tradutor', async (req, res, next) => {
       text = req.query.text
          var Apikey = req.query.apikey;
if(!Apikey) return res.json(loghandler.notparam)
	if(listkey.includes(Apikey)){    
       fetch(encodeURI(`https://supra-api.herokuapp.com/api/tradutor?text=${text}&apikey=supraz`))
        .then(response => response.json())
        .then(data => {
        var original = data.original;
         var traduzido = data.traduzido;
             res.json({
                 criador : `${creator}`,
                 original,
                 traduzido
             })
         })
        } else {
res.json(loghandler.invalidKey)
}        	    	 		
})

router.get('/ddd', async (req, res, next) => {
         quero = req.query.quero
        var Apikey = req.query.apikey;
if(!Apikey) return res.json(loghandler.notparam)
	if(listkey.includes(Apikey)){          

       fetch(encodeURI(`https://supra-api.herokuapp.com/api/ddd?quero=${quero}&apikey=supraz`))
        .then(response => response.json())
        .then(data => {
        var estado = data.estado;
        var cidades = data.cidades;
             res.json({
                 criador : `${creator}`,
                 estado,
                 cidades
             })
         })
     } else {
res.json(loghandler.invalidKey)
}        	    	 		
})
router.get('/waifu2', async (req, res, next) => {   
        var Apikey = req.query.apikey;
if(!Apikey) return res.json(loghandler.notparam)
	if(listkey.includes(Apikey)){          
       fetch(encodeURI(`https://supra-api.herokuapp.com/api/waifu2?&apikey=supraz`))
        .then(response => response.json())
        .then(data => {    
        var image = data.image;
             res.json({
                 criador : `${creator}`,
                 image
             })
         })
     } else {
res.json(loghandler.invalidKey)
}        	    	 		
})
router.get('/cep1', async (req, res, next) => {
         quero = req.query.quero
        var Apikey = req.query.apikey;
if(!Apikey) return res.json(loghandler.notparam)
	if(listkey.includes(Apikey)){          
       fetch(encodeURI(`https://supra-api.herokuapp.com/api/cep1?quero=${quero}&apikey=supraz`))
        .then(response => response.json())
        .then(data => {
         var cep = data.cep;
        var estado = data.estado;
        var cidade = data.cidade;
       var lugar = data.lugar; 
       var rua = data.rua;
             res.json({
                 criador : `${creator}`,
                 cep,
                 estado,
                 cidade,
                 lugar,
                 rua
             })
         })
          } else {
res.json(loghandler.invalidKey)
}        	    	 		
})

router.get('/ip', async (req, res, next) => {
         quero = req.query.quero
        var Apikey = req.query.apikey;
if(!Apikey) return res.json(loghandler.notparam)
	if(listkey.includes(Apikey)){          
       fetch(encodeURI(`https://supra-api.herokuapp.com/api/ip?quero=${quero}&apikey=supraz`))
        .then(response => response.json())
        .then(data => {
         var pais = data.pais;
        var estado = data.estado;
        var cidade = data.cidade;
       var latitude = data.latitude; 
       var longitude = data.longitude;
       var isp = data.isp;
       var as = data.as;
       var ip = data.ip;
             res.json({
                 criador : `${creator}`,
                 pais,
                 estado,
                 cidade,
                 latitude,
                 longitude,
                 isp,
                 as,
                 ip
             })
         })
          } else {
res.json(loghandler.invalidKey)
}        	    	 		
})
router.get('/saycat', async (req, res, next) => {   
        var Apikey = req.query.apikey;
if(!Apikey) return res.json(loghandler.notparam)
	if(listkey.includes(Apikey)){          
       fetch(encodeURI(`https://supra-api.herokuapp.com/api/saycat?apikey=supraz`))
        .then(response => response.json())
        .then(data => {    
        var resultado = data.resultado;
             res.json({
                 criador : `${creator}`,
                 resultado
             })
         })
     } else {
res.json(loghandler.invalidKey)
}        	    	 		
})
router.get('/conselho', async (req, res, next) => {   
        var Apikey = req.query.apikey;
if(!Apikey) return res.json(loghandler.notparam)
	if(listkey.includes(Apikey)){          
       fetch(encodeURI(`https://supra-api.herokuapp.com/api/conselho?apikey=supraz`))
        .then(response => response.json())
        .then(data => {    
        var frase = data.frase;
             res.json({
                 criador : `${creator}`,
                 frase
             })
         })
     } else {
res.json(loghandler.invalidKey)
}        	    	 		
})
router.get('/romanticafrase', async (req, res, next) => {   
        var Apikey = req.query.apikey;
if(!Apikey) return res.json(loghandler.notparam)
	if(listkey.includes(Apikey)){          
       fetch(encodeURI(`https://supra-api.herokuapp.com/api/romanticafrase?apikey=supraz`))
        .then(response => response.json())
        .then(data => {    
        var frase = data.frase;
             res.json({
                 criador : `${creator}`,
                 frase
             })
         })
     } else {
res.json(loghandler.invalidKey)
}        	    	 		
})


router.get('/dadu', async (req, res, next) => {
      var Apikey = req.query.apikey;
if(!Apikey) return res.json(loghandler.notparam)
	if(listkey.includes(Apikey)){    
      hasil = 'https://supra-api.herokuapp.com/api/dadu?apikey=supraz'
	  data = await fetch(hasil).then(v => v.buffer())   
  
         await fs.writeFileSync(__path +'/tmp/dadu.webp', data)
        res.sendFile(__path+'/tmp/dadu.webp')
         } else {
res.json(loghandler.invalidKey)
}    
})

router.get('/stickera', async (req, res, next) => {
      var Apikey = req.query.apikey;
if(!Apikey) return res.json(loghandler.notparam)
	if(listkey.includes(Apikey)){    
    hasil = 'https://supra-api.herokuapp.com/api/stickera?apikey=supraz'
	  data = await fetch(hasil).then(v => v.buffer())   
  
         await fs.writeFileSync(__path +'/tmp/stickera.webp', data)
        res.sendFile(__path+'/tmp/stickera.webp')
         } else {
res.json(loghandler.invalidKey)
}    
})
router.get('/audiomeme', async (req, res, next) => {
     quero = req.query.quero
   var Apikey = req.query.apikey;
if(!Apikey) return res.json(loghandler.notparam)
	if(listkey.includes(Apikey)){    
   hasil = 'https://supra-api.herokuapp.com/api/audiomeme?quero=' + quero + '&apikey=supraz'
	  data = await fetch(hasil).then(v => v.buffer())   
  
         await fs.writeFileSync(__path +'/tmp/aud.mp3',data)
        res.sendFile(__path+'/tmp/aud.mp3')
        } else {
res.json(loghandler.invalidKey)
}    
})

router.get('/attp1', async (req, res, next) => {
       text = req.query.text
        var Apikey = req.query.apikey;
if(!Apikey) return res.json(loghandler.notparam)
	if(listkey.includes(Apikey)){    
   hasil = 'https://supra-api.herokuapp.com/api/attp1?text=' + text + '&apikey=supraz'
	  data = await fetch(hasil).then(v => v.buffer())   
  
         await fs.writeFileSync(__path +'/tmp/attp1.webp',data)
        res.sendFile(__path+'/tmp/attp1.webp')
             } else {
res.json(loghandler.invalidKey)
}    
})
router.get('/attp2', async (req, res, next) => {
       text = req.query.text
         var Apikey = req.query.apikey;
if(!Apikey) return res.json(loghandler.notparam)
	if(listkey.includes(Apikey)){    
   hasil = 'https://supra-api.herokuapp.com/api/attp2?text=' + text + '&apikey=supraz'
	  data = await fetch(hasil).then(v => v.buffer())   
  
         await fs.writeFileSync(__path +'/tmp/attp2.webp',data)
        res.sendFile(__path+'/tmp/attp2.webp')
           } else {
res.json(loghandler.invalidKey)
}    
})

router.get('/canvas/spotify', async (req, res, next) => {
         titulo = req.query.titulo
         text = req.query.text  
         capa = req.query.capa   
      var Apikey = req.query.apikey;
if(!Apikey) return res.json(loghandler.notparam)
	if(listkey.includes(Apikey)){  
   hasil = 'https://supra-api.herokuapp.com/api/canvas/spotify?titulo=' + titulo + '&text=' + text + '&capa=' + capa + '&apikey=supraz'
	  data = await fetch(hasil).then(v => v.buffer())   
	  await fs.writeFileSync(__path +'/tmp/spotify.jpeg', data)
       res.sendFile(__path+'/tmp/spotify.jpeg')
        } else {
res.json(loghandler.invalidKey)
}    
})

router.get('/base', async (req, res, next) => {
	var type = req.query.type,
		encode = req.query.encode,
		decode = req.query.decode,
		apikeyInput = req.query.apikey;
		if (!apikeyInput) return res.json(loghandler.notparam)
		if (apikeyInput != 'supra') return res.json(loghandler.invalidKey)
		if (!type) return res.json({status: false, creator, code: 404, mensagem: 'insira os parâmetros type, type yang tersedia : base64 , base32'})
		if (type == 'base64' && encode){
				Base("b64enc", encode)
				.then(result => {
					res.json({
						status:true,
						criador: `${creator}`,
						result
					})
				})
			} else if (type == 'base64' && decode){
				Base("b64dec", decode)
				.then(result => {
					res.json({
						status: true,
						criador: `${creator}`,
						result
					})
				})
			} else if (type == 'base32' && encode){
				Base('b32enc', encode)
				.then(result => {
					res.json({
						status:true,
						criador: `${creator}`,
						result
					})
				})
			} else if (type == 'base32' && decode){
				Base('b32dec', decode)
				.then(result => {
					res.json({
						status:true,
						criador: `${creator}`,
						result
					})
				})
			} else if(!(encode || decode)){
				res.json({
					status:false,
					criador: `${creator}`,
					mensagem: "tambahkan parameter encode/decode"
				})
			} else {
				res.json(loghandler.error)
			}
})

router.get('/nulis', async (req, res, next) => {
	var text = req.query.text,
		 apikeyInput = req.query.apikey;
	if(!apikeyInput) return res.json(loghandler.notparam)
     if(apikeyInput != 'supra') return res.json(loghandler.invalidKey)
	 if(!text) return res.json(loghandler.nottext)
		Nulis(text)
		 .then(hasil => {
			fetch(encodeURI(`https://api.imgbb.com/1/upload?expiration=120&key=761ea2d5575581057a799d14e9c78e28&image=${hasil}&name=${randomTextNumber}`))
                                .then(response => response.json())
                                .then(data => {
                                    var urlnya = data.data.url,
                                        delete_url = data.data.delete_url;
                                        res.json({
                                            status : true,
                                            criador : `${creator}`,
                                            message : `não se esqueça de seguir ${creator}`,
                                            result:{
                                                url:urlnya,
                                                delete_url: delete_url,
                                                info: 'url irá desaparecer após 2 minutos'
                                            }
                                        })
                                })
            })
           .catch(err => {
		  res.json(loghandler.error)
		   })
})

router.get('/anime/loli', async(req, res, next) => {
    var apikey = req.query.apikey
    if (!apikey) return res.json(loghandler.notparam)
    if(listkey.includes(apikey)){
    try {
        var options = {
            url: "http://results.dogpile.com/serp?qc=images&q= " + "Loli",
            method: "GET",
            headers: {
                "Accept": "text/html",
                "User-Agent": "Chrome"
            }
        }
        request(options, function(error, response, responseBody) {

            $ = cheerio.load(responseBody)
            var links = $(".image a.link")
            var cari = new Array(links.length).fill(0).map((v, i) => links.eq(i).attr("href"))
            var hasill = cari[Math.floor(Math.random() * cari.length)]
        res.json({
              status: true,
              code: 200,
              creator: `${creator}`,
              result: hasill
            })
        })
    } catch (e) {}
    } else {
      res.json(loghandler.invalidKey)
    }
});

router.get('/search/image', async(req, res, next) => {
  const apikey = req.query.apikey;
  const query = req.query.query;
  
  if(!query) return res.json(loghandler.notquery)
  if(!apikey) return res.json(loghandler.notparam)
  
  if(listkey.includes(apikey)){
    try {
        var options = {
            url: `http://results.dogpile.com/serp?qc=images&q=${query}`,
            method: "GET",
            headers: {
                "Accept": "text/html",
                "User-Agent": "Chrome"
            }
        }
        request(options, function(error, response, responseBody) {
            if (error) return

            $ = cheerio.load(responseBody)
            var links = $(".image a.link")
            var cari = new Array(links.length).fill(0).map((v, i) => links.eq(i).attr("href"))
            if (!cari.length) return
            var hasil = cari[Math.floor(Math.random() * cari.length)]
        res.json({
              status: true,
              code: 200,
              creator: `${creator}`,
              result: hasil
            })
        })
    } catch (e) {}
  } else {
    res.json(loghandler.invalidKey)
  }
})

router.get('/kisahnabi', async (req, res, next) => {
	var nabi = req.query.nabi,
		apikeyInput = req.query.apikey;

		if (!apikeyInput) return res.json(loghandler.notparam)
		if (apikeyInput != 'supra') return res.json(loghandler.invalidKey)
		Searchnabi(nabi)
		.then(result => {
			res.json({
				criador: creator,
				result
			})
		})
		.catch(e => {
			console.log('Error :', color(e, 'red'))
			res.json(loghandler.error)
		})
})

router.get('/infogempa', async (req, res, next) => {
	        var apikeyInput = req.query.apikey

		if (!apikeyInput) return res.json(loghandler.notparam)
		if (apikeyInput != 'supra') return res.json(loghandler.invalidKey)
		Gempa()
		.then(result => {
			res.json({
				criador: creator,
				result
			})
		})
		.catch(e => {
			console.log('Error :', color(e, 'red'))
			res.json(loghandler.error)
		})
})

router.get('/hadits', async (req, res, next) => {
        var apikeyInput = req.query.apikey,
            kitab = req.query.kitab,
            nomor = req.query.nomor
            
	if(!apikeyInput) return res.json(loghandler.notparam)
	if(apikeyInput != 'supra') return res.json(loghandler.invalidKey)
    if (!kitab) return res.json({ status : false, criador : `${creator}`, message : "masukan parameter kitab"})
    if (!nomor) return res.json({ status : false, criador : `${creator}`, message : "masukan parameter nomor"})

       fetch(encodeURI(`https://hadits-api-zhirrr.vercel.app/books/${kitab}/${nomor}`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
})


router.get('/quran', async (req, res, next) => {
        var apikeyInput = req.query.apikey,
            surah = req.query.surah,
            ayat = req.query.ayat
            
	if(!apikeyInput) return res.json(loghandler.notparam)
	if(apikeyInput != 'supra') return res.json(loghandler.invalidKey)
    if (!surah) return res.json({ status : false, criador : `${creator}`, message : "masukan parameter surah"})
    if (!ayat) return res.json({ status : false, criador : `${creator}`, message : "masukan parameter ayat"})

       fetch(encodeURI(`https://alquran-apiii.vercel.app/surah/${surah}/${ayat}`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
})


router.get('/fbdown', async (req, res, next) => {
        var apikeyInput = req.query.apikey,
            url = req.query.url
            
	if(!apikeyInput) return res.json(loghandler.notparam)
	if(apikeyInput != 'supra') return res.json(loghandler.invalidKey)
    if (!url) return res.json({ status : false, criador : `${creator}`, message : "masukan parameter url"})

       fetch(encodeURI(`https://fb-api-zhirrr.vercel.app/?url=${url}`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
})


router.get('/textmaker/metallic', async (req, res, next) => {
        var theme = req.query.theme,
             text = req.query.text,
             text2 = req.query.text2,
             text3 = req.query.text3,
             apikeyInput = req.query.apikey;
        
	if(!apikeyInput) return res.json(loghandler.notparam)
	if(apikeyInput != 'supra') return res.json(loghandler.invalidKey)
        if (!theme) return res.json(loghandler.nottheme)
        if (theme != 'neon' && theme != 'glow') return res.json(loghandler.notheme)
        if (!text) return res.json(loghandler.nottext)

        if (theme == 'neon') {
            try {
            request.post({
                url: "https://photooxy.com/logo-and-text-effects/illuminated-metallic-effect-177.html",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: `text_1=${text}&login=OK`,
                }, (e,r,b) => {
                    if (!e) {
                        $ = cheerio.load(b)
                        $(".thumbnail").find("img").each(function() {
                            h = $(this).attr("src")
                            var result = "https://photooxy.com/"+h
                            fetch(encodeURI(`https://api.imgbb.com/1/upload?expiration=120&key=761ea2d5575581057a799d14e9c78e28&image=${result}&name=${randomTextNumber}`))
                                .then(response => response.json())
                                .then(data => {
                                    var urlnya = data.data.url,
                                        delete_url = data.data.delete_url;
                                        res.json({
                                            status : true,
                                            criador : `${creator}`,
                                            message : `não se esqueça de seguir ${creator}`,
                                            result:{
                                                url:urlnya,
                                                delete_url: delete_url,
                                                info: 'url irá desaparecer após 2 minutos'
                                            }
                                        })
                                })
                        })
                    }
                })
                } catch (e) {
                	console.log(e);
                res.json(loghandler.error)
                }
        } else if (theme == 'glow') {
            request.post({
                url: "https://photooxy.com/other-design/create-metallic-text-glow-online-188.html",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: `text_1=${text}&login=OK`,
                }, (e,r,b) => {
                    if (!e) {
                        $ = cheerio.load(b)
                        $(".thumbnail").find("img").each(function() {
                            h = $(this).attr("src")
                            var result = "https://photooxy.com/"+h
                            fetch(encodeURI(`https://api.imgbb.com/1/upload?expiration=120&key=761ea2d5575581057a799d14e9c78e28&image=${result}&name=${randomTextNumber}`))
                                .then(response => response.json())
                                .then(data => {
                                    var urlnya = data.data.url,
                                        delete_url = data.data.delete_url;
                                        res.json({
                                            status : true,
                                            criador : `${creator}`,
                                            message : `não se esqueça de seguir ${creator}`,
                                            result:{
                                                url:urlnya,
                                                delete_url: delete_url,
                                                info: 'url irá desaparecer após 2 minutos'
                                            }
                                        })
                                })
                        })
                    }
                }) 
        } else {
            res.json(loghandler.error)
        }
})

router.get('/textmaker/alam', async (req, res, next) => {
        var theme = req.query.theme,
             text = req.query.text,
             text2 = req.query.text2,
             text3 = req.query.text3,
             apikeyInput = req.query.apikey;
        
	if(!apikeyInput) return res.json(loghandler.notparam)
	if(apikeyInput != 'supra') return res.json(loghandler.invalidKey)
        if (!theme) return res.json(loghandler.nottheme)
        if (theme != 'summer' && theme != 'flower') return res.json(loghandler.notheme)
        if (!text) return res.json(loghandler.nottext)

        if (theme == 'summer') {
            try {
            request.post({
                url: "https://photooxy.com/logo-and-text-effects/3d-summer-text-effect-367.html",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: `text_1=${text}&login=OK`,
                }, (e,r,b) => {
                    if (!e) {
                        $ = cheerio.load(b)
                        $(".thumbnail").find("img").each(function() {
                            h = $(this).attr("src")
                            var result = "https://photooxy.com/"+h
                            fetch(encodeURI(`https://api.imgbb.com/1/upload?expiration=120&key=761ea2d5575581057a799d14e9c78e28&image=${result}&name=${randomTextNumber}`))
                                .then(response => response.json())
                                .then(data => {
                                    var urlnya = data.data.url,
                                        delete_url = data.data.delete_url;
                                        res.json({
                                            status : true,
                                            criador : `${creator}`,
                                            message : `não se esqueça de seguir ${creator}`,
                                            result:{
                                                url:urlnya,
                                                delete_url: delete_url,
                                                info: 'url irá desaparecer após 2 minutos'
                                            }
                                        })
                                })
                        })
                    }
                })
                } catch (e) {
                	console.log(e);
                res.json(loghandler.error)
                }
        } else if (theme == 'flower') {
            request.post({
                url: "https://photooxy.com/art-effects/flower-typography-text-effect-164.html",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: `text_1=${text}&login=OK`,
                }, (e,r,b) => {
                    if (!e) {
                        $ = cheerio.load(b)
                        $(".thumbnail").find("img").each(function() {
                            h = $(this).attr("src")
                            var result = "https://photooxy.com/"+h
                            fetch(encodeURI(`https://api.imgbb.com/1/upload?expiration=120&key=761ea2d5575581057a799d14e9c78e28&image=${result}&name=${randomTextNumber}`))
                                .then(response => response.json())
                                .then(data => {
                                    var urlnya = data.data.url,
                                        delete_url = data.data.delete_url;
                                        res.json({
                                            status : true,
                                            criador : `${creator}`,
                                            message : `não se esqueça de seguir ${creator}`,
                                            result:{
                                                url:urlnya,
                                                delete_url: delete_url,
                                                info: 'url irá desaparecer após 2 minutos'
                                            }
                                        })
                                })
                        })
                    }
                }) 
        } else {
            res.json(loghandler.error)
        }
})

router.get('/muslim/tahlil', async (req, res, next) => {
        var apikeyInput = req.query.apikey
            
	if(!apikeyInput) return res.json(loghandler.notparam)
	if(apikeyInput != 'supra') return res.json(loghandler.invalidKey)

       fetch(encodeURI(`https://raw.githubusercontent.com/Zhirrr/My-SQL-Results/main/data/dataTahlil.json`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
})
router.get("/photooxy/shadow", async(req, res, next) => {
  const text1 = req.query.text;
  const apikey = req.query.apikey;
  if(!text1) return res.json(loghandler.nottext1)
  if(!apikey) return res.json(loghandler.notparam)
  if(listkey.includes(apikey)){
  pShadow(text1)
    .then((data) => {
      const result = {
        status: true,
        code: 200,
        creator: `${creator}`,
        result: data.url
      }
      res.json(result)
    })
    .catch((error) => {
      res.json(error)
    });
    } else {
    	res.json(loghandler.invalidKey)
    }
});

router.get("/photooxy/romantic", async(req, res, next) => {
  const text1 = req.query.text;
  const apikey = req.query.apikey;
  if(!text1) return res.json(loghandler.nottext1)
  if(!apikey) return res.json(loghandler.notparam)
  if(listkey.includes(apikey)){
  pRomantic(text1)
    .then((data) => {
      const result = {
        status: true,
        code: 200,
        creator: `${creator}`,
        result: data.url
      }
      res.json(result)
    })
    .catch((error) => {
      res.json(error)
    });
    } else {
    	res.json(loghandler.invalidKey)
    }
});

// @PHOTOOXY

router.get("/photooxy/smoke", async(req, res, next) => {
  const text1 = req.query.text;
  const apikey = req.query.apikey;
  if(!text1) return res.json(loghandler.nottext1)
  if(!apikey) return res.json(loghandler.notparam)
  if(listkey.includes(apikey)){
  pSmoke(text1)
    .then((data) => {
      const result = {
        status: true,
        code: 200,
        creator: `${creator}`,
        result: data.url
      }
      res.json(result)
    })
    .catch((error) => {
      res.json(error)
    });
    } else {
    	res.json(loghandler.invalidKey)
    }
});

router.get("/photooxy/burn-papper", async(req, res, next) => {
  const text1 = req.query.text;
  const apikey = req.query.apikey;
  if(!text1) return res.json(loghandler.nottext1)
  if(!apikey) return res.json(loghandler.notparam)
  if(listkey.includes(apikey)){
  pBurnPapper(text1)
    .then((data) => {
      const result = {
        status: true,
        code: 200,
        creator: `${creator}`,
        result: data.url
      }
      res.json(result)
    })
    .catch((error) => {
      res.json(error)
    });
    } else {
    	res.json(loghandler.invalidKey)
    }
});

router.get("/photooxy/naruto", async(req, res, next) => {
  const text1 = req.query.text;
  const apikey = req.query.apikey;
  if(!text1) return res.json(loghandler.nottext1)
  if(!apikey) return res.json(loghandler.notparam)
  if(listkey.includes(apikey)){
  pNaruto(text1)
    .then((data) => {
      const result = {
        status: true,
        code: 200,
        creator: `${creator}`,
        result: data.url
      }
      res.json(result)
    })
    .catch((error) => {
      res.json(error)
    });
    } else {
    	res.json(loghandler.invalidKey)
    }
});

router.get("/photooxy/love-message", async(req, res, next) => {
  const text1 = req.query.text;
  const apikey = req.query.apikey;
  if(!text1) return res.json(loghandler.nottext1)
  if(!apikey) return res.json(loghandler.notparam)
  if(listkey.includes(apikey)){
  pLoveMsg(text1)
    .then((data) => {
      const result = {
        status: true,
        code: 200,
        creator: `${creator}`,
        result: data.url
      }
      res.json(result)
    })
    .catch((error) => {
      res.json(error)
    });
    } else {
    	res.json(loghandler.invalidKey)
    }
});

router.get("/photooxy/message-under-grass", async(req, res, next) => {
  const text1 = req.query.text;
  const apikey = req.query.apikey;
  if(!text1) return res.json(loghandler.nottext1)
  if(!apikey) return res.json(loghandler.notparam)
  if(listkey.includes(apikey)){
  pMsgGrass(text1)
    .then((data) => {
      const result = {
        status: true,
        code: 200,
        creator: `${creator}`,
        result: data.url
      }
      res.json(result)
    })
    .catch((error) => {
      res.json(error)
    });
    } else {
    	res.json(loghandler.invalidKey)
    }
});

router.get("/photooxy/glitch", async(req, res, next) => {
  const text1 = req.query.text1;
  const text2 = req.query.text2;
  const apikey = req.query.apikey;
  if(!text1) return res.json(loghandler.nottext1)
  if(!text2) return res.json(loghandler.nottext2)
  if(!apikey) return res.json(loghandler.notparam)
  if(listkey.includes(apikey)){
  pGlitch(text1, text2)
    .then((data) => {
      const result = {
        status: true,
        code: 200,
        creator: `${creator}`,
        result: data.url
      }
      res.json(result)
    })
    .catch((error) => {
      res.json(error)
    });
    } else {
    	res.json(loghandler.invalidKey)
    }
});

router.get("/photooxy/double-heart", async(req, res, next) => {
  const text1 = req.query.text;
  const apikey = req.query.apikey;
  if(!text1) return res.json(loghandler.nottext1)
  if(!apikey) return res.json(loghandler.notparam)
  if(listkey.includes(apikey)){
  pDoubleHeart(text1)
    .then((data) => {
      const result = {
        status: true,
        code: 200,
        creator: `${creator}`,
        result: data.url
      }
      res.json(result)
    })
    .catch((error) => {
      res.json(error)
    });
    } else {
    	res.json(loghandler.invalidKey)
    }
});

router.get("/photooxy/coffe-cup", async(req, res, next) => {
  const text1 = req.query.text;
  const apikey = req.query.apikey;
  if(!text1) return res.json(loghandler.nottext1)
  if(!apikey) return res.json(loghandler.notparam)
  if(listkey.includes(apikey)){
  pCoffeCup(text1)
    .then((data) => {
      const result = {
        status: true,
        code: 200,
        creator: `${creator}`,
        result: data.url
      }
      res.json(result)
    })
    .catch((error) => {
      res.json(error)
    });
    } else {
    	res.json(loghandler.invalidKey)
    }
});

router.get("/photooxy/love-text", async(req, res, next) => {
  const text1 = req.query.text;
  const apikey = req.query.apikey;
  if(!text1) return res.json(loghandler.nottext1)
  if(!apikey) return res.json(loghandler.notparam)
  if(listkey.includes(apikey)){
  pLoveText(text1)
    .then((data) => {
      const result = {
        status: true,
        code: 200,
        creator: `${creator}`,
        result: data.url
      }
      res.json(result)
    })
    .catch((error) => {
      res.json(error)
    });
    } else {
    	res.json(loghandler.invalidKey)
    }
});

router.get("/photooxy/butterfly", async(req, res, next) => {
  const text1 = req.query.text;
  const apikey = req.query.apikey;
  if(!text1) return res.json(loghandler.nottext1)
  if(!apikey) return res.json(loghandler.notparam)
  if(listkey.includes(apikey)){
  pButterfly(text1)
  .then((data) => {
      const result = {
        status: true,
        code: 200,
        creator: `${creator}`,
        result: data.url
      }
      res.json(result)
    })
    .catch((error) => {
      res.json(loghandler.error)
    })
    } else {
    	res.json(loghandler.invalidKey)
    }
});

router.get('/muslim/wirid', async (req, res, next) => {
        var apikeyInput = req.query.apikey
            
	if(!apikeyInput) return res.json(loghandler.notparam)
	if(apikeyInput != 'supra') return res.json(loghandler.invalidKey)

       fetch(encodeURI(`https://raw.githubusercontent.com/Zhirrr/My-SQL-Results/main/data/dataWirid.json`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
})


router.get('/muslim/ayatkursi', async (req, res, next) => {
        var apikeyInput = req.query.apikey
            
	if(!apikeyInput) return res.json(loghandler.notparam)
	if(apikeyInput != 'supra') return res.json(loghandler.invalidKey)

       fetch(encodeURI(`https://raw.githubusercontent.com/Zhirrr/My-SQL-Results/main/data/dataAyatKursi.json`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
})


router.get('/muslim/doaharian', async (req, res, next) => {
        var apikeyInput = req.query.apikey
            
	if(!apikeyInput) return res.json(loghandler.notparam)
	if(apikeyInput != 'supra') return res.json(loghandler.invalidKey)

       fetch(encodeURI(`https://raw.githubusercontent.com/Zhirrr/My-SQL-Results/main/data/dataDoaHarian.json`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
})


router.get('/muslim/bacaanshalat', async (req, res, next) => {
        var apikeyInput = req.query.apikey
            
	if(!apikeyInput) return res.json(loghandler.notparam)
	if(apikeyInput != 'supra') return res.json(loghandler.invalidKey)

       fetch(encodeURI(`https://raw.githubusercontent.com/Zhirrr/My-SQL-Results/main/data/dataBacaanShalat.json`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
})


router.get('/muslim/niatshalat', async (req, res, next) => {
        var apikeyInput = req.query.apikey
            
	if(!apikeyInput) return res.json(loghandler.notparam)
	if(apikeyInput != 'supra') return res.json(loghandler.invalidKey)

       fetch(encodeURI(`https://raw.githubusercontent.com/Zhirrr/My-SQL-Results/main/data/dataNiatShalat.json`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
})


router.get('/muslim/kisahnabi', async (req, res, next) => {
        var apikeyInput = req.query.apikey
            
	if(!apikeyInput) return res.json(loghandler.notparam)
	if(apikeyInput != 'supra') return res.json(loghandler.invalidKey)

       fetch(encodeURI(`https://raw.githubusercontent.com/Zhirrr/My-SQL-Results/main/data/dataKisahNabi.json`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
})


router.get('/muslim/asmaulhusna', async (req, res, next) => {
        var apikeyInput = req.query.apikey
            
	if(!apikeyInput) return res.json(loghandler.notparam)
	if(apikeyInput != 'supra') return res.json(loghandler.invalidKey)

       fetch(encodeURI(`https://raw.githubusercontent.com/Zhirrr/My-SQL-Results/main/data/dataAsmaulHusna.json`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
})


router.get('/muslim/niatshubuh', async (req, res, next) => {
        var apikeyInput = req.query.apikey
            
	if(!apikeyInput) return res.json(loghandler.notparam)
	if(apikeyInput != 'supra') return res.json(loghandler.invalidKey)

       fetch(encodeURI(`https://raw.githubusercontent.com/Zhirrr/My-SQL-Results/main/data/NiatShubuh.json`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
})


router.get('/muslim/niatdzuhur', async (req, res, next) => {
        var apikeyInput = req.query.apikey
            
	if(!apikeyInput) return res.json(loghandler.notparam)
	if(apikeyInput != 'supra') return res.json(loghandler.invalidKey)

       fetch(encodeURI(`https://raw.githubusercontent.com/Zhirrr/My-SQL-Results/main/data/NiatDzuhur.json`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
})


router.get('/muslim/niatmaghrib', async (req, res, next) => {
        var apikeyInput = req.query.apikey
            
	if(!apikeyInput) return res.json(loghandler.notparam)
	if(apikeyInput != 'supra') return res.json(loghandler.invalidKey)

       fetch(encodeURI(`https://raw.githubusercontent.com/Zhirrr/My-SQL-Results/main/data/NiatMaghrib.json`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
})


router.get('/muslim/niatisya', async (req, res, next) => {
        var apikeyInput = req.query.apikey
            
	if(!apikeyInput) return res.json(loghandler.notparam)
	if(apikeyInput != 'supra') return res.json(loghandler.invalidKey)

       fetch(encodeURI(`https://raw.githubusercontent.com/Zhirrr/My-SQL-Results/main/data/NiatIsya.json`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
})


router.get('/muslim/niatashar', async (req, res, next) => {
        var apikeyInput = req.query.apikey
            
	if(!apikeyInput) return res.json(loghandler.notparam)
	if(apikeyInput != 'supra') return res.json(loghandler.invalidKey)

       fetch(encodeURI(`https://raw.githubusercontent.com/Zhirrr/My-SQL-Results/main/data/NiatAshar.json`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
})

router.get('/wallpaper/cyberspace', async (req, res, next) => {
        var Apikey = req.query.apikey
            
	if(!Apikey) return res.json(loghandler.notparam)
	if(listkey.includes(Apikey)){

  Cc = JSON.parse(fs.readFileSync(__path +'/data/CyberSpace.json'));
  const randCc = Cc[Math.floor(Math.random() * Cc.length)]
  data = await fetch(randCc).then(v => v.buffer())
  await fs.writeFileSync(__path +'/tmp/CyberSpace.jpeg', data)
  res.sendFile(__path +'/tmp/CyberSpace.jpeg')
} else {
res.json(loghandler.invalidKey)
}
})




router.get('/wallpaper/programming', async (req, res, next) => {
        var Apikey = req.query.apikey
            
	if(!Apikey) return res.json(loghandler.notparam)
	if(listkey.includes(Apikey)){

  const Progam = JSON.parse(fs.readFileSync(__path +'/data/Programming.json'));
  const randProgam = Progam[Math.floor(Math.random() * Progam.length)];
  data = await fetch(randProgam).then(v => v.buffer())
  await fs.writeFileSync(__path +'/tmp/Programming.jpeg', data)
  res.sendFile(__path +'/tmp/Programming.jpeg')
} else {
res.json(loghandler.invalidKey)
}
})


router.get('/wallpaper/pegunungan', async (req, res, next) => {
        var Apikey = req.query.apikey
            
	if(!Apikey) return res.json(loghandler.notparam)
	if(listkey.includes(Apikey)){

  const Mount = JSON.parse(fs.readFileSync(__path +'/data/Mountain.json'));
  const randMount = Mount[Math.floor(Math.random() * Mount.length)];
  data = await fetch(randMount).then(v => v.buffer());
  await fs.writeFileSync(__path +'/tmp/Mountain.jpeg', data)
  res.sendFile(__path+ '/tmp/Mountain.jpeg');
} else {
res.json(loghandler.invalidKey)
}
})

router.get('/wikipedia', async (req, res, next) => {
        var apikeyInput = req.query.apikey,
            search = req.query.search
            
	if(!apikeyInput) return res.json(loghandler.notparam)
	if(apikeyInput != 'supra') return res.json(loghandler.invalidKey)
        if(!search) return res.json({ status : false, criador : `${creator}`, message : "masukan parameter search"})

       fetch(encodeURI(`https://docs-api-zahirrr.herokuapp.com/api/wiki?keyword=${search}`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
})

router.get('/randomquote/muslim', async (req, res, next) => {
        var apikeyInput = req.query.apikey
            
	if(!apikeyInput) return res.json(loghandler.notparam)
	if(apikeyInput != 'supra') return res.json(loghandler.invalidKey)

       fetch(encodeURI(`https://docs-api-zahirrr.herokuapp.com/api/quote?type=agamis`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
})


router.get('/drakorasia', async (req, res, next) => {
        var apikeyInput = req.query.apikey,
            search = req.query.search
            
	if(!apikeyInput) return res.json(loghandler.notparam)
	if(apikeyInput != 'supra') return res.json(loghandler.invalidKey)
        if(!search) return res.json({ status : false, criador : `${creator}`, message : "masukan parameter search"})

       fetch(encodeURI(`http://docs-api-zahirrr.herokuapp.com/api/drakorasia?search=${search}`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
})


router.get('/jadwalshalat', async (req, res, next) => {
        var apikeyInput = req.query.apikey,
            kota = req.query.kota
            
	if(!apikeyInput) return res.json(loghandler.notparam)
	if(apikeyInput != 'supra') return res.json(loghandler.invalidKey)
        if(!kota) return res.json({ status : false, criador : `${creator}`, message : "masukan parameter kota"})

       fetch(encodeURI(`https://raw.githubusercontent.com/Zhirrr/Zhirrr-Database/main/adzan/${kota}/2021/03.json`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
})


router.get('/fakedata', async (req, res, next) => {
        var apikeyInput = req.query.apikey,
            country = req.query.country
            
	if(!apikeyInput) return res.json(loghandler.notparam)
	if(apikeyInput != 'supra') return res.json(loghandler.invalidKey)
        if(!country) return res.json({ status : false, criador : `${creator}`, message : "masukan parameter country"})

       fetch(encodeURI(`https://fakename-api-zhirrr.vercel.app/api/fakename?country=${country}`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
})


router.get('/hilih', async (req, res, next) => {
        var apikeyInput = req.query.apikey,
            kata = req.query.kata
            
	if(!apikeyInput) return res.json(loghandler.notparam)
	if(apikeyInput != 'supra') return res.json(loghandler.invalidKey)
        if(!kata) return res.json({ status : false, criador : `${creator}`, message : "masukan parameter kata"})

       fetch(encodeURI(`https://hilih-api-zhirrr.vercel.app/api/hilih?kata=${kata}`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
})


router.get('/liriklagu', async (req, res, next) => {
        var apikeyInput = req.query.apikey,
            lagu = req.query.lagu
            
	if(!apikeyInput) return res.json(loghandler.notparam)
	if(apikeyInput != 'supra') return res.json(loghandler.invalidKey)
        if(!lagu) return res.json({ status : false, criador : `${creator}`, message : "masukan parameter kata"})

       fetch(encodeURI(`https://python-api-zhirrr.herokuapp.com/api/lirik?search=${lagu}`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
})


router.get('/chordlagu', async (req, res, next) => {
        var apikeyInput = req.query.apikey,
            lagu = req.query.lagu
            
	if(!apikeyInput) return res.json(loghandler.notparam)
	if(apikeyInput != 'supra') return res.json(loghandler.invalidKey)
        if(!lagu) return res.json({ status : false, criador : `${creator}`, message : "masukan parameter kata"})

       fetch(encodeURI(`https://python-api-zhirrr.herokuapp.com/api/chord?q=${lagu}`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
})


router.get('/random/asmaulhusna', async (req, res, next) => {
        var apikeyInput = req.query.apikey
            
	if(!apikeyInput) return res.json(loghandler.notparam)
	if(apikeyInput != 'supra') return res.json(loghandler.invalidKey)

       fetch(encodeURI(`https://python-api-zhirrr.herokuapp.com/api/random/asmaulhusna`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
})


router.get('/kbbi', async (req, res, next) => {
        var apikeyInput = req.query.apikey,
            kata = req.query.kata
            
	if(!apikeyInput) return res.json(loghandler.notparam)
	if(apikeyInput != 'supra') return res.json(loghandler.invalidKey)
        if(!kata) return res.json({ status : false, criador : `${creator}`, message : "masukan parameter kata"})

       fetch(encodeURI(`https://kbbi-api-zhirrr.vercel.app/api/kbbi?text=${kata}`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
})


router.get('/covidindo', async (req, res, next) => {
        var apikeyInput = req.query.apikey
            
	if(!apikeyInput) return res.json(loghandler.notparam)
	if(apikeyInput != 'supra') return res.json(loghandler.invalidKey)

       fetch(encodeURI(`https://covid19-api-zhirrr.vercel.app/api/covid-indonesia`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
})



router.get('/kodepos', async (req, res, next) => {
        var apikeyInput = req.query.apikey,
	    kota = req.query.kota
            
	if(!apikeyInput) return res.json(loghandler.notparam)
	if(apikeyInput != 'supra') return res.json(loghandler.invalidKey)
	if(!kota) return res.json({ status : false, criador : `${creator}`, message : "masukan parameter kota"})

       fetch(encodeURI(`https://kodepos-api-zhirrr.vercel.app/?q=${kota}`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
})


router.get('/googleimg', async (req, res, next) => {
          quero = req.query.quero
          var Apikey = req.query.apikey
            
	if(!Apikey) return res.json(loghandler.notparam)
	if(listkey.includes(Apikey)){
       fetch(encodeURI(`https://dapuhy-api.herokuapp.com/api/search/googleimage?query=itsuki+nakano&apikey=p0h6z3nleqWWAmg`))
        .then(response => response.json())
        .then(data => {
        var imagem = data.image;
             res.json({
                 criador : `${creator}`,
                 imagem
             })
         })
        } else {
res.json(loghandler.invalidKey)
}
})

router.get('/wallpaper/muslim', async (req, res, next) => {
        var Apikey = req.query.apikey
            
	if(!Apikey) return res.json(loghandler.notparam)
	if(listkey.includes(Apikey)){

  const Muslim = JSON.parse(fs.readFileSync(__path +'/data/Islamic.json'));
  const randMuslim = Muslim[Math.floor(Math.random() * Muslim.length)];
  data = await fetch(randMuslim).then(v => v.buffer());
  await fs.writeFileSync(__path +'/tmp/muslim.jpeg', data)
  res.sendFile(__path +'/tmp/muslim.jpeg');
} else {
res.json(loghandler.invalidKey)
}
})


router.get('/playaudio', async (req, res, next) => {
     quero = req.query.quero
    var Apikey = req.query.apikey           
	if(!Apikey) return res.json(loghandler.notparam)
	if(listkey.includes(Apikey)){
       fetch(encodeURI(`https://supraz.herokuapp.com/api/playaudio?quero=${quero}&apikey=supraz`))
        .then(response => response.json())
        .then(data => {
        var titulo = data.titulo;
        var imagem = data.imagem;
         var baixar = data.baixar;
        var tamanho = data.tamanho;       
             res.json({
                 titulo,               
                 imagem,              
                 tamanho,
                 baixar
             })
         })
      } else {
res.json(loghandler.invalidKey)
}
})
router.get('/playvid', async (req, res, next) => {
       quero = req.query.quero
     var Apikey = req.query.apikey           
	if(!Apikey) return res.json(loghandler.notparam)
	if(listkey.includes(Apikey)){
       fetch(encodeURI(`https://supraz.herokuapp.com/api/playvid?quero=${quero}&apikey=supraz`))
        .then(response => response.json())
        .then(data => {
        var titulo = data.titulo;
        var img = data.img;
        var link_baixar = data.link_baixar;
             res.json({
             criador : `${creator}`,
             titulo,
             img,
             link_baixar
             })
         })
    } else {
res.json(loghandler.invalidKey)
}
})




router.get('/quotes/kanye', async (req, res, next) => {
        var apikeyInput = req.query.apikey
            
	if(!apikeyInput) return res.json(loghandler.notparam)
	if(apikeyInput != 'supra') return res.json(loghandler.invalidKey)

       fetch(encodeURI(`https://docs-api-zahirrr.herokuapp.com/api/quote?type=kanye`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
})



router.get('/anime/kusonime', async (req, res, next) => {
        var apikeyInput = req.query.apikey,
	    search = req.query.search
            
	if(!apikeyInput) return res.json(loghandler.notparam)
	if(apikeyInput != 'supra') return res.json(loghandler.invalidKey)
	if(!search) return res.json({ status : false, criador : `${creator}`, message : "masukan parameter search"})
       fetch(encodeURI(`https://docs-api-zahirrr.herokuapp.com/api/kusonime?search=${search}`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
})


router.get('/gabut', async (req, res, next) => {
        var apikeyInput = req.query.apikey
            
	if(!apikeyInput) return res.json(loghandler.notparam)
	if(apikeyInput != 'supra') return res.json(loghandler.invalidKey)

       fetch(encodeURI(`https://docs-api-zahirrr.herokuapp.com/api/bosan`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
})


router.get('/manga', async (req, res, next) => {
        var apikeyInput = req.query.apikey,
	    search = req.query.search
            
	if(!apikeyInput) return res.json(loghandler.notparam)
	if(apikeyInput != 'supra') return res.json(loghandler.invalidKey)
	if(!search) return res.json({ status : false, criador : `${creator}`, message : "masukan parameter search"})
       fetch(encodeURI(`https://docs-api-zahirrr.herokuapp.com/api/manga?keyword=${search}`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
                 result
             })
         })
         .catch(e => {
         	res.json(loghandler.error)
})
})


router.get('/random/wallpaper', async (req, res, next) => {
         var Apikey = req.query.apikey           
	if(!Apikey) return res.json(loghandler.notparam)
	if(listkey.includes(Apikey)){

       fetch(encodeURI(`https://docs-api-zahirrr.herokuapp.com/api/random/wallpaper?genre=acak`))
        .then(response => response.json())
        .then(data => {
        var result = data;
             res.json({
                 result
             })
         })
           } else {
res.json(loghandler.invalidKey)
}
})



module.exports = router

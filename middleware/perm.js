function getCookieValue(cookieString, cookieName) {
    const cookies = cookieString.split('; ')
      .map(cookie => cookie.split('='))
      .reduce((accumulator, [key, value]) => ({ ...accumulator, [key]: value }), {});
  
    return cookies[cookieName];
}

const permissionControl = () => {
    return async (req,res,next) => {
        try {
        console.log(req.query.pass);
        //FOR TESTING -----------------------------------------------------
        let cookies = req.headers.cookie;


        if(req.query.pass == "yusuftalhakaya"){
           
              // Cookie değerini oluştur
                const cookieValue = 'adminPanel=yusuftalhakaya; Max-Age=3600;Path=/; HttpOnly';

                // Cookie'yi yanıt başlığına ekle
                res.setHeader('Set-Cookie', cookieValue);
                next();
                return 1;
        }

        // Gelen cookie değerini kontrol et
        if (cookies) {
            // Cookie değeri mevcut ise işlemleri yap
            let select = getCookieValue(cookies,'adminPanel');
            
            if(select=='yusuftalhakaya'){
                next();
                return 1;
            }else{
                let error2 = new Error('Auth Error A Panel.');
                error2.status = 401;
                throw error2;
            }
        } else {
            //console.log('Cookie bulunamadı.');
        }

        
        //FOR TESTING -----------------------------------------------------
        
        if(req.headers['authorization'] == "zabulbe12905U12598012759012890ni"){
            const error = new Error('Auth Error.');
            error.status = 401;
            throw error;
        }

        } catch (error) {
            next(error);
        }
    }
};

module.exports = permissionControl;